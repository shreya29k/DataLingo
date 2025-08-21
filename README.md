DataLingo

DataLingo is a Natural Language to Database Querying Platform that allows users to query multiple databases (MySQL, PostgreSQL, MongoDB) and uploaded files (CSV/Excel) using plain English. It simplifies data access for non-technical users while ensuring flexibility, scalability, and security.

🚀 Features

Natural Language to SQL/NoSQL conversion using Mistral-7B (fine-tuned & integrated via LangChain).

Multi-Database Support: MySQL, PostgreSQL, MongoDB.

File Uploads: Supports CSV & Excel data parsing.

Authentication: JWT-based login/register system.

Microservices Architecture with Spring Boot & Eureka Discovery.

API Gateway with JWT Global Filter.

Query History per User (view past queries & results).

Frontend built with React + Vite + Tailwind (clean & responsive UI).

Analytics (Planned): Query frequency, success rates, usage statistics.

Dockerized Setup for easy deployment.

🏗️ Tech Stack
Frontend

React + Vite + TailwindCSS

JWT-based authentication

Query interface + result tables

Dark/Light theme

Backend (Microservices)

Eureka Server – Service discovery

API Gateway – Routes + JWT global filter

Auth Service – /auth/register, /auth/login, JWT issuance

Query Processing Service – NL → SQL/NoSQL conversion using Mistral-7B

Data Source Service – Handles DB connections & queries

File Processing Service – Parses CSV/Excel uploads

Analytics Service – Usage stats (planned)

Infrastructure

PostgreSQL, MongoDB, Redis

Docker Compose

Monitoring: Prometheus + Grafana

Logging: Elasticsearch + Kibana

🧠 AI Model – Mistral-7B

We used Mistral-7B, a state-of-the-art open-weight LLM, for natural language query understanding and SQL/NoSQL generation.

Model: Mistral-7B (7 billion parameters)

Accuracy: Higher than LLaMA-2 13B on many NLP tasks

Strengths: Optimized inference speed, strong reasoning, and efficient handling of structured query generation

Integration: Combined with LangChain for schema detection & prompt chaining to improve SQL accuracy

```📂 Project Structure
DataLingo/
│── Frontend/               # React + Vite + Tailwind app
│── Backend/                # Spring Boot microservices
│   ├── auth-service/       # JWT authentication
│   ├── query-service/      # NL → SQL conversion
│   ├── datasource-service/ # DB connectors
│   ├── file-service/       # File upload + parsing
│   ├── api-gateway/        # Global JWT + routing
│   └── eureka-server/      # Service discovery
│── docker-compose.yml      # Docker setup
│── README.md               # Project documentation
```

⚡ Getting Started
1️⃣ Clone Repo
git clone https://github.com/shreya29k/DataLingo.git
cd DataLingo

2️⃣ Run Backend
cd Backend
docker-compose up --build

3️⃣ Run Frontend
cd Frontend
npm install
npm run dev

4️⃣ Access App

Go to 👉 http://localhost:5173

🔮 Future Enhancements

Add voice-based query input.

Advanced analytics dashboard for query trends.

Support for more databases (Oracle, SQL Server).

Fine-tuned domain-specific Mistral models for higher accuracy.

✨ Built with passion using Spring Boot, React, and Mistral-7B ✨
