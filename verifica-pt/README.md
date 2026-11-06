# Verifica.pt

Plataforma de apoio à verificação de notícias, desenvolvida como Prova de Aptidão Profissional.

## Estado do projeto

- **Fase 1 — estrutura e interface:** interface responsiva, formulário com validação local e API Express com endpoint de saúde.
- **Em desenvolvimento:** pesquisa de fontes reais, avaliação de fontes e comparação de evidências.
- **Previsto:** contas, histórico, administração e funcionalidades multimédia.

Na Fase 1, o formulário ainda não pesquisa notícias. A aplicação informa explicitamente que não foram consultadas fontes nem criados resultados.

## Tecnologias

- Frontend: React, TypeScript e Vite.
- Backend: Node.js, Express e TypeScript.
- A interface e a API estão organizadas em pastas e pacotes separados.

## Requisitos

Instala uma versão LTS recente do Node.js, que inclui o npm. Confirma a instalação no terminal:

```powershell
node --version
npm --version
```

## Instalação e execução

Na pasta principal do projeto, instala as dependências:

```powershell
npm install
```

Abre dois terminais no VS Code.

No primeiro, inicia a interface:

```powershell
npm run dev:frontend
```

Abre o endereço apresentado pelo Vite, normalmente `http://localhost:5173`.

No segundo, inicia a API:

```powershell
npm run dev:backend
```

A API fica disponível em `http://localhost:3001`. Para confirmar que está ativa, abre `http://localhost:3001/api/health`; a resposta indica apenas o estado do serviço, não resultados de verificação.

O Vite encaminha pedidos iniciados por `/api` para o backend local.

## Verificação da compilação

```powershell
npm run build
```

## Estrutura

```text
verifica-pt/
├── frontend/
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       └── styles.css
├── backend/
│   └── src/
│       └── server.ts
├── .gitignore
├── package.json
└── README.md
```

## Próximo passo

Na Fase 2, será integrada uma fonte/API real de pesquisa. As chaves de serviços externos deverão ficar no backend, em variáveis de ambiente, e nunca no frontend.
