# FinanceIA Pro - TODO

## Funcionalidades do MVP

### Core
- [x] Sistema de armazenamento local (localStorage wrapper)
- [x] Componente principal FinanceIAPro completo
- [x] Navegação por abas (Dashboard, Receitas, Despesas, Ativos, Empréstimos)

### Dashboard
- [x] Cards de KPIs (Receita, Despesas, Lucro, Margem)
- [x] Gráfico de evolução mensal (área)
- [x] Gráfico de despesas por categoria (pizza)
- [x] Insights inteligentes com recomendações
- [x] Métricas adicionais (Ponto de Equilíbrio, Ticket Médio)

### Gestão de Receitas
- [x] Modal de cadastro de receitas
- [x] Suporte para empresas de produto e serviço
- [x] Tabela de listagem de receitas
- [x] Cálculo automático de totais

### Gestão de Despesas
- [x] Modal de cadastro de despesas
- [x] Classificação entre fixas e variáveis
- [x] Categorias predefinidas
- [x] Tabela de listagem de despesas
- [x] Cards de totais (Fixas e Variáveis)

### Gestão de Ativos
- [x] Modal de cadastro de ativos
- [x] Suporte para depreciação e amortização
- [x] Cálculo automático mensal
- [x] Tabela de listagem de ativos

### Gestão de Empréstimos
- [x] Modal de cadastro de empréstimos
- [x] Cálculo de juros compostos
- [x] Tabela de amortização
- [x] Listagem de empréstimos ativos

### Configurações
- [x] Seleção de tipo de empresa (Produto/Serviço)
- [x] Persistência de dados no localStorage
- [x] Carregamento automático ao iniciar

### UI/UX
- [x] Design responsivo com Tailwind CSS
- [x] Componentes reutilizáveis (Modal, KPICard)
- [x] Ícones com Lucide React
- [x] Feedback visual de ações

## Novas Funcionalidades - Fase 2

### Sistema de Metas Financeiras
- [x] Modal de configuração de metas
- [x] Metas mensais de receita
- [x] Metas mensais de lucro líquido
- [x] Metas de margem de lucro (%)
- [x] Metas de despesas máximas
- [x] Metas de fluxo de caixa mínimo
- [x] Indicadores visuais de progresso (%)
- [x] Alertas quando próximo ou fora da meta
- [x] Histórico de metas vs realizado

### Fluxo de Caixa Detalhado
- [x] Aba dedicada ao fluxo de caixa
- [x] Saldo inicial de caixa
- [x] Entradas: vendas à vista
- [x] Entradas: recebimentos de vendas a prazo
- [x] Entradas: empréstimos recebidos
- [x] Entradas: outras entradas
- [x] Saídas: pagamento a fornecedores
- [x] Saídas: folha de pagamento
- [x] Saídas: impostos
- [x] Saídas: despesas operacionais
- [x] Saídas: amortização de empréstimos
- [x] Saídas: juros pagos
- [x] Cálculo de saldo final
- [x] Gráfico de evolução do fluxo de caixa
- [x] Projeção de fluxo futuro

### Indicadores Avançados e Balancetes
- [ ] Aba de indicadores avançados
- [ ] Balancete patrimonial (Ativo/Passivo/PL)
- [x] Ativo Circulante (Caixa, Contas a Receber, Estoques)
- [x] Ativo Não Circulante (Imobilizado, Intangível)
- [x] Passivo Circulante (Fornecedores, Empréstimos CP, Impostos)
- [x] Passivo Não Circulante (Empréstimos LP)
- [x] Patrimônio Líquido (Capital Social, Lucros Acumulados)
- [ ] PC - Prazo de Cobrança (dias)
- [ ] PMPF - Prazo Médio Pagamento Fornecedores (dias)
- [ ] PME - Prazo Médio Estoque (dias)
- [ ] PMO - Prazo Médio de Operação
- [ ] PMRV - Prazo Médio Renovação Vendas
- [ ] CDG - Capital de Giro
- [ ] NCG - Necessidade de Capital de Giro
- [ ] Saldo de Tesouraria
- [ ] ROE - Return on Equity
- [ ] ROA - Return on Assets
- [ ] EBITDA
- [ ] Margem EBITDA
- [ ] Índice de Endividamento
- [ ] Composição do Endividamento
- [ ] Cobertura de Juros
- [ ] Gráficos de indicadores de liquidez
- [ ] Gráficos de indicadores de rentabilidade
- [ ] Gráficos de indicadores de endividamento

### Gestão de Fornecedores
- [ ] Cadastro de fornecedores
- [ ] Prazos de pagamento por fornecedor
- [ ] Contas a pagar
- [ ] Histórico de compras
- [ ] Controle de vencimentos

### Gestão de Clientes/Contas a Receber
- [ ] Cadastro de clientes
- [ ] Vendas a prazo
- [ ] Prazos de recebimento
- [ ] Contas a receber
- [ ] Controle de inadimplência

### Controle de Estoques
- [ ] Cadastro de produtos
- [ ] Estoque inicial/entradas/saídas/final
- [ ] Custo médio ponderado
- [ ] Giro de estoque
- [ ] Dias em estoque

## Fase 3 - Indicadores Avançados e Balancetes

### Indicadores Avançados
- [x] Aba de Indicadores Avançados
- [ ] PMO (Prazo Médio de Estocagem)
- [x] PMPF (Prazo Médio de Pagamento a Fornecedores)
- [ ] PC (Prazo de Cobrança)
- [x] PMRV (Prazo Médio de Recebimento de Vendas)
- [x] CDG (Capital de Giro)
- [x] ROE (Return on Equity)
- [x] ROA (Return on Assets)
- [x] EBITDA (Lucro antes de Juros, Impostos, Depreciação e Amortização)
- [x] Liquidez Corrente
- [x] Liquidez Seca

### Balancetes
- [x] Aba de Balancetes
- [x] Balancete Patrimonial (Ativo/Passivo/PL)
- [x] Ativo Circulante
- [x] Ativo Não Circulante
- [x] Passivo Circulante
- [x] Passivo Não Circulante
- [x] Patrimônio Líquido
- [x] Gráficos de composição patrimonial
- [x] Análise vertical e horizontal

### Otimizações
- [x] Remover código redundante
- [x] Otimizar funções de cálculo
- [x] Melhorar performance de renderização
