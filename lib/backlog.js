var request = require('request');
var Promise = require('es6-promise').Promise;

var Backlog = function(options) {
  this._apiKey = options.apiKey;
  this._spaceId = options.spaceId;
};

Backlog.prototype.resolveIssue = function(options) {
  return this._request({
    method: 'PATCH',
    url: this._getBaseUrl() + '/api/v2/issues/' + options.issueKey,
    params: {
      statusId: options.statusId,
      actualHours: options.actualHours,
      dueDate: options.dueDate
    }
  });
};

Backlog.prototype.closeIssue = function(options) {
  return this._request({
    method: 'PATCH',
    url: this._getBaseUrl() + '/api/v2/issues/' + options.issueKey,
    params: {
      statusId: options.statusId,
      resolutionId: options.resolutionId
    }
  });
};

Backlog.prototype._getBaseUrl = function() {
  return 'https://' + this._spaceId + '.backlog.jp';
};

Backlog.prototype._request = function(options) {
  return new Promise(function(resolve, reject) {
    request({
      method: options.method,
      url: options.url,
      qs: { apiKey: this._apiKey },
      form: options.params
    }, function(err, res, body) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  }.bind(this));
};

module.exports.Backlog = Backlog;
