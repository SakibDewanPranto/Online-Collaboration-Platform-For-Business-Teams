const path = require("path");
const fs = require("fs");
const sendHomeHTMLFile = (req, res, next) => {
  fs.readFile("./view/index.html", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    });
    res.write(data);
    res.end();
  });
};
const alterFileName = (req, file, cb) => {
  console.log(req.data);
  const fileExt = path.extname(file.originalname);
  const fileName = file.originalname
    .replace(fileExt, "")
    .toLowerCase()
    .split(" ")
    .join("-");
  cb(null, fileName + fileExt);
};
const sendJSFile = (req, res, path) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    });
    res.write(data);
    res.end();
  });
};

const sendFileList = (req, res) =>{
  var requestedFile = req.path;
  requestedFile = requestedFile.split("/");
  requestedFile = requestedFile[requestedFile.length - 1];
  res.end(fs.readFileSync("./uploads/" + requestedFile, {}));
}

const broadcastMessage = (ws,ws_server,VALID_PARTICIPANTS) =>{
	ws.on("message", (messageAsString) => {
    var clientResponse = String.fromCharCode.apply(null, messageAsString);
    clientResponse = clientResponse.split("_");
    ws_server.clients.forEach(function each(client) {
      if (VALID_PARTICIPANTS[clientResponse[0]] != undefined) {
        client.send("[" +VALID_PARTICIPANTS[clientResponse[0]] +"] : " +clientResponse[1]);
      }
    });
  });	
}

module.exports = {
  alterFileName,
  sendHomeHTMLFile,
  sendJSFile,
  sendFileList,
  broadcastMessage
};
