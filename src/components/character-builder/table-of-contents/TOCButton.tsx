import * as React from 'react';
// import { Link } from 'react-router-dom';

import './TOCButton.css';
import { TOCCategory } from '../../../typings';

interface TOCButtonProps {
  label: string;
  expanded: boolean;
  path: string;
  items?: TOCCategory[];
  changeSpotlight(className: string): void;
}


/*
  <TOCButton onClick={} children={} />

  <TOCButton onClick={}>
    <TOCButton onClick={} />
  </TOCButton>
*/

interface TOCButtonSetProps {
  items: TOCCategory[];
  path: string;
  changeSpotlight(className: string): void;
}

export const TOCButtonSet = (props: TOCButtonSetProps): any => {
  return (
    <ul>
      {props.items.map((item: TOCCategory, i: number) => <TOCButton path={props.path} changeSpotlight={props.changeSpotlight} key={i} expanded={props.path.includes('1')} items={item.subItems} label={item.label} />)}
    </ul>
  );
}


class TOCButton extends React.Component<TOCButtonProps, {}> {
  public render() {
    let inset = null;
    const { items, label, path, changeSpotlight } = this.props;

    if (!this.props.children) {
      inset = <TOCButtonSet changeSpotlight={changeSpotlight} items={items} path={`${path}:${label}`}  />;
    } else {
      inset = this.props.children;
    }

    const splitPath = path.split(':');
    const expanded = label.includes(splitPath[splitPath.length - 1]);

    return (
      <li className={expanded ? 'expanded' : ''}>
        <a onClick={changeSpotlight.bind(null, `${path}:${label}`)}>{label}</a>
        {inset}
      </li>
    );
  }
}

export default TOCButton;