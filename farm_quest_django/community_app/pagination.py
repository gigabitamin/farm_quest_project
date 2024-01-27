from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

class CommunityPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 6

    def get_paginated_response(self, data):
        return Response({
            'count' : self.page.paginator.count,
            'page_count': self.page.paginator.num_pages,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        })