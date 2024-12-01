from django.shortcuts import render
import random
from datetime import datetime
from django.template import loader
from django.http import HttpResponse


def index(request):
    date = datetime.today().strftime('%Y-%m-%d')
    random.seed(datetime.today().strftime('%Y-%m-%d'))
    type = random.choice([1, 1, 1, 1, 1, 0, 0])
    if type: day = "bones"
    else: day = "no bones"
    template = loader.get_template("index.html")
    context = {
        "date": date, 
        "day": day,
    }
    return HttpResponse(template.render(context, request))