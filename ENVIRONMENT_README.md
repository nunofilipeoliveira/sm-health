# Configuração de Ambiente - sm-health

Este documento descreve como configurar as URLs dos WebServices para diferentes ambientes.

## Estrutura de Arquivos

```
src/
└── environments/
    ├── environment.ts           # Desenvolvimento (localhost)
    └── environment.prod.ts      # Produção (API remota)
```

## Configurações Disponíveis

### Desenvolvimento (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

### Produção (environment.prod.ts)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://sm-health-core.onrender.com'
};
```

## Como Usar

### 1. Desenvolvimento Local
- Use `environment.ts` automaticamente ao rodar `ng serve`
- API será chamada em `http://localhost:8080`
- Configure o proxy em `proxy.conf.json` se necessário

### 2. Build de Produção
```bash
# Build para produção
ng build --configuration=production

# Ou simplesmente
ng build --prod
```
- Usa automaticamente `environment.prod.ts`
- API será chamada em `https://sm-health-core.onrender.com`

### 3. Build para Outros Ambientes
Para criar outros ambientes (staging, homologação, etc.):

1. Crie um novo arquivo de ambiente:
```typescript
// environment.staging.ts
export const environment = {
  production: true,
  apiUrl: 'https://staging-api.example.com'
};
```

2. Adicione a configuração no `angular.json`:
```json
"configurations": {
  "staging": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.staging.ts"
      }
    ]
  }
}
```

3. Faça o build:
```bash
ng build --configuration=staging
```

## Uso nos Serviços

Nos serviços Angular, importe o environment:

```typescript
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeuService {
  private readonly API_URL = environment.apiUrl + '/api/endpoint';

  constructor() {
    console.log('API URL:', this.API_URL);
  }
}
```

## Modificando a URL da API

Para alterar a URL da API:

1. **Desenvolvimento**: Edite `src/environments/environment.ts`
2. **Produção**: Edite `src/environments/environment.prod.ts`
3. **Outros ambientes**: Crie e configure novos arquivos de ambiente

## Proxy em Desenvolvimento

O arquivo `proxy.conf.json` é usado apenas em desenvolvimento com `ng serve`:

```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
}
```

Isso permite fazer requisições para `/api` que serão redirecionadas para `http://localhost:8080`.

## Troubleshooting

### API não responde em produção
- Verifique se a URL em `environment.prod.ts` está correta
- Confirme se o backend está acessível
- Verifique se há problemas de CORS

### Build não usa a configuração correta
- Verifique se está usando `--configuration=production` ou `--prod`
- Confirme que o arquivo `environment.prod.ts` existe

### Mudanças não aparecem
- Faça um build limpo: `ng build --configuration=production --output-path=dist/clean`
- Limpe o cache do navegador

## Notas

- A variável `production` é usada para habilitar/desabilitar recursos específicos de produção
- Mantenha as URLs de desenvolvimento e produção separadas
- Nunca commite senhas ou chaves de API nos arquivos de ambiente
- Use variáveis de ambiente do sistema para informações sensíveis
