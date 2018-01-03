var sourcesData = require('data.sources');
var preferredSourceIndex = 0;

module.exports = {
    populate: function() {
        sourcesData.data.forEach(source => {
            source.creepCount = 0;
        });
        _.forEach(Game.creeps, creep => {
            if (creep.sourceId) {
                const destSource = _.find(sourcesData.data, source => {
                    return source.sourceId === creep.sourceId;
                });
                destSource.creepCount++;
            }
        });
    },
    nextSourceId: function() {
        var candidateSource;
        var loopCount = 0;
        var sourcesLength = sourcesData.data.length;
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

        preferredSourceIndex = (preferredSourceIndex + loopCount + 1) % sourcesLength;
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