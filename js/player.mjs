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

    tabled_cards(){
        return this.table.showContent()
    }
}

class Table {
    constructor() {
        this.content = []
    }

    addCard(card) {
        this.content.push(card)
    }

    showContent() {
        return this.content
    }
}

export { Player, Table }