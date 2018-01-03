/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('util.harvest');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    harvest: function(creep) {
        var source;
        if (creep.memory.sourceId) {
            source = Game.getObjectById(creep.memory.sourceId);
        }
        else {
            //var sources = creep.room.find(FIND_SOURCES);
            //source = sources[_.random(0, sources.length - 1)];
            //creep.memory.sourceId = source.id;
            if (_.random(0, 5) == 0) {
                creep.memory.sourceId = '59f1a42982100e1594f3c93c';
            }
            else {
                creep.memory.sourceId = '59f1a42982100e1594f3c93b';
            }
            source = Game.getObjectById(creep.memory.sourceId);
        }
        
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};