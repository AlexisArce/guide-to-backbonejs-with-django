from django.shortcuts import get_object_or_404
from djangorestframework import views
from polls.models import Poll
from .resources import PollResource

class PollResults (views.View):

    def get(self, request, poll_id):
        poll = get_object_or_404(Poll.objects.all(), pk=poll_id)
        results = PollResource().serialize(poll)
        return results

poll_results_view = PollResults.as_view()
