# File Persistence Express API

A lightweight REST API built with **Node.js** and **Express** that persists data in a local JSON file, with no database required. All create, update, and delete operations are saved to disk, so data survives server restarts.

## Features

- Full CRUD operations (Create, Read, Update, Delete)
- Data stored in a JSON file (`data/items.json`)
- Automatic file creation if it doesn't exist
- Input validation and error handling
- Simple, modular project structure

## Tech Stack

- Node.js
- Express.js
- fs (Node.js built-in file system module)

## Project Structure

```
file-persistence-api/
├── data/
│   └── items.json
├── routes/
│   └── items.js
├── utils/
│   └── fileStore.js
├── app.js
├── package.json
└── README.md
```
