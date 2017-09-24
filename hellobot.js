var https = require('https');

module.exports = function(req, res, next) {
    if(req.body.type === 'url_verification') {
        return res.status(200).json(req.body.challenge);
    }
    if(req.body.type === 'event_callback') {
        var postReq =https.request({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            host: 'hooks.slack.com',
            path: '/services/T5ZTW3RR7/B78NCLXQE/Sb4ZLmyfDcYu83nSsz0zT8fu'
        });
        if(req.body.type === 'member_joined_channel') {
            postReq.write(JSON.stringify({'text': 'Welcome to the Channel,' + res.user.name}));
            postReq.end();
        }
        if(req.body.type === 'member_left_channel') {
            postReq.write(JSON.stringify({'text': 'Goodbye to the Channel,' + res.user.name}));
            postReq.end();
        }
        console.log(JSON.stringify(req.body));
        return res.status(200).end();
    }
}