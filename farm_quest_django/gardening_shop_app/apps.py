from django.apps import AppConfig


class GardeningShopAppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "gardening_shop_app"

    def ready(self):
        import gardening_shop_app.signals
class YourAppConfig(AppConfig):
    name = 'your_app'

