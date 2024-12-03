FROM python:3.11.9-bookworm

WORKDIR /app

COPY Pipfile Pipfile.lock .

RUN pip install pipenv

COPY . .

RUN pipenv install --ignore-pipfile --system --dev

CMD python setup.py && pytest && python wsgi.py
