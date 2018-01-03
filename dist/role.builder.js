var utilHarvest = require('util.harvest');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.sourceId = null;
	        
	        if (creep.memory.timeToRepair) {
	            creep.memory.timeToRepair--;
	            creep.memory.building = true;
	            creep.say('🚧 build');
	        }
	        else {
	            creep.memory.timeToRepair = 10;
	            creep.memory.role = 'repairer';
	            return;
	        }
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
	        utilHarvest.harvest(creep);
	    }
	}
};

module.exports = roleBuilder;