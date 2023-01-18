const controller = require("../controllers/history.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/history/getThingSpeakHistory", controller.getThingSpeakHistory);
  app.get("/api/history/getWeatherApiHistory", controller.getWeatherApiHistory);
};