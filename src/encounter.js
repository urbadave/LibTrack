module.exports = class Encounter {
    constructor(name, date, other) {
        this.name = name;
        this.date = date;
        this.other = other;        
    }

    get info() {
        return this.getString();
    }

    getString() {
        const hasDate = (this.date && this.date.toDateString);
        const hasOther = this.other;

        if(hasDate && hasOther){
            return `${this.date.toDateString()}: ${this.name}. ${this.other}`;
        } else if (hasDate){
            return `${this.date.toDateString()}: ${this.name}`;
        } else if (hasOther){
            return `No Date: ${this.name}. ${this.other}`;
        } else {
            return `No Date: ${this.name}`;
        }
    };

    equals(encounter){
        if(!encounter || !encounter.name || !encounter.date){
            return false;
        } else {
            const nameMatch = (encounter.name === this.name);
            const dateMatch = (encounter.date.valueOf() === this.date.valueOf());
            return (nameMatch && dateMatch);
        }
    }

    static compare(one, other){
        if(!one && !other) return 0;
        if(!one) return -1;
        if(!one) return 1;

        if(!one.name && other.name) return -1;
        if(one.name && !other.name) return 1;
        if(one.name !== other.name) return one.name.localeCompare(other.name);
        
        //name exist and are the same
        if(!one.date && other.date) return -1;
        if(one.date && !other.date) return 1;
        if(one.date.valueOf() < other.date.valueOf()) return -1;
        if(one.date.valueOf() > other.date.valueOf()) return 1;
        return 0;
    }
}