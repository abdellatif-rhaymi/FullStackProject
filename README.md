FullStack Project — Magasin Voiture

Description
Projet FullStack pour gérer un magasin de voitures avec :
- Frontend React (port 3000)
- Backend Spring Boot (port 8065)
- Base de données MariaDB (port 3306)
- Prometheus pour la supervision (port 9090)
- Grafana pour les dashboards (port 3001)

Le projet est entièrement dockerisé et provisionné automatiquement pour Grafana.

---

Prérequis
- Docker et Docker Compose installés
- Git

---

Démarrage
Cloner le projet :

git clone https://github.com/abdellatif-rhaymi/FullStackProject.git
cd FullStack

Lancer les conteneurs :

docker-compose up -d
