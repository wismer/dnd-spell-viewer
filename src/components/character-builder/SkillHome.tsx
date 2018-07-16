import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ALL_SKILLS } from '../../character-builder/constants';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Skill, AppState, SkillName } from '../../typings';
import { Dispatch } from 'redux';
import { trainSkill } from '../../character-builder/actions';

interface SkillHomeProps extends RouteComponentProps<{ skill: string }> {
  skills: Skill[];
  focusSkill: string;
}

interface SkillHomeDispatchers {
  trainSkill(skill: SkillName): void;
}

const SkillSection = (props: any) => {
  const id = props.name.toLowerCase().replace(/\s+/g, '-');
  const ref = (el: HTMLElement) => {
    if (el && `#${el.id}` === props.hash) {
      el.scrollIntoView();
    }
  };
  return (
    <section ref={ref} id={id}>
      <h3>{props.name}</h3>

      <p>{props.description}</p>

      <p>
        related ability: <Link to={`/abilities/${props.relatedAttribute}`}>{props.relatedAttribute}</Link>
      </p>

      <div>
        {props.children}
      </div>
    </section>
  );
}

class SkillHome extends React.Component<SkillHomeProps & SkillHomeDispatchers, any> {
  public render() {
    const skills = this.props.skills.map((skill: Skill, index: number) => {
      return (
        <SkillSection hash={this.props.focusSkill} {...skill} key={index}>
          <button onClick={this.props.trainSkill.bind(null, skill.name)}>
            {skill.isProficient ? `Untrain ${skill.name}` : `Train ${skill.name}`}
          </button>
        </SkillSection>
      );
    });
    return (
      <article>
        <p>
          Below Are a List of Skills That Will Be Relevant in Both Combat and Out of Combat.
          TODO: add generalized description of what skills are.
        </p>

        {skills}
      </article>
    );
  }
}


const skillHomeProps = (state: AppState, ownProps: RouteComponentProps<{ skill: string }>): SkillHomeProps => {
  const skills = state.characterBuilder.skills.map((skill: Skill, idx: number) => {
    skill.description = ALL_SKILLS[idx].description;
    return skill;
  });

  return {
    skills,
    ...ownProps,
    focusSkill: ownProps.match.params.skill
  };
}

const skillHomeDispatchers = (dispatch: Dispatch<AppState>): SkillHomeDispatchers => {
  return {
    trainSkill(skill: SkillName) {
      dispatch(trainSkill(skill));
    }
  }
}

export default connect(skillHomeProps, skillHomeDispatchers)(SkillHome);