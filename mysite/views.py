from django.shortcuts import render

def index(request):
    return render(request, 'mysite/index.html')

def search(request):
	return render(request, 'mysite/search.html')

def book(request):
	return render(request, 'mysite/book.html')

def chapter(request):
	return render(request, 'mysite/chapter.html')

def verse(request):
	return render(request, 'mysite/verse.html')

def section(request):
	return render(request, 'mysite/section.html')

def verseselected(request):
	return render(request, 'mysite/verseselected.html')
