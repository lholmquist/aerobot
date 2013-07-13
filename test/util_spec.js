var should = require('should');
var util = require('../lib/util');

describe('Util module', function() {
    it('knows how to parse redis output accordingly', function(){
        var redisOutput = {
            "aerobot:status:irc.freenode.net:#aerobot-test:qmx": {
                "2013-07-10T17:15:42.198Z": "super boring day for a #status",
                "2013-07-10T17:16:25.967Z": "medium rare with aged cheddar and mushrooms #status"
            },
            "aerobot:status:irc.freenode.net:#aerobot-test:whatever": {
                "2013-07-11T17:01:33.123Z": "who doesn't care about cheese? #status"
            }
        };
        util.parseStatuses(redisOutput).should.eql({
            "aerobot:status": {
                "irc.freenode.net": {
                    channels: [
                        {
                            channel: "#aerobot-test",
                            users: [
                                {
                                    user: "qmx",
                                    statuses: [
                                        {
                                            timestamp: "2013-07-10T17:15:42.198Z",
                                            status: "super boring day for a #status"
                                        },
                                        {
                                            timestamp: "2013-07-10T17:16:25.967Z",
                                            status: "medium rare with aged cheddar and mushrooms #status"
                                        }

                                    ]
                                },
                                {
                                    user: "whatever",
                                    statuses: [
                                        {
                                            timestamp: "2013-07-11T17:01:33.123Z",
                                            status: "who doesn't care about cheese? #status"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        });
    });
});