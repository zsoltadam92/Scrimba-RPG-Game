import '../scss/style.scss'

import characterData from "./data.js";
import Character from "./Character.js";
import { getDiceHtml, rollDice } from './util';


document.getElementById('attackButton').addEventListener('click', () => {
  wizard.resetDiceHtml()
  orc.resetDiceHtml()
  render()
  wizard.setDiceHtml()
  orc.setDiceHtml()
  wizard.takeDamage(orc.currentDiceScore)
  orc.takeDamage(wizard.currentDiceScore)
  setTimeout(() => {
    render()
  },1000)
  
})


function render() {
  
  document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
  document.getElementById('monster').innerHTML = orc.getCharacterHtml()
}

const wizard = new Character(characterData.hero)
const orc = new Character(characterData.orc)

document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
document.getElementById('monster').innerHTML = orc.getCharacterHtml()

// render()










// document.getElementById('attackButton').addEventListener('click', () => {
  // const dice = document.querySelectorAll('.dice')

//   dice.forEach(die => {
//     die.style.transform = `translateZ(-100px) rotateY(-45deg) rotateX(-45deg)`
//   die.style.transitionDuration = '600ms'
  
//   setTimeout(() =>{
//    let randomNumber = Math.floor(Math.random() * 6 + 1);
//   let x = "";
//   let y = "";
//   switch (randomNumber) {
//     case 1:
//       x = 720;
//       y = 810;
//       break;
//     case 6:
//       x = 720;
//       y = 990;
//       break;
//     default:
//       x = 720 + (6 - randomNumber) * 90;
//       y = 900;
//       break;
//   }

//   die.style.transform = `translateZ(-100px) rotateY(${x}deg) rotateX(${y}deg)`
//  }, 400)
//   })  
// })