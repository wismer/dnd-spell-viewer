import * as React from 'react';

class Dwarf extends React.Component<{}, {}> {
  public render() {
    return (
      <article>
        <section>
          <h3>The Dwarfs</h3>

          <p>
            Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal.
            Though they stand well under 5 feet tall, dwarves are so broad and compact that they can weigh as much as a human standing nearly two feet taller.
            Their courage and endurance are also easily a match for any of the larger folk. Dwarven skin ranges from deep brown to a paler
            hue tinged with red, but the most common shades are light brown or deep tan, like certain tones of earth.
            Their hair, worn long but in simple styles, is usually black, gray, or brown, though paler dwarves often have red hair.
            Male dwarves value their beards highly and groom them carefully.
          </p>
        </section>

        <section>
          <h5>Hill Dwarf</h5>

          <p>
            As a hill dwarf, you have keen senses, deep intuition, and remarkable resilience.
            The gold dwarves of Faerun in their mighty southern kingdom are hill dwarves,
            as are the exiled Neidar and the debased Klar of Krynn in the Dragonlance setting.
          </p>
        </section>
      </article>
    );
  }
}

export default Dwarf;