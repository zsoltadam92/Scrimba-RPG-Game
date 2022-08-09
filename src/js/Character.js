import { calcPercent,getDiceHtml, getDiceRollArray, rollDice, } from "./util.js"


class Character {
  constructor(data) {
    Object.assign(this,data)
    this.maxHealth = this.health
    this.diceHtml = getDiceHtml(this.diceCount,this.type)
  }
  
  resetDiceHtml() {
    this.diceHtml = getDiceHtml(this.diceCount,this.type)
    
  }
  
  setDiceHtml(type) {
    this.currentDiceScore = getDiceRollArray(this.diceCount)
    console.log(this.currentDiceScore)
    
    rollDice(document.querySelectorAll(`.dice-${this.type}`), this.currentDiceScore,this.type)
    
    
    this.diceHtml = this.currentDiceScore.map((num) =>  {
      let x = "";
      let y = "";
    switch (num) {
      case 1:
        x = 720;
        y = 810;
        break;
      case 6:
        x = 720;
        y = 990;
        break;
        default:
          x = 720 + (6 - num) * 90;
        y = 900;
        break;
    }
     return    `<div class="panel">
    <div class="dice  ${this.type === 'monster'? 'dice-monster' : 'dice-hero'}" style="transform: translateZ(-100px) rotateY(${x}deg) rotateX(${y}deg)"; >
      ${new Array(6).fill(0).map(() => {
        return ` <div class="dice__side dice__side--${num} ${this.type === 'monster'? 'dice__side-monster' : 'dice__side-hero'}">
        <p class="dice__num dice__num--${num}">${num}</p>
      </div> 
      `
      }).join("")}
    </div>
  </div>`}).join("")

  
    console.log(this.diceHtml)
    
  }
  
  takeDamage(currentDiceScoreArray) {
    const damage = currentDiceScoreArray.reduce((total,num) => total + num)
    this.health -= damage
    
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
    <div class="character__dice-container ">
    ${diceHtml}
    </div>
  </div>
    `
  }
  
}

export default Character;