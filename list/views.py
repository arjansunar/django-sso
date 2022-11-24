from rest_framework.generics import ListAPIView
from .models import List
from rest_framework.permissions import IsAuthenticated

from .serializer import ListSerializer

# Create your views here.
class ListAllLists(ListAPIView):
    serializer_class= ListSerializer
    permission_classes=[IsAuthenticated]


    def get_queryset(self):
        """
        This view should return a list of list
        for the currently authenticated user.
        """
        user = self.request.user
        return List.objects.filter(user=user)
    

