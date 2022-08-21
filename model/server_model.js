const fs = require("fs");
const WebSocket = require("ws");
const multer = require("multer");
const { alterFileName } = require("../controller/server_controller");
var availAbleFiles = [];
var VALID_PARTICIPANTS = {};
var RES_HEAD_OBJ = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
};
const test_folder = "./uploads/";

const wsServer = new WebSocket.Server({
  port: 3001,
});

VALID_PARTICIPANTS = JSON.parse(
  fs.readFileSync("./model/participant_list.json", {
    encoding: "utf8",
    flag: "r",
  })
);

const getAvailableFiles = () => {
  fs.readdir(test_folder, (err, files) => {
    files.forEach((file) => {
      availAbleFiles.push(file);
    });
  });
  console.log(availAbleFiles);
  var available_files = availAbleFiles;
  availAbleFiles = [];
  return available_files;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, test_folder);
  },
  filename: (req, file, cb) => {
    alterFileName(req, file, cb);
  },
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000, // 50MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "fileData") {
      cb(null, true);
    }
  },
});

module.exports = {
  getAvailableFiles,
  VALID_PARTICIPANTS,
  test_folder,
  wsServer,
  RES_HEAD_OBJ,
  storage,
  upload,
};
