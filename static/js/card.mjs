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
        your_table.content.splice(your_table.content.indexOf(this), 1)
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

    getMorale(amount) {
        if (this.morale + amount > 100) {
            this.morale = 100
        } else {
            this.morale += amount
        }
    }

    attackMorale(value) {
        this.morale -= value
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

    checkMorale(your_table) {
        super.checkMorale(your_table);
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

    getMorale(amount) {
        super.getMorale(amount);
    }
}

class LemanRuss extends Card {
    constructor() {  // особенность - наличие морали.
        super("leman russ", 8, 4, 8, []);
        this.morale = 50
        this.lasttimefired = -10
    }

    router(type, your_table=null, attacked_card=null,  enemy_table=null) {
        if (type === "basic"){
            this.guardsmenShieldAndFaith(your_table)
        } else if (type === "atk") {
            this.mainCaliber(your_table, attacked_card)
        } else {

        }
    }

    guardsmenShieldAndFaith(your_table) {
        for (let i = 0; i < your_table.content.length; i++) {
            let card = your_table.content[i]
            if (card.name === "guardians") {
                if (!card.conditions.includes("shield and faith")) {
                    card.conditions.push("shield and faith")
                    card.hp += 1
                }
            }
        }
    }

    mainCaliber(your_table, attacked_card) {
        if (your_table.move - this.lasttimefired === 3) {
            attacked_card.hp -= 2
            this.lasttimefired = your_table.move
        }
    }

    tryKilling(your_table) {
        for (let i = 0; i < your_table.content.length; i++) {
            let card = your_table.content[i]
            if (card.name === "guardians") {
                card.conditions.splice(card.conditions.indexOf("shield and faith"), 1)
                card.hp -= 1
                your_table.checkHealthPoints()
            }
        }
        super.tryKilling(your_table);
    }

    getMorale(amount) {
        super.getMorale(amount / 2);
    }

    attackMorale() {
        super.attackMorale(10);
    }
}

class Kirill extends Card {
    constructor() {  // особенность - наличие морали.
        super("kirill", 8, 1, 3, ["defender"]);
        this.clapchance = 20
    }

    router(type, your_table=null, attacked_card=null,  enemy_table=null) {
        if (type === "basic"){
            this.defenderCard(your_table)
            this.ehBrothers(your_table)
        } else if (type === "atk") {
            this.brothersClap(attacked_card)
        } else {

        }
    }

    defenderCard(your_table) {
        for (let i = 0; i < your_table.content.length; i++) {
            let card = your_table.content[i]
            if ((!card.conditions.includes("defended")) && (card !== this)) {
                card.conditions.push("defended")
            }
        }
    }

    ehBrothers(your_table) {
        let self_index = your_table.content.indexOf(this)
        let left_index = self_index - 1
        let right_index = self_index + 1
        let cards_am = your_table.content.length

        if (right_index < cards_am) {
            let right_card = your_table.content[right_index]
            if (!right_card.conditions.includes("eh brothers")) {
                right_card.conditions.push("eh brothers")
                right_card.hp += 2
            }
        }

        if (left_index > 0) {
            let left_card = your_table.content[left_index]
            if (!left_card.conditions.includes("eh brothers")) {
                left_card.conditions.push("eh brothers")
                left_card.hp += 2
            }
        }
    }

    brothersClap(attacked_card) {
        let random = Math.round(Math.random() * 100)
        if (random <= this.clapchance) {
            if (!attacked_card.conditions.includes("stunned")) {
                attacked_card.content.push("stunned")
            }
        } else {
            this.clapchance += 15
        }
    }

    tryKilling(your_table) {
        super.tryKilling(your_table);
        let defenders = 0
        for (let i = 0; i < your_table.content.length; i++) {
            if (your_table.content[i].conditions.includes("defender")) {
                defenders += 1
            }
        }
        if (defenders === 0) {
           for (let i = 0; i < your_table.content.length; i++) {
                your_table.content[i].conditions.splice(your_table.content[i].conditions.indexOf("defended"), 1)
            }
        }
    }
}


class Glafira extends Card {
    constructor() {
        super("glafira", 1, 2, 2, []);
        this.height_chance = 33
        this.voice_chance = 25
    }

    router(type, your_table=null, attacked_card=null,  enemy_table=null) {
        if (type === "basic"){

        } else if (type === "atk") {
            this.deafeningVoice(attacked_card)
        } else {

        }
    }

    deafeningVoice(attacked_card) {
        let random = Math.round(Math.random() * 100)
        if (random <= this.voice_chance) {
            if (!attacked_card.conditions.includes("stunned")) {
                attacked_card.content.push("stunned")
            }
        } else {
            // didn't stun
        }
    }

    tryKilling(your_table) {
        let random = Math.round(Math.random() * 100)
        if (random <= this.height_chance) {
            // miss
        } else {
            super.tryKilling(your_table);
        }
    }
}

class Sonya extends Card {
    constructor() {
        super("sonya", 2, 1, 2, []);
        this.lesson_skip_chance = 70
        this.jewish_chance = 70
        this.turn = 0
    }

    router(type, your_table=null, attacked_card=null,  enemy_table=null) {
        if (type === "basic"){
            this.turn += 1
        } else if (type === "atk") {
            this.jewishBlood(attacked_card)
        } else {

        }
    }

    jewishBlood(attacked_card) { // AKA bash
        let random = Math.round(Math.random() * 100)
        if (random <= this.jewish_chance) {
            attacked_card.hp -= this.atk
            this.jewishBlood()
        } else {
            // bash didn't proknul
        }
    }

    tryKilling(your_table) {
        let random = Math.round(Math.random() * 100)
        if (random <= this.lesson_skip_chance * Math.pow(0.7, this.turn)) {
            // miss
        } else {
            super.tryKilling(your_table);
        }
    }
}

class Jinni extends Card {
    constructor() {
        super("jinni", 2, 2, 3, []);
        this.confussion_chance = 30
        this.c_hp = this.hp
    }

    router(type, your_table=null, attacked_card=null,  enemy_table=null) {
        if (type === "basic"){
            this.combo(your_table)
        } else if (type === "atk") {
            this.whatLangIsIt(attacked_card)
        } else {

        }
    }

    whatLangIsIt(attacked_card) {
        let random = Math.round(Math.random() * 100)
        if (random <= this.confussion_chance) {
            attacked_card.content.push("stunned")
        } else {

        }
    }

    combo(your_table) {
        if (this.hp > this.c_hp) {
            this.hp = this.c_hp
        }
        for (let i = 0; i < your_table.content.length; i++) {
            if (your_table.content[i].name === "ira"){
                this.hp += 2
                break
            }
        }

    }

    tryKilling(your_table) {
        super.tryKilling(your_table);
    }
}

class Boris extends Card {
    constructor() {
        super("jinni", 3, 2, 4, []);
        this.mark_five_chance = 70
        this.miss_chance = 25
        this.deadly_list = ['vladislav', 'biolog', 'englich']
        this.c_hp = this.hp
        this.c_atk = this.atk
    }

    router(type, your_table=null, attacked_card=null,  enemy_table=null) {
        this.attacked_card_name = attacked_card.name
        if (type === "basic"){
            this.borisPossible(your_table)
            this.gangersLesson(your_table)
        } else if (type === "atk") {

        } else {

        }
    }

    gangersLesson(your_table) {
        let unique = []
        let more = []
        for (let i = 0; i < your_table.content.length; i++) {
            if (unique.includes(your_table[i].name)) {
                more.push(unique.indexOf(your_table[i].name))
                more.push(i)
            } else {
                unique.push(your_table[i].name)
            }
        }
        for (let i = 0; i < more.content.length; i++) {
            your_table[i] = Math.round(your_table * 0.5)
        }
    }

    borisPossible(your_table) {
        if (this.hp > this.c_hp) {
            this.hp = this.c_hp
        }

        if (this.atk > this.c_atk) {
            this.atk = this.c_atk
        }

        for (let i = 0; i < your_table.content.length; i++) {
            if (your_table.content[i].name === "natalya"){
                let random = Math.round(Math.random() * 100)
                if (random <= this.mark_five_chance) {
                    this.hp += 2
                } else {
                    this.hp -= 2
                    this.atk -= 1
                }
                break
            }
        }
    }

    tryKilling(your_table) {
        if (this.deadly_list.includes(this.attacked_card_name)) {
            let random = Math.round(Math.random() * 100)
            if (random <= this.miss_chance) {
                // miss
        } else {
            super.tryKilling(your_table);
            super.tryKilling(your_table);
            }
        }
    }
}


export { Guardsman, LemanRuss, Kirill, Glafira, Sonya, Jinni, Boris }