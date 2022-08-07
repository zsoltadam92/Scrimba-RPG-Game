import { calcPercent,getDiceHtml, getDiceRollArray } from "./util.js"


class Character {
  constructor(data) {
    Object.assign(this,data)
    this.maxHealth = this.health
    this.diceHtml = getDiceHtml(this.diceCount,this.type)
  }

  setHeroDiceHtml() {
    
    const diceHero = document.querySelectorAll('.dice-hero')
    
    this.currentDiceScore = getDiceRollArray(this.diceCount)
    console.log(this.currentDiceScore)
    
    diceHero.forEach((die,index) => {

        die.style.transform = `translateZ(-100px) rotateY(-45deg) rotateX(-45deg)`
        die.style.transitionDuration = '600ms'
      
        setTimeout(() =>{
        let randomNumber = this.currentDiceScore[index];
      let x = "";
      let y = "";
      switch (randomNumber) {
        case 1:
          x = 720;
          y = 810;
          break;
        case 6:
          x = 720;
          y = 990;
          break;
        default:
          x = 720 + (6 - randomNumber) * 90;
          y = 900;
          break;
      }
    
      die.style.transform = `translateZ(-100px) rotateY(${x}deg) rotateX(${y}deg)`
     }, 400)
      })  
  }
  setMonsterDiceHtml() {
    
    const diceMonster = document.querySelectorAll('.dice-monster')

    this.currentDiceScore = getDiceRollArray(this.diceCount)
    console.log(this.currentDiceScore)
    
    diceMonster.forEach((die,index) => {

        die.style.transform = `translateZ(-100px) rotateY(-45deg) rotateX(-45deg)`
        die.style.transitionDuration = '600ms'
      
        setTimeout(() =>{
        let randomNumber = this.currentDiceScore[index];
      let x = "";
      let y = "";
      switch (randomNumber) {
        case 1:
          x = 720;
          y = 810;
          break;
        case 6:
          x = 720;
          y = 990;
          break;
        default:
          x = 720 + (6 - randomNumber) * 90;
          y = 900;
          break;
      }
    
      die.style.transform = `translateZ(-100px) rotateY(${x}deg) rotateX(${y}deg)`
     }, 400)
      })  
  }

  getHealthBarHtml() {
    const percent = calcPercent(this.health,this.maxHealth)
    return `
    <div class="character__health-bar-outer">
      <div class="character__health-bar-inner ${percent < 26 ? "danger" : ""} " style="width:${percent}%;">

      </div>
    </div>
    `
  }

  getCharacterHtml() {
    const {name, avatar, health,diceHtml} = this
    const healthBar = this.getHealthBarHtml()
    // const diceHtml =  getDiceHtml(this.diceCount)

    return `
    <div class="character__card">
    <h4 class="character__name"> ${name} </h4>
    <img class="character__avatar" src="${avatar}" />
    <div class="character__health">health: <b> ${health} </b></div>
    ${healthBar}
    <div class="character__dice-container">
    ${diceHtml}
    </div>
  </div>
    `
  }
}

export default Character;