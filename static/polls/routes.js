var Polls = Polls || {};

(function(P, $) {

  P.Workflow = Backbone.Router.extend({

    routes: {
      '/polls/:id/':         'showPoll',
      '/polls/:id/results/': 'showResults'
    },

    showPoll: function(id) {

    },

    showResults: function(id) {

    }

  });

})(Polls, jQuery);
