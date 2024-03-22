class Card {
    constructor(hp, atk, cst, conditions, team) {
        this.atk = atk
        this.hp = hp
        this.cst = cst
        this.conditions = conditions
    }

}

class Guardsman extends Card{
    constructor(team) {
        super(3, 2, 2, [null], team);
    }
}

export { Guardsman }