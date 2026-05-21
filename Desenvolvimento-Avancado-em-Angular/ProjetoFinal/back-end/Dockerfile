### Estágio 1 — Build ###
FROM mcr.microsoft.com/dotnet/sdk:3.1 AS dotnet-builder
WORKDIR /app
COPY . /app
RUN dotnet restore src/DevIO.Api/DevIO.Api.csproj
RUN dotnet publish src/DevIO.Api/DevIO.Api.csproj -c Release -o /app/publish

### Estágio 2 — Runtime ###
FROM mcr.microsoft.com/dotnet/aspnet:3.1
WORKDIR /app
EXPOSE 80
EXPOSE 443
COPY --from=dotnet-builder /app/publish .
ENTRYPOINT ["dotnet", "DevIO.Api.dll"]
