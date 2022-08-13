/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Character.js":
/*!*****************************!*\
  !*** ./src/js/Character.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./src/js/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Character = /*#__PURE__*/function () {
  function Character(data) {
    _classCallCheck(this, Character);

    Object.assign(this, data);
    this.maxHealth = this.health;
    this.diceHtml = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getDiceHtml)(this.diceCount, this.type);
    this.fullLoad = 20;
    this.shieldLoad = 0;
    this.doubleAttackLoad = 0;
  }

  _createClass(Character, [{
    key: "resetDiceHtml",
    value: function resetDiceHtml() {
      this.diceHtml = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getDiceHtml)(this.diceCount, this.type);
      this.damage = undefined;
    }
  }, {
    key: "setDiceHtml",
    value: function setDiceHtml() {
      var _this = this;

      this.currentDiceScore = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getDiceRollArray)(this.diceCount);
      (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.rollDice)(document.querySelectorAll(".dice-".concat(this.type)), this.currentDiceScore, this.type);
      this.diceHtml = this.currentDiceScore.map(function (num) {
        var x = "";
        var y = "";

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

        return "<div class=\"panel\">\n    <div class=\"dice  ".concat(_this.type === 'monster' ? 'dice-monster' : 'dice-hero', "\" style=\"transform: translateZ(-100px) rotateY(").concat(x, "deg) rotateX(").concat(y, "deg)\"; >\n      <div class=\"dice__side dice__side--").concat(num, " ").concat(_this.type === 'monster' ? 'dice__side-monster' : 'dice__side-hero', "\">\n        <p class=\"dice__num dice__num--").concat(num, "\">").concat(num, "</p>\n      </div> \n    </div>\n  </div>");
      }).join("");
    }
  }, {
    key: "takeDamage",
    value: function takeDamage(opponentDiceScoreArray, ownDiceScoreArray) {
      var _this2 = this;

      var damage = opponentDiceScoreArray.reduce(function (total, num) {
        return total + num;
      });
      var sumAttack = ownDiceScoreArray.reduce(function (total, num) {
        return total + num;
      });
      this.shieldLoad += damage * 0.7;
      this.doubleAttackLoad += sumAttack;

      if (this.shieldLoad >= this.fullLoad) {
        damage = 'shield';
        this.health -= 0;
        setTimeout(function () {
          return _this2.shieldLoad = 0;
        }, 2000);
      } else {
        this.health -= damage;

        if (this.health <= 0) {
          this.dead = true;
          this.health = 0;
        }
      }

      this.damage = damage;
      this.sumAttack = sumAttack;
    }
  }, {
    key: "loadAction",
    value: function loadAction() {
      var shieldPercent = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.calcPercent)(this.shieldLoad, this.fullLoad);
      var doubleAttackPercent = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.calcPercent)(this.doubleAttackLoad, this.fullLoad);
      return "\n    <div class=\"character__actions\">\n      <div class=\"character__double-attack\" style=\"transform: ".concat(doubleAttackPercent >= 100 ? 'scale(1.2); ' : 'scale(1);', "\">\n      <div class=\"character__double-attack-content\">\n        2X\n      </div>\n        <div class=\"character__double-attack-load\"  style=\"height: ").concat(doubleAttackPercent, "%;\">\n          \n        </div>\n      </div>\n      <div class=\"character__shield\" style=\"transform: ").concat(shieldPercent >= 100 ? 'scale(1.2); ' : 'scale(1);', "\">\n        <div class=\"character__shield-content\">\n          DEF\n        </div>\n        <div class=\"character__shield-load\" style=\"height: ").concat(shieldPercent, "%;\">\n          \n        </div>\n      </div>\n    </div>\n    ");
    }
  }, {
    key: "getHealthBarHtml",
    value: function getHealthBarHtml() {
      var percent = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.calcPercent)(this.health, this.maxHealth);
      return "\n    <div class=\"character__health-bar-outer\">\n      <div class=\"character__health-bar-inner ".concat(percent < 26 ? "danger" : "", " \" style=\"width:").concat(percent, "%;\">\n\n      </div>\n    </div>\n    ");
    }
  }, {
    key: "getCharacterHtml",
    value: function getCharacterHtml() {
      var name = this.name,
          avatar = this.avatar,
          health = this.health,
          diceHtml = this.diceHtml;
      var healthBar = this.getHealthBarHtml();
      var actions = this.loadAction();
      return "\n    <div class=\"character__card\">\n    <h4 class=\"character__name\"> ".concat(name, " </h4>\n    <img class=\"character__avatar\" src=\"").concat(avatar, "\" />\n    <div class=\"character__health\">health: <b> ").concat(health, " </b> <b class=\"character__damage\" style=\"display: ").concat(this.damage === undefined ? "none" : "inline-block", "\"> -").concat(this.damage, " </b> </div>\n    ").concat(healthBar, "\n    ").concat(actions, "\n    <div class=\"character__dice-container \">\n    ").concat(diceHtml, "\n    </div>\n  </div>\n    ");
    }
  }, {
    key: "getNewGame",
    value: function getNewGame() {
      this.health = this.maxHealth;
      this.diceHtml = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getDiceHtml)(this.diceCount, this.type);
      this.dead = false;
    }
  }]);

  return Character;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Character);

/***/ }),

/***/ "./src/js/data.js":
/*!************************!*\
  !*** ./src/js/data.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _assets_images_knight_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/images/knight.png */ "./src/assets/images/knight.png");
/* harmony import */ var _assets_images_wizard_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/images/wizard.png */ "./src/assets/images/wizard.png");
/* harmony import */ var _assets_images_orc_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/images/orc.png */ "./src/assets/images/orc.png");
/* harmony import */ var _assets_images_demon_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/images/demon.png */ "./src/assets/images/demon.png");
/* harmony import */ var _assets_images_goblin_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/images/goblin.png */ "./src/assets/images/goblin.png");





var characterData = {
  knight: {
    name: "Knight",
    avatar: _assets_images_knight_png__WEBPACK_IMPORTED_MODULE_0__,
    health: 30,
    diceCount: 2,
    currentDiceScore: [],
    type: 'hero'
  },
  wizard: {
    name: "Wizard",
    avatar: _assets_images_wizard_png__WEBPACK_IMPORTED_MODULE_1__,
    health: 60,
    diceCount: 3,
    currentDiceScore: [],
    type: 'hero'
  },
  orc: {
    name: "Orc",
    avatar: _assets_images_orc_png__WEBPACK_IMPORTED_MODULE_2__,
    health: 50,
    diceCount: 1,
    currentDiceScore: [],
    type: 'monster'
  },
  demon: {
    name: "Demon",
    avatar: _assets_images_demon_png__WEBPACK_IMPORTED_MODULE_3__,
    health: 40,
    diceCount: 2,
    currentDiceScore: [],
    type: 'monster'
  },
  goblin: {
    name: "Goblin",
    avatar: _assets_images_goblin_png__WEBPACK_IMPORTED_MODULE_4__,
    health: 40,
    diceCount: 3,
    currentDiceScore: [],
    type: 'monster'
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (characterData);

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calcPercent": () => (/* binding */ calcPercent),
/* harmony export */   "doubleAttackWithShield": () => (/* binding */ doubleAttackWithShield),
/* harmony export */   "doubleAttackWithoutShield": () => (/* binding */ doubleAttackWithoutShield),
/* harmony export */   "getDiceHtml": () => (/* binding */ getDiceHtml),
/* harmony export */   "getDiceRollArray": () => (/* binding */ getDiceRollArray),
/* harmony export */   "rollDice": () => (/* binding */ rollDice)
/* harmony export */ });
function calcPercent(remainingHealth, maximumHealth) {
  return remainingHealth * 100 / maximumHealth;
}

function getDiceHtml(diceCount, type) {
  return new Array(diceCount).fill(0).map(function () {
    return "\n    <div class=\"panel\">\n      <div class=\"dice  ".concat(type === 'monster' ? 'dice-monster' : 'dice-hero', "\" style=\"transform: translateZ(-100px) rotateY(-45deg) rotateX(-45deg)\";>\n        ").concat(new Array(6).fill(0).map(function (_, index) {
      return " <div class=\"dice__side dice__side--".concat(index + 1, " ").concat(type === 'monster' ? 'dice__side-monster' : 'dice__side-hero', "\">\n          <p class=\"dice__num dice__num--").concat(index + 1, "\">").concat(index + 1, "</p>\n        </div> \n        ");
    }).join(""), "\n      </div>\n    </div>\n    ");
  }).join("");
}

function getDiceRollArray(diceCount) {
  return new Array(diceCount).fill(0).map(function () {
    return Math.floor(Math.random() * 6 + 1);
  });
}

function rollDice(diceType, currentDiceScore) {
  diceType.forEach(function (die, index) {
    die.style.transform = "translateZ(-100px) rotateY(-45deg) rotateX(-45deg)";
    die.style.transitionDuration = '600ms';
    setTimeout(function () {
      var randomNumber = currentDiceScore[index];
      var x = "";
      var y = "";

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

      die.style.transform = "translateZ(-100px) rotateY(".concat(x, "deg) rotateX(").concat(y, "deg)");
    }, 400);
  });
}

function doubleAttackWithoutShield(player1, player2) {
  player2.health -= player1.sumAttack * 2;
  player2.damage = player1.sumAttack * 2;
  setTimeout(function () {
    return player1.doubleAttackLoad = 0;
  }, 2000);

  if (player1.health <= 0 && player2.health <= 0) {
    player2.dead = true;
    player2.health = 0;
    player1.dead = true;
    player1.health = 0;
  } else if (player1.health <= 0) {
    player1.dead = true;
    player1.health = 0;
  } else if (player2.health <= 0) {
    player2.dead = true;
    player2.health = 0;
  }
}

function doubleAttackWithShield(player1, player2) {
  player2.health -= 0;
  setTimeout(function () {
    return player1.doubleAttackLoad = 0;
  }, 2000);
  player2.damage = 0;
}



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss ***!
  \**********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html {\n  font-size: 100%;\n  box-sizing: border-box;\n}\n\n*, *::after, *::before {\n  box-sizing: inherit;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: \"MedievalSharp\", cursive;\n  background: rgb(52, 43, 56);\n  background: radial-gradient(circle, rgb(51, 43, 55) 0%, rgb(51, 43, 55) 100%);\n  color: white;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\nmain .cards {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 2rem;\n}\n@media (min-width: 34.375rem) {\n  main .cards {\n    flex-direction: row;\n    margin: 6vh 5vw;\n    justify-content: center;\n    width: 86vw;\n  }\n}\n\nh1 span {\n  display: inline-block;\n  margin: 0 1.25rem;\n}\n\n.character__card {\n  height: 50vh;\n  width: 54vw;\n  max-width: 14.375rem;\n  padding: 1vh 1vw;\n  font-size: 1.5625rem;\n  border-radius: 0.875rem;\n  position: relative;\n  background: #231d24;\n  text-align: center;\n  border: 0.0625rem solid #000721;\n  box-shadow: inset 0px 0px 0.375rem 0.125rem rgba(100, 100, 100, 0.2), 0px 0px 0.625rem rgba(117, 182, 214, 0.2);\n}\n@media (min-width: 23.75rem) {\n  .character__card {\n    height: 45vh;\n  }\n}\n@media (min-width: 34.375rem) {\n  .character__card {\n    height: 60vh;\n  }\n}\n@media (min-width: 61.875rem) {\n  .character__card {\n    border: 0.2rem solid #000721;\n    height: 75vh;\n    width: 37vw;\n    max-width: 15.625rem;\n  }\n}\n@media (min-width: 68.75rem) {\n  .character__card {\n    height: 68vh;\n  }\n}\n.character__name {\n  margin: 1vh 0;\n  width: 100%;\n  letter-spacing: 0.08em;\n  font-size: 90%;\n}\n@media (min-width: 34.375rem) {\n  .character__name {\n    margin: 2vh 0;\n    font-size: 100%;\n  }\n}\n.character__avatar {\n  width: 15vh;\n  height: 15vh;\n  border: 0.125rem solid #000721;\n  max-width: 100%;\n  opacity: 0.8;\n  border-radius: 0.625rem;\n  background-color: rgba(0, 7, 33, 0.8);\n}\n@media (min-width: 34.375rem) {\n  .character__avatar {\n    width: 25vh;\n    height: 25vh;\n  }\n}\n.character__health {\n  font-size: 1.1rem;\n  font-weight: normal;\n  width: 90%;\n  text-align: left;\n  margin: 1vh 5%;\n  color: #ccc;\n  letter-spacing: 0.03em;\n}\n@media (min-width: 34.375rem) {\n  .character__health {\n    margin: 2vh 5%;\n  }\n}\n.character__health b {\n  font-weight: bold;\n}\n.character__damage {\n  color: red;\n  margin-left: 0.625rem;\n  font-size: 14px;\n}\n@media (min-width: 34.375rem) {\n  .character__damage {\n    margin-left: 1.25rem;\n    font-size: 18px;\n  }\n}\n.character__health-bar-outer {\n  background: #171217;\n  height: 1vh;\n  width: 90%;\n  margin: 0 5%;\n  border-radius: 0.125rem;\n}\n.character__health-bar-inner {\n  background: #466d34;\n  height: 100%;\n  border-radius: 0.125rem;\n}\n.character__health-bar-inner.danger {\n  background: #d1435f;\n}\n.character__actions {\n  display: flex;\n  justify-content: space-evenly;\n  margin: 0.9375rem 0;\n}\n.character__double-attack {\n  width: 2.5rem;\n  height: 2.5rem;\n  border: 0.125rem solid #fff;\n  border-radius: 50%;\n  padding: 0.3125rem;\n  position: relative;\n  overflow: hidden;\n}\n@media (min-width: 34.375rem) {\n  .character__double-attack {\n    width: 3.125rem;\n    height: 3.125rem;\n  }\n}\n.character__double-attack-content {\n  position: absolute;\n  top: 0.625rem;\n  left: 0;\n  right: 0;\n  z-index: 2;\n  font-size: 16px;\n}\n@media (min-width: 34.375rem) {\n  .character__double-attack-content {\n    top: 0.6875rem;\n    font-size: 1.5rem;\n  }\n}\n.character__double-attack-load {\n  background: green;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  opacity: 0.8;\n}\n.character__shield {\n  width: 2.5rem;\n  height: 2.5rem;\n  border: 0.125rem solid #fff;\n  border-radius: 50%;\n  padding: 0.3125rem;\n  position: relative;\n  overflow: hidden;\n}\n@media (min-width: 34.375rem) {\n  .character__shield {\n    width: 3.125rem;\n    height: 3.125rem;\n  }\n}\n.character__shield-content {\n  position: absolute;\n  top: 0.625rem;\n  left: 0;\n  right: 0;\n  z-index: 2;\n  font-size: 16px;\n}\n@media (min-width: 34.375rem) {\n  .character__shield-content {\n    top: 0.6875rem;\n    font-size: 1.5rem;\n  }\n}\n.character__shield-load {\n  background: green;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  opacity: 0.8;\n}\n.character__dice-container {\n  width: 100%;\n  height: 20%;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: #000721;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 0.7rem;\n  border-bottom-left-radius: 14px;\n  border-bottom-right-radius: 14px;\n}\n@media (min-width: 34.375rem) {\n  .character__dice-container {\n    height: 22%;\n    border-bottom-left-radius: 3px;\n    border-bottom-right-radius: 3px;\n  }\n}\n\nbutton {\n  margin: 1rem 0;\n  font-family: \"MedievalSharp\", cursive;\n  background-color: #fcc02a;\n  border: 0.125rem solid #963404;\n  outline: none;\n  padding-left: 5vw;\n  padding-right: 5vw;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 1.5rem;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  color: #963404;\n  height: 9vh;\n  box-shadow: 0px 0.375rem 0.625rem -0.25rem rgba(0, 0, 0, 0.4);\n}\n@media (min-width: 34.375rem) {\n  button {\n    margin-top: 0;\n  }\n}\n\n.panel {\n  width: 5.5vh;\n  height: 5.5vh;\n  perspective: 400px;\n}\n@media (min-width: 34.375rem) {\n  .panel {\n    width: 8vh;\n    height: 8vh;\n    perspective: 620px;\n  }\n}\n\n.dice {\n  width: 5.5vh;\n  height: 5.5vh;\n  position: relative;\n  transform-style: preserve-3d;\n}\n@media (min-width: 34.375rem) {\n  .dice {\n    width: 8vh;\n    height: 8vh;\n  }\n}\n.dice__side {\n  width: 5.5vh;\n  height: 5.5vh;\n  position: absolute;\n  background-color: green;\n  line-height: 5.5vh;\n}\n@media (min-width: 34.375rem) {\n  .dice__side {\n    width: 8vh;\n    height: 8vh;\n    line-height: 8.5vh;\n  }\n}\n.dice__side--1 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: rotateX(-90deg) translateZ(2.75vh);\n  z-index: 1;\n}\n@media (min-width: 34.375rem) {\n  .dice__side--1 {\n    transform: rotateX(-90deg) translateZ(4vh);\n  }\n}\n.dice__side--2 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: rotateY(180deg) translateZ(2.75vh);\n  z-index: 2;\n}\n@media (min-width: 34.375rem) {\n  .dice__side--2 {\n    transform: rotateY(180deg) translateZ(4vh);\n  }\n}\n.dice__side--3 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: rotateY(90deg) translateZ(2.75vh);\n  z-index: 3;\n}\n@media (min-width: 34.375rem) {\n  .dice__side--3 {\n    transform: rotateY(90deg) translateZ(4vh);\n  }\n}\n.dice__side--4 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: rotateY(0deg) translateZ(2.75vh);\n  z-index: 4;\n}\n@media (min-width: 34.375rem) {\n  .dice__side--4 {\n    transform: rotateY(0deg) translateZ(4vh);\n  }\n}\n.dice__side--5 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: rotateY(-90deg) translateZ(2.75vh);\n  z-index: 5;\n}\n@media (min-width: 34.375rem) {\n  .dice__side--5 {\n    transform: rotateY(-90deg) translateZ(4vh);\n  }\n}\n.dice__side--6 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: rotateX(90deg) translateZ(2.75vh);\n  z-index: 6;\n}\n@media (min-width: 34.375rem) {\n  .dice__side--6 {\n    transform: rotateX(90deg) translateZ(4vh);\n  }\n}\n.dice__num {\n  color: white;\n  font-size: 2rem;\n}\n.dice__num--2 {\n  transform: rotate(180deg);\n}\n.dice__num--3 {\n  transform: rotate(180deg);\n}\n.dice__num--4 {\n  transform: rotate(180deg);\n}\n.dice__num--5 {\n  transform: rotate(180deg);\n}\n\n.dice__side-monster {\n  background-color: #d61b1b;\n}\n\n.dice__side-hero {\n  background-color: #2626b9;\n}\n\n.end-game {\n  margin-top: 25%;\n  text-align: center;\n}\n@media (min-width: 34.375rem) {\n  .end-game {\n    margin-top: 5%;\n    font-size: 1.875rem;\n  }\n}\n\n.end-emoji {\n  font-size: 5rem;\n}\n@media (min-width: 34.375rem) {\n  .end-emoji {\n    margin: 1.875rem;\n    font-size: 11.25rem;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/global/boilerplate.scss","webpack://./src/scss/style.scss","webpack://./src/scss/global/layout.scss","webpack://./src/scss/util/mixins.scss","webpack://./src/scss/components/header.scss","webpack://./src/scss/components/card.scss","webpack://./src/scss/util/colors.scss","webpack://./src/scss/components/button.scss","webpack://./src/scss/components/dice.scss","webpack://./src/scss/components/end.scss"],"names":[],"mappings":"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","sourcesContent":["html {\r\n  font-size: 100%;\r\n  box-sizing: border-box;\r\n}\r\n\r\n*,*::after,*::before {\r\n  box-sizing: inherit;\r\n}\r\n\r\nbody {\r\n  margin: 0;\r\n  padding: 0;\r\n  font-family: 'MedievalSharp', cursive;\r\n  background: rgb(52, 43, 56);\r\n  background: radial-gradient(circle, rgba(51,43,55,1) 0%, rgba(51,43,55,1) 100%);\r\n  color: white;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}","html {\n  font-size: 100%;\n  box-sizing: border-box;\n}\n\n*, *::after, *::before {\n  box-sizing: inherit;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: \"MedievalSharp\", cursive;\n  background: rgb(52, 43, 56);\n  background: radial-gradient(circle, rgb(51, 43, 55) 0%, rgb(51, 43, 55) 100%);\n  color: white;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\nmain .cards {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 2rem;\n}\n@media (min-width: 34.375rem) {\n  main .cards {\n    flex-direction: row;\n    margin: 6vh 5vw;\n    justify-content: center;\n    width: 86vw;\n  }\n}\n\nh1 span {\n  display: inline-block;\n  margin: 0 1.25rem;\n}\n\n.character__card {\n  height: 50vh;\n  width: 54vw;\n  max-width: 14.375rem;\n  padding: 1vh 1vw;\n  font-size: 1.5625rem;\n  border-radius: 0.875rem;\n  position: relative;\n  background: #231d24;\n  text-align: center;\n  border: 0.0625rem solid #000721;\n  box-shadow: inset 0px 0px 0.375rem 0.125rem rgba(100, 100, 100, 0.2), 0px 0px 0.625rem rgba(117, 182, 214, 0.2);\n}\n@media (min-width: 23.75rem) {\n  .character__card {\n    height: 45vh;\n  }\n}\n@media (min-width: 34.375rem) {\n  .character__card {\n    height: 60vh;\n  }\n}\n@media (min-width: 61.875rem) {\n  .character__card {\n    border: 0.2rem solid #000721;\n    height: 75vh;\n    width: 37vw;\n    max-width: 15.625rem;\n  }\n}\n@media (min-width: 68.75rem) {\n  .character__card {\n    height: 68vh;\n  }\n}\n.character__name {\n  margin: 1vh 0;\n  width: 100%;\n  letter-spacing: 0.08em;\n  font-size: 90%;\n}\n@media (min-width: 34.375rem) {\n  .character__name {\n    margin: 2vh 0;\n    font-size: 100%;\n  }\n}\n.character__avatar {\n  width: 15vh;\n  height: 15vh;\n  border: 0.125rem solid #000721;\n  max-width: 100%;\n  opacity: 0.8;\n  border-radius: 0.625rem;\n  background-color: rgba(0, 7, 33, 0.8);\n}\n@media (min-width: 34.375rem) {\n  .character__avatar {\n    width: 25vh;\n    height: 25vh;\n  }\n}\n.character__health {\n  font-size: 1.1rem;\n  font-weight: normal;\n  width: 90%;\n  text-align: left;\n  margin: 1vh 5%;\n  color: #ccc;\n  letter-spacing: 0.03em;\n}\n@media (min-width: 34.375rem) {\n  .character__health {\n    margin: 2vh 5%;\n  }\n}\n.character__health b {\n  font-weight: bold;\n}\n.character__damage {\n  color: red;\n  margin-left: 0.625rem;\n  font-size: 14px;\n}\n@media (min-width: 34.375rem) {\n  .character__damage {\n    margin-left: 1.25rem;\n    font-size: 18px;\n  }\n}\n.character__health-bar-outer {\n  background: #171217;\n  height: 1vh;\n  width: 90%;\n  margin: 0 5%;\n  border-radius: 0.125rem;\n}\n.character__health-bar-inner {\n  background: #466d34;\n  height: 100%;\n  border-radius: 0.125rem;\n}\n.character__health-bar-inner.danger {\n  background: #d1435f;\n}\n.character__actions {\n  display: flex;\n  justify-content: space-evenly;\n  margin: 0.9375rem 0;\n}\n.character__double-attack {\n  width: 2.5rem;\n  height: 2.5rem;\n  border: 0.125rem solid #fff;\n  border-radius: 50%;\n  padding: 0.3125rem;\n  position: relative;\n  overflow: hidden;\n}\n@media (min-width: 34.375rem) {\n  .character__double-attack {\n    width: 3.125rem;\n    height: 3.125rem;\n  }\n}\n.character__double-attack-content {\n  position: absolute;\n  top: 0.625rem;\n  left: 0;\n  right: 0;\n  z-index: 2;\n  font-size: 16px;\n}\n@media (min-width: 34.375rem) {\n  .character__double-attack-content {\n    top: 0.6875rem;\n    font-size: 1.5rem;\n  }\n}\n.character__double-attack-load {\n  background: green;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  opacity: 0.8;\n}\n.character__shield {\n  width: 2.5rem;\n  height: 2.5rem;\n  border: 0.125rem solid #fff;\n  border-radius: 50%;\n  padding: 0.3125rem;\n  position: relative;\n  overflow: hidden;\n}\n@media (min-width: 34.375rem) {\n  .character__shield {\n    width: 3.125rem;\n    height: 3.125rem;\n  }\n}\n.character__shield-content {\n  position: absolute;\n  top: 0.625rem;\n  left: 0;\n  right: 0;\n  z-index: 2;\n  font-size: 16px;\n}\n@media (min-width: 34.375rem) {\n  .character__shield-content {\n    top: 0.6875rem;\n    font-size: 1.5rem;\n  }\n}\n.character__shield-load {\n  background: green;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  opacity: 0.8;\n}\n.character__dice-container {\n  width: 100%;\n  height: 20%;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: #000721;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 0.7rem;\n  border-bottom-left-radius: 14px;\n  border-bottom-right-radius: 14px;\n}\n@media (min-width: 34.375rem) {\n  .character__dice-container {\n    height: 22%;\n    border-bottom-left-radius: 3px;\n    border-bottom-right-radius: 3px;\n  }\n}\n\nbutton {\n  margin: 1rem 0;\n  font-family: \"MedievalSharp\", cursive;\n  background-color: #fcc02a;\n  border: 0.125rem solid #963404;\n  outline: none;\n  padding-left: 5vw;\n  padding-right: 5vw;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 1.5rem;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  color: #963404;\n  height: 9vh;\n  box-shadow: 0px 0.375rem 0.625rem -0.25rem rgba(0, 0, 0, 0.4);\n}\n@media (min-width: 34.375rem) {\n  button {\n    margin-top: 0;\n  }\n}\n\n.panel {\n  width: 5.5vh;\n  height: 5.5vh;\n  perspective: 400px;\n}\n@media (min-width: 34.375rem) {\n  .panel {\n    width: 8vh;\n    height: 8vh;\n    perspective: 620px;\n  }\n}\n\n.dice {\n  width: 5.5vh;\n  height: 5.5vh;\n  position: relative;\n  transform-style: preserve-3d;\n}\n@media (min-width: 34.375rem) {\n  .dice {\n    width: 8vh;\n    height: 8vh;\n  }\n}\n.dice__side {\n  width: 5.5vh;\n  height: 5.5vh;\n  position: absolute;\n  background-color: green;\n  line-height: 5.5vh;\n}\n@media (min-width: 34.375rem) {\n  .dice__side {\n    width: 8vh;\n    height: 8vh;\n    line-height: 8.5vh;\n  }\n}\n.dice__side--1 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: rotateX(-90deg) translateZ(2.75vh);\n  z-index: 1;\n}\n@media (min-width: 34.375rem) {\n  .dice__side--1 {\n    transform: rotateX(-90deg) translateZ(4vh);\n  }\n}\n.dice__side--2 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: rotateY(180deg) translateZ(2.75vh);\n  z-index: 2;\n}\n@media (min-width: 34.375rem) {\n  .dice__side--2 {\n    transform: rotateY(180deg) translateZ(4vh);\n  }\n}\n.dice__side--3 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: rotateY(90deg) translateZ(2.75vh);\n  z-index: 3;\n}\n@media (min-width: 34.375rem) {\n  .dice__side--3 {\n    transform: rotateY(90deg) translateZ(4vh);\n  }\n}\n.dice__side--4 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: rotateY(0deg) translateZ(2.75vh);\n  z-index: 4;\n}\n@media (min-width: 34.375rem) {\n  .dice__side--4 {\n    transform: rotateY(0deg) translateZ(4vh);\n  }\n}\n.dice__side--5 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: rotateY(-90deg) translateZ(2.75vh);\n  z-index: 5;\n}\n@media (min-width: 34.375rem) {\n  .dice__side--5 {\n    transform: rotateY(-90deg) translateZ(4vh);\n  }\n}\n.dice__side--6 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: rotateX(90deg) translateZ(2.75vh);\n  z-index: 6;\n}\n@media (min-width: 34.375rem) {\n  .dice__side--6 {\n    transform: rotateX(90deg) translateZ(4vh);\n  }\n}\n.dice__num {\n  color: white;\n  font-size: 2rem;\n}\n.dice__num--2 {\n  transform: rotate(180deg);\n}\n.dice__num--3 {\n  transform: rotate(180deg);\n}\n.dice__num--4 {\n  transform: rotate(180deg);\n}\n.dice__num--5 {\n  transform: rotate(180deg);\n}\n\n.dice__side-monster {\n  background-color: #d61b1b;\n}\n\n.dice__side-hero {\n  background-color: #2626b9;\n}\n\n.end-game {\n  margin-top: 25%;\n  text-align: center;\n}\n@media (min-width: 34.375rem) {\n  .end-game {\n    margin-top: 5%;\n    font-size: 1.875rem;\n  }\n}\n\n.end-emoji {\n  font-size: 5rem;\n}\n@media (min-width: 34.375rem) {\n  .end-emoji {\n    margin: 1.875rem;\n    font-size: 11.25rem;\n  }\n}","@use '../util' as *;\r\n\r\nmain {\r\n  display:flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n\r\n  .cards {\r\n    display:flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 2rem;\r\n\r\n    @include breakpoints_up(rem(550)) {\r\n      flex-direction: row;\r\n      margin:6vh 5vw;\r\n      justify-content: center;\r\n      width:86vw;\r\n    }\r\n  }\r\n} \r\n\r\n","@use 'functions' as *;\r\n\r\n@mixin breakpoints-up($size) {\r\n  @media (min-width: $size) {\r\n    @content;\r\n  }\r\n}\r\n\r\n@mixin breakpoints-down($size) {\r\n  @media (max-width: $size) {\r\n    @content;\r\n  }\r\n}\r\n\r\n@mixin displayFlexCenter() {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n@mixin smallDice() {\r\n  width: 5.5vh;\r\n  height: 5.5vh;\r\n}\r\n\r\n@mixin bigDice() {\r\n  width: 8vh;\r\n  height: 8vh;\r\n}\r\n\r\n@mixin actions($action) {\r\n  &__#{$action} {\r\n    width: rem(40);\r\n    height: rem(40);\r\n    border: rem(2) solid #fff;\r\n    border-radius: 50%;\r\n    padding: rem(5);\r\n    position: relative;\r\n    overflow: hidden;\r\n\r\n    @include breakpoints_up(rem(550)) {\r\n      width: rem(50);\r\n      height: rem(50);\r\n    }\r\n  }\r\n\r\n  &__#{$action}-content {\r\n    position: absolute;\r\n    top: rem(10);\r\n    left: 0;\r\n    right: 0;\r\n    z-index: 2;\r\n    font-size: 16px;\r\n\r\n    \r\n    @include breakpoints_up(rem(550)) {\r\n      top: rem(11);\r\n      font-size: rem(24);\r\n    }\r\n  }\r\n\r\n  &__#{$action}-load {\r\n    background: green;\r\n    // height: 100%;\r\n    position: absolute;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\r\n    opacity: 0.8;\r\n  }\r\n}","@use '../util' as *;\r\n\r\nh1 span {\r\n  display: inline-block;\r\n  margin: 0 rem(20);\r\n}","@use '../util' as *;\r\n\r\n.character {\r\n  &__card {\r\n    height: 50vh;\r\n    width:54vw;\r\n    max-width: rem(230);\r\n    padding: 1vh 1vw;\r\n    font-size: rem(25);\r\n    border-radius: rem(14);\r\n    position: relative;\r\n    background: #231d24;\r\n    text-align: center;\r\n    border: rem(1) solid $card-border;\r\n    box-shadow: inset 0px 0px rem(6) rem(2) rgba(100,100,100,0.2),\r\n    0px 0px rem(10) rgba(117,182,214,0.2);\r\n\r\n    @include breakpoints_up(rem(380)) {\r\n      height:45vh;\r\n    }\r\n\r\n    @include breakpoints_up(rem(550)) {\r\n      height:60vh;\r\n    }\r\n\r\n    @include breakpoints_up(rem(990)) {\r\n      border: 0.2rem solid $card-border;\r\n      height:75vh;\r\n      width:37vw;\r\n      max-width: rem(250);\r\n    }\r\n\r\n    @include breakpoints_up(rem(1100)) {\r\n      height:68vh;\r\n    }\r\n  }\r\n\r\n  &__name {\r\n    margin: 1vh 0;\r\n    width:100%;\r\n    letter-spacing: 0.08em;\r\n    font-size: 90%;\r\n\r\n    @include breakpoints_up(rem(550)) {\r\n      margin: 2vh 0;\r\n      font-size: 100%;\r\n    }\r\n  }\r\n\r\n  &__avatar {\r\n    width: 15vh;\r\n    height: 15vh;\r\n    border: rem(2) solid $card-border;\r\n    max-width:100%;\r\n    opacity: 0.8;\r\n    border-radius: rem(10);\r\n    background-color: rgba(0, 7, 33, 0.8);\r\n    \r\n    @include breakpoints_up(rem(550)) {\r\n      width: 25vh;\r\n      height: 25vh;\r\n    }\r\n  }\r\n\r\n  &__health {\r\n    font-size:1.1rem;\r\n    font-weight: normal;\r\n    width:90%;\r\n    text-align: left;\r\n    margin: 1vh 5%;\r\n    color:#ccc;\r\n    letter-spacing: 0.03em;\r\n\r\n    @include breakpoints_up(rem(550)) {\r\n      margin: 2vh 5%;\r\n    }\r\n\r\n    & b {\r\n      font-weight: bold;\r\n    }\r\n  }\r\n\r\n  &__damage {\r\n    color: red;\r\n    margin-left: rem(10);\r\n    font-size: 14px;\r\n    \r\n    @include breakpoints_up(rem(550)) {\r\n      margin-left: rem(20);\r\n      font-size: 18px;\r\n    }\r\n  }\r\n\r\n  &__health-bar-outer {\r\n    background: #171217;\r\n    height: 1vh;\r\n    width:90%;\r\n    margin: 0 5%;\r\n    border-radius: rem(2);\r\n  }\r\n\r\n  &__health-bar-inner {\r\n    background: #466d34;\r\n    height: 100%;\r\n    border-radius: rem(2);\r\n\r\n    &.danger {\r\n      background:#d1435f;\r\n    }\r\n  }\r\n\r\n  &__actions {\r\n    display: flex;\r\n    justify-content: space-evenly;\r\n    margin: rem(15) 0;\r\n  }\r\n\r\n  @include actions(double-attack);\r\n  @include actions(shield);\r\n\r\n  &__dice-container {\r\n    width:100%;\r\n    height: 20%;\r\n    position: absolute;\r\n    bottom:0;\r\n    left:0;\r\n    right:0;\r\n    background: $card-border;\r\n    @include displayFlexCenter();\r\n    gap: .7rem;\r\n    border-bottom-left-radius: 14px;\r\n    border-bottom-right-radius: 14px;\r\n\r\n    \r\n    @include breakpoints_up(rem(550)) {\r\n        height: 22%;\r\n        border-bottom-left-radius: 3px;\r\n        border-bottom-right-radius: 3px;\r\n    }\r\n  }\r\n}","$card-border: #000721;\r\n$button-text: #963404;\r\n$monster-dice:#d61b1b;\r\n$hero-dice:#2626b9;","@use '../util' as *;\r\n\r\nbutton {\r\n  margin: rem(16) 0;\r\n  font-family: 'MedievalSharp', cursive;\r\n  background-color: #fcc02a;\r\n  border: rem(2) solid #963404;\r\n  outline: none;\r\n  padding-left:5vw;\r\n  padding-right:5vw;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  display: inline-block;\r\n  font-size: rem(24);\r\n  border-radius: rem(6);\r\n  cursor: pointer;\r\n  color:#963404;\r\n  height:9vh;\r\n  box-shadow: 0px rem(6) rem(10) rem(-4) rgba(0,0,0,0.4);\r\n\r\n  @include breakpoints_up(rem(550)) {\r\n    margin-top: 0;\r\n  }\r\n}","@use '../util' as *;\r\n\r\n\r\n.panel {\r\n  // border-radius: rem(10);\r\n  @include smallDice();\r\n  perspective: 400px;  \r\n  \r\n  @include breakpoints_up(rem(550)) {\r\n    @include bigDice();\r\n    perspective: 620px;\r\n  }\r\n}\r\n\r\n\r\n.dice {\r\n  @include smallDice();\r\n  position: relative;\r\n  transform-style: preserve-3d;\r\n  // transform: translateZ(-20px) rotateY(0deg) rotateX(90deg);\r\n  // transition: transform 1s;  \r\n    \r\n  @include breakpoints_up(rem(550)) {\r\n    @include bigDice();\r\n  }\r\n\r\n  &__side {\r\n    @include smallDice();\r\n    position: absolute;\r\n    background-color: green;\r\n    // border-radius: rem(5);\r\n    line-height: 5.5vh;\r\n    \r\n    @include breakpoints_up(rem(550)) {\r\n      @include bigDice();\r\n      line-height: 8.5vh;\r\n    }\r\n\r\n    &--1 {\r\n      @include displayFlexCenter();\r\n      transform: rotateX(-90deg) translateZ(2.75vh);\r\n      z-index: 1;\r\n\r\n      @include breakpoints_up(rem(550)) {\r\n        transform: rotateX(-90deg) translateZ(4vh);\r\n      }\r\n    }\r\n    &--2 {\r\n      @include displayFlexCenter();\r\n      transform: rotateY(180deg) translateZ(2.75vh);\r\n      z-index: 2;\r\n\r\n      @include breakpoints_up(rem(550)) {\r\n        transform: rotateY(180deg) translateZ(4vh);\r\n      }\r\n    }\r\n    &--3 {\r\n      @include displayFlexCenter();\r\n      transform: rotateY(90deg) translateZ(2.75vh);\r\n      z-index: 3;\r\n\r\n      @include breakpoints_up(rem(550)) {\r\n        transform: rotateY(90deg) translateZ(4vh);\r\n      }\r\n    }\r\n    &--4 {\r\n      @include displayFlexCenter();\r\n      transform: rotateY(0deg) translateZ(2.75vh);\r\n      z-index: 4;\r\n\r\n      @include breakpoints_up(rem(550)) {\r\n        transform: rotateY(0deg) translateZ(4vh);\r\n      }\r\n    }\r\n    &--5 {\r\n      @include displayFlexCenter();\r\n      transform: rotateY(-90deg) translateZ(2.75vh);\r\n      z-index: 5;\r\n\r\n      @include breakpoints_up(rem(550)) {\r\n        transform: rotateY(-90deg) translateZ(4vh);\r\n      }\r\n    }\r\n    &--6 {\r\n      @include displayFlexCenter();\r\n      transform: rotateX(90deg) translateZ(2.75vh);\r\n      z-index: 6;\r\n\r\n      @include breakpoints_up(rem(550)) {\r\n        transform: rotateX(90deg) translateZ(4vh);\r\n      }\r\n    }\r\n  }\r\n  \r\n  &__num {\r\n    color: white;\r\n    font-size: 2rem;\r\n\r\n    @for $i from 2 through 5 {\r\n      &--#{$i} {\r\n        transform: rotate(180deg);\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.dice__side-monster {\r\n  background-color: $monster-dice;\r\n}\r\n.dice__side-hero {\r\n  background-color: $hero-dice;\r\n}\r\n","@use '../util' as *;\r\n\r\n.end-game{\r\n  margin-top: 25%;\r\n  text-align: center;\r\n\r\n  @include breakpoints_up(rem(550)) {\r\n    margin-top: 5%;\r\n    font-size: rem(30);\r\n  }\r\n}\r\n\r\n.end-emoji{\r\n  font-size: rem(80);\r\n\r\n  @include breakpoints_up(rem(550)) {\r\n    margin: rem(30);\r\n    font-size: rem(180);\r\n  }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/images/demon.png":
/*!*************************************!*\
  !*** ./src/assets/images/demon.png ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "demon.png";

/***/ }),

/***/ "./src/assets/images/goblin.png":
/*!**************************************!*\
  !*** ./src/assets/images/goblin.png ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "goblin.png";

/***/ }),

/***/ "./src/assets/images/knight.png":
/*!**************************************!*\
  !*** ./src/assets/images/knight.png ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "knight.png";

/***/ }),

/***/ "./src/assets/images/orc.png":
/*!***********************************!*\
  !*** ./src/assets/images/orc.png ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "orc.png";

/***/ }),

/***/ "./src/assets/images/wizard.png":
/*!**************************************!*\
  !*** ./src/assets/images/wizard.png ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "wizard.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ "./src/scss/style.scss");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data.js */ "./src/js/data.js");
/* harmony import */ var _Character_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Character.js */ "./src/js/Character.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/js/util.js");




document.getElementById('attackButton').addEventListener('click', attack);
var isWaiting = false;
var heroesArray = ["knight", "wizard"];
var monstersArray = ["orc", "demon", "goblin"];

function getNewCharacter(charactersArray) {
  var nextCharacterData = _data_js__WEBPACK_IMPORTED_MODULE_1__["default"][charactersArray.shift()];
  return nextCharacterData ? new _Character_js__WEBPACK_IMPORTED_MODULE_2__["default"](nextCharacterData) : {};
}

function attack() {
  if (!isWaiting) {
    isWaiting = true;
    hero.resetDiceHtml();
    monster.resetDiceHtml();
    render();
    hero.setDiceHtml();
    monster.setDiceHtml();
    hero.takeDamage(monster.currentDiceScore, hero.currentDiceScore);
    monster.takeDamage(hero.currentDiceScore, monster.currentDiceScore);

    if (hero.doubleAttackLoad >= hero.fullLoad && monster.shieldLoad < monster.fullLoad && monster.doubleAttackLoad >= monster.fullLoad && hero.shieldLoad < hero.fullLoad) {
      (0,_util__WEBPACK_IMPORTED_MODULE_3__.doubleAttackWithoutShield)(hero, monster);
      (0,_util__WEBPACK_IMPORTED_MODULE_3__.doubleAttackWithoutShield)(monster, hero);
    } else if (hero.doubleAttackLoad >= hero.fullLoad && monster.shieldLoad < monster.fullLoad) {
      (0,_util__WEBPACK_IMPORTED_MODULE_3__.doubleAttackWithoutShield)(hero, monster);
    } else if (hero.doubleAttackLoad >= hero.fullLoad && monster.shieldLoad >= monster.fullLoad) {
      (0,_util__WEBPACK_IMPORTED_MODULE_3__.doubleAttackWithShield)(hero, monster);
    } else if (monster.doubleAttackLoad >= monster.fullLoad && hero.shieldLoad < hero.fullLoad) {
      (0,_util__WEBPACK_IMPORTED_MODULE_3__.doubleAttackWithoutShield)(monster, hero);
    } else if (monster.doubleAttackLoad >= monster.fullLoad && hero.shieldLoad >= hero.fullLoad) {
      (0,_util__WEBPACK_IMPORTED_MODULE_3__.doubleAttackWithShield)(monster, hero);
    }

    hero.loadAction();
    monster.loadAction();
    setTimeout(function () {
      render();
      isWaiting = false;

      if (hero.health === 0 || monster.health === 0) {
        isWaiting = true;
      }
    }, 1600);

    if (hero.dead && monster.dead) {
      isWaiting = true;

      if (heroesArray.length > 0) {
        setTimeout(function () {
          hero = getNewCharacter(heroesArray);
          render();
          isWaiting = false;
        }, 3500);
      } else {
        endGame();
      }

      if (monstersArray.length > 0) {
        setTimeout(function () {
          monster = getNewCharacter(monstersArray);
          render();
          isWaiting = false;
        }, 3500);
      } else {
        endGame();
      }
    } else if (hero.dead) {
      isWaiting = true;

      if (heroesArray.length > 0) {
        setTimeout(function () {
          hero = getNewCharacter(heroesArray);
          render();
          isWaiting = false;
        }, 3500);
      } else {
        endGame();
      }
    } else if (monster.dead) {
      isWaiting = true;

      if (monstersArray.length > 0) {
        setTimeout(function () {
          monster = getNewCharacter(monstersArray);
          render();
          isWaiting = false;
        }, 3500);
      } else {
        endGame();
      }
    }
  }
}

function endGame() {
  var endMessage = hero.health === 0 && monster.health === 0 ? "No victors - all creatures are dead" : hero.health > 0 ? "The heroes are Victorious" : "The monsters are Victorious";
  var endEmoji = hero.health > 0 ? "🔮" : "☠️";
  setTimeout(function () {
    document.body.innerHTML = "\n    <div class=\"end-game\">\n    <h2>Game Over</h2> \n    <h3>".concat(endMessage, "</h3>\n    <p class=\"end-emoji\">").concat(endEmoji, "</p>\n    </div>\n    \n    <section id=\"actions\">\n    <button id=\"play-button\">Play again</button>\n    </section>\n    ");
    document.getElementById('play-button').addEventListener('click', playAgain);
  }, 5000);
}

function playAgain() {
  isWaiting = false;
  document.body.innerHTML = "\n  <header>\n  <h1>Heroes<span>vs</span>Monsters</h1>\n</header>\n<main>\n  <section class=\"cards\">\n    <div id=\"hero\" class=\"character\"></div>\n    <div id=\"monster\" class=\"character\"></div>\n  </section>\n\n  <section class=\"actions\">\n    <button id=\"attack-button\">Attack</button>\n  </section>\n</main>\n  ";
  heroesArray = ["knight", "wizard"];
  monstersArray = ["orc", "demon", "goblin"];
  hero = getNewCharacter(heroesArray);
  monster = getNewCharacter(monstersArray);
  hero.getNewGame();
  monster.getNewGame();
  document.getElementById('attack-button').addEventListener('click', attack);
  render();
}

function render() {
  document.getElementById('hero').innerHTML = hero.getCharacterHtml();
  document.getElementById('monster').innerHTML = monster.getCharacterHtml();
}

var hero = getNewCharacter(heroesArray);
var monster = getNewCharacter(monstersArray);
render();
})();

/******/ })()
;
//# sourceMappingURL=bundle803f09b1de766fe3e9fe.js.map