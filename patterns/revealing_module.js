// revealing_module.js
// The Revealing Module pattern in Javascript solves the problem of Javascript not having
// access modifiers of more traditional class based languages.
// The pattern uses function-level scoping to mock this type of behavior in Javascript.
//
// This module uses a mock "pet daycare" checkin system to demonstrate the revealing module pattern.
// This module is for example purposes and doesn't take into account that more than one pet may have the same name.

var pet_management = function() {
    var pet_list = [];  // A starting list of pets.

    function checkin_pet(petName) {
        pet_list.push(petName);
        console.log(`${petName} was checked into the system.`);
    }

    function checkout_pet(petName) {
        pet_list.pop(petName);
        console.log(`${petName} was checked out of the system.`);
    }

    function pet_list() {
        console.log('Pet list is being returned in JSON.');
        return JSON.stringify(pet_list);
    }

    function pet_number() {
        console.log(`There are ${pet_list.length} pets in the system.`);
        return pet_list.length;
    }

    function clear_pets() {
        pet_list = [];
        console.log('All pets were removed from the system.');
    }

    return {
        petCheckin: checkin_pet,
        petCheckout: checkout_pet,
        petList: pet_list,
        petNubmer: pet_number,
        petClearAll: clear_pets
    }
}

// Create new pet management
pm = pet_management();

// Check in pets
console.log("Pet checkins.");
pm.petCheckin("Millie");
pm.petCheckin("Lex");
pm.petCheckin("Sierra");

// Get Pet List
var n = pm.petNubmer();
console.log(`There are ${n} pets in the system.  They are: `);
var plist = pm.petList;
console.log(plist);

// Checkout pet
pm.petCheckout("Sierra");

// Get Pet List
plist = pm.petList;
console.log(plist);

// Clear Pets from System

// End
console.log();
