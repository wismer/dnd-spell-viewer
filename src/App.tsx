import * as React from 'react';

import './App.css';
import SpellSearch from './components/SpellSearch';
import SpellSearchBar from './components/SpellSearchBar';

import { insertSpell } from './reducers';
import { SpellLookup, Spell, SpellStore, QueryState, AppProps, AppDispatchProps } from './typings';
import { queryAdd, seedStore } from './actions';
import { connect, Dispatch } from 'react-redux';


class App extends React.Component<AppProps & AppDispatchProps> {
  public componentWillMount() {
    fetch('https://dungeon-dragon.herokuapp.com/api/spell/')
      .then(res => res.json())
      .then(response => {
        const spells: Spell[] = response.results;
        let root: SpellLookup = {};
        for (const spell of spells) {
          root = insertSpell(spell, root);
        }

        const spellsById = spells.reduce((prev: SpellStore, next: Spell) => {
          prev[next.id] = next;
          return prev;
        }, {} as SpellStore);
        
        this.props.seedStore(spellsById, root);
      });
  }
  
  public render() {
    // const qsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   this.props.queryAdd(event.target.value);
    // };

    return (
      <div className="App">
        <SpellSearchBar />
        <SpellSearch />
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch: Dispatch<QueryState>, props: AppProps): AppDispatchProps => {
  return {
    queryAdd(input: string) {
      dispatch(queryAdd(input));
    },
    
    seedStore(spellsById: SpellLookup, spellLookup: SpellLookup) {
      dispatch(seedStore(spellsById, spellLookup));
    }
  };
}

export default connect(null, mapDispatchToProps)(App);
