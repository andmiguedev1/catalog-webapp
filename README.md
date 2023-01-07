## Tech stack used:

- .NET 5
- SQLite Database
- Entity Framework

## How to build and run

1. Start the API:
   1. From a terminal, navigate to the `./api/` folder and run:
      1. `dotnet restore` (install dependencies)
      1. `dotnet ef migrations add InitialMigration` (creates a [migration](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations))
      1. `dotnet ef database update` (build the database)
      1. `dotnet run` (start server)
   2. Install Entity Framework locally: (In case dotnet ef fails)
      1. `dotnet new tool-manifest`
      2. `dotnet tool install --local dotnet-ef --version 5.0.8`
