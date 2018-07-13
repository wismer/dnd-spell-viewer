import * as React from 'react';
import Dwarf from './Dwarf';
import Elf from './Elf';
import Human from './Human';

class PlayableRaces extends React.Component {
  public render() {
    return (
      <div>
        where am is
        {this.props.children}
      </div>
    );
  }
}

export default {
  Dwarf,
  Elf,
  Human,
  PlayableRaceHome: PlayableRaces
};