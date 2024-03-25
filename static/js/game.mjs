import { Guardsman } from "./card.mjs"
import {Table} from "./table.mjs"

let aitable = new Table("AI", 10, 82313213442121, [Guardsman])



aitable.fillHandFromDeck()
aitable.addCard(0)
aitable.fillHandFromDeck()
aitable.addCard(0)
aitable.fillHandFromDeck()
aitable.addCard(0)

aitable.doBasicSpells()

aitable.killCard(1) // осталось две карты. мораль не 50, но и не 30.

console.log(aitable)