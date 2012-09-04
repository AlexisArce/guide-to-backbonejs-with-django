from django.shortcuts import get_object_or_404
from django.core.urlresolvers import reverse
from djangorestframework import views
from djangorestframework.response import Response
from polls.forms import PollForm
from polls.models import Poll
from .resources import PollResource

class PollResults (views.View):

    def get(self, request, poll_id):
        poll = get_object_or_404(Poll.objects.all(), pk=poll_id)
        results = PollResource().serialize(poll)
        return results


class PollVotes (views.View):

    def post(self, request, poll_id):
        poll = get_object_or_404(Poll.objects.all(), pk=poll_id)
        form = PollForm(request.POST, instance=poll)

        if form.is_valid():
            form.save()
        else:
            return Response(content=form.errors, status=400)

        return Response(status=303, headers={'Location': reverse('polls_api_results', args=[poll_id])})

poll_results_view = PollResults.as_view()
poll_votes_view = PollVotes.as_view()
