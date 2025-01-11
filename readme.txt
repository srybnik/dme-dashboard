
docker build -t ssteeleggs/dme-dashboard:latest .
docker push ssteeleggs/dme-dashboard


docker compose down --rmi all
docker compose up -d


cp /home/dme-dashboard/config/cfg.json /home/dme-dashboard/config/cfg-backup.json

cd /home/dme-dashboard
