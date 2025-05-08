from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import AllowAny

from django.contrib.auth.models import AnonymousUser

from .models import CustomerDetails
from .serializers import CustomerDetailsSerializer

class CustomerAPIView(ListCreateAPIView):
    queryset = CustomerDetails.objects.all()
    permission_classes = [AllowAny]
    serializer_class = CustomerDetailsSerializer

    def perform_create(self, serializer):
        if not isinstance(self.request.user, AnonymousUser):
            serializer.save(user = self.request.user)
        serializer.save()
