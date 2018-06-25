import * as React from 'react';
import { connect } from 'react-redux';
import { AttributeName, SkillName, CharacterAttribute, Race, Skill, AppState } from '../../typings';
import { Dispatch } from 'redux';
import { changeRace, increaseAttribute, decreaseAttribute, trainSkill } from '../../character-builder/actions';
import { ALL_RACES } from '../../character-builder/constants';
import SkillList from './SkillList';
import AttributeList from './AttributeList';
import './CharacterBuilder.css';

interface CharacterBuilderContainerDispatch {
  changeAttribute(attribute: AttributeName, increase: boolean): void;
  changeRace(race: string): void;
  trainSkill(skill: SkillName): void;
}

interface CharacterBuilderContainerProps {
  races: Race[];
  skills: Skill[];
  race: Race | null;
  availablePoints: number;
  attributes: CharacterAttribute[];
}

type CharacterBuilderProps = CharacterBuilderContainerDispatch & CharacterBuilderContainerProps;


class CharacterBuilderContainer extends React.Component<CharacterBuilderProps, {}> {
  public render() {
    const races = this.props.races.map((race: Race, idx: number) => {
      const onClick = this.props.changeRace.bind(null, race.name);
      return (
        <li onClick={onClick} className='race-item' key={idx}>
          <div>{race.name}</div>
        </li>
      );
    });
    return (
      <div className='char-builder-container'>
        <AttributeList>
          <div className='attr-panel'>
            <div>
              <i className='fas fa-plus'/>
            </div>
            <div>
              <i className='fas fa-minus'/>
            </div>
          </div>
        </AttributeList>

        <div id='races'>
          {races}
        </div>

        <SkillList />
        <div id='equipment' />
      </div>
    );
  }
}



const DispatchProps = (dispatch: Dispatch<AppState>): CharacterBuilderContainerDispatch => {
  return {
    changeAttribute(attribute: AttributeName, increase: boolean) {
      if (increase) {
        dispatch(increaseAttribute(attribute));
      } else {
        dispatch(decreaseAttribute(attribute));
      }
    },

    changeRace(race: string) {
      dispatch(changeRace(race));
    },

    trainSkill(skill: SkillName) {
      dispatch(trainSkill(skill));
    }
  };
}

const containerProps = (state: AppState): CharacterBuilderContainerProps => {
  return {
    races: ALL_RACES,
    race: state.characterBuilder.race,
    skills: state.characterBuilder.skills,
    attributes: state.characterBuilder.attributes,
    availablePoints: state.characterBuilder.availablePoints
  };
}

export default connect(containerProps, DispatchProps)(CharacterBuilderContainer);