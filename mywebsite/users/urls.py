from django.urls import path                    
from .import views

urlpatterns=[
    path('index/',views.home_page),
    path('login/',views.login_view),
    path('events/',views.events_gallery),
    path('donation/',views.contributions)
]