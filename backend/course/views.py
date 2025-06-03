from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from django.conf import settings

from utils.s3_presigned_url import generate_presigned_url
from .serializers import CourseSerializer

@api_view(['POST'])
def get_presigned_url(request:Request):

    file_name = request.data.get('file_name')
    file_type = request.data.get('file_type')
    presigned_post = generate_presigned_url(file_name, file_type)

    return Response({
        'data': presigned_post,
        'url': f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{file_name}"
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def create_course(request:Request):
    print(request.data)
    serializer = CourseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(creator = request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
