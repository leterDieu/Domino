import { Guardsman } from "./card.mjs"
import { Player, Table } from "./player.mjs"

let my_table = new Table()
let me = new Player("AI", 10, 10, my_table)
let unit1 = new Guardsman(me.name)
let unit2 = new Guardsman(me.name)
me.pushCard(unit1)
me.pushCard(unit2)
console.log(me.tabled_cards())  