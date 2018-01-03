var sourcesData = require('data.sources');

module.exports = {
    populate: function() {
        sourcesData.data.forEach(source => {
            source.creepCount = 0;
        });
        _.forEach(Game.creeps, creep => {
            if (creep.memory.sourceId) {
                const destSource = _.find(sourcesData.data, source => {
                    return source.sourceId === creep.memory.sourceId;
                });
                destSource.creepCount++;
            }
        });
    },
    nextSourceId: function() {
        var candidateSource;
        var loopCount = 0;
        const sourcesLength = sourcesData.data.length;
        const preferredSourceIndex = Memory.preferredSourceIndex || 0;

        this.outputSourcesData();
        console.log('Preferred Source Index: ' + preferredSourceIndex);
        console.log('');
        do {
//            console.log((preferredSourceIndex + loopCount) % sourcesLength);
//            console.log('length: ' + sourcesData.data.length);
            candidateSource = sourcesData.data[(preferredSourceIndex + loopCount) % sourcesLength];
 //           console.log(candidateSource);
            if (candidateSource.creepCount < candidateSource.maxCreeps) {
                break;
            }
            loopCount++;
        } while(loopCount < sourcesLength)

        Memory.preferredSourceIndex = (preferredSourceIndex + loopCount + 1) % sourcesLength;
        candidateSource.creepCount++;
        return candidateSource.sourceId;
    },
    outputSourcesData: function() {
        sourcesData.data.forEach(source => {
            console.log('Source ID: ' + source.sourceId + ' Creep Count: ' + source.creepCount + ' Max Creep Count: ' + source.maxCreeps);
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