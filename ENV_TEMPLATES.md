# ENV TEMPLATES

## Configuring ENV variables & constants:

Create two .env files in the server and client directory of this project. <br>

Add & configure every necessary ENV variable. <br>

For the server directory .env file you're gonna need:
- OPEN_AI_API_KEY="super-secret-key"
- OPEN_AI_ORGANIZATION="super-secret-org"
- CLIENT_ORIGIN="http://localhost:5173"
- EMBEDDINGS_MODEL="your-embedding-model"

For the client directory .env file you're gonna need:
- VITE_API_URL=http://localhost:6969/api/v1/chat