const filetree = require("../services/filetree");

exports.default = {
  handler: async ({validatePaths, sid, config, msg, ws, vId, sendError}) => {
    if (config.readOnly) {
      return sendError(sid, vId, "Files are read-only");
    }
    if (!validatePaths(msg.data, msg.type, ws, sid, vId)) {
      return;
    }

    filetree.mkdir(msg.data, err => {
      if (err) sendError(sid, vId, `Error creating folder: ${err.message}`);
    });
  }
};
