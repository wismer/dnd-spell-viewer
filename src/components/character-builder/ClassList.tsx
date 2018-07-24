import * as React from 'react';
import { connect } from 'react-redux';
import { PrimaryClass, SubClass } from '../../typings';


interface ClassListProps {
  primary: PrimaryClass;
  subclasses: SubClass[];
}

class ClassList extends React.Component<ClassListProps, {}> {
  public render() {
    return (
      <div>blah</div>
    );
  }
}

export default connect(null, {})(ClassList);