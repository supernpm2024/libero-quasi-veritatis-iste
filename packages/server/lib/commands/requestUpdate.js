const fs = require("fs");
const path = require("path");
const util = require("util");

const stat = util.promisify(fs.stat);

const log = require("../services/log.js");
const utils = require("../services/utils.js");

exports.default = {
  handler: async ({
    sid,
    sendObj,
    msg,
    validatePaths,
    ws,
    updateClientLocation,
    sendFiles,
    setView,
    vId,
  }) => {
    if (!validatePaths(msg.data, msg.type, ws, sid, vId)) {
      return;
    }

    let clientDir, clientFile;
    try {
      const stats = await stat(utils.addFilesPath(msg.data));
      if (stats.isFile()) {
        clientDir = path.dirname(msg.data);
        clientFile = path.basename(msg.data);
        sendObj(sid, {
          type: "UPDATE_BE_FILE",
          file: clientFile,
          folder: clientDir,
          isFile: true,
          vId,
        });
      } else {
        clientDir = msg.data;
        clientFile = null;
      }
    } catch (err) {
      clientDir = "/";
      clientFile = null;
      log.error(err);
      log.info(
        ws,
        null,
        `Non-existing update request, sending client to / : ${msg.data}`,
      );
    }

    setView(sid, vId, {file: clientFile, directory: clientDir});

    if (!clientFile) {
      updateClientLocation(clientDir, sid, vId);
      sendFiles(sid, vId);
    }
  },
};
