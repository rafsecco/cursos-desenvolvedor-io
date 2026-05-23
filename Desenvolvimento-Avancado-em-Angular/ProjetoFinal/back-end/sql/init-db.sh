#!/bin/bash
set -e
echo "Aguardando SQL Server ficar pronto..."
/opt/mssql-tools18/bin/sqlcmd \
  -S sqlserver \
  -U sa \
  -P "$SA_PASSWORD" \
  -C \
  -i /sql/criarbanco.sql
echo "Banco criado com sucesso"
