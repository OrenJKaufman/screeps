var sourcesData = require('data.sources');
var preferredSourceIndex = 0;

module.exports = {
    populate: function() {
        sourcesData.data.forEach(source => {
            source.creepCount = 0;
        })
        Game.creeps.array.forEach(creep => {
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
        var sourcesLength = sourcesData.length;
        do {
            candidateSource = sourcesData.data[(preferredSourceIndex + loopCount) % sourcesLength];
            if (candidateSource.creepCount < candidateSource.maxCreeps) {
                break;
            }
            loopCount++;
        } while(loopCount < sourcesLength)

        preferredSourceIndex = (preferredSourceIndex + loopCount + 1) % sourcesLength;
        candidateSource.creepCount++;
        return candidateSource.sourceId;
    }
}