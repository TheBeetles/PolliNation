FROM python:3.12.3-alpine

WORKDIR /app

COPY Pipfile Pipfile.lock .

RUN pip install pipenv

COPY . .

RUN pipenv install --ignore-pipfile --system --dev

CMD python setup.py && python wsgi.py
