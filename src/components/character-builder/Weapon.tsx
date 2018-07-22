import * as React from 'react';
import { Weapon } from '../../typings';


interface WeaponComponentProps {
  weapons: Weapon[];
  weaponType: string;
  selectWeapon(weapon: Weapon): void;
}



export default (props: WeaponComponentProps) => {
  const { weapons, selectWeapon, weaponType } = props;
  const weaponList = weapons.map((weapon: Weapon, idx: number) => {
    return (
      <div onClick={selectWeapon.bind(null, weapon)} key={`${weapon.name}-${idx}`}>
        {weapon.name}
      </div>
    );
  });  
  return (
    <section id='weapon-select'>
      <h3>{weaponType}</h3>

      <div>
        {weaponList}
      </div>
    </section>
  );
}
