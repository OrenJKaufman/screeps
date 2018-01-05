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

        if (tower.energy >= tower.energyCapacity) {
            const repairTargets = utilRepair.findTargetsToRepair(utilRepair.filterAnyInjuredTargets);
            if (repairTargets.length) {
                const repairTarget = _.min(repairTargets, target => { return target.hits / target.hitsMax; });
                if (repairTarget.hits / repairTarget.hitsMax < 0.75) {
                    tower.repair(repairTarget);
                    return OK;
                }
            }
        }

        return OK;
	}    
}