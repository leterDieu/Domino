class Card {
    constructor(hp, atk, cst, spells, team) {
        this.atk = atk
        this.hp = hp
        this.cst = cst
        this.spells = spells
        this.team = team
    }
}

class Guardsman extends Card{
    constructor(team) {
        super(3, 2, 2, {null}, team);
    }

    spellCadiaStands() {

    }
}

export { Guardsman }