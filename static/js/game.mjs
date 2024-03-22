import { Guardsman } from "./card.mjs"
import {Table} from "./table.mjs"

let aitable = new Table("AI", 10, 2)
aitable.addCard(new Guardsman(aitable.name))
let playertable = new Table("player", 10, 10)
playertable.addCard(new Guardsman(aitable.name))
console.log(aitable)
console.log("///////////")
console.log(playertable)

playertable.attack(0, aitable,0)
playertable.attack(0, aitable,0)
playertable.attack(0, aitable,"table")

console.log(aitable)
console.log("///////////")
console.log(playertable)