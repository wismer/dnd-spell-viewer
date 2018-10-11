import { CharacterBuildState, Race, CharacterAbilityScore, AbilityName, Skill, SkillName, PrimaryClassChoice, PrimaryClass, SubClass } from '../typings';
import { ALL_RACES, CHARACTER_CLASSES, SUBCLASSES } from './constants';
import { AnyAction } from 'redux';

// 'Medicine' | 'Insight' | 'Persuasion' | 'Religion' | 'Athletics' | 'Sleight of Hand' | 'Stealth' | 'Nature' | 'Animal Handling' | 'Survival' | 'Deception' | 'Performance'

const initialState: CharacterBuildState = {
  characterName: 'Gimli Strom',
  alignment: 'Neutral (undecided)',
  abilityScores: [
    { short: 'str', full: 'strength', playerBonus: 0, racialBonus: 0, baseValue: 8, modifier: -1 },
    { short: 'wis', full: 'wisdom', playerBonus: 0, racialBonus: 0, baseValue: 8, modifier: -1 },
    { short: 'int', full: 'intelligence', playerBonus: 0, racialBonus: 0, baseValue: 8, modifier: -1 },
    { short: 'cha', full: 'charisma', playerBonus: 0, racialBonus: 0, baseValue: 8, modifier: -1 },
    { short: 'con', full: 'constitution', playerBonus: 0, racialBonus: 0, baseValue: 8, modifier: -1 },
    { short: 'dex', full: 'dexterity', playerBonus: 0, racialBonus: 0, baseValue: 8, modifier: -1 },
  ],
  proficiencies: [],
  activeSpotlight: null,
  race: null,
  availablePoints: 27,
  level: 1,
  skills: [
    {
      name: 'Acrobatics',
      relatedAbility: 'dexterity',
      value: -1,
      isProficient: false
    },
    {
      name: 'Animal Handling',
      relatedAbility: 'wisdom',
      value: -1,
      isProficient: true
    },
    {
      name: 'Arcana',
      relatedAbility: 'intelligence',
      value: -1,
      isProficient: false
    },
    {
      name: 'Athletics',
      relatedAbility: 'strength',
      value: -1,
      isProficient: false
    },
    {
      name: 'Deception',
      relatedAbility: 'charisma',
      value: -1,
      isProficient: false
    },
    {
      name: 'History',
      relatedAbility: 'intelligence',
      value: -1,
      isProficient: true
    },
    {
      name: 'Insight',
      relatedAbility: 'wisdom',
      value: -1,
      isProficient: false
    },
    {
      name: 'Intimidation',
      relatedAbility: 'strength',
      value: -1,
      isProficient: false
    },
    {
      name: 'Investigation',
      relatedAbility: 'intelligence',
      value: -1,
      isProficient: true
    },
    {
      name: 'Medicine',
      relatedAbility: 'wisdom',
      value: -1,
      isProficient: false
    },
    {
      name: 'Nature',
      relatedAbility: 'wisdom',
      value: -1,
      isProficient: false
    },
    {
      name: 'Perception',
      relatedAbility: 'wisdom',
      value: -1,
      isProficient: false
    },
    {
      name: 'Performance',
      relatedAbility: 'charisma',
      value: -1,
      isProficient: false
    },
    {
      name: 'Persuasion',
      relatedAbility: 'charisma',
      value: -1,
      isProficient: false
    },
    {
      name: 'Religion',
      relatedAbility: 'intelligence',
      value: -1,
      isProficient: false
    },
    {
      name: 'Sleight of Hand',
      relatedAbility: 'dexterity',
      value: -1,
      isProficient: false
    },
    {
      name: 'Stealth',
      relatedAbility: 'dexterity',
      value: -1,
      isProficient: false
    },
    {
      name: 'Survival',
      relatedAbility: 'wisdom',
      value: -1,
      isProficient: false
     }

  ],
  activeAbility: null,
  currentClass: CHARACTER_CLASSES[0],
  currentSubClass: SUBCLASSES[0]
};

// function updateAbilityScores(abilityScores: CharacterAbilityScore[], values: number[]): CharacterAbilityScore[] {
//   return abilityScores
//     .map((attr: CharacterAbilityScore, idx: number) => Object.assign({}, attr, { value: 8 + values[idx] }))
//     .map((attr: CharacterAbilityScore, idx: number) => Object.assign({}, attr, { modifier: getModifier(attr.value) }));
// }

interface AbilityFnReturn {
  availablePoints: number,
  abilityScores: CharacterAbilityScore[]
};

interface AbilityFunctor {
  changeValueBy: (fn: (ability: CharacterAbilityScore) => boolean, step: number) => AbilityFunctor;
  updateModifiers: () => AbilityFunctor;
  toValue: () => AbilityFnReturn;
}

function AbilityScoreFn(abilityScores: CharacterAbilityScore[], pts: number): AbilityFunctor {
  return {
    updateModifiers: () => {
      const scores = abilityScores.map((score: CharacterAbilityScore) => {
        // score.modifier = getModifier(score.value);
        return score;
      });

      return AbilityScoreFn(scores, pts);
    },

    changeValueBy: (fn: (ability: CharacterAbilityScore) => boolean, step: number) => {
      const idx = abilityScores.findIndex(fn);
      let ability = abilityScores[idx];
      const value = ability.baseValue + ability.playerBonus;
      let pointsAvailable = pts;
      const [prevCost, cost] = abilityScoreCost([value, value + step]);
      
      if (step === 1) {
        pointsAvailable -= cost - prevCost;
      } else {
        pointsAvailable += Math.abs(prevCost - cost);
      }

      if (value + step < 8 || value + step > 15 || pointsAvailable < 0) {
        return AbilityScoreFn(abilityScores, pts);
      }

      ability = Object.assign({}, ability, { playerBonus: ability.playerBonus + step });
      abilityScores = Object.assign([], abilityScores, { [idx]: ability });
      return AbilityScoreFn(abilityScores, pointsAvailable);
    },

    toValue: () => {
      return { abilityScores, availablePoints: pts };
    }
  };
}

interface SkillFunctor {
  updateModifiers: (abilityScores: CharacterAbilityScore[]) => SkillFunctor;
  toggleSkill: (fn: (skill: Skill) => boolean) => SkillFunctor;
  toValue: () => Skill[];
}

function SkillFn(skills: Skill[]): SkillFunctor {
  return {
    updateModifiers: (abilityScores: CharacterAbilityScore[]) => {
      return SkillFn(
        skills.map((skill: Skill) => {
          const ability = abilityScores.find((score: CharacterAbilityScore) => score.full === skill.relatedAbility) as CharacterAbilityScore;
          skill.value = ability.modifier + (skill.isProficient ? 2 : -2);
          return skill;
        })
      )
    },

    toggleSkill: (fn: (skill: Skill) => boolean) => {
      return SkillFn(
        skills.map((skill: Skill) => {
          if (fn(skill)) {
            skill.isProficient = !skill.isProficient;
          }

          return skill;
        })
      )
    },

    toValue: () => skills
  }
}

/*
  scores
    .increase(stat => state.name === thing)
    
*/ 

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

  const { abilityScores } = AbilityScoreFn(state.abilityScores, state.availablePoints)
    .updateModifiers()
    .toValue()

  

  let skills = SkillFn(state.skills)
  let bonusSkills = race.bonusSkills;
  let currentBonusSkills: SkillName[] = [];


  if (currentRace && currentRace.name !== targetRace) {
    currentBonusSkills = currentRace.bonusSkills;
  }

  bonusSkills = bonusSkills.concat(currentBonusSkills);

  for (const bonusSkill of bonusSkills) {
    skills = skills.toggleSkill((skill: Skill) => skill.name === bonusSkill);
  }

  const updatedSkills = skills
    .updateModifiers(abilityScores)
    .toValue();

  return Object.assign({}, state, { race, skills: updatedSkills, abilityScores });
}


function abilityScoreCost(scores: number[]): number[] {
  return scores.map((n: number) => {
    if (n <= 13) {
      return n - 8;
    } else if (n === 14) {
      return 7;
    } else {
      return 9;
    }
  });
}

// function updateSkills(skills: Skill[], ability: AbilityName, value: number): Skill[] {
//   const copy = skills.slice()
//   for (const skill of copy) {
//     if (skill.relatedAbility === ability) {
//       skill.value = value;
//     }
//   }

//   return copy;
// }

// function updateSkill(skill: Skill): Skill {
//   let value = skill.value;
//   if (skill.isProficient) {
//     value -= 2;
//   } else {
//     value += 2;
//   }

//   return Object.assign({}, skill, { value, isProficient: !skill.isProficient });
// }

function changeAbilityScore(state: CharacterBuildState, abilityScore: string | null, step: number): CharacterBuildState {
  return state;

  // const beforeValues = state.abilityScores.map((score: CharacterAbilityScore) => score.value);
  // const beforePts = state.availablePoints;
  // const { abilityScores, availablePoints } = AbilityScoreFn(state.abilityScores, state.availablePoints)
  //   .changeValueBy((ability: CharacterAbilityScore) => ability.full === abilityScore, step) // apply the change. won't alter if there are not enough points or go out of bounds
  //   .updateModifiers() // *then* update the modifiers with the racial bonuses included
  //   .toValue(); // finally return the values and points remaining.
  
  // const afterValues = abilityScores.map((score: CharacterAbilityScore) => score.value);

  // console.log({ beforeValues, afterValues, beforePts });
  // return Object.assign({}, state, { abilityScores, availablePoints });
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

// function updateProficiencies(proficiencies: string[]): CharacterBuildState => {

// }

function selectSubClass(state: CharacterBuildState, subClass: SubClass): CharacterBuildState {
  if (!state.currentSubClass || state.currentSubClass.id !== subClass.id) {

    return Object.assign({}, state, { currentSubClass: subClass })
  }

  return Object.assign({}, state, { currentSubClass: null });
}

function changeSpotlight(state: CharacterBuildState, className: string): CharacterBuildState {
  return Object.assign({}, state, { activeSpotlight: className });
}

function updateLevel(state: CharacterBuildState, level: number): CharacterBuildState {
  return Object.assign({}, state, { level });
}

function changeName(state: CharacterBuildState, characterName: string): CharacterBuildState {
  if (state.characterName !== characterName) {
    return Object.assign({}, state, { characterName });
  }

  return state;
}

// function calculateAbilityScoreCost(state: CharacterBuildState, index: number, step: number): number {
//   const ability = state.abilityScores[index];
//   const racialBonus = state.race ? state.race.abilityScores : [0, 0, 0, 0, 0, 0];
//   const value = ability.value - racialBonus[index];
//   console.log({ value: ability.value, afterChange: value });
//   const prevCost = abilityScoreCost(value);
//   const cost = abilityScoreCost(value + step);
//   let availablePoints = state.availablePoints;
//   if (step === 1) {
//     availablePoints -= cost - prevCost;
//   } else {
//     availablePoints += Math.abs(prevCost - cost);
//   }

//   return availablePoints;
// }

export function characterBuilder(state: CharacterBuildState, action: AnyAction): CharacterBuildState {
  if (typeof state === 'undefined') {
    return initialState;
  }

  console.log(action, state);

  switch (action.type) {
    case 'RESET_POINTS': return resetPoints(state);
    case 'CHANGE_RACE': return changeRace(state, action.race);
    case 'ABILITY_INC': return changeAbilityScore(state, action.path, 1);
    case 'ABILITY_DEC': return changeAbilityScore(state, action.path, -1);
    case 'TRAIN_SKILL': return trainSkill(state, action.skill);
    case 'UNTRAIN_SKILL': return trainSkill(state, action.skill);
    case 'ACTIVATE_ABILITY': return activateAbility(state, action.abilityScore);
    case 'SELECT_CLASS': return updateClass(state, action.charClass);
    case 'CHANGE_LEVEL': return updateLevel(state, action.level);
    case 'CHANGE_NAME': return changeName(state, action.name);
    case 'SELECT_SUBCLASS': return selectSubClass(state, action.subClass);
    case 'CHANGE_SPOTLIGHT': return changeSpotlight(state, action.className);
    default:
      return state;
  }
}