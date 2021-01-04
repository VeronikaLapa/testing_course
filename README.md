# testing_course

## ui
Минимальная версия приложения. На данный момент реализовано 3 страницы - логин, регистрация, пустая "Домашняя" страница. 

Форма для авторизации работает, отправляет запрос на бекэнд. get api/jwt?login=login&password=password. Возвращает токин для авторизации.

## Backend
Минимальная версия для работы с пользователями.

get api/jwt
get api/users/authenticated
get /api/users - список всех пользователей.
Get /api/users/filtered - список пользователей с заданным login/name/email
Post /api/users - создать нового пользователя
Put /api/users - изменение данных текущего пользователя

При запуске фроонтенд стартует на 3000 порте, бек на 8080.

## Тесты ui
Написаны юнит тесты на jest  и на mocha. Также есть пример snapshot теста на jest.

Команды для запуска тестов: npm jesttest и npm mochatest.

Мои заметки о сравнении данных test runners: [Jest vs Mocha](https://docs.google.com/document/d/1ulTE9VyNpwI2yN60doqlsrUM3ugssI3IxJV3HlQqFOY/edit?usp=sharing)
Позже отредактирую и перенесу заметки в ghpages, как того требует задание
