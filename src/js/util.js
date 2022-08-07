function calcPercent(remainingHealth, maximumHealth) {
  return (remainingHealth * 100)  / maximumHealth 
}

function getDiceRollArray(diceCount) {
  return new Array(diceCount).fill(0).map(() => Math.floor(Math.random() * 6 + 1))
}

function getDiceHtml(diceCount, type) {
  return new Array(diceCount).fill(0).map(() =>{
    return    `
    <div class="panel">
      <div class="dice  ${type === 'monster'? 'dice-monster' : 'dice-hero'}">
        <div class="dice__side dice__side--1 ${type === 'monster'? 'dice__side-monster' : 'dice__side-hero'}">
          <p class="dice__num dice__num--1">1</p>
        </div>
        <div class="dice__side dice__side--2 ${type === 'monster'? 'dice__side-monster' : 'dice__side-hero'}">
          <p class="dice__num dice__num--2">2</p>
        </div>
        <div class="dice__side dice__side--3 ${type === 'monster'? 'dice__side-monster' : 'dice__side-hero'}">
          <p class="dice__num dice__num--3">3</p>
        </div>
        <div class="dice__side dice__side--4 ${type === 'monster'? 'dice__side-monster' : 'dice__side-hero'}">
          <p class="dice__num dice__num--4" >4</p>
        </div>
        <div class="dice__side dice__side--5 ${type === 'monster'? 'dice__side-monster' : 'dice__side-hero'}">
          <p class="dice__num dice__num--5">5</p>
        </div>
        <div class="dice__side dice__side--6 ${type === 'monster'? 'dice__side-monster' : 'dice__side-hero'}">
          <p class="dice__num dice__num--6">6</p>
        </div>
      </div>
    </div>
    `
  }).join("")
}

export {calcPercent,getDiceHtml,getDiceRollArray}