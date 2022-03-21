FROM python:3.10-alpine
WORKDIR /app
COPY main.py .
COPY req.txt .
RUN apk update
RUN apk add gcc g++ make \
    && pip install -r req.txt
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "$(pwd)" \
    --no-create-home \
    "app"
USER app
CMD ["/usr/local/bin/uvicorn", "main:app", "--host=0.0.0.0", "--port=8000"]
EXPOSE 8000
