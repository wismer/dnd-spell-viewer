import { AnyAction } from "redux";
import { AttributeName, SkillName, PrimaryClassChoice } from "../typings";


export function changeRace(race: string): AnyAction {
  return {
    type: 'CHANGE_RACE',
    race
  };
}

export function deselectRace(): AnyAction {
  return { type: 'CHANGE_RACE', race: null };
}

export function increaseAttribute(attribute: AttributeName): AnyAction {
  return { type: 'ATTR_INC', attribute };
}

export function decreaseAttribute(attribute: AttributeName): AnyAction {
  return { type: 'ATTR_DEC', attribute };
}

export function trainSkill(skill: SkillName): AnyAction {
  return { type: 'TRAIN_SKILL', skill };
}

export function activateAttribute(attribute: AttributeName): AnyAction {
  return {
    type: 'ACTIVATE_ATTR',
    attribute
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
