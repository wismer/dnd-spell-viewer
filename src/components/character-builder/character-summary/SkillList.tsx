import * as React from 'react';
import { connect } from 'react-redux';
import { Skill, AppState } from '../../../typings';
import { Dispatch } from 'redux';
import { trainSkill } from '../../../character-builder/actions';
import './SkillList.css';
import { Link } from 'react-router-dom';

interface SkillListDispatch {
  trainSkill(skill: Skill): void;
}

interface SkillListProps {
  skills: Skill[];
}

class SkillList extends React.Component<SkillListDispatch & SkillListProps, {}> {
  public render() {
    const skills = this.props.skills.map((skill: Skill, idx: number) => {
      // const onClick = this.props.trainSkill.bind(null, skill);
      return (
        <>
          <div key={`${skill.name}-${idx}`}>{skill.isProficient ? "■" : "□"}</div>
          <div key={idx}>{skill.value}</div>
          <div className='skill-name' key={skill.name}>
            <Link to={`/skills#${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>{skill.name}</Link>
          </div>
        </>
      );
    });
    return (
      <div id='skill-list'>
        <>{skills}</>
      </div>
    );
  }
}

const skillListProps = (state: AppState): SkillListProps => {
  return { skills: state.characterBuilder.skills };
}

const skillListDispatch = (dispatch: Dispatch<AppState>): SkillListDispatch => {
  return {
    trainSkill(skill: Skill) {
      dispatch(trainSkill(skill.name));
    }
  };
}

export default connect(skillListProps, skillListDispatch)(SkillList);