# node-nestjs-structure

Node.js framework NestJS project structure

## Required

`node:~20.19.0`

## Configuration

1. Create a `.env` file
   - Rename the [.env.dist](.env.dist) file to `.env` to fix it.
2. Edit env config
   - Edit the file in the [config](src/config) folder.
   - `default`, `development`, `production`, `test`

## Config Database MSSQL

### **🔹 Tạo Database bằng SQL Server**
Trước khi chạy ứng dụng, cần tạo database `HIENTEST`.  
📌 **Chạy lệnh SQL sau để tạo database và bảng `tblphone`:**

```sql
-- create database
CREATE DATABASE HIENTEST;
GO
USE HIENTEST;
GO

-- create table tblphone
CREATE TABLE tblphone (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category SMALLINT NULL,
    price SMALLINT NULL,
    deletedAt DATETIME NULL
);

## Development


nvm use 20
npm run start:dev
```

Run [http://localhost:3001](http://localhost:3001)

## Test

```sh
npm test # exclude e2e
npm run test:e2e
```

## Production

```sh
# define NODE_ENV and PORT
npm run build
# NODE_ENV=production PORT=8000 node dist/app
node dist/app
# OR
npm start
```

### API DOCUMENTATION

[http://localhost:3001/api](http://localhost:3001/api)
