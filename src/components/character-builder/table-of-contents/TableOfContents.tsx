import * as React from 'react';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { TOCProps, SkillName, AppState, TOCCategory, TOCDispatch } from '../../../typings';
import './TableOfContents.css';
import { Dispatch } from 'redux';
// import { changeSpotlight } from '../../../character-builder/actions';

const listItemStyle = (path: string, route: string): React.CSSProperties => {
  return {
    display: path.includes(route) ? 'block' : 'none'
  };
}

class TableOfContents extends React.Component<TOCProps & RouteComponentProps<TOCProps, {}>, {}> {
  public render() {
    const { location, skillNames } = this.props;
    const skillLinks = skillNames.map((skill: SkillName, index: number) => {
      return (
        <li key={index}>
          <NavLink activeClassName='expanded' to={
            {
              hash: `#${skill.toLowerCase().replace(' ', '-')}`,
              pathname: '/skills'
            }
          }>{skill}</NavLink>
        </li>
      );
    }); 
    return (
      <div id='toc'>
        <ul>
          <li>
            <NavLink activeClassName='expanded' to='/races'>Playable Races</NavLink>
            <ul style={listItemStyle(location.pathname, 'races')}>
              <li>
                <NavLink activeClassName='expanded' to='/races/dwarf'>Dwarf</NavLink>
              </li>
              <li>
                <NavLink activeClassName='expanded' to='/races/elf'>Elf</NavLink>
              </li>
              <li>
                <NavLink activeClassName='expanded' to='/races/human'>Human</NavLink>
              </li>
            </ul>
          </li>

          <li>
            <NavLink activeClassName='expanded' to='/abilities'>Abilities</NavLink>

            <ul style={listItemStyle(location.pathname, 'abilities')}>
              <li>
                <NavLink activeClassName='expanded' to='/abilities/strength'>Strength</NavLink>
              </li>
              <li>
                <NavLink activeClassName='expanded' to='/abilities/constitution'>Constitution</NavLink>
              </li>
              <li>
                <NavLink activeClassName='expanded' to='/abilities/dexterity'>Dexterity</NavLink>
              </li>
              <li>
                <NavLink activeClassName='expanded' to='/abilities/wisdom'>Wisdom</NavLink>
              </li>
              <li>
                <NavLink activeClassName='expanded' to='/abilities/charisma'>Charisma</NavLink>
              </li>
              <li>
                <NavLink activeClassName='expanded' to='/abilities/intelligence'>Intelligence</NavLink>
              </li>
            </ul>
          </li>

          <li>
            <NavLink activeClassName='expanded' to='/skills'>Skills</NavLink>

            <ul style={listItemStyle(location.pathname, 'skills')}>
              {skillLinks}
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