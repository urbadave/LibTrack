var Encounter = require('./encounter');
module.exports = /** @class */ (function () {
    function Tracker() {
        this.encounterList = [];
    }
    Tracker.prototype.load = function (trackerJson) {
        var self = this;
        var source = JSON.parse(trackerJson);
        self.encounterList = [];
        if (source && source.encounterList) {
            source.encounterList.forEach(function (item) {
                self.encounterList.push(new Encounter(item.name, new Date(item.date), item.other));
            });
        }
    };
    Tracker.prototype.findEncounterIndex = function (encounter) {
        if (encounter && encounter.name && encounter.date) {
            return this.encounterList.findIndex(function (item) { return item.equals(encounter); });
        }
        return -1;
    };
    Tracker.prototype.addEncounter = function (encounter) {
        var index = this.findEncounterIndex(encounter);
        if (index === -1) {
            this.encounterList.push(encounter);
        }
    };
    Tracker.prototype.removeEncounter = function (encounter) {
        var index = this.findEncounterIndex(encounter);
        if (index !== -1) {
            return this.encounterList.splice(index, 1); //return the encounters that were removed.
        }
        return null;
    };
    Tracker.prototype.sortEncounters = function () {
        this.encounterList = this.encounterList.sort(Encounter.compare);
    };
    Tracker.prototype.allNames = function () {
        if (this.encounterList) {
            var nameList_1 = [];
            this.encounterList.forEach(function (item) {
                if (item.name) {
                    if (!nameList_1.find(function (name) { return name === item.name; })) {
                        nameList_1.push(item.name);
                    }
                }
            });
            nameList_1.sort();
            return nameList_1;
        }
        return null;
    };
    Tracker.prototype.printAll = function () {
        this.encounterList.forEach(function (item) { console.log(item.info); });
    };
    return Tracker;
}());
// let enc1 = new Encounter('Erin Johnson', new Date(2020, 5, 8), 'Dog groomer');
// let enc2 = new Encounter('Mobile Small Engine Repair Guy', new Date(2020, 5, 8), 'Ken?');
// let enc3 = new Encounter('Brandon Mauhar', new Date(2020, 4, 27));
// let enc4 = new Encounter('Briane Evans', new Date(2020, 5, 3));
// let enc5 = new Encounter('Brandon Mauhar', new Date(2020, 5, 4));
// var trackerObj = new Tracker();
// var sourceJson = '{"encounterList":[{"name":"Brandon Mauhar","date":"2020-06-04T06:00:00.000Z"},{"name":"Briane Evans","date":"2020-06-03T06:00:00.000Z"},{"name":"Erin Johnson","date":"2020-06-08T06:00:00.000Z","other":"Dog groomer"},{"name":"Mobile Small Engine Repair Guy","date":"2020-06-08T06:00:00.000Z","other":"Ken?"}]}';
// trackerObj.load(sourceJson);
// trackerObj.sortEncounters();
// trackerObj.printAll();
// const names = trackerObj.allNames();
// if(names){
//     names.forEach(function(item){console.log(item)});
// }
// console.log('remove one');
// trackerObj.removeEncounter(enc3);
// trackerObj.printAll();
// console.log(JSON.stringify(trackerObj));
//# sourceMappingURL=tracker.js.map