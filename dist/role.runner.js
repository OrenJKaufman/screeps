var dataSources = require('data.sources');

var roleRunner = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.running && creep.carry.energy == 0) {
            creep.memory.running = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.running && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.running = true;
            creep.say('🚧 running');
	    }

	    if(creep.memory.running) {
            const container = Game.getObjectById(dataSources.containerId);
            if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
            }
	    }
	    else {
            if (!creep.memory.sourceId) {
                creep.memory.sourceId = dataSources.sourceIdForRunner;
            }

            const source = Game.getObjectById(creep.memory.sourceId);
            
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleRunner;
