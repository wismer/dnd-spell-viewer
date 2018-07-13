import * as React from 'react';
import { connect } from 'react-redux';
import { AbilityName, SkillName, CharacterAbilityScore, Race, Skill, AppState } from '../../typings';
import { Dispatch } from 'redux';
import { changeRace, increaseAbility, decreaseAbility, trainSkill, changeSpotlight } from '../../character-builder/actions';
import { ALL_RACES } from '../../character-builder/constants';
import './CharacterBuilder.css';


interface CharacterBuilderContainerDispatch {
  changeAbilityScore(abilityScore: AbilityName, increase: boolean): void;
  changeRace(race: string): void;
  trainSkill(skill: SkillName): void;
  changeSpotlight(className: string): void;
}

interface CharacterBuilderContainerProps {
  races: Race[];
  skills: Skill[];
  activeSpotlight: string | null;
  race: Race | null;
  availablePoints: number;
  abilityScores: CharacterAbilityScore[];
}

type CharacterBuilderProps = CharacterBuilderContainerDispatch & CharacterBuilderContainerProps;

class CharacterBuilderContainer extends React.Component<CharacterBuilderProps, {}> {
  public render() {
    return (
      <div className='char-builder-container'>
        blergh
      </div>
    );
  }
}



const DispatchProps = (dispatch: Dispatch<AppState>): CharacterBuilderContainerDispatch => {
  return {
    changeAbilityScore(abilityScore: AbilityName, increase: boolean) {
      if (increase) {
        dispatch(increaseAbility('a'));
      } else {
        dispatch(decreaseAbility('a'));
      }
    },

    changeRace(race: string) {
      dispatch(changeRace(race));
    },

    trainSkill(skill: SkillName) {
      dispatch(trainSkill(skill));
    },

    changeSpotlight(className: string) {
      dispatch(changeSpotlight(className));
    }
  };
}

const containerProps = (state: AppState): CharacterBuilderContainerProps => {
  return {
    races: ALL_RACES,
    race: state.characterBuilder.race,
    skills: state.characterBuilder.skills,
    abilityScores: state.characterBuilder.abilityScores,
    availablePoints: state.characterBuilder.availablePoints,
    activeSpotlight: state.characterBuilder.activeSpotlight
  };
}

export default connect(containerProps, DispatchProps)(CharacterBuilderContainer);