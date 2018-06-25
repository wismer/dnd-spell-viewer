import { CharacterBuildState, Race, CharacterAttribute, AttributeName, Skill, SkillName, PrimaryClassChoice, PrimaryClass, SubClass } from '../typings';
import { ALL_RACES, CHARACTER_CLASSES } from './constants';
import { AnyAction } from 'redux';


const initialState: CharacterBuildState = {
  attributes: [
    { short: 'str', full: 'strength', value: 8, modifier: -1 },
    { short: 'wis', full: 'wisdom', value: 8, modifier: -1 },
    { short: 'int', full: 'intelligence', value: 8, modifier: -1 },
    { short: 'cha', full: 'charisma', value: 8, modifier: -1 },
    { short: 'con', full: 'constitution', value: 8, modifier: -1 },
    { short: 'dex', full: 'dexterity', value: 8, modifier: -1 },
  ],
  race: null,
  availablePoints: 27,
  skills: [
    { name: 'Investigation', relatedAttribute: 'intelligence', value: 0, isProficient: false },
    { name: 'History', relatedAttribute: 'intelligence', value: 0, isProficient: false },
    { name: 'Perception', relatedAttribute: 'wisdom', value: 0, isProficient: false },
    { name: 'Intimidation', relatedAttribute: 'strength', value: 0, isProficient: false },
    { name: 'Arcana', relatedAttribute: 'intelligence', value: 0, isProficient: false },
    { name: 'Acrobatics', relatedAttribute: 'dexterity', value: 0, isProficient: false }
  ],
  activeAttribute: null,
  currentClass: null,
  currentSubClass: null
};

function updateAttributes(attributes: CharacterAttribute[], values: number[]): CharacterAttribute[] {
  return attributes
    .map((attr: CharacterAttribute, idx: number) => Object.assign({}, attr, { value: 8 + values[idx] }))
    .map((attr: CharacterAttribute, idx: number) => Object.assign({}, attr, { modifier: getModifier(attr.value) }));
}

function updateClass(state: CharacterBuildState, charClass: PrimaryClassChoice): CharacterBuildState {
  // let { skills } = state;
  if (state.currentClass && charClass === state.currentClass.name) {
    return Object.assign({}, state, { currentClass: null });
  } else if (state.currentClass) {
    return Object.assign({}, state, {
      currentClass: CHARACTER_CLASSES.find((primaryClass: PrimaryClass) => primaryClass.name === charClass)
    });
  } else {
    return Object.assign({}, state, {
      currentClass: CHARACTER_CLASSES.find((primaryClass: PrimaryClass) => primaryClass.name === charClass)
    });
  }
}

function changeRace(state: CharacterBuildState, targetRace: string): CharacterBuildState {
  const race = ALL_RACES.find((r: Race) => r.name === targetRace);
  const currentRace = state.race;

  if (!race) {
    return state;
  }
  let attributes: CharacterAttribute[] = state.attributes;
  let newRace;
  if (currentRace && currentRace.name === targetRace) {
    newRace = null;
    attributes = updateAttributes(attributes, [0, 0, 0, 0, 0, 0]);
  } else {
    newRace = race;
    attributes = updateAttributes(attributes, race.attributes);
  }

  const skills = state.skills
    .map((skill: Skill) => Object.assign({}, skill, { value: 0 }));

  return Object.assign({}, state, { attributes, availablePoints: 27, skills, race: newRace });
}

function getModifier(n: number): number {
  return Math.floor(n / 2) - 5;
}

function attributeValue(n: number): number {
  const modifier = getModifier(n);
  if (modifier <= 0) {
    return 1;
  }

  return modifier * 2;
}

function increaseAttribute(state: CharacterBuildState, attribute: AttributeName): CharacterBuildState {
  const idx = state.attributes.findIndex((a: CharacterAttribute) => a.full === attribute);
  const attributes = state.attributes.slice();
  const availablePoints = state.availablePoints;

  if (idx === -1) {
    return state;
  }

  const attr = attributes[idx];
  const cost = attributeValue(attr.value + 1);

  if (cost > availablePoints) {
    return state;
  }

  attributes[idx] = Object.assign({}, attr, { value: attr.value + 1, modifier: getModifier(attr.value + 1) });

  const skills = updateSkills(state.skills, attribute, attributes[idx].modifier);
  return Object.assign({}, state, { attributes, availablePoints: availablePoints - cost, skills });
}

function updateSkills(skills: Skill[], attribute: AttributeName, value: number): Skill[] {
  const copy = skills.slice()
  for (const skill of copy) {
    if (skill.relatedAttribute === attribute) {
      skill.value = value;
    }
  }
  return copy;
}

function decreaseAttribute(state: CharacterBuildState, attribute: AttributeName): CharacterBuildState {
  const idx = state.attributes.findIndex((a: CharacterAttribute) => a.full === attribute);
  const attributes = state.attributes.slice();
  const availablePoints = state.availablePoints;
  
  if (idx === -1) {
    return state;
  }

  const attr = attributes[idx];
  const refund = attributeValue(attr.value - 1);

  attributes[idx] = Object.assign({}, attr, { value: attr.value - 1, modifier: getModifier(attr.value - 1) });
  const skills = updateSkills(state.skills, attribute, attributes[idx].modifier);

  return Object.assign({}, state, { attributes, availablePoints: availablePoints + refund, skills });  
}

function resetPoints(state: CharacterBuildState): CharacterBuildState {
  const { race } = state;
  if (race === null) {
    return state;
  } else {
    return changeRace(state, race.name);
  } 
}

function trainSkill(state: CharacterBuildState, skillName: SkillName): CharacterBuildState {
  const idx = state.skills.findIndex((s: Skill) => s.name === skillName);
  if (idx === -1) {
    return state;
  }
  const skills = state.skills.slice();
  const skill = skills[idx];
  let value = skill.value;
  if (skill.isProficient) {
    value -= 2;
  } else {
    value += 2;
  }

  skills[idx] = Object.assign({}, skill, { value, isProficient: !skill.isProficient });  

  return Object.assign({}, state, { skills });
}

function activateAttribute(state: CharacterBuildState, attribute: AttributeName): CharacterBuildState {
  const { activeAttribute } = state;

  if (activeAttribute && activeAttribute === attribute) {
    return Object.assign({}, state, { activeAttribute: null });
  } else {
    return Object.assign({}, state, { activeAttribute: attribute });
  }
}

function selectSubClass(state: CharacterBuildState, subClass: SubClass): CharacterBuildState {
  if (!state.currentSubClass || state.currentSubClass.id !== subClass.id) {
    return Object.assign({}, state, { currentSubClass: subClass })
  }

  return Object.assign({}, state, { currentSubClass: null });
}

export function characterBuilder(state: CharacterBuildState, action: AnyAction): CharacterBuildState {
  if (typeof state === 'undefined') {
    return initialState;
  }
  console.log(state);
  switch (action.type) {
    case 'RESET_POINTS': return resetPoints(state);
    case 'CHANGE_RACE': return changeRace(state, action.race);
    case 'ATTR_INC': return increaseAttribute(state, action.attribute);
    case 'ATTR_DEC': return decreaseAttribute(state, action.attribute);
    case 'TRAIN_SKILL': return trainSkill(state, action.skill);
    case 'UNTRAIN_SKILL': return trainSkill(state, action.skill);
    case 'ACTIVATE_ATTR': return activateAttribute(state, action.attribute);
    case 'SELECT_CLASS': return updateClass(state, action.charClass);
    case 'SELECT_SUBCLASS': return selectSubClass(state, action.subClass);
    default:
      return state;
  }

}