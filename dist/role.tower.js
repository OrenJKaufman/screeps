var utilRepair = require('util.repair');

module.exports = {
    run: function(tower) {

        const closestTarget = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestTarget) {
            tower.attack(closestTarget);
            return OK;
        }

        const healTarget = tower.room.find(FIND_MY_CREEPS, { filter: creep => { return creep.hits < creep.hitsMax }});
        if (healTarget.length) {
            tower.heal(healTarget[0]);
            return OK;
        }

        const repairTarget = utilRepair.findTargetsToRepair(utilRepair.filterAnyInjuredTargets);
        if (repairTarget.length) {
            tower.repair(repairTarget[0]);
            return OK;
        }
	}    
}