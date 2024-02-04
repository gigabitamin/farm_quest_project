from datetime import timedelta
import os
import environ
from pathlib import Path
from urllib import request
import db_settings as db_settings
# import allowed_host


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# API관련 -psh
env_file_path = Path(__file__).resolve().parent.parent / '.env'
environ.Env.read_env(env_file=env_file_path)
env = environ.Env()
API_KEY = env('serviceKey')


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = "django-insecure-)ggi*w1=crxv=#p=%lz@+nh@q0aaz^#6q0x44#v$suouo2dj1a"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# ALLOWED_HOSTS = []

# ALLOWED_HOSTS = allowed_host.ALLOWED_HOSTS
SECRET_KEY = db_settings.SECRET_KEY

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    'farm_quest_app',
    'users_app',
    'diagnosis_app',
    'schedular_app',
    'gardening_shop_app',
    'customer_service_app',
    'guide_app',
    'community_app',
    
        
    # 리액트 연동    
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    # 'posts',
                
    # https ssl - kdy
    # 'django_extensions',
    # 'sslserver',
    # 'webcam_app',
    
    # 조회수
    'hitcount',
    # 'diagnosis_board_app',


]


# 리액트 로그인 관련 시작 -kdy

REST_FRAMEWORK = {    
    'DEFAULT_AUTHENTICATION_CLASSES': (     
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=240),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=240),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}
# 리액트 로그인 관련 끝 -kdy


MIDDLEWARE = [   
    # 리액트 연동 (순서 중요)
    'corsheaders.middleware.CorsMiddleware',        
    
    # 원본
    'django.middleware.security.SecurityMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]



ROOT_URLCONF = 'farm_quest_django.urls'

TEMP_DIR = os.path.join(BASE_DIR, 'build') 

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 'DIRS': [BASE_DIR / 'templates'],
        'DIRS': [TEMP_DIR],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',

                # 로그인 사용자용 user_info 컨텍스트 프로세서 -kdy
                'users_app.user_info.user_info',

            ],
        },
    },
]

WSGI_APPLICATION = 'farm_quest_django.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/
STATIC_URL = '/static/'

# STATICFILES_DIRS = [
#     BASE_DIR / 'static',
#     os.path.join(BASE_DIR, 'static') # 경로처리 -kdy
# ]


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'users_app.User'

LANGUAGE_CODE = 'ko-kr'

LOGIN_REDIRECT_URL = '/'

DATABASES = db_settings.DATABASES
SECRET_KEY = db_settings.SECRET_KEY


# users_app/sign_up2.html 이미지 업로드 기능 관련 -kdy


# MEDIA_URL = '/media/'
# MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# react_yolo 관련 -kdy
# url에서 사용하는 이름
MEDIA_URL = '/media/'
# reactWorkspace 안에 upload 폴더 생성됨
MEDIA_ROOT = os.path.join(BASE_DIR.parent, 'media')

# views.py 에서 이메일 발송을 위한 static 경로 설정 -kdy
STATICFILES_DIRS = [ 
    os.path.join(BASE_DIR, 'build/static')
]

# python manage.py collectstatic 이메일 이미지 첨부 경로를 위한 세팅 -kdy
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# 로그인 사용자 세션 처리 -kdy
# SESSION_ENGINE = "django.contrib.sessions.backends.db"  # 데이터베이스를 세션 저장소로 사용
# SESSION_COOKIE_AGE = 1209600 
# SESSION_ENGINE = "django.contrib.sessions.backends.signed_cookies"  # 사용자 지정 세션 엔진
# SESSION_COOKIE_AGE = 60 * 60 * 24 * 3  # 3일
# SESSION_EXPIRE_AT_BROWSER_CLOSE = True
# SESSION_COOKIE_SECURE = False
# SESSION_COOKIE_DOMAIN = '127.0.0.1:8000'


# 리액트 연동
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
# CORS_ALLOWED_ORIGINS = [    
#     "http://127.0.0.1:3000",
#     "http://127.0.0.1:8000",
#     "http://localhost:3000",
#     "http://localhost:8000"
# ]
# ALLOWED_HOSTS = ['localhost', '127.0.0.1']
ALLOWED_HOSTS = db_settings.ALLOWED_HOSTS

CORS_ALLOWED_ORIGINS = db_settings.CORS_ALLOWED_ORIGINS
SECURE_CROSS_ORIGIN_OPENER_POLICY = None

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
