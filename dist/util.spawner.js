/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('util.spawner');
 * mod.thing == 'a thing'; // true
 */
 
module.exports = {
    run: function() {
        var upgraderCount = 0;
        var warriorCount = 0;
        var builderCount = 0;
        var harvesterCount = 0;
        var runnerCount = 0;
        
        for(const i in Game.creeps) {
            const creep = Game.creeps[i];
            const creepRole = creep.memory.role;
            if (creepRole === 'builder' || creepRole === 'repairer') { builderCount++; }
            else if (creepRole === 'upgrader') { upgraderCount++; }
            else if (creepRole === 'warrior') { warriorCount++; }
            else if (creepRole === 'harvester') { harvesterCount++; }
            else if (creepRole === 'runner') { runnerCount++; }
        }

        var constructionSiteCount;
        
        /*
        if (runnerCount < 1) {
            spawnRunner();
            return OK;
        }
        */

        if (harvesterCount < 3) {
            spawnHarvester();
            return OK;
        }
        if (builderCount < 3) {
            if (_.size(Game.constructionSites) > 0 || builderCount < 3) {
                spawnBuilder();
                return OK;
            }
            /*
            if (_.size(Game.constructionSites) > 0 || builderCount < 1) {
                spawnBuilder();
                return OK;
            }
            */
        }
        /*
        if (warriorCount < 3) {
            spawnWarrior();
            return OK;
        }
        */
        if (upgraderCount < 3) {
            spawnUpgrader();
            return OK;
        }

        /*
        if (_.random(0, 1) == 0) {
            spawnWarrior();
        }
        else {
            spawnUpgrader();
        }
        */

        spawnUpgrader();
        return OK;

        function spawnRunner() {
            Game.spawns.Spawn1.spawnCreep([CARRY, CARRY, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE], 'Runner' + Game.time, { memory: { role: 'runner' } } );
        }
        
        function spawnBuilder() {
            Game.spawns.Spawn1.spawnCreep([CARRY, CARRY, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE], 'Builder' + Game.time, { memory: { role: 'repairer' } } );
        }
        
        function spawnUpgrader() {
            Game.spawns.Spawn1.spawnCreep([CARRY, CARRY, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE], 'Upgrader' + Game.time, { memory: { role: 'upgrader' } } );
        }
        
        function spawnWarrior() {
            Game.spawns.Spawn1.spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK], 'Warrior' + Game.time, { memory: { role: 'warrior' } } );
        }
        
        function spawnHarvester() {
            if (harvesterCount >= 2) {
                Game.spawns.Spawn1.spawnCreep([CARRY, CARRY, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE], 'Harvester' + Game.time, { memory: { role: 'harvester' } } );
            }
            else {
                Game.spawns.Spawn1.spawnCreep([CARRY, MOVE, WORK], 'Harvester' + Game.time, { memory: { role: 'harvester' } } );
            }
        }
    }
};