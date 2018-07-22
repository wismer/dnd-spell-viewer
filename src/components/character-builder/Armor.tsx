import * as React from 'react';
import { Armor } from '../../typings';
import { SAMPLE_ARMOR } from '../../character-builder/constants';

interface ArmorProps {
  armor: Armor[]; 
}

const ArmorPiece = (props: Armor) => {
  return <li>{props.name}</li>
}

const ArmorWrapper = (props: ArmorProps) => {
  return (
    <article>
      <section>
        <h3>Light Armor</h3>
        <ArmorList armor={props.armor.filter((piece: Armor) => piece.armorType === 'light')} />
      </section>

      <section>
        <h3>Medium Armor</h3>
        <ArmorList armor={props.armor.filter((piece: Armor) => piece.armorType === 'medium')} />
      </section>

      <section>
        <h3>Heavy Armor</h3>
        <ArmorList armor={props.armor.filter((piece: Armor) => piece.armorType === 'heavy')} />
      </section>
    </article>
  );
}

class ArmorList extends React.Component<ArmorProps> {
  public render() {
    const armor = this.props.armor.map((item: Armor) => {
      return (
        <ArmorPiece key={item.name} {...item} />
      );
    });
    return (
      <>
        {armor}
      </>
    );
  }
}

export default () => <ArmorWrapper armor={SAMPLE_ARMOR} />