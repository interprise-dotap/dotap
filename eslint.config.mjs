import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    rules: {
      camelcase: [
        'error',
        {
          allow: ['Geist_Mono'], // Adicione aqui os nomes que você quer permitir
        },
      ],
    },
  },
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    '@rocketseat/eslint-config/react',
  ),
]

export default eslintConfig
