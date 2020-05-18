var Encounter = require('./encounter');

module.exports = class Tracker {
    constructor(){
        this.encounterList = [];
    }

    load(trackerJson){
        let self = this;
        const source = JSON.parse(trackerJson);
        self.encounterList = [];
        if(source && source.encounterList){
            source.encounterList.forEach(function(item){
                self.encounterList.push(new Encounter(item.name, new Date(item.date), item.other));
            })
        }
    }

    findEncounterIndex(encounter){
        if(encounter && encounter.name && encounter.date){
            return this.encounterList.findIndex(function(item){return item.equals(encounter);});
        }
        return -1;
    }

    addEncounter(encounter){
        const index = this.findEncounterIndex(encounter);
        if(index === -1){
            this.encounterList.push(encounter);
        }
    }

    removeEncounter(encounter){
        const index = this.findEncounterIndex(encounter);
        if(index !== -1){
            return this.encounterList.splice(index, 1); //return the encounters that were removed.
        }
        return null;
    }

    sortEncounters(){
        this.encounterList = this.encounterList.sort(Encounter.compare);
    }

    allNames(){
        if(this.encounterList){
            const nameList = [];
            this.encounterList.forEach(function(item){
                if(item.name){
                    if(!nameList.find(function(name){return name === item.name;})){
                        nameList.push(item.name);}
                }
            });
            nameList.sort();
            return nameList;
        }
        return null;
    }

    printAll(){
        this.encounterList.forEach(function(item){console.log(item.info);});
    }
}

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