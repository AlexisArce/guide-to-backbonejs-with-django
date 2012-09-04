var Polls = Polls || {};

(function(P) {

  if (!_) {
    throw "Underscore.js must be included.";
  }

  _.sum = function(obj) {
    if (!obj || obj.length === 0) {
      return 0;
    } else {
      return _.reduce(obj, function(a, b) { return a + b; });
    }
  }

})(Polls);
