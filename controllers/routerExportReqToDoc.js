const path = require('path');
const fs = require('fs');

module.exports = function() {
    return {
        SetRouting: function(router) {
            router.get('/test', this.pageTest);
        },
        pageTest: function(req, res) {
            console.log(req.session);
            fs.writeFileSync(
                'public/uploads/txt/file.json',
                JSON.stringify(req.body)
            );
            res.send('abc');
        }
    };
};
