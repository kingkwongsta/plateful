FROM python:3.9-slim
WORKDIR /backend
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]

# docker build -t food .
# docker images
# docker tag efd31fcbf471 gcr.io/fastapi-418702/march28:latest
# gcloud auth configure-docker
# docker push gcr.io/fastapi-418702/march28:latest