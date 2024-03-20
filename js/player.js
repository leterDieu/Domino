class Player {
    constructor(name, hp, mana, table) {
        this.name = name
        this.healthpoint = hp
        this.mana = mana
        this.table = table
    }

    pushCard(card) {
        this.table.addCard(card)
    }

    showCards() {
        return this.table.showcontent()
    }
}

class Table {
    constructor() {
        this.content = []
    }

    addCard(card) {
        this.content.push(card)
    }

    basicSpellChecks() {
        for (let card in this.content) {
            card.useSpell()
        }
    }

    showcontent() {
        let elements = []
        for (let el in this.content) {
            elements.push(el)
        }
        return elements
    }
}
