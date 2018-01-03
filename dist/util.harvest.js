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
        }
        else {
            var sourceId = utilSources.nextSourceId();
            creep.memory.sourceId = sourceId;
            console.log(sourceId);
            source = Game.getObjectById(creep.memory.sourceId);
        }
        
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};