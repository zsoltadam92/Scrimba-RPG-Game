import '../scss/style.scss'

import characterData from "./data.js";
import Character from "./Character.js";


let isWaiting = false
let monsterArray = ["orc","demon","goblin"]

function getNewMonster() {
  const nextMonsterData = characterData[monsterArray.shift()]
  return nextMonsterData ? new Character(nextMonsterData) : {}
}



document.getElementById('attackButton').addEventListener('click', () => {
  if(!isWaiting) {
    isWaiting = true
    wizard.resetDiceHtml()
    monster.resetDiceHtml()
    render()
    wizard.setDiceHtml()
    monster.setDiceHtml()
    wizard.takeDamage(monster.currentDiceScore)
    monster.takeDamage(wizard.currentDiceScore)
    setTimeout(() => {
      render()
      isWaiting = false
    },1000)

    if(wizard.dead) {
      setTimeout(() => {
        isWaiting = true
        document.getElementById('hero').innerHTML = "Wizard is dead"
      },1500)
    } 
    else if(monster.dead) {
      isWaiting = true
      setTimeout(() => {
        if(monsterArray.length > 0) {
          monster = getNewMonster()
          render()
        }
        else {
          isWaiting = true
          document.getElementById('monster').innerHTML = "Monster is dead"
        }
      },1500)
    }
  }
})


function render() {
  
  document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
  document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

const wizard = new Character(characterData.hero)
let monster = getNewMonster()

render()

