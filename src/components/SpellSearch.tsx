import * as React from 'react';
import { connect } from 'react-redux';
import { Spell, AppState } from '../typings';
import './SpellSearch.css';
 
interface SearchComponentProps { 
  results: Spell[]
}

const SpellResult = (props: any) => {
  const spell = props.spell;

  return (
    <div className='spell-card'>
      <div className='spell-contents'>
        <h3>{spell.name}</h3>

        <div className='spell-school'>
          {spell.school}
        </div>
      </div>

      <div className='spell-attrs'>
        <div className='spell-level'>
          {spell.level}
        </div>

        <div className='spell-requirements'>
          {/* {spell.components.join(' ')} */}
        </div>
      </div>

    </div>
  );
}

class SpellSearch extends React.Component<SearchComponentProps, {}> {
  public render() {
    const spells = this.props.results.map((s, k) => <SpellResult spell={s} key={k} />);
    return (
      <div id='spell-search'>
        <label>
          Search for a Spell
        </label>
        <div id='spell-search-results'>
          {spells}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return { results: state.spellSearcher.searchResults };
}

export default connect(mapStateToProps)(SpellSearch);
