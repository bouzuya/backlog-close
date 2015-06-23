var Backlog = require('./lib/backlog').Backlog;
var moment = require('moment');

module.exports = function(options) {
  var apiKey = options.apiKey;
  var spaceId = options.spaceId;
  var issueKey = options.issueKey;

  var statusId = 4; // 4: Closed
  var resolutionId = 0; // 0: Fixed
  var backlog = new Backlog({ apiKey: apiKey, spaceId: spaceId });
  return backlog.closeIssue({
    issueKey: issueKey,
    statusId: statusId,
    resolutionId: resolutionId
  });
};
