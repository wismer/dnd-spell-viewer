import * as React from 'react';
import { CharacterAbilityScore, AbilityName, AppState } from '../../../typings';
import { Link } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';


interface AbilityProps {
  path: string;
  value: number;
  className: string;
  modifier: number;
  name: string;
  onClick(event: React.MouseEvent<HTMLElement>): void;
}

function Ability(props: AbilityProps & React.Props<any>) {
  const modifier = props.modifier > -1 ? `+${props.modifier}` : props.modifier;
  return (
    <div onClick={props.onClick} key={props.name} className={props.className}>
      <Link className='char-field-editable' to={props.path}>
        <div className='god-dammit'>
          <span className='ability-short'>{props.name.toUpperCase()}</span>
          <span>{props.value}</span>
          <span className='ability-modifier'>({modifier})</span>
        </div>
      </Link>
    </div>
  );
}

interface AbilityBarProps {
  abilities: CharacterAbilityScore[];
}

interface AbilityBarDispatch {
  changeAbilityScore(ability: AbilityName, value: number): void;
}

interface AbilityBarState {
  activeAbility: number;
}

class AbilityBar extends React.Component<AbilityBarProps & AbilityBarDispatch, AbilityBarState> {
  public currentAbility: React.RefObject<HTMLInputElement>;
  constructor(props: AbilityBarProps & AbilityBarDispatch) {
    super(props);

    this.state = { activeAbility: -1 };
    this.currentAbility = React.createRef();
  }

  public selectAbility = (abilityIdx: number) => {
    console.log(this.refs);
    this.setState({ activeAbility: abilityIdx === this.state.activeAbility ? -1 : abilityIdx });
  }


  public render() {
    const activeAbility = this.state.activeAbility;
    const abilities = this.props.abilities.map((ability: CharacterAbilityScore, idx: number) => {
      const className = idx === activeAbility ? 'ability active-field' : 'ability';
      const value = ability.baseValue + ability.playerBonus + ability.racialBonus;
      const modifier = Math.floor((value - 10) / 2);                                                                                                                                                                                                                                                                                      

      return (
        <Ability
          key={ability.short}
          name={ability.short}
          path={`/abilities/${ability.full.toLowerCase()}`}
          className={className}
          value={value}
          modifier={modifier}
          onClick={this.selectAbility.bind(this, idx)}
        />
      );
    });

    return (
      <div id='character-abilities' className='character-panel'>
        {abilities}
      </div>
    );
  }
}

function getProps(state: AppState): AbilityBarProps {
  return {
    abilities: state.characterBuilder.abilityScores,
  };
}

function dispatchers(dispatch: Dispatch<AppState>): AbilityBarDispatch {
  return {
    changeAbilityScore() {
      dispatch({ type: 'dfdsfsdf' });
    }
  };
}

export default connect(getProps, dispatchers)(AbilityBar);