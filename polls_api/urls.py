from django.conf.urls.defaults import *


urlpatterns = patterns('polls_api.views',
    url(r'^restframework', include('djangorestframework.urls', namespace='djangorestframework')),
    url(r'^(?P<poll_id>\d+)/$', 'poll_results_view', name='polls_api_results'),
    url(r'^(?P<poll_id>\d+)/votes/$', 'poll_votes_view', name='polls_api_votes'),
)
