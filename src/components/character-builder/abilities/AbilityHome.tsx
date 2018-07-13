import * as React from 'react';

const Strength = () => {
  return (
    <section>
      <h3>Strength</h3>

      <p>
        Strength measures bodily power, athletic training, and the extent to which you can exert raw physical force.
      </p>
    </section>
  );
};

const Dexterity = () => {
  return (
    <section>
      <h3>Dexterity</h3>

      <p>
        Dexterity measures agility, reflexes, and balance.
      </p>
    </section>
  );
}

const Constitution = () => {
  return (
    <section>
      <h3>Constitution</h3>

      <p>
        Constitution measures health, stamina, and vital force.
      </p>
    </section>
  );
}

const Intelligence = () => {
  return (
    <section>
      <h3>Intelligence</h3>

      <p>
        Intelligence measures mental acuity, accuracy of recall, and the ability to reason.
      </p>
    </section>
  );
}

const Wisdom = () => {
  return (
    <section>
      <h3>Wisdom</h3>

      <p>
        Wisdom reflects how attuned you are to the world around you and represents perceptiveness and intuition.
      </p>
    </section>
  );
}

const Charisma = () => {
  return (
    <section>
      <h3>Charisma</h3>

      <p>
        Charisma measures your ability to interact effectively with others. It includes such factors as confidence and eloquence, and it can represent a charming or commanding personality.
      </p>
    </section>
  );
}


class AbilityHome extends React.Component {
  public render() {
    return (
      <div>
        Ability Scores Home
      </div>
    );
  }
}

export default {
  Home: AbilityHome,
  Charisma,
  Strength,
  Dexterity,
  Constitution,
  Intelligence,
  Wisdom
};