import { CharacterBuildState, Race, CharacterAbilityScore, AbilityName, Skill, SkillName, PrimaryClassChoice, PrimaryClass, SubClass } from '../typings';
import { ALL_RACES, CHARACTER_CLASSES } from './constants';
import { AnyAction } from 'redux';

// 'Medicine' | 'Insight' | 'Persuasion' | 'Religion' | 'Athletics' | 'Sleight of Hand' | 'Stealth' | 'Nature' | 'Animal Handling' | 'Survival' | 'Deception' | 'Performance'

const initialState: CharacterBuildState = {
  abilityScores: [
    { short: 'str', full: 'strength', value: 8, modifier: -1 },
    { short: 'wis', full: 'wisdom', value: 8, modifier: -1 },
    { short: 'int', full: 'intelligence', value: 8, modifier: -1 },
    { short: 'cha', full: 'charisma', value: 8, modifier: -1 },
    { short: 'con', full: 'constitution', value: 8, modifier: -1 },
    { short: 'dex', full: 'dexterity', value: 8, modifier: -1 },
  ],
  activeSpotlight: null,
  race: null,
  availablePoints: 27,
  skills: [
    { name: 'Acrobatics', relatedAbility: 'dexterity', value: 0, isProficient: false },
    { name: 'Animal Handling', relatedAbility: 'wisdom', value: 0, isProficient: false },
    { name: 'Arcana', relatedAbility: 'intelligence', value: 0, isProficient: false },
    { name: 'Athletics', relatedAbility: 'strength', value: 0, isProficient: false },
    { name: 'Deception', relatedAbility: 'charisma', value: 0, isProficient: false },
    { name: 'History', relatedAbility: 'intelligence', value: 0, isProficient: false },
    { name: 'Insight', relatedAbility: 'wisdom', value: 0, isProficient: false },
    { name: 'Intimidation', relatedAbility: 'strength', value: 0, isProficient: false },
    { name: 'Investigation', relatedAbility: 'intelligence', value: 0, isProficient: false },
    { name: 'Medicine', relatedAbility: 'wisdom', value: 0, isProficient: false },
    { name: 'Nature', relatedAbility: 'wisdom', value: 0, isProficient: false },
    { name: 'Perception', relatedAbility: 'wisdom', value: 0, isProficient: false },
    { name: 'Performance', relatedAbility: 'charisma', value: 0, isProficient: false },
    { name: 'Persuasion', relatedAbility: 'charisma', value: 0, isProficient: false },
    { name: 'Religion', relatedAbility: 'intelligence', value: 0, isProficient: false },
    { name: 'Sleight of Hand', relatedAbility: 'dexterity', value: 0, isProficient: false },
    { name: 'Stealth', relatedAbility: 'dexterity', value: 0, isProficient: false },
    { name: 'Survival', relatedAbility: 'wisdom', value: 0, isProficient: false }

  ],
  activeAbility: null,
  currentClass: null,
  currentSubClass: null
};

function updateAbilityScores(abilityScores: CharacterAbilityScore[], values: number[]): CharacterAbilityScore[] {
  return abilityScores
    .map((attr: CharacterAbilityScore, idx: number) => Object.assign({}, attr, { value: 8 + values[idx] }))
    .map((attr: CharacterAbilityScore, idx: number) => Object.assign({}, attr, { modifier: getModifier(attr.value) }));
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
  let abilityScores: CharacterAbilityScore[] = state.abilityScores;
  let newRace;
  if (currentRace && currentRace.name === targetRace) {
    newRace = null;
    abilityScores = updateAbilityScores(abilityScores, [0, 0, 0, 0, 0, 0]);
  } else {
    newRace = race;
    abilityScores = updateAbilityScores(abilityScores, race.abilityScores);
  }

  const skills = state.skills
    .map((skill: Skill) => Object.assign({}, skill, { value: 0 }));

  return Object.assign({}, state, { abilityScores, availablePoints: 27, skills, race: newRace });
}

function getModifier(n: number): number {
  return Math.floor(n / 2) - 5;
}

function abilityScoreValue(n: number): number {
  const modifier = getModifier(n);
  if (modifier <= 0) {
    return 1;
  }

  return modifier * 2;
}

function updateSkills(skills: Skill[], abilityScore: AbilityName, value: number): Skill[] {
  const copy = skills.slice()
  for (const skill of copy) {
    if (skill.relatedAbility === abilityScore) {
      skill.value = value;
    }
  }
  return copy;
}


function increaseAbilityScore(state: CharacterBuildState, abilityScore: string | null): CharacterBuildState {
  if (!abilityScore) {
    return state;
  }

  const idx = state.abilityScores.findIndex((a: CharacterAbilityScore) => a.full === abilityScore);
  const abilityScores = state.abilityScores.slice();
  const availablePoints = state.availablePoints;

  const attr = abilityScores[idx];
  const cost = abilityScoreValue(attr.value + 1);

  if (cost > availablePoints) {
    return state;
  }

  abilityScores[idx] = Object.assign({}, attr, { value: attr.value + 1, modifier: getModifier(attr.value + 1) });

  const skills = updateSkills(state.skills, abilityScore as AbilityName, abilityScores[idx].modifier);
  return Object.assign({}, state, { abilityScores, availablePoints: availablePoints - cost, skills });
}

function decreaseAbilityScore(state: CharacterBuildState, abilityScore: string | null): CharacterBuildState {
  if (!abilityScore) {
    return state;
  }

  const idx = state.abilityScores.findIndex((a: CharacterAbilityScore) => a.full === abilityScore);
  const abilityScores = state.abilityScores.slice();
  const availablePoints = state.availablePoints;  
  const attr = abilityScores[idx];
  const refund = abilityScoreValue(attr.value - 1);

  abilityScores[idx] = Object.assign({}, attr, { value: attr.value - 1, modifier: getModifier(attr.value - 1) });
  const skills = updateSkills(state.skills, abilityScore as AbilityName, abilityScores[idx].modifier);

  return Object.assign({}, state, { abilityScores, availablePoints: availablePoints + refund, skills });  
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

function activateAbility(state: CharacterBuildState, ability: AbilityName): CharacterBuildState {
  const { activeAbility } = state;

  if (activeAbility && activeAbility === ability) {
    return Object.assign({}, state, { activeAbility: null });
  } else {
    return Object.assign({}, state, { activeAbility: ability });
  }
}

function selectSubClass(state: CharacterBuildState, subClass: SubClass): CharacterBuildState {
  if (!state.currentSubClass || state.currentSubClass.id !== subClass.id) {
    return Object.assign({}, state, { currentSubClass: subClass })
  }

  return Object.assign({}, state, { currentSubClass: null });
}

function changeSpotlight(state: CharacterBuildState, className: string): CharacterBuildState {
  return Object.assign({}, state, { activeSpotlight: className });
}

export function characterBuilder(state: CharacterBuildState, action: AnyAction): CharacterBuildState {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case 'RESET_POINTS': return resetPoints(state);
    case 'CHANGE_RACE': return changeRace(state, action.race);
    case 'ABILITY_INC': return increaseAbilityScore(state, action.path);
    case 'ABILITY_DEC': return decreaseAbilityScore(state, action.path);
    case 'TRAIN_SKILL': return trainSkill(state, action.skill);
    case 'UNTRAIN_SKILL': return trainSkill(state, action.skill);
    case 'ACTIVATE_ABILITY': return activateAbility(state, action.abilityScore);
    case 'SELECT_CLASS': return updateClass(state, action.charClass);
    case 'SELECT_SUBCLASS': return selectSubClass(state, action.subClass);
    case 'CHANGE_SPOTLIGHT': return changeSpotlight(state, action.className);
    default:
      return state;
  }

}