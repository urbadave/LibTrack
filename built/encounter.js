module.exports = /** @class */ (function () {
    function Encounter(name, date, other) {
        this.name = name;
        this.date = date;
        this.other = other;
    }
    Object.defineProperty(Encounter.prototype, "info", {
        get: function () {
            return this.getString();
        },
        enumerable: false,
        configurable: true
    });
    Encounter.prototype.getString = function () {
        var hasDate = (this.date && this.date.toDateString);
        var hasOther = this.other;
        if (hasDate && hasOther) {
            return this.date.toDateString() + ": " + this.name + ". " + this.other;
        }
        else if (hasDate) {
            return this.date.toDateString() + ": " + this.name;
        }
        else if (hasOther) {
            return "No Date: " + this.name + ". " + this.other;
        }
        else {
            return "No Date: " + this.name;
        }
    };
    ;
    Encounter.prototype.equals = function (encounter) {
        if (!encounter || !encounter.name || !encounter.date) {
            return false;
        }
        else {
            var nameMatch = (encounter.name === this.name);
            var dateMatch = (encounter.date.valueOf() === this.date.valueOf());
            return (nameMatch && dateMatch);
        }
    };
    Encounter.compare = function (one, other) {
        if (!one && !other)
            return 0;
        if (!one)
            return -1;
        if (!one)
            return 1;
        if (!one.name && other.name)
            return -1;
        if (one.name && !other.name)
            return 1;
        if (one.name !== other.name)
            return one.name.localeCompare(other.name);
        //name exist and are the same
        if (!one.date && other.date)
            return -1;
        if (one.date && !other.date)
            return 1;
        if (one.date.valueOf() < other.date.valueOf())
            return -1;
        if (one.date.valueOf() > other.date.valueOf())
            return 1;
        return 0;
    };
    return Encounter;
}());
