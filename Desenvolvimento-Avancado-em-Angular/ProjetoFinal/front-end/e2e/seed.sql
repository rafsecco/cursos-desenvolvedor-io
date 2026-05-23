-- =============================================================================
-- SEED PARA TESTES E2E — MinhaApiCore
-- Idempotente: seguro de executar múltiplas vezes.
-- Pré-requisito: o usuário teste@teste.com deve existir em AspNetUsers.
--   Crie-o pela tela de cadastro (/conta/cadastro) antes de rodar este script.
-- =============================================================================

USE [MinhaApiCore];
GO

-- ─── 1. Usuário de teste ─────────────────────────────────────────────────────
IF NOT EXISTS (
    SELECT 1 FROM AspNetUsers
    WHERE Id = N'24ca00c0-975b-46d8-967d-b4ee8add5a44'
)
BEGIN
    INSERT INTO AspNetUsers (
        Id, UserName, NormalizedUserName, Email, NormalizedEmail,
        EmailConfirmed, PasswordHash, SecurityStamp, ConcurrencyStamp,
        PhoneNumber, PhoneNumberConfirmed, TwoFactorEnabled,
        LockoutEnd, LockoutEnabled, AccessFailedCount
    ) VALUES (
        N'24ca00c0-975b-46d8-967d-b4ee8add5a44',
        N'teste@teste.com', N'TESTE@TESTE.COM',
        N'teste@teste.com', N'TESTE@TESTE.COM',
        1,
        N'AQAAAAEAACcQAAAAECCc/K3d8MAmvzEJoqw2dphg9gNColBA80Zh5vkPEbTGeUGvUIyn+MDtGaEucqNKDg==',
        N'LEUNYD4L2KWCN4RQGWRVDBKZIFO2B7KV',
        N'd511830c-6351-432e-beb9-bd36d7fe5444',
        NULL, 0, 0, NULL, 1, 0
    );
END
GO

-- ─── 2. Claims do usuário de teste ───────────────────────────────────────────
-- Remove claims anteriores para garantir formato correto
DELETE FROM AspNetUserClaims
WHERE UserId = N'24ca00c0-975b-46d8-967d-b4ee8add5a44'
  AND ClaimType IN (N'Produto', N'Fornecedor');

SET IDENTITY_INSERT [dbo].[AspNetUserClaims] ON;

INSERT INTO AspNetUserClaims (Id, UserId, ClaimType, ClaimValue) VALUES
    (1, N'24ca00c0-975b-46d8-967d-b4ee8add5a44', N'Produto',    N'Adicionar,Atualizar,Excluir'),
    (2, N'24ca00c0-975b-46d8-967d-b4ee8add5a44', N'Fornecedor', N'Adicionar,Atualizar,Excluir');

SET IDENTITY_INSERT [dbo].[AspNetUserClaims] OFF;
GO

-- ─── 3. Fornecedores ─────────────────────────────────────────────────────────
IF NOT EXISTS (SELECT 1 FROM Fornecedores WHERE Id = N'02138343-6d88-47b7-4d45-08d6cdc617a1')
    INSERT INTO Fornecedores (Id, Nome, Documento, TipoFornecedor, Ativo)
    VALUES (N'02138343-6d88-47b7-4d45-08d6cdc617a1', N'Livros Nerds', N'66511169081', 1, 0);

IF NOT EXISTS (SELECT 1 FROM Fornecedores WHERE Id = N'cef33216-e53e-41d9-4d46-08d6cdc617a1')
    INSERT INTO Fornecedores (Id, Nome, Documento, TipoFornecedor, Ativo)
    VALUES (N'cef33216-e53e-41d9-4d46-08d6cdc617a1', N'Amazon Books', N'66514608000142', 2, 1);

IF NOT EXISTS (SELECT 1 FROM Fornecedores WHERE Id = N'f25952fc-3ff3-4b52-4d47-08d6cdc617a1')
    INSERT INTO Fornecedores (Id, Nome, Documento, TipoFornecedor, Ativo)
    VALUES (N'f25952fc-3ff3-4b52-4d47-08d6cdc617a1', N'Eduardo Pires Livros', N'12631823214', 1, 1);

IF NOT EXISTS (SELECT 1 FROM Fornecedores WHERE Id = N'b582a621-472d-403a-46af-08d6ce6e5165')
    INSERT INTO Fornecedores (Id, Nome, Documento, TipoFornecedor, Ativo)
    VALUES (N'b582a621-472d-403a-46af-08d6ce6e5165', N'SeboTech', N'30390600822', 1, 1);
GO

-- ─── 4. Endereços ────────────────────────────────────────────────────────────
IF NOT EXISTS (SELECT 1 FROM Enderecos WHERE Id = N'29caa063-e972-4991-7636-08d6cdc617a3')
    INSERT INTO Enderecos (Id, FornecedorId, Logradouro, Numero, Complemento, Cep, Bairro, Cidade, Estado)
    VALUES (N'29caa063-e972-4991-7636-08d6cdc617a3', N'02138343-6d88-47b7-4d45-08d6cdc617a1',
            N'Rua do Acre', N'1233', N'Lojas', N'03181100', N'Vila Bertioga', N'São Paulo', N'SP');

IF NOT EXISTS (SELECT 1 FROM Enderecos WHERE Id = N'2bcd2658-5a98-469d-7637-08d6cdc617a3')
    INSERT INTO Enderecos (Id, FornecedorId, Logradouro, Numero, Complemento, Cep, Bairro, Cidade, Estado)
    VALUES (N'2bcd2658-5a98-469d-7637-08d6cdc617a3', N'cef33216-e53e-41d9-4d46-08d6cdc617a1',
            N'Rua Antônio Macedo', N'3453', N'Fundos', N'03087010', N'Parque São Jorge', N'São Paulo', N'SP');

IF NOT EXISTS (SELECT 1 FROM Enderecos WHERE Id = N'be2a8535-6625-47f6-7638-08d6cdc617a3')
    INSERT INTO Enderecos (Id, FornecedorId, Logradouro, Numero, Complemento, Cep, Bairro, Cidade, Estado)
    VALUES (N'be2a8535-6625-47f6-7638-08d6cdc617a3', N'f25952fc-3ff3-4b52-4d47-08d6cdc617a1',
            N'Rua Coronel Irineu de Castro', N'43', N'CJ 1106', N'03333050', N'Jardim Anália Franco', N'São Paulo', N'SP');

IF NOT EXISTS (SELECT 1 FROM Enderecos WHERE Id = N'2306efaf-b5d6-40a3-ae79-08d6ce6e5169')
    INSERT INTO Enderecos (Id, FornecedorId, Logradouro, Numero, Complemento, Cep, Bairro, Cidade, Estado)
    VALUES (N'2306efaf-b5d6-40a3-ae79-08d6ce6e5169', N'b582a621-472d-403a-46af-08d6ce6e5165',
            N'Avenida Manoel Domingos Pinto', N'4450', N'Loja', N'05120000', N'Parque Anhangüera', N'São Paulo', N'SP');
GO

-- ─── 5. Produtos ─────────────────────────────────────────────────────────────
IF NOT EXISTS (SELECT 1 FROM Produtos WHERE Id = N'912ac3e8-8ca0-4708-f520-08d6d7f166aa')
    INSERT INTO Produtos (Id, FornecedorId, Nome, Descricao, Imagem, Valor, DataCadastro, Ativo)
    VALUES (N'912ac3e8-8ca0-4708-f520-08d6d7f166aa', N'02138343-6d88-47b7-4d45-08d6cdc617a1',
            N'JavaScript nas fronteiras', N'JavaScript nas fronteiras',
            N'1dbbd291-279f-4743-a781-0c92a482bc2b_JQuery.jpg', 1.00, N'2019-05-13T19:26:39.0085034', 1);

IF NOT EXISTS (SELECT 1 FROM Produtos WHERE Id = N'1067326c-5dd4-4d86-d14c-08d6d7f28ecc')
    INSERT INTO Produtos (Id, FornecedorId, Nome, Descricao, Imagem, Valor, DataCadastro, Ativo)
    VALUES (N'1067326c-5dd4-4d86-d14c-08d6d7f28ecc', N'b582a621-472d-403a-46af-08d6ce6e5165',
            N'Regex fácil!', N'Regex fácil!',
            N'4677e4a2-c57e-42f9-8cef-7ea55aa92c33_Regex.jpg', 500.00, N'2019-05-13T19:30:09.7901809', 1);

IF NOT EXISTS (SELECT 1 FROM Produtos WHERE Id = N'ea472496-6d53-4744-4b47-08d6d7f4eeba')
    INSERT INTO Produtos (Id, FornecedorId, Nome, Descricao, Imagem, Valor, DataCadastro, Ativo)
    VALUES (N'ea472496-6d53-4744-4b47-08d6d7f4eeba', N'f25952fc-3ff3-4b52-4d47-08d6cdc617a1',
            N'MVC 5', N'MVC 5',
            N'9e2b29e2-f7e6-4fbf-8696-761ebd462f47_MVC5.jpg', 122.00, N'2019-05-13T19:47:09.7866487', 1);

IF NOT EXISTS (SELECT 1 FROM Produtos WHERE Id = N'0f1a7ed3-091d-457f-2fb3-08d6d7fc893a')
    INSERT INTO Produtos (Id, FornecedorId, Nome, Descricao, Imagem, Valor, DataCadastro, Ativo)
    VALUES (N'0f1a7ed3-091d-457f-2fb3-08d6d7fc893a', N'02138343-6d88-47b7-4d45-08d6cdc617a1',
            N'Razor Completo', N'Razor Completo',
            N'cc0a711a-a172-48a1-ab69-b074b572321b_Razor.jpg', 125.00, N'2019-05-13T20:41:35.4087087', 0);

IF NOT EXISTS (SELECT 1 FROM Produtos WHERE Id = N'cce7be65-5489-46aa-2fb4-08d6d7fc893a')
    INSERT INTO Produtos (Id, FornecedorId, Nome, Descricao, Imagem, Valor, DataCadastro, Ativo)
    VALUES (N'cce7be65-5489-46aa-2fb4-08d6d7fc893a', N'cef33216-e53e-41d9-4d46-08d6cdc617a1',
            N'CSS Total', N'CSS Total',
            N'1e723e03-a406-442b-b2c8-f4c561681379_CSS.jpg', 12.00, N'2019-05-13T21:17:31.1770832', 1);

IF NOT EXISTS (SELECT 1 FROM Produtos WHERE Id = N'1a3fbec5-4dc3-4455-2fb5-08d6d7fc893a')
    INSERT INTO Produtos (Id, FornecedorId, Nome, Descricao, Imagem, Valor, DataCadastro, Ativo)
    VALUES (N'1a3fbec5-4dc3-4455-2fb5-08d6d7fc893a', N'b582a621-472d-403a-46af-08d6ce6e5165',
            N'HTML 5', N'HTML 5',
            N'734ed7ec-23c7-4b6a-80ea-9cbf445a6729_HTML.jpg', 10.00, N'2019-05-13T21:42:32.2754874', 1);

IF NOT EXISTS (SELECT 1 FROM Produtos WHERE Id = N'74db5a66-3967-4547-4879-08d7eebb64b7')
    INSERT INTO Produtos (Id, FornecedorId, Nome, Descricao, Imagem, Valor, DataCadastro, Ativo)
    VALUES (N'74db5a66-3967-4547-4879-08d7eebb64b7', N'cef33216-e53e-41d9-4d46-08d6cdc617a1',
            N'Java para Seniors', N'Java para Seniors',
            N'2994c744-02d5-4b4a-98d1-e04ae8709e5c_Java.jpg', 250.00, N'2020-05-02T14:08:11.2285147', 0);
GO

SELECT 'Seed concluído com sucesso.' AS Resultado;
GO
