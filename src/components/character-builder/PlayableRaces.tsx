import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Race, AppState, CharacterAbilityScore } from '../../typings';
import { RouteComponentProps, Redirect } from 'react-router';
import { ALL_RACES } from '../../character-builder/constants';
import { changeRace } from '../../character-builder/actions';
// import { RouteComponentProps } from 'react-router';


class PlayableRaces extends React.Component<PlayableRacesProps & PlayableRacesDispatchers, {}> {
  public render() {
    if (this.props.options.length === 0) {
      return <Redirect to='/races/dwarf' />;
    }

    const options = this.props.options.map((r: Race<CharacterAbilityScore>, idx: number) => {
      const fn = this.props.changeRace.bind(null, r.name);
      const button = r.isPlayable ? <button onClick={fn}>Play as a {r.name}</button> : null;
      const benefits = r.abilityScores
        .filter((score: CharacterAbilityScore) => score.value > 0)
        .map((score: CharacterAbilityScore) => <li key={score.short}>{score.short.toUpperCase()}: {score.value}</li>);
      
      const benefitSection = r.isPlayable ? (
        <div>
          <ul>{benefits}</ul>
        </div>
      ) : null;
      return (
        <section key={`${r.name.toLowerCase()}-${idx}`}>
          <h3>{r.name}</h3>
          <p>{r.summary}</p>

          {benefitSection}

          <div>
            {button}
          </div>
        </section>
      );
    });
    return (  
      <article>
        {options}
      </article>
    );
  }
}


interface PlayableRacesProps extends RouteComponentProps<{ race: string }> {
  options: Array<Race<CharacterAbilityScore>>;
}

interface PlayableRacesDispatchers {
  changeRace(race: string): void;
}

const playableRacesProps = (state: AppState, ownProps: RouteComponentProps<{ race: string }>): PlayableRacesProps => {
  const path = ownProps.match.params.race;
  const charAbilityScores = state.characterBuilder.abilityScores;
  const parentRace = ALL_RACES.find((r: Race) => r.name.toLowerCase() === path);
  let races: Race[] = [];
  let options: Array<Race<CharacterAbilityScore>> = [];
  if (parentRace) {
    const subraces = ALL_RACES.filter((r: Race) => r.subraceOf === parentRace.name);
    races = races.concat(parentRace, subraces);
    options = races.map<Race<CharacterAbilityScore>>((r: Race) => {
      const abilities = r.abilityScores.map((n: number, i: number) => {
        const score = Object.assign({}, charAbilityScores[i]);
        score.value = n;
        return score;
      });

      return Object.assign({}, r, { abilityScores: abilities });
    });
  }

  // const races = ALL_RACES.filter((r: Race) => r.subraceOf === path);

  return {
    ...ownProps,
    options
  }
}

const dispatchers = (dispatch: Dispatch<AppState>): PlayableRacesDispatchers => {
  return {
    changeRace(race: string) {
      dispatch(changeRace(race));
    }
  };
}


export default connect(playableRacesProps, dispatchers)(PlayableRaces);