import { Guardsman } from "./card.mjs"
import {Table} from "./table.mjs"

function playButtonClicked() {
    let player_table = new Table("player", 10, 10)
    let enemy_table = new Table("bot", 10, 10)

    while ((player_table.hp !== 0) && (enemy_table.hp !== 0)) {

    }
}