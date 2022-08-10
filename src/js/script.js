import '../scss/style.scss'

import characterData from "./data.js";
import Character from "./Character.js";

const attackButton = document.getElementById('attackButton')
attackButton.addEventListener('click', attack)

let isWaiting = false
let monstersArray = ["orc","demon","goblin"]

function getNewMonster() {
  const nextMonsterData = characterData[monstersArray.shift()]
  return nextMonsterData ? new Character(nextMonsterData) : {}
}

function attack() {
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
      endGame()
    } 
    else if(monster.dead) {
      isWaiting = true
      if(monstersArray.length > 0) {
          setTimeout(() => {
            monster = getNewMonster()
            render()
          },1500)
        }
        else {
          endGame()
        }
    }
  }
}

function endGame() {
  
  isWaiting = true
  const endMessage = wizard.health === 0 && monster.health === 0 ? "No victors - all creatures are dead"
  : wizard.health > 0 ? "The Wizard Wins" 
  : "The monsters are Victorious"

  const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
  
  setTimeout(() => {
    
    document.body.innerHTML = `
    <div class="end-game">
    <h2>Game Over</h2> 
    <h3>${endMessage}</h3>
    <p class="end-emoji">${endEmoji}</p>
    </div>
    
    <section id="actions">
    <button id="play-button">Play again</button>
    </section>
    `
    
    document.getElementById('play-button').addEventListener('click', playAgain)
  }, 2000)
  
}

function playAgain() {
  isWaiting = false
  
  document.body.innerHTML = `
  <header>
  <h1>RPG Game</h1>
</header>
<main>
  <section class="cards">
    <div id="hero" class="character"></div>
    <div id="monster" class="character"></div>
  </section>

  <section class="actions">
    <button id="attack-button">Attack</button>
  </section>
</main>
  `
  monstersArray = ["orc", "demon", "goblin"]
  monster = getNewMonster()
  wizard.getNewGame()
  monster.getNewGame()
  
  document.getElementById('attack-button').addEventListener('click', attack)

  render()
}




function render() {
  
  document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
  document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

const wizard = new Character(characterData.hero)
let monster = getNewMonster()

render()

