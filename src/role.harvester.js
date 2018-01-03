var utilHarvest = require('util.harvest');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.transferring && creep.carry.energy == 0) {
            creep.memory.transferring = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.transferring && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.sourceId = null;
            creep.memory.transferring = true;
            creep.say('🚧 transferring');
	    }

	    if(creep.memory.transferring) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
	        utilHarvest.harvest(creep);
	    }
	}
};

module.exports = roleHarvester;
