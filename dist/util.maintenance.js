/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('util.maintenance');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    deleteDeadCreeps: function() {
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                console.log('Deleted creep' + i);
                delete Memory.creeps[i];
            }
        }
    }
};