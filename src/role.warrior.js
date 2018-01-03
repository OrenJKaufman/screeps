var utilHarvest = require('util.harvest');

var roleWarrior = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (!creep.memory.xPos) {
            creep.memory.xPos = _.random(10, 39);
            creep.memory.yPos = _.random(10, 39);
        }
        
        var targets = creep.room.find(FIND_HOSTILE_CREEPS);
        if(targets.length) {
            if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            creep.moveTo(creep.memory.xPos, creep.memory.yPos);
        }
	}
};

module.exports = roleWarrior;