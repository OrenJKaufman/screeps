var sourcesData = require('data.sources');

module.exports = {
    populate: function() {
        sourcesData.sources.forEach(source => {
            source.creepCount = 0;
            const sourceObject = Game.getObjectById(source.sourceId);
            if (sourceObject instanceof Source) {
                source.energy = sourceObject.energy;
            }
            else {
                source.energy = sourceObject.store[RESOURCE_ENERGY];
            }
        });
        _.forEach(Game.creeps, creep => {
            if (creep.memory.sourceId) {
                const destSource = _.find(sourcesData.sources, source => {
                    return source.sourceId === creep.memory.sourceId;
                });
                destSource.creepCount++;
            }
        });
    },
    nextSourceId: function() {
        var candidateSource;
        var loopCount = 0;
        const sourcesLength = sourcesData.sources.length;
        const preferredSourceIndex = Memory.preferredSourceIndex || 0;

        this.outputSourcesData();
        //console.log('Preferred Source Index: ' + preferredSourceIndex);
        //console.log('');
        do {
//            console.log((preferredSourceIndex + loopCount) % sourcesLength);
//            console.log('length: ' + sourcesData.sources.length);
            candidateSource = sourcesData.sources[(preferredSourceIndex + loopCount) % sourcesLength];
 //           console.log(candidateSource);
            if (candidateSource.creepCount < candidateSource.maxCreeps && candidateSource.energy > 0) {
                break;
            }
            loopCount++;
        } while(loopCount < sourcesLength)

        Memory.preferredSourceIndex = (preferredSourceIndex + loopCount + 1) % sourcesLength;
        candidateSource.creepCount++;
        return candidateSource.sourceId;
    },
    outputSourcesData: function() {
        sourcesData.sources.forEach(source => {
            //console.log('Source ID: ' + source.sourceId + ' Creep Count: ' + source.creepCount + ' Max Creep Count: ' + source.maxCreeps);
        });
    },
    test: function() {
        this.populate();
        console.log(this.nextSourceId());
        console.log(this.nextSourceId());
        console.log(this.nextSourceId());
        console.log(this.nextSourceId());
        console.log(this.nextSourceId());
        console.log(this.nextSourceId());
        console.log(this.nextSourceId());
        console.log(this.nextSourceId());
        this.outputSourcesData();
    }
}