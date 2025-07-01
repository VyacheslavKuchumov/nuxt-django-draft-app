# Nuxt 3 and Django Test App

Чтобы запустить приложение, выполните следующие шаги:
1. Убедитесь, что у вас установлены Node.js и Python.
2. Установите зависимости для Nuxt:
   ```bash
   cd frontend
   npm install
   ```
3. Установите зависимости для Django:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
4. Запустите сервер Django:
   ```bash
   python manage.py runserver
   ```
5. Запустите Nuxt приложение:
   ```bash
   npm run dev
    ```
6. Откройте браузер и перейдите по адресу `http://localhost:3000` для доступа к приложению.

7. Для доступа к административной панели Django перейдите по адресу `http://127.0.0.1:8000/admin/`.

# Структура проекта
- `frontend/` - папка с Nuxt приложением.
  - `pages/` - страницы приложения.
  - `components/` - переиспользуемые компоненты.
  - `layouts/` - макеты страниц.
  - `plugins/` - плагины Nuxt.
- `backend/` - папка с Django приложением.
  - `app/` - основное приложение Django.
  - `manage.py` - скрипт для управления проектом Django.
  - `requirements.txt` - зависимости Python.
  - `api/` - папка с API Django.
    - `views.py` - представления API.
    - `urls.py` - маршруты API.
    - `serializers.py` - сериализаторы для работы с данными.