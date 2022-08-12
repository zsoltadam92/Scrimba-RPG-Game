import '../scss/style.scss'

import characterData from "./data.js";
import Character from "./Character.js";

document.getElementById('attackButton').addEventListener('click', attack)

let isWaiting = false

let heroesArray = ["knight","wizard"]
let monstersArray = ["orc","demon","goblin"]
function getNewCharacter(charactersArray) {
  const nextCharacterData = characterData[charactersArray.shift()]
  return nextCharacterData ? new Character(nextCharacterData) : {}
}

function attack() {
  if(!isWaiting) {
    isWaiting = true
    hero.resetDiceHtml()
    monster.resetDiceHtml()
    render()
    hero.setDiceHtml()
    monster.setDiceHtml()
    hero.takeDamage(monster.currentDiceScore)
    monster.takeDamage(hero.currentDiceScore)
    setTimeout(() => {
      render()
      isWaiting = false
      if(hero.health === 0 || monster.health === 0) {
        isWaiting = true
      }
    },1600)

    
    if(hero.dead) {
      isWaiting = true
      if(heroesArray.length > 0) {
        setTimeout(() => {
          hero = getNewCharacter(heroesArray)
          render()
          isWaiting = false
        },2300)
      }
      else {        
        endGame()
      }
    } 
    else if(monster.dead) {
      isWaiting = true
      if(monstersArray.length > 0) {
        setTimeout(() => {
          monster = getNewCharacter(monstersArray)
          render()
          isWaiting = false
        },2300)
      }
      else {        
        endGame()
      }
    }
  }

}

function endGame() {
    const endMessage = hero.health === 0 && monster.health === 0 ? "No victors - all creatures are dead"
  : hero.health > 0 ? "The heroes Wins" 
  : "The monsters are Victorious"

  const endEmoji = hero.health > 0 ? "🔮" : "☠️"
  
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
  }, 2800)
  
}

function playAgain() {
  isWaiting = false
  
  document.body.innerHTML = `
  <header>
  <h1>Heroes<span>vs</span>Monsters</h1>
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
  heroesArray = ["knight","wizard"]
  monstersArray = ["orc", "demon", "goblin"]
  hero = getNewCharacter(heroesArray)
  monster = getNewCharacter(monstersArray)
  hero.getNewGame()
  monster.getNewGame()
  
  document.getElementById('attack-button').addEventListener('click', attack)

  render()
}


function render() {
  
  document.getElementById('hero').innerHTML = hero.getCharacterHtml()
  document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

let hero = getNewCharacter(heroesArray)
let monster = getNewCharacter(monstersArray)

render()

