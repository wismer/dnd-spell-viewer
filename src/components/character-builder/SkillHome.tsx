import * as React from 'react';
import { withRouter } from 'react-router';
import { ALL_SKILLS } from '../../character-builder/constants';
import { Link } from 'react-router-dom';


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
    </section>
  );
}

class SkillHome extends React.Component<any, any> {
  public render() {
    const skills = ALL_SKILLS.map((skill: any, index: number) => {
      return (
        <SkillSection hash={this.props.location.hash} {...skill} key={index} />
      );
    });
    return (
      <article>
        <p>
          Below Are a List of Skills That Will Be Relevant in Both Combat and Out of Combat.
        </p>

        {skills}
      </article>
    );
  }
}

export default withRouter(SkillHome);