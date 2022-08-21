const express = require("express");
const {getAvailableFiles,VALID_PARTICIPANTS,wsServer,RES_HEAD_OBJ,upload,} = require("./model/server_model");
const {sendHomeHTMLFile,sendJSFile,sendFileList,broadcastMessage} = require("./controller/server_controller");
const ws_server = wsServer;
const app = express();

app.post("/uploadForm", upload.fields([{name: "fileData",maxCount: 5,},]),(req, res, next) => {sendHomeHTMLFile(req, res, next);});
ws_server.on("connection", (ws) => {
 broadcastMessage (ws,ws_server,VALID_PARTICIPANTS);
});
ws_server.on("close", () => {
  clients.delete(ws);
});
app.get("/", (req, res) => {
  sendHomeHTMLFile(req, res);
});
app.get("/model/client_model.js", (req, res) => {
  sendJSFile(req, res, "./model/client_model.js");
});
app.get("/view/client_view.js", (req, res) => {
  sendJSFile(req, res, "./view/client_view.js");
});
app.get("/controller/client_controller.js", (req, res) => {
  sendJSFile(req, res, "./controller/client_controller.js");
});
app.get("/seeAvailableFiles", (req, res) => {
  res.writeHead(200, RES_HEAD_OBJ);
  res.end(JSON.stringify(getAvailableFiles()));
});
app.get("/fileUpload/*", (req, res) => {
   sendFileList(req, res)
});
app.listen(3000, () => {
  console.log("Participants\n");
  console.log(VALID_PARTICIPANTS);
});
