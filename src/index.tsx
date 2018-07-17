import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {
  createStore,
  combineReducers,
  // applyMiddleware,
  // Dispatch,
  // Middleware,
  // MiddlewareAPI,
  // AnyAction
} from 'redux';
import { spellSearcher } from './reducers';
import { characterBuilder } from './character-builder/reducers';
import { Provider } from 'react-redux';
// import CharacterBuilder from './components/character-builder/CharacterBuilder';
import TableOfContents from './components/character-builder/table-of-contents/TableOfContents';
import CharacterSummary from './components/character-builder/character-summary/CharacterSummary';
import PlayableRaces from './components/character-builder/PlayableRaces';
import AbilityHome from './components/character-builder/abilities/AbilityHome';
import SkillHome from './components/character-builder/SkillHome';
// import { AppState } from './typings';
// import Home from './components/character-builder/Home';
// import { RouteType } from './typings';

interface WindowRedux extends Window {
  __REDUX_DEVTOOLS_EXTENSION__: any
}

const reduxWindow: WindowRedux = window as WindowRedux;
// const logger = (api: MiddlewareAPI<AppState>) => {
//   return (next: Dispatch<AppState>) => {
//     return (action: AnyAction) => {    
//       console.log('dispatching', action)
//       let result = next(action)
//       console.log('next state', store.getState())
//       return result
//     }
//   }
// }

const store = createStore(
  combineReducers({spellSearcher, characterBuilder}),
  // applyMiddleware(logger),
  reduxWindow.__REDUX_DEVTOOLS_EXTENSION__()
);

const tableOfContentsRenderer = (props: any) => {
  const fuckingTS = () => {
    console.log('shit');
  };
  return <TableOfContents categories={[]} changeSpotlight={fuckingTS} activeSpotlight={''} {...props} />
}

// const raceRender = (props: RouteComponentProps<{ race: string }>) => {
//   if 
// }

const characterSummaryRenderer = (props: any) => {
  return <CharacterSummary {...props} />
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div id='char-builder'>
        <Route path='/' render={tableOfContentsRenderer} />
        <Switch>
          <Route path='/races/:race' component={PlayableRaces} exact={false} />
          <Redirect from='/races' to='/races/dwarf' exact={true} />
        </Switch>
        <Route path='/abilities/:ability' component={AbilityHome.Home} exact={false} />
        <Route path='/skills/:skill' component={SkillHome} exact={true} />
        <Route path='/' render={characterSummaryRenderer} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
