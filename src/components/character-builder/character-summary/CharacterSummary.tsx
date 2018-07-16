import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import { AppState, CharacterAbilityScore, AbilityName, Race } from '../../../typings';

import './CharacterSummary.css';
import { increaseAbility, decreaseAbility } from '../../../character-builder/actions';
import SkillList from './SkillList';


interface CharacterSummaryProps extends RouteComponentProps<{ ability: string }> {
  abilities: CharacterAbilityScore[];
  race: Race | null;
  activeAbility: AbilityName | null;
  availablePoints: number;
}

interface CharacterSummaryDispatch {
  incrementAbility(activeAbility: string | null): void;
  decrementAbility(activeAbility: string | null): void;
}

class CharacterSummary extends React.Component<CharacterSummaryProps & CharacterSummaryDispatch, {}> {
  public render() {
    const activeAbility = this.props.activeAbility;
    const { incrementAbility, decrementAbility, race } = this.props;
    const abilities = this.props.abilities.map((ability: CharacterAbilityScore, key: number) => {
      const className = ability.full === activeAbility ? 'ability active-ability' : 'ability';
      let value = ability.value;

      if (race) {
        value += race.abilityScores[key];
      }

      const modifier = Math.floor((value - 10) / 2);

      return (
        <div key={key} className={className}>
          <Link to={`/abilities/${ability.full.toLowerCase()}`}>
            <div className='god-dammit'>
              <span className='ability-short'>{ability.short.toUpperCase()}</span>
              <span>{value}</span>
              <span className='ability-modifier'>({modifier})</span>
            </div>
          </Link>
        </div>
      );
    });

    return (
      <div id='character-summary'>
        <div id='ability-character'>
          <button onClick={incrementAbility.bind(null, activeAbility)} className='ability-change' id='ability-inc'>+</button>
          <button onClick={decrementAbility.bind(null, activeAbility)} className='ability-change' id='ability-dec'>-</button>
          {abilities}
        </div>
        
        <section id='skills'>
          <h3>Skills points remaining {this.props.availablePoints}</h3>
          <SkillList />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, props: RouteComponentProps<{ ability: string }>): CharacterSummaryProps => {
  const abilities = state.characterBuilder.abilityScores;
  const activeAbility = abilities.find((attr: CharacterAbilityScore) => {
    return props.location.pathname.includes(attr.full.toLowerCase());
  });
  console.log(abilities);
  return {
    abilities,
    race: state.characterBuilder.race,
    activeAbility: (activeAbility ? activeAbility.full as AbilityName : null),
    availablePoints: state.characterBuilder.availablePoints,
    ...props
  };
}

const dispatcher = (dispatch: Dispatch<AppState>, props: CharacterSummaryProps): CharacterSummaryDispatch => {
  return {
    incrementAbility(activeAbility: string | null) {
      dispatch(increaseAbility(activeAbility));
    },

    decrementAbility(activeAbility: string | null) {
      dispatch(decreaseAbility(activeAbility));
    }
  }
}

export default connect(mapStateToProps, dispatcher)(CharacterSummary);

