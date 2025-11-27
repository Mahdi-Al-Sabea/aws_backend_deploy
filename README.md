# aws-backend

Simple Node.js Express backend with basic CRUD endpoints.

## Setup

```powershell
cd "c:\Users\mahdi\Desktop\codes\aws testing\aws-backend"
npm install express cors
npm install --save-dev nodemon
```

## Scripts
- `npm run start` - Run server normally
- `npm run dev` - Run with nodemon auto-reload

## Endpoints

| Method | Path          | Description              |
|--------|---------------|--------------------------|
| GET    | /health       | Health/status check      |
| GET    | /items        | List all items           |
| GET    | /items/:id    | Get single item by id    |
| POST   | /items        | Create new item (name)   |
| PUT    | /items/:id    | Update item name         |
| DELETE | /items/:id    | Delete item              |

### Sample Requests

```powershell
# Health
curl http://localhost:4000/health

# List items
curl http://localhost:4000/items

# Get item 1
curl http://localhost:4000/items/1

# Create item
curl -X POST http://localhost:4000/items -H "Content-Type: application/json" -d '{"name":"Third"}'

# Update item 1
curl -X PUT http://localhost:4000/items/1 -H "Content-Type: application/json" -d '{"name":"Updated"}'

# Delete item 2
curl -X DELETE http://localhost:4000/items/2
```

## Environment
- Port defaults to `4000` (override with `PORT` env var)

## Notes
Data is in-memory and resets on restart. Use a database for persistence when needed.
