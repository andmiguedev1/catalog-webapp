# Online Catalog

> This application simulates an eCommerce catalog from an online store. It includes the backend and frontend in one monorepo.

## Features

- Searching Products
- Filter Products by Category
- Sort Products by Listing Price
- Display Recent Products
- Navigate Paginated Products   

### Backend

- **SQLite Database**: persitent storage for entities
- **.NET Core API**: logic for models crud operations
- **Swagger API**: API documentation and design tools
- **Entity Framework**: ORM that populates SQL Tables

### Frontend

- **Redux Thunk**: middleware that handles async operations
- **Redux Toolkit**: simplifies handling of state management 
- **Material UI**: designed library that has consistent look
- **React.js**: scalable use of reusable components and hooks

## Installation

**Clone the repository**

```bash
git clone https://github.com/andresmgomez/catalog-webapp.git
cd Catalog
```

**How to build and run API**
```bash
cd api
dotnet run or dotnet watch run
```

**How to build and run Client**
```bash
cd client
npm install
```

## Troubleshoot Errors in .NET Core

1. Start the API:
   1. From a terminal, navigate to the `./api/` folder and run:
      1. `dotnet restore` (install dependencies)
      1. `dotnet ef migrations add InitialMigration` (creates a [migration](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations))
      1. `dotnet ef database update` (build the database)
      1. `dotnet run` (start server)
   2. Install Entity Framework locally: (In case dotnet ef fails)
      1. `dotnet new tool-manifest`
      2. `dotnet tool install --local dotnet-ef --version 5.0.8`
