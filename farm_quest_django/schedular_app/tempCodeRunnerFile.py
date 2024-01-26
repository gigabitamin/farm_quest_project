
def get_nx_ny_from_location(location_1, location_2, location_3):
    try:
        grid_data = GridData.objects.get(Q(location_1=location_1) & Q(location_2=location_2) & Q(location_3=location_3))
        nx, ny = str(grid_data.nx), str(grid_data.ny)
        print(f'Converted nx: {nx}, ny: {ny}')
        return nx, ny
    except GridData.DoesNotExist:
        return '0', '0'