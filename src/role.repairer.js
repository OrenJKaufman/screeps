var utilHarvest = require('util.harvest');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
            creep.memory.sourceId = null;
	        creep.say('⚡ repairing');
	    }

	    if(creep.memory.repairing) {
	        const targets = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
                filter: function(target) { return target.structureType == STRUCTURE_ROAD && (target.hits < target.hitsMax) }
            });
            
            if (targets.length === 0) {
                creep.memory.role = 'builder';
            }
            else {
                if(targets.length && creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
	    else {
	        utilHarvest.harvest(creep);
	    }
	}
};

module.exports = roleRepairer;