import {Guardsman, Kirill, LemanRuss} from "./card.mjs"
import {Table} from "./table.mjs"

let aitable = new Table("AI", 10, 82313213442121, [Guardsman, LemanRuss])



aitable.adminfiller(Guardsman)
aitable.adminfiller(LemanRuss)
aitable.adminfiller(Kirill)
aitable.addCard(0)
aitable.addCard(0)
aitable.addCard(0)

aitable.doBasicSpells()

console.log(aitable)
console.log(aitable.content[0].conditions)
aitable.killCard(2)
console.log(aitable.content[0].conditions)
aitable.killCard(1)
console.log(aitable.content[0].conditions)