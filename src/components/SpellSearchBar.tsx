import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { toggleSchool } from '../actions';
import { School, QueryState, SearchBarProps } from '../typings';

const SCHOOLS = [
  'Necromancy',
  'Evocation',
  'Divination',
  'Illusion',
  'Conjuration',
  'Transmutation',
  'Enchantment',
  'Abjuration'
];

const SpellSchool = (props: any) => {
  return (
    <button className='school-filter' onClick={props.toggleSchool.bind(null, props.name)}>
      {props.name}
    </button>
  );
}

class SpellSearchBar extends React.Component<SearchBarProps, {}> {
  public render() {
    const schools = SCHOOLS.map((school, key) => {
      const toggleSch = this.props.toggleSchool;
      return (
        <SpellSchool name={school} key={key} toggleSchool={toggleSch} />
      );
    });
    return (
      <div id='search-bar'>
        {schools}
      </div>
    );
  }
}

const spellSearchDispatch = (dispatch: Dispatch<QueryState>) => {
  return {
    toggleSchool(schoolName: School) {
      dispatch(toggleSchool(schoolName));  
    }
  };
};

const spellSearchProps = (state: QueryState) => {
  return {
    activeLevels: state.activeLevels,
    activeSchools: state.activeSchools
  };
};

export default connect(spellSearchProps, spellSearchDispatch)(SpellSearchBar);
