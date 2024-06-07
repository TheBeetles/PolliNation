RUN python:3.12.3-alpine

WORKDIR /app/server

COPY Pipfile Pipfile.lock ./

RUN pip install pipenv
RUN pipenv install --ignore-pipfile --system --dev

COPY . /app/server

CMD python wsgi.py
