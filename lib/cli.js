var commander = require('commander-b');
var backlogClose = require('./');

var CLI = function() {};

CLI.prototype.run = function() {
  var command = commander('backlog-close <issueKey>');
  command.action(function(issueKey) {
    var apiKey = process.env.BACKLOG_API_KEY;
    var spaceId = process.env.BACKLOG_SPACE_ID;

    if (!issueKey.match(/[A-Z]-\d+/)) { throw new Error('invalid issue key'); }
    if (!apiKey) { throw new Error('invalid api key'); }
    if (!spaceId) { throw new Error('invalid space id'); }

    return backlogClose({
      apiKey: apiKey,
      issueKey: issueKey,
      spaceId: spaceId
    }).then(function(e) { console.log(e); }, function(e) { console.log(e); });
  }).execute();
};

module.exports.CLI = CLI;
