import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Switch,
  // RouteComponentProps
} from 'react-router-dom';

// import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux';
import { spellSearcher } from './reducers';
import { characterBuilder } from './character-builder/reducers';
import { Provider } from 'react-redux';
// import CharacterBuilder from './components/character-builder/CharacterBuilder';
import TableOfContents from './components/character-builder/table-of-contents/TableOfContents';
import CharacterSummary from './components/character-builder/character-summary/CharacterSummary';
import PlayableRaces from './components/character-builder/playable-races/PlayableRaces';
import AbilityHome from './components/character-builder/abilities/AbilityHome';
import SkillHome from './components/character-builder/SkillHome';
// import Home from './components/character-builder/Home';
// import { RouteType } from './typings';

interface WindowRedux extends Window {
  __REDUX_DEVTOOLS_EXTENSION__: any
}

const reduxWindow: WindowRedux = window as WindowRedux;

const store = createStore(
  combineReducers({spellSearcher, characterBuilder}),
  reduxWindow.__REDUX_DEVTOOLS_EXTENSION__()
);

const tableOfContentsRenderer = (props: any) => {
  const fuckingTS = () => {
    console.log('shit');
  };
  return <TableOfContents categories={[]} changeSpotlight={fuckingTS} activeSpotlight={''} {...props} />
}

const characterSummaryRenderer = (props: any) => {
  return <CharacterSummary {...props} />
}

// const abilityRenderer = (props: RouteComponentProps<{ ability: string }>) => {
//   switch (props.match.params.ability) {
//     case 'dexterity': return <AbilityHome.Dexterity />;
//     case 'wisdom': return <AbilityHome.Wisdom />;
//     case 'intelligence': return <AbilityHome.Intelligence />;
//     case 'charisma': return <AbilityHome.Charisma />;
//     case 'strength': return <AbilityHome.Strength />;
//     case 'constitution': return <AbilityHome.Constitution />;
//     default: 
//       return <AbilityHome.Home />;
//   }
// }

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div id='char-builder'>
        <Route path='/' render={tableOfContentsRenderer} />
        <Switch>
          <Route path='/races' component={PlayableRaces.PlayableRaceHome} exact={true} />

          <Switch>
            <Route path='/races/elf' component={PlayableRaces.Elf} exact={true} />
            <Route path='/races/dwarf' component={PlayableRaces.Dwarf} exact={true} />
            <Route path='/races/human' component={PlayableRaces.Human} exact={true} />
          </Switch>
        </Switch>

        <Switch>
          <Route path='/abilities' component={AbilityHome.Home} exact={true} />

          <Switch>
            <Route path='/abilities/constitution' component={AbilityHome.Constitution} exact={true} />
            <Route path='/abilities/strength' component={AbilityHome.Strength} exact={true} />
            <Route path='/abilities/wisdom' component={AbilityHome.Wisdom} exact={true} />
            <Route path='/abilities/dexterity' component={AbilityHome.Dexterity} exact={true} />
            <Route path='/abilities/charisma' component={AbilityHome.Charisma} exact={true} />
            <Route path='/abilities/intelligence' component={AbilityHome.Intelligence} exact={true} />
          </Switch>
        </Switch>

        <Route path='/skills' component={SkillHome} exact={true} />

        <Route path='/' render={characterSummaryRenderer} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
