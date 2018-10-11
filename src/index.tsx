import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  RouteComponentProps,
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
import * as Loadable from 'react-loadable';
import { spellSearcher } from './reducers';
import { characterBuilder } from './character-builder/reducers';
import { Provider } from 'react-redux';
// import CharacterBuilder from './components/character-builder/CharacterBuilder';
import TableOfContents from './components/character-builder/table-of-contents/TableOfContents';
// import CharacterSummary from './components/character-builder/character-summary/CharacterSummary';
import PlayableRaces from './components/character-builder/PlayableRaces';
import AbilityHome from './components/character-builder/abilities/AbilityHome';
import Weapon from './components/character-builder/Weapon';
import SkillHome from './components/character-builder/SkillHome';
import { SIMPLE_WEAPONS, MARTIAL_WEAPONS, CHARACTER_CLASSES, SUBCLASSES } from './character-builder/constants';
import { Weapon as WeaponType, PrimaryClass } from './typings';
import ArmorWrapper from './components/character-builder/Armor';
import ClassList from './components/character-builder/ClassList';

interface WindowRedux extends Window {
  __REDUX_DEVTOOLS_EXTENSION__: any
}

const CharacterSummary = Loadable({
  loading: () => <h1>LOADING MFER</h1>,
  loader: () => import('./components/character-builder/character-summary/CharacterSummary')
});

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

const classRoutes = CHARACTER_CLASSES.map((klass: PrimaryClass) => {
  const subclasses = klass.subClassIDs.map((subclass: number) => SUBCLASSES[subclass - 1]);
  const render = () => <ClassList primary={klass} subclasses={subclasses} />;
  return <Route key={klass.name} render={render} path={`/classes/${klass.name}`} exact={true} />
});

const tableOfContentsRenderer = (props: any) => {
  const fuckingTS = () => {
    console.log('shit');
  };
  return <TableOfContents categories={[]} changeSpotlight={fuckingTS} activeSpotlight={''} {...props} />
}

const weaponRender = (props: RouteComponentProps<{ weaponType: string }>) => {
  const { weaponType } = props.match.params;
  const selectWeapon = (weapon: WeaponType) => store.dispatch({ weapon, type: 'SELECT_WEAPON' });
  if (weaponType === 'martial') {
    return <Weapon weaponType={weaponType} weapons={MARTIAL_WEAPONS} selectWeapon={selectWeapon} />
  } else {
    return <Weapon weaponType={weaponType} weapons={SIMPLE_WEAPONS} selectWeapon={selectWeapon} />
  }
}

const characterSummaryRenderer = (props: any) => {
  return <CharacterSummary {...props} />
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path='/' render={tableOfContentsRenderer} />
        <div id='char-builder'>
          <div id='toc-placeholder' />
          <Switch>
            <Route path='/races/:race' component={PlayableRaces} exact={false} />
            <Redirect from='/races' to='/races/dwarf' exact={true} />
          </Switch>

          <Switch>
            <Route path='/weapons/:weaponType' render={weaponRender} exact={true} />
            <Redirect from='/weapons' to='/weapons/simple' exact={true} />
          </Switch>

          <Switch>
            {classRoutes}
            <Redirect from='/classes' to='/classes/cleric' />
          </Switch>

          <Route path='/armor' component={ArmorWrapper} />
          <Route path='/abilities/:ability' component={AbilityHome.Home} exact={false} />
          <Route path='/skills' component={SkillHome} exact={true} />
          <Route path='/' render={characterSummaryRenderer} />
        </div>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
