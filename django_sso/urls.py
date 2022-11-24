from django.contrib import admin
from django.urls import path, re_path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    # drf social auth
    re_path(r'^auth/', include('drf_social_oauth2.urls', namespace='drf')),
    path('list/', include('list.urls')),
    path('user/', include('user.urls'))

]
