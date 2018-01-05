module.exports = {
    filterAnyInjuredTargets: function(target) {
        return ((target.structureType == STRUCTURE_ROAD || target.structureType == STRUCTURE_CONTAINER ||
            (target instanceof OwnedStructure && target.my)) && 
           (target.hits < target.hitsMax));
    },
    findTargetsToRepair: function(filterFunction) {
         const targets = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: filterFunction
        });

        return targets;
    }
}