

в докер проккинуть i2c

devices:
  - "/dev/i2c-1:/dev/i2c-1"


docker build -t ssteeleggs/dme-dashboard:latest .
docker push ssteeleggs/dme-dashboard


 docker compose up -d
