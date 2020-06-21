from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="home"),
    path('search', views.search, name="search"),
    path('verse', views.verse, name="verse"),
    path('book', views.book, name="book"),
    path('chapter', views.chapter, name="chapter"),
    path('section', views.section, name="section"),
    path('verseselected', views.verseselected, name="verseselected"),
]
