const path = require('path');
const fs = require('fs');
module.exports = function (formidable, Club, Users) {
    return {
        SetRouting: function (router) {
            router.get('/dashboard', this.adminPage);
            router.get('/users', this.adminPageUser)
            router.get('/club', this.adminPageClub);
            router.put('/user/:id', this.adminPageUserPut);

            router.post('/uploadFile', this.uploadFile);
            router.post('/dashboard', this.adminPostPage);
        },
        adminPageUserPut: async function (req, res) {
            console.log(req.body, req.params.id)
            const resul = await Users.findOneAndUpdate({ _id: req.params.id }, req.body)
            res.json(resul);
        },
        adminPageClub: async function (req, res) {
            res.json(await Club.find({}))
        },
        adminPageUser: async function (req, res) {
            res.json(await Users.find({}))
        },
        adminPage: function (req, res) {
            if (req.isAuthenticated()) {
                res.render('admin/dashboard');
            } else {
                res.send("chua login");
            }
        },
        adminPostPage: function (req, res) {
            const newClub = new Club();
            newClub.name = req.body.club;
            newClub.country = req.body.country;
            newClub.image = req.body.upload;
            newClub.save((err) => { res.render('admin/dashboard') });
        },
        uploadFile: function (req, res) {
            const form = new formidable.IncomingForm();
            form.uploadDir = path.join(__dirname, '../public/uploads');
            form.on('file', (field, file) => {
                fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
                    if (err) throw err;
                    console.log('file rename successfully');
                })
            })
            form.on('error', (err) => {
                console.log(err);
            })
            form.on('end', () => {
                console.log('File upload is successful');
            })
            form.parse(req);
        },
    }
}