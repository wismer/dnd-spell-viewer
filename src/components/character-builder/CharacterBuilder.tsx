import * as React from 'react';
import { connect } from 'react-redux';
import { AttributeName, SkillName, CharacterAttribute, Race, Skill, AppState } from '../../typings';
import { Dispatch } from 'redux';
import { changeRace, increaseAttribute, decreaseAttribute, trainSkill, changeSpotlight } from '../../character-builder/actions';
import { ALL_RACES } from '../../character-builder/constants';
import './CharacterBuilder.css';

interface CharacterBuilderContainerDispatch {
  changeAttribute(attribute: AttributeName, increase: boolean): void;
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
  attributes: CharacterAttribute[];
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
    changeAttribute(attribute: AttributeName, increase: boolean) {
      if (increase) {
        dispatch(increaseAttribute('a'));
      } else {
        dispatch(decreaseAttribute('a'));
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
    attributes: state.characterBuilder.attributes,
    availablePoints: state.characterBuilder.availablePoints,
    activeSpotlight: state.characterBuilder.activeSpotlight
  };
}

export default connect(containerProps, DispatchProps)(CharacterBuilderContainer);