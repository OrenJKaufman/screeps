var utilHarvest = require('util.harvest');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.memory.repairId = null;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
            creep.memory.sourceId = null;
	        creep.say('⚡ repairing');
        }

	    if(creep.memory.repairing) {
            var repairTarget;
            if (creep.memory.repairId) {
                repairTarget = Game.getObjectById(creep.memory.repairId);
                if (repairTarget.hits >= repairTarget.hitsMax) {
                    repairTarget = null;
                    creep.memory.repairId = null;
                }
            }

            if (!creep.memory.repairId) {
                const targets = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
                    filter: function(target) { 
                        return (target.structureType == STRUCTURE_ROAD || target.structureType == STRUCTURE_CONTAINER) && 
                               (target.hits < (target.hitsMax - creep.carry.energy * 100) || target.hits / target.hitsMax < 0.75);
                    }
                });
                if (targets.length) {
                    creep.memory.repairId = targets[0].id;
                }
            }
            
            if (!creep.memory.repairId) {
                creep.memory.role = 'builder';
            }
            else {
                repairTarget = repairTarget || Game.getObjectById(creep.memory.repairId);
                if(creep.repair(repairTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
	    else {
	        utilHarvest.harvest(creep);
	    }
    },
    outputHealth: function(structureType, minHealth) {
        const targets = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: function(target) { 
                return (target.structureType == structureType) && 
                       (target.hits <= minHealth);
            }
        });
        targets.forEach(target => {
            console.log('X: ' + target.pos.x + ' Y: ' + target.pos.y + ' Hits: ' + target.hits);
        });

        return OK;
    }
};

module.exports = roleRepairer;