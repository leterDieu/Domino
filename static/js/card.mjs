import {Table} from "./table.mjs";

class Card {
    constructor(name, hp, atk, cst, conditions) {
        this.name = name
        this.atk = atk
        this.hp = hp
        this.cst = cst
        this.morale = null
        this.conditions = conditions
    }

    tryKilling(your_table) {
        your_table.killCard(your_table.content.indexOf(this))
    }
}

class Guardsman extends Card{
    constructor() {  // особенность - наличие морали.
        super("guardians", 3, 2, 2, []);
        this.morale = 50
    }

    router(type, your_table=null, enemy_table=null, attacker_card=null) { // маршрутизатор для разных видов спеллов
        if (type === "basic"){
            this.spellCadiaStands(your_table)
        } else if (type === "atk") {

        } else {

        }
    }

    spellCadiaStands(your_table) { // простейшая проверка на наличие трёх кард в колоде (минмум). Я НЕ ПРИДУМАЛ, как можно сделать крокто и ясно без прохождния. Свалил это на Сашу. Теперь ждём.
        if (!this.conditions.includes("Cadia Stands")) {
            let cnt = 0
            for (let i = 0; i < your_table.content.length; i++) {
                if (your_table.content[i].name === "guardians"){
                    cnt++
                }
            }
            if (cnt >= 3) {
                this.conditions.push("Cadia Stands")
                this.hp += 1
            }
        }
    }

    checkMorale(your_table) { // сначала проверка причин сохранять повышенную мораль. Дальше по тексту
        if ((this.morale < 80) && (this.conditions.includes("Morale-upped"))) {
            this.conditions.splice(this.conditions.indexOf("Morale-upped")) // господи прости нас
            this.atk -= 1
        } else if (this.morale <= 20) {
            let chance = Math.round(Math.random() * 100)
            if (chance >= this.morale) {
                this.tryKilling(your_table)
            }
        } else if (this.morale >= 80) {
            if (!this.conditions.includes("Morale-upped")) {
                this.conditions.push("Morale-upped")
                this.atk += 1
            }
        }
    }

    tryKilling(your_table) {
        super.tryKilling(your_table);
    }

    attackMorale(card) { // по факту спелл карты, который мне лень прописывать отдельно (+это не оправдано). std morale = -20.
        if (card.conditions.includes("leader card")) {
            this.morale -= 40
        } else {
            this.morale -= 10
        }
        return card
    }
}

export { Guardsman }