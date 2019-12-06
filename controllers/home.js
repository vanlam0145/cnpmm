//const jwt = require('jsonwebtoken');
module.exports = function (jwt, async, Club, _, Users) {
  return {
    SetRouting: function (router) {
      router.get("/home", this.homePage);
      router.post("/home", this.postHomePage);
    },
    homePage: async function (req, res) {
      console.log(access_token ? "kh null" : "null")
      const access_token = req.headers.access_token.split("|")[1]
      if (access_token) {
        const decode = await jwt.verify(access_token, "key");
        let user = await Users.findById(decode.id).lean();

        async.parallel(
          [
            function (callback) {
              Club.find({}, (err, results) => {
                callback(err, results);
              });
            },
            function (callback) {
              Club.aggregate(
                [
                  {
                    $group: {
                      _id: "$country"
                    }
                  }
                ],
                (err, newResults) => {
                  callback(err, newResults);
                }
              );
            },
            function (callback) {
              Users.findById(decode.id)
                .populate("request.userId")
                .exec((err, result) => {
                  callback(err, result);
                });
            }
          ],
          (err, results) => {
            const res1 = results[0];
            const res2 = results[1];
            const res3 = results[2];
            const dataChunk = [];
            const chunkSize = 2;
            for (let i = 0; i < res1.length; i += chunkSize) {
              dataChunk.push(res1.slice(i, i + chunkSize));
            }
            const res2Sort = _.sortBy(res2, "_id");
            res.json({
              title: "Chat - Home",
              user: user,
              chunks: dataChunk,
              res1: res1,
              country: res2Sort,
              data: res3
            });
          }
        );
      }
    },
    postHomePage: function (req, res) {
      async.parallel(
        [
          function (callback) {
            Club.update(
              {
                _id: req.body.id,
                "fans.username": { $ne: req.user.username }
              },
              {
                $push: {
                  fans: {
                    username: req.user.username,
                    email: req.user.email
                  }
                }
              },
              (err, count) => {
                callback(err, count);
              }
            );
          }
        ],
        (err, results) => {
          return res.redirect("/home");
        }
      );
    }
  };
};
