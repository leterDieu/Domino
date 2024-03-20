class Card {
    constructor(hp, atk, cst, spells, team) {
        this.atk = atk
        this.hp = hp
        this.cst = cst
        this.spells = spells
        this.team = team
    }

    useSpell(){
        return 0
    }
}

class Guardsman extends Card{
    constructor(team) {
        super(3, 2, 2, [null], team);
    }

    useSpell() {
        return super.useSpell();
    }
}

export { Guardsman }