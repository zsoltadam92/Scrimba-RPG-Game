import wizardImg from '../assets/images/wizard.png';
import gandalfImg from '../assets/images/gandalf.png';
import orcImg from '../assets/images/orc.png';
import demonImg from '../assets/images/demon.png';
import goblinImg from '../assets/images/goblin.png';

const characterData = {
  wizard: {
    name: "Wizard",
    avatar: wizardImg,
    health: 30,
    diceCount: 2,
    currentDiceScore: [],
    type: 'hero'
  },
  gandalf: {
    name: "Gandalf",
    avatar: gandalfImg,
    health: 50,
    diceCount: 3,
    currentDiceScore: [],
    type: 'hero'
  },
  orc: {
    name: "Orc",
    avatar: orcImg,
    health: 30,
    diceCount: 1,
    currentDiceScore: [],
    type: 'monster'
  },
  demon: {
    name: "Demon",
    avatar: demonImg,
    health: 25,
    diceCount: 2,
    currentDiceScore: [],
    type: 'monster'
  },
  goblin: {
    name: "Goblin",
    avatar: goblinImg,
    health: 20,
    diceCount: 3,
    currentDiceScore: [],
    type: 'monster'
  }
}

export default characterData;