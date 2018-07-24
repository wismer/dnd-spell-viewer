import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import { AppState, CharacterAbilityScore, AbilityName, Race } from '../../../typings';

import './CharacterSummary.css';
import { increaseAbility, decreaseAbility, changeLevel } from '../../../character-builder/actions';
import SkillList from './SkillList';


interface CharacterSummaryProps extends RouteComponentProps<{ ability: string }> {
  abilities: CharacterAbilityScore[];
  race: Race | null;
  activeAbility: AbilityName | null;
  availablePoints: number;
  level: number;
  currentClassName: string | null;
  selectedClassField: boolean;
}

interface CharacterSummaryDispatch {
  incrementAbility(activeAbility: string | null): void;
  decrementAbility(activeAbility: string | null): void;
  changeLevel(value: number): void;
}

interface CharacterSummaryState {
  showLevelChanger: boolean;
}

class CharacterSummary extends React.Component<CharacterSummaryProps & CharacterSummaryDispatch, CharacterSummaryState> {
  public constructor(props: CharacterSummaryProps & CharacterSummaryDispatch) {
    super(props);
    this.state = {
      showLevelChanger: false
    };

    this.toggleLevelChanger = this.toggleLevelChanger.bind(this);
  }

  public toggleLevelChanger(event: React.MouseEvent<HTMLElement>) {
    this.setState({ showLevelChanger: !this.state.showLevelChanger });
  }

  public render() {
    const { activeAbility, incrementAbility, decrementAbility, race, currentClassName, level } = this.props;
    const levelChangerPanelClassName = this.state.showLevelChanger ? 'level-changer' : 'level-changer-inactive';
    const characterClassName = this.props.selectedClassField ? 'char-field active-field char-class' : 'char-field char-class';
    const abilities = this.props.abilities.map((ability: CharacterAbilityScore, key: number) => {
      const className = ability.full === activeAbility ? 'ability active-field' : 'ability';
      let value = ability.value;

      if (race) {
        value += race.abilityScores[key];
      }

      const modifier = Math.floor((value - 10) / 2);

      return (
        <div key={key} className={className}>
          <Link className='char-field-editable' to={`/abilities/${ability.full.toLowerCase()}`}>
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
        <div id='character-abilities' className='character-panel'>
          <button onClick={incrementAbility.bind(null, activeAbility)} className='ability-change' id='ability-inc'>+</button>
          <button onClick={decrementAbility.bind(null, activeAbility)} className='ability-change' id='ability-dec'>-</button>
          {abilities}
        </div>

        <div id='character-stats' className='character-panel'>
          <li className={characterClassName}>
            <Link className='char-field-editable' to='/classes/cleric'>{currentClassName}</Link>
          </li>
          <li onClick={this.toggleLevelChanger} className='char-field char-level'>
            Level {level}
          </li>
          <li className={levelChangerPanelClassName}>
            <button className='field-change level-changer-inc'>+</button>
            <button className='field-change level-changer-dec'>-</button>
          </li>
          <li/>
          <li/>
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
  let activeAbility = null;
  let selectedClassField = false;
  const currentPath = props.location.pathname;

  if (currentPath.includes('classes')) {
    selectedClassField = true;
  } else if (currentPath.includes('abilities')) {
    activeAbility = abilities.find((attr: CharacterAbilityScore) => {
      return props.location.pathname.includes(attr.full.toLowerCase());
    });
  }
  const currentPrimaryClass = state.characterBuilder.currentClass;
  const currentSubClass = state.characterBuilder.currentSubClass;
  let currentClassName = null;
  if (currentPrimaryClass && currentSubClass) {
    currentClassName = `${currentSubClass.name} ${currentPrimaryClass.name}`;
  } else if (currentPrimaryClass) {
    currentClassName = currentPrimaryClass.name;
  }

  return {
    abilities,
    race: state.characterBuilder.race,
    activeAbility: (activeAbility ? activeAbility.full as AbilityName : null),
    availablePoints: state.characterBuilder.availablePoints,
    level: state.characterBuilder.level,
    currentClassName,
    selectedClassField,
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
    },

    changeLevel(value: number) {
      dispatch(changeLevel(value));
    }
  }
}

export default connect(mapStateToProps, dispatcher)(CharacterSummary);

