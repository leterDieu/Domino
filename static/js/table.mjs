export class Table {
    constructor(name, hp, mana) {
        this.content = []
        this.hp = hp
        this.mana = mana
        this.name = name
    }

    killCard(card_id) { // отсчёт очевидно начинается с нуля
        this.content.splice(card_id, 1)
    }

    addCard(card) {
        if (this.mana >= card.cst){
            this.content.push(card)
            this.mana = this.mana - card.cst
            return 0
        } else {
            return 1
        }
    }

    showContent() {
        return this.content
    }

    attack(attacker_card_id, enemy_table, defender_card_id) {
        let yours = this.content[attacker_card_id]
        if (defender_card_id !== "table"){
            let enemy = enemy_table.content[defender_card_id]
            if (enemy.hp <= yours.atk) {
                enemy_table.killCard(defender_card_id)
            } else {
                enemy.hp = enemy.hp - yours.atk
            }
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