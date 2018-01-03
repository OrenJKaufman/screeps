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
			var structureToBuild;
			if (creep.memory.prioritizeStructureId) {
				structureToBuild = Game.getObjectById(creep.memory.prioritizeStructureId);
				if (!structureToBuild) {
					creep.memory.prioritizeStructureId = null;
				}
			}
			if (!structureToBuild) {
				var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
				if(targets.length) {
					structureToBuild = targets[0];
				}
			}
			if (structureToBuild) {
				if(creep.build(structureToBuild) == ERR_NOT_IN_RANGE) {
					creep.moveTo(structureToBuild, {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}
	    }
	    else {
	        utilHarvest.harvest(creep);
	    }
	},
	prioritizeStructure: function(structure) {
		const builder = structure.pos.findClosestByPath(FIND_MY_CREEPS, {
			filter: function(creep) {
				return (creep.memory.role === 'builder' || creep.memory.role === 'repairer') && !creep.memory.prioritizeStructureId;
			}
		});
		if (builder) {
			builder.memory.role = 'builder';
			builder.memory.prioritizeStructureId = structure.id;
		}
		else {
			return ERR_NOT_FOUND;
		}

		return builder.name;
	}
};

module.exports = roleBuilder;