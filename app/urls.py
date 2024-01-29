from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('project/', views.get_project, name="get_project"),
    path('blog/', views.get_blog, name="get_blog"),
]