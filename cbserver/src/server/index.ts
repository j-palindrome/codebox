import max from 'max-api'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import { transform } from '@babel/core'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'index.html')))

  max.addHandler('text', (input: string) => {
    transform(
      input,
      {
        plugins: ['@babel/plugin-transform-typescript']
      },
      (err, result) => {
        if (!result?.code) {
          max.post('ERROR: ', err?.message ?? 'unknown')
        } else {
          max.outlet('text', result?.code)
        }
      }
    )
  })

  // Use vite's connect instance as middleware. If you use your own
  // express router (express.Router()), you should use router.use
  // When the server restarts (for example after the user modifies
  // vite.config.js), `vite.middlewares` is still going to be the same
  // reference (with a new internal stack of Vite and plugin-injected
  // middlewares. The following is valid even after restarts.
  app.use(vite.middlewares)

  app.listen(7007)
}

createServer()
