import {Guardsman, LemanRuss, Kirill, Glafira, Sonya, Jinni, Boris} from "./card.mjs"
import { Table, rollDice } from "./table.mjs"

// ВНИМАНИЕ!: Это скрытый от пользователя код. Следите за чистотой своего кода хоть в какой-то степени: если вы случайно перепутаете перменные, вставите индекс элемента на один больше - программа полетит. При этом БЕЗ ИНКАПСУЛЯЦИИ. Вы не поймёте где ошибка сразу.
// Будьте аккуратнее, пожалуйста.
// Тем не менее, некоторые проверки, которые должны контролироваться не фронтендерами, всё равно ловяться. Если вы этого не заметили, возможно стоит посмотреть что функция returned.

function player_deciding() {
    return 0
} // функция для фронтендеров. на месте её вызова вы должны передавать мне что-то.

function bot_deciding() {
    return 0
} // todo: переписать в ИИ

function playButtonClicked() {
    let PLAYABLE_CARDS = [Guardsman, LemanRuss, Kirill] // ВОТ ЭТО ПОЛНАЯ ХРЕНЬ. ПЕРЕПИСАТЬ. ПЕРЕДЕЛАТЬ. ЯХЗ. тут мы как-то откуда-то достаём карты колоды игрока. сами думайте как.

    let player_table = new Table("player", 10, 10, PLAYABLE_CARDS)
    let enemy_table = new Table("bot", 10, 10, PLAYABLE_CARDS)



    while ((player_table.hp !== 0) && (enemy_table.hp !== 0)) {
        player_table.fillHandFromDeck()
        enemy_table.fillHandFromDeck()

        let player_card_decided = player_deciding()
        let bot_card_decided = bot_deciding()
        player_table.addCard(player_card_decided)
        enemy_table.addCard(bot_card_decided)

        player_table.doBasicSpells()
        enemy_table.doBasicSpells()

        for (let i = 0; i < player_table.content.length; i++) {
            let played_decided_to_attack = player_deciding()

            player_table.attack(i, enemy_table, played_decided_to_attack)
        }
        for (let i = 0; i < enemy_table.content.length; i++) {
            let bot_decided_to_attack = bot_deciding()

            enemy_table.attack(i, player_table, bot_decided_to_attack)
        }

        player_table.move += 1
        enemy_table.move += 1
    }
}