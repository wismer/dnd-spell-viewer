import { AnyAction } from "redux";
import { AbilityName, SkillName, PrimaryClassChoice } from "../typings";


export function changeRace(race: string): AnyAction {
  return {
    type: 'CHANGE_RACE',
    race
  };
}

export function deselectRace(): AnyAction {
  return { type: 'CHANGE_RACE', race: null };
}

export function increaseAbility(path: string | null): AnyAction {
  return { type: 'ABILITY_INC', path };
}

export function decreaseAbility(path: string | null): AnyAction {
  return { type: 'ABILITY_DEC', path };
}

export function trainSkill(skill: SkillName): AnyAction {
  return { type: 'TRAIN_SKILL', skill };
}

export function changeSpotlight(className: string): AnyAction {
  return { type: 'CHANGE_SPOTLIGHT', className };
}

export function activateAbility(ability: AbilityName): AnyAction {
  return {
    type: 'ACTIVATE_ATTR',
    ability
  };
}

export function selectClass(charClass: PrimaryClassChoice): AnyAction {
  return {
    type: 'SELECT_CLASS',
    charClass
  };
}



/*
   case 'ATTR_INC': return increaseAttribute(state, action.attribute);
    case 'ATTR_DEC': return decreaseAttribute(state, action.attribute);
    case 'TRAIN_SKILL': return trainSkill(state, action.skill, true);
    case 'UNTRAIN_SKILL': return trainSkill(state, action.skillName, false);
 

*/
