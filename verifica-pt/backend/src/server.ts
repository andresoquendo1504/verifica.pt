import express from 'express'

const app = express()
const port = Number(process.env.PORT ?? 3001)

app.disable('x-powered-by')
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'verifica.pt-api' })
})

app.listen(port, () => {
  console.log(`Verifica.pt API disponível em http://localhost:${port}`)
})
