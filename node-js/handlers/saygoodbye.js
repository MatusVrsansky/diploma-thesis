const db = require("../models");
const User = db.user


async function notifyUser() {
    const results = await User.findAll()

  const test = JSON.stringify(results)

  dataObj = JSON.parse(test);


  var result = [];
    for (var i = 0; i < dataObj.length; i++) {
        result.push(dataObj[i].username + ' ' + dataObj[i].email);
        console.log(dataObj[i].username)
        console.log(dataObj[i].email)
        console.log("\n")
    }


    //console.log(result)
}


notifyUser();


module.exports = () => {

   
    console.log("Say goodbye from goodbye.js")
}