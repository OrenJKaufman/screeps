var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWarrior = require('role.warrior');
var roleRunner = require('role.runner');
var roleTower = require('role.tower');
var utilMaintenance = require('util.maintenance');
var utilSpawner = require('util.spawner');
var utilSources = require('util.sources');

module.exports.loop = function () {

    utilMaintenance.deleteDeadCreeps();
    utilSpawner.run();
    utilSources.populate();
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'runner') {
            roleRunner.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'warrior') {
            roleWarrior.run(creep);
        }
    }

    Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER }}).forEach(tower => { roleTower.run(tower) });
}