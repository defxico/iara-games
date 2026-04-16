---
description: "Use quando criar, revisar ou exportar o pacote de agentes e prompts da Iara Games"
---

# Iara Agent Package

## Objetivo

Este pacote organiza agentes e prompts da Iara Games para uso local e exportação.

## Estrutura

- `iara-games-main/agents`: agentes e subagentes especializados.
- `iara-games-main/prompts`: prompts de invocação e operação.
- `iara-games-main`: instruções de manutenção e exportação.

## Convenções

- Um agente por responsabilidade principal.
- Delegação explícita no agente orquestrador.
- Prompt com frontmatter válido e formato de saída obrigatório.
- Toda recomendação deve apontar arquivo-alvo.

## Checklist de exportação

1. Validar frontmatter YAML de todos os `.agent.md` e `.prompt.md`.
2. Garantir coerência entre `description` e especialidade real do agente.
3. Confirmar que prompts apontam para agentes existentes.
4. Verificar se não há conteúdo duplicado/corrompido.
