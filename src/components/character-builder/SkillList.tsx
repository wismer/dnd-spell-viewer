import * as React from 'react';
import { connect } from 'react-redux';
import { Skill, AppState } from '../../typings';
import { Dispatch } from 'redux';
import { trainSkill } from '../../character-builder/actions';


interface SkillListDispatch {
  trainSkill(skill: Skill): void;
}

interface SkillListProps {
  skills: Skill[];
}

class SkillList extends React.Component<SkillListDispatch & SkillListProps, {}> {
  public render() {
    const skills = this.props.skills.map((skill: Skill, idx: number) => {
      const onClick = this.props.trainSkill.bind(null, skill);
      return (
        <li onClick={onClick} key={idx} className='skill-item'>
          <div>{skill.name}</div>
          <div>{skill.value}</div>
          <div>{skill.isProficient}</div>
        </li>
      );
    });
    return (
      <div id='skill-list'>
        {skills}
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