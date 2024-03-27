import {Guardsman} from "./card.mjs";

export function rollDice(max_value) { // рандомное число от 0 до max_value-1
    return Math.floor(Math.random() * max_value);
}


export class Table {
    constructor(name, hp, mana, deck) {
        this.content = []
        this.hand = []
        this.deck = deck
        this.hp = hp
        this.mana = mana
        this.name = name
        this.move = 0
    }

    killCard(card_id) { // отсчёт очевидно начинается с нуля
        for (let i = 0; i < this.content.length; i++) {
            if (this.content[i].morale != null) {
                this.content[i].attackMorale(this.content[card_id])
            }
        }
        this.content[card_id].tryKilling(this)
    }

    fillHandFromDeck() {
        let type = this.deck[rollDice(this.deck.length)]
        let card = new type()
        this.hand.push(card)
        // return card
        // раскоменьтите сверху, дорогие фронтендеры, если вам это понадобиться
    }

    adminfiller(card_type_class) { // УДАЛИТЬ ПОСЛЕ ЗАВЕРШЕНИЯ РАЗРАБОТКИ
        this.hand.push(new card_type_class())
    }

    addCard(id) {
        let card = this.hand[id]
        if (this.mana >= card.cst) {
            this.content.push(card)
            this.hand.splice(id, 1)
            this.mana -= card.cst
            return 0
        } else {
            return 1
        }
    }

    showContent() {
        return this.content
    }

    showHand() {
        return this.hand
    }

    doBasicSpells() {
        for (let i = 0; i < this.content.length; i++) {
            this.content[i].router("basic", this)
        }
    }

    checkMorale() {
        for (let i = 0; i < this.content.length; i++) {
            let card = this.content[i]
            if (card.morale != null) {
                card.checkMorale()
            }
        }
    }

    checkHealthPoints() {
        for (let i = 0; i < this.content.length; i++) {
            if (this.content[i].hp <= 0) {
                this.killCard(i)
            }
        }
    }

    attack(attacker_card_id, enemy_table, defender_card_id) {
        let yours = this.content[attacker_card_id]
        if (!yours.conditions.includes("stunned")) {
            if (defender_card_id !== "table"){
                let enemy = enemy_table.content[defender_card_id]

                if (enemy.conditions.includes("defended")) {
                    return 1
                }

                yours.router("atk", enemy)
                enemy.router("def")

                if (enemy.hp <= yours.atk) {
                    enemy_table.killCard(defender_card_id)
                } else {
                    enemy.hp = enemy.hp - yours.atk
                }
                return 0
            } else {
                if (enemy_table.hp <= yours.atk) {
                    enemy_table.hp = 0
                } else {
                    enemy_table.hp = enemy_table.hp - yours.atk
                }
                return 1
            }
        }
    }
}
