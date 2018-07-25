import * as React from 'react';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { TOCProps, AppState, TOCCategory, TOCDispatch, Race, PrimaryClass } from '../../../typings';
import './TableOfContents.css';
import { Dispatch } from 'redux';
import { ALL_RACES, ALL_SKILLS, CHARACTER_CLASSES } from '../../../character-builder/constants';
// import { changeSpotlight } from '../../../character-builder/actions';

const listItemStyle = (path: string, route: string): React.CSSProperties => {
  return {
    display: path.includes(route) ? 'block' : 'none'
  };
}

const raceLinks = ALL_RACES.filter((race: Race) => !race.subraceOf).map((race: Race) => {
  return (
    <li key={race.name}>
      <NavLink to={`/races/${race.name}`} activeClassName='expanded'>{race.name}</NavLink>
    </li>
  );
});

const classLinks = CHARACTER_CLASSES.map((klass: PrimaryClass) => {
  return (
    <li key={klass.name}>
      <NavLink activeClassName='expanded' to={`/classes/${klass.name}`}>{klass.name}</NavLink>
    </li>
  );
});

const skillLinks = ALL_SKILLS.map((skill: any) => {
  const hash = skill.name.toLowerCase().replace(/\s+/g, '-');
  const isActive = (match: any, location: any): boolean => {
    return location.hash === `#${hash}`;
  }
  return (
    <li key={skill.name}>
      <NavLink activeClassName='expanded' isActive={isActive} to={
        {
          hash,
          pathname: '/skills'
        }
      }>{skill.name}</NavLink>
    </li>
  );
});

const abilityLinks = ['strength', 'constitution', 'dexterity', 'wisdom', 'intelligence', 'charisma'].map((ability: string) => {
  return (
    <li key={ability}>
      <NavLink to={`/abilities/${ability}`} activeClassName='expanded'>{ability}</NavLink>
    </li>
  );
});

class TableOfContents extends React.Component<TOCProps & RouteComponentProps<TOCProps, {}>, {}> {
  public render() {
    const { location } = this.props;
    return (
      <div id='toc'>
        <ul>
          <li>
            <NavLink activeClassName='expanded' to='/races'>Playable Races</NavLink>
            <ul style={listItemStyle(location.pathname, 'races')}>
              {raceLinks}
            </ul>
          </li>

          <li>
            <NavLink activeClassName='expanded' to='/abilities'>Abilities</NavLink>

            <ul style={listItemStyle(location.pathname, 'abilities')}>
              {abilityLinks}
            </ul>
          </li>

          <li>
            <NavLink activeClassName='expanded' to='/skills'>Skills</NavLink>

            <ul style={listItemStyle(location.pathname, 'skills')}>
              {skillLinks}
            </ul>
          </li>

          <li>
            <NavLink activeClassName='expanded' to='/armor'>Armor</NavLink>
          </li>

          <li>
            <NavLink activeClassName='expanded' to='/weapons'>Weapons</NavLink>

            <ul style={listItemStyle(location.pathname, 'weapons')}>
              <li>
                <NavLink activeClassName='expanded' to='/weapons/simple'>Simple</NavLink>
              </li>
              <li>
                <NavLink activeClassName='expanded' to='/weapons/martial'>Martial</NavLink>
              </li>
            </ul>
          </li>

          <li>
            <NavLink activeClassName='expanded' to='/classes'>Classes</NavLink>

            <ul style={listItemStyle(location.pathname, 'classes')}>
              {classLinks}
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}
// categories: TOCCategory[];
// skillNames: SkillName[];
// changeSpotlight(className: string): void;
// activeSpotlight: string | null;

const defaultPropsForTOC = (state: AppState): TOCProps => {
  return {
    categories: [] as TOCCategory[],
    skillNames: state.characterBuilder.skills.map(s => s.name),
    activeSpotlight: null
  };
}


const dispatchers = (dispatch: Dispatch<AppState>, props: any): TOCDispatch => {
  return {
    changeSpotlight(className: string) {
      console.log('are you happy now, typescript linter???')
    }
  }
}

export default connect(defaultPropsForTOC, dispatchers)(TableOfContents);