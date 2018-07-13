import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import { AppState, CharacterAttribute, AttributeName } from '../../../typings';

import './CharacterSummary.css';
import { increaseAttribute, decreaseAttribute } from '../../../character-builder/actions';
import SkillList from './SkillList';


interface CharacterSummaryProps extends RouteComponentProps<{ ability: string }> {
  abilities: CharacterAttribute[];
  activeAbility: AttributeName | null;
}

interface CharacterSummaryDispatch {
  incrementAbility(activeAbility: string | null): void;
  decrementAbility(activeAbility: string | null): void;
}

class CharacterSummary extends React.Component<CharacterSummaryProps & CharacterSummaryDispatch, {}> {
  public render() {
    const activeAbility = this.props.activeAbility;
    const { incrementAbility, decrementAbility } = this.props;
    const abilities = this.props.abilities.map((ability: CharacterAttribute, key: number) => {
      const className = ability.full === activeAbility ? 'ability active-ability' : 'ability';
      return (
        <div key={key} className={className}>
          <Link to={`/abilities/${ability.full.toLowerCase()}`}>
            <div className='god-dammit'>
              <span className='ability-short'>{ability.short.toUpperCase()}</span>
              <span>{ability.value}</span>
              <span className='ability-modifier'>({ability.modifier})</span>
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
          <h3>Skills</h3>
          <SkillList />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, props: RouteComponentProps<{ ability: string }>): CharacterSummaryProps => {
  const abilities = state.characterBuilder.attributes;
  const activeAbility = abilities.find((attr: CharacterAttribute) => {
    return props.location.pathname.includes(attr.full.toLowerCase());
  });

  return {
    abilities,
    activeAbility: (activeAbility ? activeAbility.full as AttributeName : null),
    ...props
  };
}

const dispatcher = (dispatch: Dispatch<AppState>, props: CharacterSummaryProps): CharacterSummaryDispatch => {
  return {
    incrementAbility(activeAbility: string | null) {
      dispatch(increaseAttribute(activeAbility));
    },

    decrementAbility(activeAbility: string | null) {
      dispatch(decreaseAttribute(activeAbility));
    }
  }
}

export default connect(mapStateToProps, dispatcher)(CharacterSummary);

