/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('util.harvest');
 * mod.thing == 'a thing'; // true
 */

var utilSources = require('util.sources');

module.exports = {
    harvest: function(creep) {
        var source;
        if (creep.memory.sourceId) {
            source = Game.getObjectById(creep.memory.sourceId);
            if (source && ((source instanceof Source) && source.energy === 0) || ((source instanceof StructureContainer) && source.store[RESOURCE_ENERGY] === 0)) {
                creep.memory.sourceId = null;
            }
        }
        if (!creep.memory.sourceId) {
            var sourceId = utilSources.nextSourceId();
            creep.memory.sourceId = sourceId;
            console.log(sourceId);
            source = Game.getObjectById(creep.memory.sourceId);
        }
        
        if (source instanceof Source) {
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};