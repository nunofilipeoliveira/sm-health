# Formatação do Pace - Correção

## Problema Identificado

O pace (ritmo) estava sendo exibido como um número decimal (ex: 5.7 min/km), o que não é uma representação intuitiva para corredores.

## Solução Implementada

### 1. Serviço RunService
Adicionado método `formatPace()` para converter decimal para formato minutos:segundos:

```typescript
private formatPace(paceDecimal: number): string {
  if (paceDecimal <= 0 || !isFinite(paceDecimal)) return '0:00';
  const minutes = Math.floor(paceDecimal);
  const seconds = Math.round((paceDecimal - minutes) * 60);
  if (seconds >= 60) {
    return `${minutes + 1}:00`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
```

### 2. Average Pace
O computed `averagePace` agora retorna formato `MM:SS`:

```typescript
averagePace = computed(() => {
  const total = this.totalDistance();
  const timeInMinutes = this.totalTime() / 60;
  const paceDecimal = total > 0 ? timeInMinutes / total : 0;
  return this.formatPace(paceDecimal);
});
```

### 3. Componente Home
Adicionados métodos para formatação:

- `formatPace(paceDecimal: number)` - Formata pace decimal para MM:SS
- `getRunPace(run: any)` - Calcula e formata o pace de uma corrida individual

### 4. Template HTML
Atualizado para usar a nova formatação:

```html
<!-- Pace médio -->
<div class="stat-value">{{ averagePace() }}</div>

<!-- Pace individual -->
<span class="run-value">{{ getRunPace(run) }} min/km</span>
```

## Exemplos

| Decimal | Formatado |
|---------|-----------|
| 5.0     | 5:00      |
| 5.5     | 5:30      |
| 5.7     | 5:42      |
| 6.2     | 6:12      |
| 4.9     | 4:54      |

## Benefícios

- ✅ Formato padrão usado por corredores (minutos:segundos)
- ✅ Mais intuitivo e fácil de entender
- ✅ Precisão de segundos
- ✅ Tratamento de casos extremos (valores negativos, infinito)

## Arquivos Modificados

1. `src/app/services/run.service.ts` - Adicionado `formatPace()`
2. `src/app/pages/home/home.component.ts` - Adicionados `formatPace()` e `getRunPace()`
3. `src/app/pages/home/home.component.html` - Atualizado para usar novos métodos
