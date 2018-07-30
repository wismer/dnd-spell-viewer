import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import { AppState, CharacterAbilityScore, AbilityName, Race, Alignment, Skill } from '../../../typings';

import './CharacterSummary.css';
import { increaseAbility, decreaseAbility, changeLevel, updateName } from '../../../character-builder/actions';
// import SkillList from './SkillList';

interface CharacterSummaryProps extends RouteComponentProps<{ ability: string }> {
  abilities: CharacterAbilityScore[];
  race: Race | null;
  activeAbility: AbilityName | null;
  skills: Skill[];
  availablePoints: number;
  level: number;
  currentClassName: string | null;
  selectedClassField: boolean;
  characterName: string;
  alignment: Alignment;
}

interface CharacterSummaryDispatch {
  incrementAbility(activeAbility: string | null): void;
  decrementAbility(activeAbility: string | null): void;
  changeLevel(value: number): void;
  changeName(name: string): void;
}

interface CharacterSummaryState {
  showLevelChanger: boolean;
  currentLevel: number;
}

interface CharacterFieldProps extends React.Props<any> {
  className: string;
  value?: string | null;
  label?: string;
  alignHorizontal?: boolean;
  path?: string;
}

function CharacterField(props: CharacterFieldProps) {
  let content = <div className='field-value'>{props.value}</div>;
  const value = <div className='field-value'>{props.value}</div>;
  const label = <div className='field-label'>{props.label}</div>;

  if (props.children && props.label) {
    content = <>{label}{props.children}</>;
  } else if (props.children) {
    content = <>{props.children}</>;
  } else {
    content = <>{label}{value}</>;
  }

  if (props.path) {
    const anchorClass = props.alignHorizontal ? 'algn-horizontal' : '';
    content = <Link className={anchorClass} to={props.path}>{content}</Link>;
  }

  return (
    <div className={props.className}> 
      {content}
    </div>
  );
}

/*
  things to show....

  there are...

    directly editable fields (user interaction on the character summary)
    indirectly editable fields (by clicking on a component outside of the summary) e.g. change class -> routes to /classes/:class -> click subclass/class
    uneditable fields no interaction


  personal character stuff:
    character name - editable
    level - editable
    class - editable, link
    race - editable, link
    alignment - editable, link (maybe?)
    background (eventually)
    languages - editable
    traits/features ????

  combat specific stuff:
    armor class - non-editable
    saving throws - non-editable
    proficiency bonus - non-editable
    initiative - non-editable
    speed - non-editable
    hit dice - non-editable

  inventory stuff:
    armor - editable, link
    weapons - editable, link
    spells - editable, link

  attribute stuff:
    ability scores - editable, link
    available points for ability scores - non-editable
    skills - editable, link
    passive wisdom - non-editable
*/

interface AbilityProps {
  path: string;
  value: number;
  className: string;
  modifier: number;
  name: string;
}

function Ability(props: AbilityProps) {
  const modifier = props.modifier > -1 ? `+${props.modifier}` : props.modifier;
  return (
    <div key={props.name} className={props.className}>
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

class CharacterSummary extends React.Component<CharacterSummaryProps & CharacterSummaryDispatch, CharacterSummaryState> {
  public nameInput: React.RefObject<HTMLInputElement>;
  public levelInput: React.RefObject<HTMLInputElement>;

  public constructor(props: CharacterSummaryProps & CharacterSummaryDispatch) {
    super(props);
    this.state = {
      showLevelChanger: false,
      currentLevel: props.level
    };

    this.nameInput = React.createRef();
    this.levelInput = React.createRef();
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.unlockLevelEdit = this.unlockLevelEdit.bind(this);
  }

  public unlockLevelEdit(event: React.KeyboardEvent<HTMLElement>) {
    console.log(event, this.nameInput);
  }

  // public shouldComponentUpdate(nextProps: CharacterSummaryProps & CharacterSummaryDispatch, nextState: CharacterSummaryState) {
  //   return nextProps.level !== this.props.level;
  // }

  public handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (this.nameInput.current) {
      this.props.changeName(this.nameInput.current.value);
    }
  }

  public handleLevelChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (this.levelInput.current) {
      this.props.changeLevel(this.levelInput.current.valueAsNumber);
    }
  }

  public focusInput(event: React.MouseEvent<HTMLFormElement>) {
    if (event.currentTarget.id === 'name-form' && this.nameInput.current) {
      this.nameInput.current.focus();
    } else if (event.currentTarget.id === 'level-form' && this.levelInput.current) {
      this.levelInput.current.focus();
    }
  }

  public render() {
    const {
      activeAbility,
      incrementAbility,
      alignment,
      decrementAbility,
      race,
      currentClassName,
      level
    } = this.props;

    const skills = this.props.skills.map((skill: Skill, idx: number) => {
      const path = `/skills#${skill.name.replace(/\s+/g, '-').toLowerCase()}`;
      const className = skill.isProficient ? 'character-field trained-skill label-lg' : 'character-field label-lg';
      const label = `${skill.name} (${skill.relatedAbility})`;
      const value = skill.value > -1 ? `+${skill.value}` : `${skill.value}`;
      return  (
        <CharacterField alignHorizontal={true} className={className} value={value} key={skill.name} label={label} path={path} />
      );
    });

    const abilities = this.props.abilities.map((ability: CharacterAbilityScore, idx: number) => {
      const className = ability.full === activeAbility ? 'ability active-field' : 'ability';
      let value = ability.value;

      if (race) {
        value += race.abilityScores[idx];
      }

      const modifier = Math.floor((value - 10) / 2);

      return <Ability
        key={ability.short}
        name={ability.short}
        path={`/abilities/${ability.full.toLowerCase()}`}
        className={className}
        value={value}
        modifier={modifier}
      />;
    });

    return (
      <div id='character-summary'>
        <div id='character-abilities' className='character-panel'>
          <button onClick={incrementAbility.bind(null, activeAbility)} className='ability-change' id='ability-inc'>+</button>
          <button onClick={decrementAbility.bind(null, activeAbility)} className='ability-change' id='ability-dec'>-</button>
          {abilities}
        </div>

        <div id='character-stats' className='character-panel'/>
        <section id='personal-fields'>

          <CharacterField className='character-field'>
            <form onClick={this.focusInput} id='name-form' onSubmit={this.handleSubmit}>
              <label className='field-label' htmlFor='char-name'>
                Character's Name
              </label>
              <input id='char-name' type='text' defaultValue={this.props.characterName} ref={this.nameInput} />
            </form>
          </CharacterField>

          <CharacterField className='character-field' value={currentClassName} label='Class' path='/classes/cleric' />

          <CharacterField className='character-field'>
            <form onClick={this.focusInput} id='level-form' onSubmit={this.handleLevelChange}>
              <label className='field-label' htmlFor='char-level'>
                LVL
              </label>
              <input id='char-level' min='1' max='20' type='number' ref={this.levelInput} defaultValue={level.toString()} />
            </form>
          </CharacterField>

          <CharacterField className='character-field' value={alignment} label='Alignment' />
          <CharacterField className='character-field' value='Hill Dwarf' label='Race' path='/races/dwarf' />
        </section>

        <section id='character-stats'>
          <CharacterField className='character-field' value='14' label='Armor Class (AC)' />
          <CharacterField className='character-field' label='Saving Throws'>
            <CharacterField className='character-field' value='Constitution' path='/abilities/constitution' />
            <CharacterField className='character-field' value='Strength' path='/abilities/strength' />
          </CharacterField>
          <CharacterField className='character-field' value='34' label='Hit Points' />
          <CharacterField className='character-field' value='+2' label='Proficiency Bonus' />
        </section>
        
        <section id='skills'>
          {skills}
          <h3>Skills points remaining {this.props.availablePoints}</h3>
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
    alignment: state.characterBuilder.alignment,
    race: state.characterBuilder.race,
    activeAbility: (activeAbility ? activeAbility.full as AbilityName : null),
    skills: state.characterBuilder.skills,
    availablePoints: state.characterBuilder.availablePoints,
    level: state.characterBuilder.level,
    characterName: state.characterBuilder.characterName,
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

    changeName(value: string) {
      dispatch(updateName(value));
    },

    changeLevel(value: number) {
      dispatch(changeLevel(value));
    }
  }
}

export default connect(mapStateToProps, dispatcher)(CharacterSummary);

