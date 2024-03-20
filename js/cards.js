class Card {
    constructor(atk, hp, cst) {
        this.atk = atk
        this.hp = hp
        this.cst = cst
    }

    useSpell(){
        return 0
    }
}

class Guardsman extends Card{
    constructor(name) {
        super();
        this.name = name;
    }
}