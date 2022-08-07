import { calcPercent } from "./util.js"


class Character {
  constructor(data) {
    Object.assign(this,data)
    this.maxHealth = this.health
  }

  setDiceHtml() {
    return `
    <div class="panel">
      <div class="dice">
        <div class="dice__side dice__side--1">
          <p class="dice__num dice__num--1">1</p>
        </div>
        <div class="dice__side dice__side--2">
          <p class="dice__num dice__num--2">2</p>
        </div>
        <div class="dice__side dice__side--3">
          <p class="dice__num dice__num--3">3</p>
        </div>
        <div class="dice__side dice__side--4">
          <p class="dice__num dice__num--4" >4</p>
        </div>
        <div class="dice__side dice__side--5">
          <p class="dice__num dice__num--5">5</p>
        </div>
        <div class="dice__side dice__side--6">
          <p class="dice__num dice__num--6">6</p>
        </div>
      </div>
    </div>
    `
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
    const {name, avatar, health} = this
    const healthBar = this.getHealthBarHtml()
    const diceHtml = this.setDiceHtml()

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