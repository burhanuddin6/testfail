from django.apps import AppConfig


class TcmsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tcms'

    def ready(self):
        import tcms.signals
