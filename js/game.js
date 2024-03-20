// import { Guardsman } from "./cards"
// import { Player, Table } from "./player"

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

class Card {
    constructor(hp, atk, cst, basic_spells, atk_spells, def_spells) {
        this.atk = atk
        this.hp = hp
        this.cst = cst
        this.basic_spells = basic_spells
        this.atk_spells = atk_spells
        this.def_spells = def_spells
    }

    useSpell(){
        return 0
    }
}

class Guardsman extends Card{
    constructor(name) {
        super(3, 2, 2, null, null, null);
    }
}

let my_table = new Table()
let me = new Player("got", 10, 10, my_table)
let unit1 = new Guardsman("Василий")
let unit2 = new Guardsman("Иван")
me.pushCard(unit1)
me.pushCard(unit2)
console.log(me.tabled_cards())