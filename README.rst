===========================
Guide to Django+Backbone.js
===========================

For this example, I'm going to use the classic Django polls tutorial project --
specifically starting from Daniel Lindsley's awesome guide to testing project.
The source is available `on GitHub
<http://github.com/toastdriven/guide-to-testing-in-django>`_. This version is
mostly identical to the one in the Django tutorial, except it has:

* tests
* form validation

We will enhance this polls app to have a more interactive feel, appropriate for
a live voting situation.

Step 0: Getting Set Up
======================

The first thing I want to do is get the initial code.  It's all available on
`GitHub <http://github.com/mjumbewu/guide-to-testing-in-django>`_::

    git clone git://github.com/mjumbewu/guide-to-testing-in-django.git

Of course, I want to set up an environment and actually install Django::

    cd guide-to-testing-in-django
    virtualenv env
    source env/bin/activate
    pip install django

(We will try to keep the dependency list short for this project.)

Initialize the project, and then check to make sure that everything is working
as expected.  There is a SQLite database bundled with the project (username:
admin, password: abc123), so you should
just be able to start running.  First, make sure the tests pass::

    ./manage.py test polls

You should get output that looks like::

    Creating test database for alias 'default'...
    ............
    ----------------------------------------------------------------------
    Ran 12 tests in 0.398s

    OK
    Destroying test database for alias 'default'...

Now, run the server::

    ./manage.py runserver

In your browser, go to *http://localhost:8000/polls/* and click around for a
while.  If everything looks alright, let's continue.

Step 1: Setting Up the JavaScript Dependencies
==============================================

We will have at least three JavaScript library dependencies:

* `Backbone.js`_, which in turn depends on both
* `Underscore.js`_, and (optionally)
* `jQuery`_

*Underscore.js* fills in the gaps in JavaScript. It is "a utility-belt library
for JavaScript that provides a lot of the functional programming support that
you would expect ... but without extending any of the built-in JavaScript
objects."  It's especially great for achieving list comprehension-like things
in JavaScript.

*jQuery* has many strengths, two of which we will take advantage of here either
directly or indirectly through *Backbone.js*:

1. DOM selection and manipulation (easily finding and modifying elements on the
   page), and
2. Ajax handling (making asynchronous requests to the server without a page
   refresh)

.. _Backbone.js: http://backbonejs.org/
.. _Underscore.js: http://underscorejs.org/
.. _jQuery: http://jquery.com/

Downloading the Libraries
-------------------------

So let's go ahead and download each of these into our project (NOTE: If you
prefer, you can use a CDN such as `cdnjs <http://cdnjs.com/>`_.  If you do not use a
CDN, you should use a merger and minifier to combine and compress your assets.
Django-compressor is a good one to consider).  First, create a reasonable
structure for your static assets.  I like to create ``libs`` folders for 3rd-
party assets, and an additional folder for app-specific assets (we'll come back
to that later)::

    mkdir static
    cd static
    mkdir libs polls

Remember to add your *static* folder to the ``STATICFILES_DIRS`` setting, if it
is not within an app directory.

When downloading the 3rd-party libraries remember, ``wget`` is your friend::

    cd libs
    wget http://underscorejs.org/underscore.js
    wget http://backbonejs.org/backbone.js
    wget http://code.jquery.com/jquery-1.8.0.js -O jquery.js

Automated Testing
~~~~~~~~~~~~~~~~~

You may want to download a library for writing automated tests as well.  I find
`QUnit`_ to work well, and if you're familiar with xUnit testing frameworks
(like the Python unittest package), then it'll make a lot of sense to you.
However, some prefer *Jasmine*.

To set up QUnit, first download the library::

    wget http://code.jquery.com/qunit/qunit-1.9.0.js -O qunit.js
    wget http://code.jquery.com/qunit/qunit-1.9.0.css -O qunit.css

Then set up a test template:

*templates/test/index.html*::

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <link rel="stylesheet" href="{{ STATIC_URL }}libs/qunit.css">
            <script src="{{ STATIC_URL }}libs/qunit.js"></script>

            <!-- Your project-specific JavaScript imports will go here
            <script src="{{ STATIC_URL }}polls/models.js"></script>
            <script src="{{ STATIC_URL }}polls/views.js"></script>
            -->

        </head>
        <body>
            <div id="qunit"></div>

            <!-- Your test files will go here
            <script src="{{ STATIC_URL }}polls/tests.js"></script>
            -->

        </body>
    </html>


.. _QUnit: http://qunitjs.com/


Setting Up the Templates
------------------------

In the interest of simplicity, the ``polls`` tutorial omits the HTML
scaffolding from its templates.  It is going to be in our interest to include
this scaffolding.  Let's create a super-simple base template for our app.

*templates/polls/base.html*::

    <html>
        <head>
            <script src="{{ STATIC_URL }}libs/jquery.js"></script>
            <script src="{{ STATIC_URL }}libs/underscore.js"></script>
            <script src="{{ STATIC_URL }}libs/backbone.js"></script>
        </head>

        <body>
        {% block content %}
        {% endblock %}
        </body>
    </html>

Next, modify each of *index.html*, *detail.html*, and *results.html* to extend
the base.  Though we will be creating a single-page app, we will still be using
each of these templates::

    {% extend "polls/base.html" %}

    {% block content %}
    [...original template content...]
    {% endblock %}

Now we're ready to start with Backbone!


Exposing an API
===============

For something simple and low-security like this polling app, the no-frills API
that we created here is sufficient.  In production applications, you may have
need of a more full-featured API framework.  Every so often someone writes a
good roundup of the options in this regard on their blog, on some mailing list,
or on Stack Overflow.  The most recent good one that I've come across is on
Daniel Greenfield's (`@pydanny`_) post `Choosing an API framework for Django`_.
Danny recommends TastyPie and Django REST Framework

.. _@pydanny:
   http://www.twitter.com/pydanny

.. _Choosing an API framework for Django:
   http://pydanny.com/choosing-an-api-framework-for-django.html


A11y - Hijacking References and Submissions
===========================================


Client-side Templating
======================


Further Exploration
===================

DRYness
-------

One thing I've been experimenting with is using the same templating language on
both the client and the server. I have been working on a Django template adapter
for the PyBars project (`djangobars`_), with the intention of using Handlebars
in both places. With Handlebars, it would be possible to still use many of
Dajngo's template tags and filters in the templates.

Though I like this approach, some potential downsides include:

* having to implement Django's filters in Javascript as well, if I really
  want to use the templates without modification on both ends of the pipe

.. _djangobars: https://github.com/mjumbewu/djangobars

I18n
----

I've recently built support for Django's ``makemessages`` command in to
`django-mustachejs`_. I find this to work pretty well.

.. _django-mustachejs: https://github.com/mjumbewu/django-mustachejs
