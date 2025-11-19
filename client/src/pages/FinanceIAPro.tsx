import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight, Download, Plus, Calendar, Building2, Package, Briefcase, X, Target, Activity, Settings, FileText, AlertCircle } from 'lucide-react';

const FinanceIAPro = () => {
  const [companyType, setCompanyType] = useState('produto');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [loans, setLoans] = useState<any[]>([]);
  const [cashFlowEntries, setCashFlowEntries] = useState<any[]>([]);
  const [goals, setGoals] = useState<any>({
    monthlyRevenue: 0,
    monthlyProfit: 0,
    profitMargin: 0,
    maxExpenses: 0,
    minCashFlow: 0
  });
  
  const [showRevenueModal, setShowRevenueModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [showCashFlowModal, setShowCashFlowModal] = useState(false);

  const [revenueForm, setRevenueForm] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    category: '',
    quantity: '',
    unitPrice: ''
  });

  const [expenseForm, setExpenseForm] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    category: '',
    type: 'fixa'
  });

  const [assetForm, setAssetForm] = useState({
    name: '',
    value: '',
    acquisitionDate: new Date().toISOString().split('T')[0],
    usefulLife: '',
    type: 'depreciacao'
  });

  const [loanForm, setLoanForm] = useState({
    name: '',
    amount: '',
    interestRate: '',
    months: '',
    startDate: new Date().toISOString().split('T')[0]
  });

  const [cashFlowForm, setCashFlowForm] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'entrada',
    category: '',
    description: '',
    amount: ''
  });

  const [goalsForm, setGoalsForm] = useState({
    monthlyRevenue: '',
    monthlyProfit: '',
    profitMargin: '',
    maxExpenses: '',
    minCashFlow: ''
  });

  const cashFlowCategories = {
    entrada: [
      'Vendas à Vista',
      'Recebimento Vendas a Prazo',
      'Empréstimos Recebidos',
      'Aporte de Capital',
      'Outras Entradas'
    ],
    saida: [
      'Pagamento Fornecedores',
      'Folha de Pagamento',
      'Impostos',
      'Despesas Operacionais',
      'Amortização Empréstimos',
      'Juros Pagos',
      'Outras Saídas'
    ]
  };

  const revenueCategories = {
    produto: ['Venda de Produtos', 'Venda por E-commerce', 'Venda Atacado', 'Venda Varejo', 'Outras Receitas'],
    servico: ['Prestação de Serviços', 'Consultorias', 'Assinaturas', 'Manutenções', 'Outras Receitas']
  };

  const expenseCategories = [
    'Folha de Pagamento',
    'Encargos Sociais',
    'Aluguel',
    'Água/Luz/Internet',
    'Marketing',
    'Fornecedores',
    'Impostos',
    'Material de Escritório',
    'Manutenção',
    'Combustível',
    'Outras Despesas'
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const transData = localStorage.getItem('transactions');
      const expData = localStorage.getItem('expenses');
      const assetsData = localStorage.getItem('assets');
      const loansData = localStorage.getItem('loans');
      const typeData = localStorage.getItem('companyType');

      if (transData) setTransactions(JSON.parse(transData));
      if (expData) setExpenses(JSON.parse(expData));
      if (assetsData) setAssets(JSON.parse(assetsData));
      if (loansData) setLoans(JSON.parse(loansData));
      if (typeData) setCompanyType(typeData);
      
      const goalsData = localStorage.getItem('goals');
      const cashFlowData = localStorage.getItem('cashFlowEntries');
      if (goalsData) setGoals(JSON.parse(goalsData));
      if (cashFlowData) setCashFlowEntries(JSON.parse(cashFlowData));
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const saveData = () => {
    try {
      localStorage.setItem('transactions', JSON.stringify(transactions));
      localStorage.setItem('expenses', JSON.stringify(expenses));
      localStorage.setItem('assets', JSON.stringify(assets));
      localStorage.setItem('loans', JSON.stringify(loans));
      localStorage.setItem('companyType', companyType);
      localStorage.setItem('goals', JSON.stringify(goals));
      localStorage.setItem('cashFlowEntries', JSON.stringify(cashFlowEntries));
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  useEffect(() => {
    if (transactions.length > 0 || expenses.length > 0 || assets.length > 0 || loans.length > 0) {
      saveData();
    }
  }, [transactions, expenses, assets, loans, companyType, goals, cashFlowEntries]);

  const addRevenue = () => {
    const newTransaction = {
      id: Date.now(),
      ...revenueForm,
      amount: parseFloat(revenueForm.amount),
      type: 'receita'
    };
    setTransactions([...transactions, newTransaction]);
    setRevenueForm({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: '',
      category: '',
      quantity: '',
      unitPrice: ''
    });
    setShowRevenueModal(false);
  };

  const addExpense = () => {
    const newExpense = {
      id: Date.now(),
      ...expenseForm,
      amount: parseFloat(expenseForm.amount)
    };
    setExpenses([...expenses, newExpense]);
    setExpenseForm({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: '',
      category: '',
      type: 'fixa'
    });
    setShowExpenseModal(false);
  };

  const addAsset = () => {
    const newAsset = {
      id: Date.now(),
      ...assetForm,
      value: parseFloat(assetForm.value),
      usefulLife: parseInt(assetForm.usefulLife)
    };
    setAssets([...assets, newAsset]);
    setAssetForm({
      name: '',
      value: '',
      acquisitionDate: new Date().toISOString().split('T')[0],
      usefulLife: '',
      type: 'depreciacao'
    });
    setShowAssetModal(false);
  };

  const addLoan = () => {
    const newLoan = {
      id: Date.now(),
      ...loanForm,
      amount: parseFloat(loanForm.amount),
      interestRate: parseFloat(loanForm.interestRate),
      months: parseInt(loanForm.months)
    };
    setLoans([...loans, newLoan]);
    setLoanForm({
      name: '',
      amount: '',
      interestRate: '',
      months: '',
      startDate: new Date().toISOString().split('T')[0]
    });
    setShowLoanModal(false);
  };

  const getTotalRevenue = () => transactions.reduce((sum, t) => sum + t.amount, 0);
  const getTotalExpenses = () => expenses.reduce((sum, e) => sum + e.amount, 0);
  const getFixedExpenses = () => expenses.filter(e => e.type === 'fixa').reduce((sum, e) => sum + e.amount, 0);
  const getVariableExpenses = () => expenses.filter(e => e.type === 'variavel').reduce((sum, e) => sum + e.amount, 0);
  
  const getDepreciation = () => {
    return assets.reduce((sum, asset) => {
      if (asset.type === 'depreciacao') {
        const monthlyDepreciation = asset.value / (asset.usefulLife * 12);
        return sum + monthlyDepreciation;
      }
      return sum;
    }, 0);
  };

  const getAmortization = () => {
    return assets.reduce((sum, asset) => {
      if (asset.type === 'amortizacao') {
        const monthlyAmortization = asset.value / (asset.usefulLife * 12);
        return sum + monthlyAmortization;
      }
      return sum;
    }, 0);
  };

  const getLoanInterest = () => {
    return loans.reduce((sum, loan) => {
      const monthlyRate = loan.interestRate / 100 / 12;
      const monthlyPayment = loan.amount * monthlyRate * Math.pow(1 + monthlyRate, loan.months) / (Math.pow(1 + monthlyRate, loan.months) - 1);
      const interest = monthlyPayment - (loan.amount / loan.months);
      return sum + interest;
    }, 0);
  };

  const getNetProfit = () => {
    const revenue = getTotalRevenue();
    const expenses = getTotalExpenses();
    const depreciation = getDepreciation();
    const amortization = getAmortization();
    const interest = getLoanInterest();
    return revenue - expenses - depreciation - amortization - interest;
  };

  const getProfitMargin = () => {
    const revenue = getTotalRevenue();
    return revenue > 0 ? (getNetProfit() / revenue) * 100 : 0;
  };

  const getBreakEven = () => {
    const fixed = getFixedExpenses();
    const variable = getVariableExpenses();
    const revenue = getTotalRevenue();
    const contributionMargin = revenue > 0 ? (revenue - variable) / revenue : 0;
    return contributionMargin > 0 ? fixed / contributionMargin : 0;
  };

  const getAverageTicket = () => {
    return transactions.length > 0 ? getTotalRevenue() / transactions.length : 0;
  };

  const getCashFlow = () => {
    const entries = cashFlowEntries.filter(e => e.type === 'entrada').reduce((sum, e) => sum + e.amount, 0);
    const exits = cashFlowEntries.filter(e => e.type === 'saida').reduce((sum, e) => sum + e.amount, 0);
    return entries - exits;
  };

  const getCashFlowByMonth = () => {
    const months: any = {};
    
    cashFlowEntries.forEach(entry => {
      const month = entry.date.substring(0, 7);
      if (!months[month]) months[month] = { entradas: 0, saidas: 0 };
      
      if (entry.type === 'entrada') {
        months[month].entradas += entry.amount;
      } else {
        months[month].saidas += entry.amount;
      }
    });

    return Object.keys(months).sort().map(month => ({
      mes: month,
      entradas: months[month].entradas,
      saidas: months[month].saidas,
      saldo: months[month].entradas - months[month].saidas
    }));
  };

// Funções para Indicadores Avançados - Adicionar após getCashFlowByMonth

  // Indicadores Avançados
  const calculatePMRV = () => {
    const receitasPrazo = transactions.filter(t => t.paymentType === 'prazo');
    if (receitasPrazo.length === 0) return 0;
    return 30; // Média de 30 dias (simplificado)
  };

  const calculatePMPF = () => {
    const despesasPrazo = expenses.filter(e => e.paymentType === 'prazo');
    if (despesasPrazo.length === 0) return 0;
    return 45; // Média de 45 dias (simplificado)
  };

  const calculateCDG = () => {
    const ativoCirculante = getTotalRevenue() + getCashFlow();
    const passivoCirculante = getTotalExpenses();
    return ativoCirculante - passivoCirculante;
  };

  const calculateROE = () => {
    const lucroLiquido = getNetProfit();
    const patrimonioLiquido = calculatePatrimonioLiquido();
    if (patrimonioLiquido === 0) return 0;
    return (lucroLiquido / patrimonioLiquido) * 100;
  };

  const calculateROA = () => {
    const lucroLiquido = getNetProfit();
    const ativoTotal = calculateAtivoTotal();
    if (ativoTotal === 0) return 0;
    return (lucroLiquido / ativoTotal) * 100;
  };

  const calculateEBITDA = () => {
    const lucroLiquido = getNetProfit();
    const depreciacaoAmortizacao = assets.reduce((sum, asset) => {
      const monthlyDepreciation = asset.value / (asset.usefulLife * 12);
      return sum + monthlyDepreciation;
    }, 0);
    const juros = loans.reduce((sum, loan) => {
      return sum + (loan.amount * (loan.interestRate / 100));
    }, 0);
    return lucroLiquido + juros + depreciacaoAmortizacao;
  };

  const calculateLiquidezCorrente = () => {
    const ativoCirculante = getTotalRevenue() + getCashFlow();
    const passivoCirculante = getTotalExpenses();
    if (passivoCirculante === 0) return 0;
    return ativoCirculante / passivoCirculante;
  };

  const calculateLiquidezSeca = () => {
    const ativoCirculante = getTotalRevenue() + getCashFlow();
    const estoques = 0; // Simplificado
    const passivoCirculante = getTotalExpenses();
    if (passivoCirculante === 0) return 0;
    return (ativoCirculante - estoques) / passivoCirculante;
  };

  // Balancete
  const calculateAtivoCirculante = () => {
    return getTotalRevenue() + Math.max(getCashFlow(), 0);
  };

  const calculateAtivoNaoCirculante = () => {
    return assets.reduce((sum, asset) => {
      const monthsPassed = Math.floor((new Date().getTime() - new Date(asset.acquisitionDate).getTime()) / (1000 * 60 * 60 * 24 * 30));
      const monthlyDepreciation = asset.value / (asset.usefulLife * 12);
      const accumulatedDepreciation = monthlyDepreciation * monthsPassed;
      return sum + (asset.value - accumulatedDepreciation);
    }, 0);
  };

  const calculateAtivoTotal = () => {
    return calculateAtivoCirculante() + calculateAtivoNaoCirculante();
  };

  const calculatePassivoCirculante = () => {
    return getTotalExpenses();
  };

  const calculatePassivoNaoCirculante = () => {
    return loans.reduce((sum, loan) => {
      const monthsPassed = Math.floor((new Date().getTime() - new Date(loan.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30));
      const monthlyPayment = loan.amount / loan.months;
      const paidAmount = monthlyPayment * monthsPassed;
      return sum + Math.max(loan.amount - paidAmount, 0);
    }, 0);
  };

  const calculatePassivoTotal = () => {
    return calculatePassivoCirculante() + calculatePassivoNaoCirculante();
  };

  const calculatePatrimonioLiquido = () => {
    return calculateAtivoTotal() - calculatePassivoTotal();
  };


  const getGoalProgress = (actual: number, goal: number) => {
    if (goal === 0) return 0;
    return Math.min((actual / goal) * 100, 100);
  };

  const getGoalStatus = (actual: number, goal: number, isMax: boolean = false) => {
    if (goal === 0) return 'neutral';
    const ratio = actual / goal;
    
    if (isMax) {
      if (ratio <= 0.8) return 'success';
      if (ratio <= 1) return 'warning';
      return 'danger';
    } else {
      if (ratio >= 1) return 'success';
      if (ratio >= 0.8) return 'warning';
      return 'danger';
    }
  };

  const addCashFlowEntry = () => {
    const newEntry = {
      id: Date.now(),
      ...cashFlowForm,
      amount: parseFloat(cashFlowForm.amount)
    };
    setCashFlowEntries([...cashFlowEntries, newEntry]);
    setCashFlowForm({
      date: new Date().toISOString().split('T')[0],
      type: 'entrada',
      category: '',
      description: '',
      amount: ''
    });
    setShowCashFlowModal(false);
  };

  const saveGoals = () => {
    const newGoals = {
      monthlyRevenue: parseFloat(goalsForm.monthlyRevenue) || 0,
      monthlyProfit: parseFloat(goalsForm.monthlyProfit) || 0,
      profitMargin: parseFloat(goalsForm.profitMargin) || 0,
      maxExpenses: parseFloat(goalsForm.maxExpenses) || 0,
      minCashFlow: parseFloat(goalsForm.minCashFlow) || 0
    };
    setGoals(newGoals);
    setShowGoalsModal(false);
  };

  const getMonthlyData = () => {
    const months: any = {};
    
    transactions.forEach(t => {
      const month = t.date.substring(0, 7);
      if (!months[month]) months[month] = { receita: 0, despesa: 0 };
      months[month].receita += t.amount;
    });

    expenses.forEach(e => {
      const month = e.date.substring(0, 7);
      if (!months[month]) months[month] = { receita: 0, despesa: 0 };
      months[month].despesa += e.amount;
    });

    return Object.keys(months).sort().map(month => ({
      mes: month,
      receita: months[month].receita,
      despesa: months[month].despesa,
      lucro: months[month].receita - months[month].despesa
    }));
  };

  const getExpensesByCategory = () => {
    const categories: any = {};
    expenses.forEach(e => {
      categories[e.category] = (categories[e.category] || 0) + e.amount;
    });
    return Object.keys(categories).map(cat => ({ name: cat, value: categories[cat] }));
  };

  const getRevenueByCategory = () => {
    const categories: any = {};
    transactions.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });
    return Object.keys(categories).map(cat => ({ name: cat, value: categories[cat] }));
  };

  const getInsights = () => {
    const insights = [];
    const profitMargin = getProfitMargin();
    const cashFlow = getCashFlow();
    const fixedExpenses = getFixedExpenses();
    const variableExpenses = getVariableExpenses();
    const totalExpenses = getTotalExpenses();
    const revenue = getTotalRevenue();
    const profit = getNetProfit();

    // Insights de metas
    if (goals.monthlyRevenue > 0) {
      const revenueProgress = (revenue / goals.monthlyRevenue) * 100;
      if (revenueProgress < 80) {
        insights.push({
          type: 'warning',
          title: 'Meta de Receita em Risco',
          message: `Você atingiu apenas ${revenueProgress.toFixed(1)}% da meta de receita (R$ ${revenue.toFixed(2)} de R$ ${goals.monthlyRevenue.toFixed(2)}). Considere intensificar ações comerciais.`,
          impact: 'alto'
        });
      } else if (revenueProgress >= 100) {
        insights.push({
          type: 'success',
          title: 'Meta de Receita Atingida!',
          message: `Parabéns! Você superou a meta de receita em ${(revenueProgress - 100).toFixed(1)}%.`,
          impact: 'positivo'
        });
      }
    }

    if (goals.monthlyProfit > 0) {
      const profitProgress = (profit / goals.monthlyProfit) * 100;
      if (profitProgress < 80) {
        insights.push({
          type: 'warning',
          title: 'Meta de Lucro Abaixo do Esperado',
          message: `Lucro atual representa ${profitProgress.toFixed(1)}% da meta. Revise despesas e estratégias de precificação.`,
          impact: 'alto'
        });
      }
    }

    if (goals.maxExpenses > 0 && totalExpenses > goals.maxExpenses) {
      const excessPercent = ((totalExpenses / goals.maxExpenses - 1) * 100).toFixed(1);
      insights.push({
        type: 'danger',
        title: 'Despesas Acima do Limite',
        message: `Suas despesas estão ${excessPercent}% acima do limite estabelecido. Ação imediata necessária para controle de custos.`,
        impact: 'crítico'
      });
    }

    if (profitMargin < 10 && profitMargin !== 0) {
      insights.push({
        type: 'warning',
        title: 'Margem de Lucro Baixa',
        message: `Sua margem de lucro está em ${profitMargin.toFixed(1)}%. Para melhorar, considere: reduzir despesas variáveis em 10% ou aumentar preços em 5%.`,
        impact: 'alto'
      });
    } else if (profitMargin > 30) {
      insights.push({
        type: 'success',
        title: 'Excelente Margem de Lucro',
        message: `Parabéns! Sua margem de ${profitMargin.toFixed(1)}% está acima da média. Continue monitorando para manter esse desempenho.`,
        impact: 'positivo'
      });
    }

    if (cashFlow < 0) {
      insights.push({
        type: 'danger',
        title: 'Fluxo de Caixa Negativo',
        message: `Atenção! Suas despesas superam as receitas em R$ ${Math.abs(cashFlow).toFixed(2)}. Ação imediata necessária.`,
        impact: 'crítico'
      });
    }

    if (fixedExpenses > 0 && variableExpenses > 0) {
      const fixedRatio = (fixedExpenses / totalExpenses) * 100;
      if (fixedRatio > 70) {
        insights.push({
          type: 'warning',
          title: 'Alto Percentual de Despesas Fixas',
          message: `${fixedRatio.toFixed(1)}% das suas despesas são fixas. Considere renegociar contratos ou buscar alternativas mais flexíveis.`,
          impact: 'médio'
        });
      }
    }

    return insights;
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const KPICard = ({ title, value, subtitle, icon: Icon, trend, color, goal, progress }: any) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{title}</span>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
      {goal && progress !== null && progress !== undefined && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Meta: {goal}</span>
            <span>{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                progress >= 100 ? 'bg-green-500' : 
                progress >= 80 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      )}
      {trend && (
        <div className={`flex items-center gap-1 text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span>{Math.abs(trend).toFixed(1)}%</span>
        </div>
      )}
    </div>
  );

  const Modal = ({ show, onClose, title, children }: any) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">FinanceIA Pro</h1>
              <p className="text-blue-100 mt-1">Gestão Financeira Inteligente para sua Empresa</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white text-gray-900 font-medium"
              >
                <option value="produto">Empresa de Produto</option>
                <option value="servico">Empresa de Serviço</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Building2 },
              { id: 'metas', label: 'Metas', icon: Target },
              { id: 'fluxo-caixa', label: 'Fluxo de Caixa', icon: Activity },
              { id: 'indicadores', label: 'Indicadores', icon: BarChart },
              { id: 'balancetes', label: 'Balancetes', icon: FileText },
              { id: 'receitas', label: 'Receitas', icon: TrendingUp },
              { id: 'despesas', label: 'Despesas', icon: TrendingDown },
              { id: 'ativos', label: 'Ativos', icon: Package },
              { id: 'emprestimos', label: 'Empréstimos', icon: Briefcase }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="Receita Total"
                value={`R$ ${getTotalRevenue().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                icon={DollarSign}
                color="text-green-600"
                goal={goals.monthlyRevenue > 0 ? `R$ ${goals.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : null}
                progress={goals.monthlyRevenue > 0 ? getGoalProgress(getTotalRevenue(), goals.monthlyRevenue) : null}
              />
              <KPICard
                title="Despesas Totais"
                value={`R$ ${getTotalExpenses().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                icon={TrendingDown}
                color="text-red-600"
                goal={goals.maxExpenses > 0 ? `R$ ${goals.maxExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : null}
                progress={goals.maxExpenses > 0 ? getGoalProgress(getTotalExpenses(), goals.maxExpenses) : null}
              />
              <KPICard
                title="Lucro Líquido"
                value={`R$ ${getNetProfit().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                subtitle={`${getProfitMargin().toFixed(1)}% de margem`}
                icon={TrendingUp}
                color={getNetProfit() >= 0 ? 'text-green-600' : 'text-red-600'}
                goal={goals.monthlyProfit > 0 ? `R$ ${goals.monthlyProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : null}
                progress={goals.monthlyProfit > 0 ? getGoalProgress(getNetProfit(), goals.monthlyProfit) : null}
              />
              <KPICard
                title="Fluxo de Caixa"
                value={`R$ ${getCashFlow().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                icon={Activity}
                color={getCashFlow() >= 0 ? 'text-green-600' : 'text-red-600'}
                goal={goals.minCashFlow > 0 ? `R$ ${goals.minCashFlow.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : null}
                progress={goals.minCashFlow > 0 ? getGoalProgress(getCashFlow(), goals.minCashFlow) : null}
              />
            </div>

            {getInsights().length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold mb-4">Insights Inteligentes</h3>
                <div className="space-y-4">
                  {getInsights().map((insight, idx) => (
                    <div key={idx} className={`p-4 rounded-lg ${
                      insight.type === 'success' ? 'bg-green-50 border border-green-200' :
                      insight.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                      'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex gap-3">
                        {insight.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />}
                        {insight.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />}
                        {insight.type === 'danger' && <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />}
                        <div>
                          <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                          <p className="text-sm text-gray-700 mt-1">{insight.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold mb-4">Evolução Mensal</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={getMonthlyData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => `R$ ${Number(value).toFixed(2)}`} />
                    <Legend />
                    <Area type="monotone" dataKey="receita" stackId="1" stroke="#10b981" fill="#10b981" />
                    <Area type="monotone" dataKey="despesa" stackId="2" stroke="#ef4444" fill="#ef4444" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold mb-4">Despesas por Categoria</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getExpensesByCategory()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getExpensesByCategory().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `R$ ${Number(value).toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm text-gray-600 mb-2">Ponto de Equilíbrio</h3>
                <p className="text-2xl font-bold">R$ {getBreakEven().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm text-gray-600 mb-2">Ticket Médio</h3>
                <p className="text-2xl font-bold">R$ {getAverageTicket().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm text-gray-600 mb-2">Total de Transações</h3>
                <p className="text-2xl font-bold">{transactions.length}</p>
              </div>
            </div>
          </div>
        )}

// CONTEÚDO DA ABA METAS - Adicionar antes da aba de receitas

        {activeTab === 'metas' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Sistema de Metas Financeiras</h2>
              <button
                onClick={() => {
                  setGoalsForm({
                    monthlyRevenue: goals.monthlyRevenue.toString(),
                    monthlyProfit: goals.monthlyProfit.toString(),
                    profitMargin: goals.profitMargin.toString(),
                    maxExpenses: goals.maxExpenses.toString(),
                    minCashFlow: goals.minCashFlow.toString()
                  });
                  setShowGoalsModal(true);
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Settings className="w-4 h-4" /> Configurar Metas
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Meta de Receita Mensal</h3>
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Meta: R$ {goals.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      <span>Realizado: R$ {getTotalRevenue().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className={`h-4 rounded-full transition-all ${
                          getGoalStatus(getTotalRevenue(), goals.monthlyRevenue) === 'success' ? 'bg-green-500' :
                          getGoalStatus(getTotalRevenue(), goals.monthlyRevenue) === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(getGoalProgress(getTotalRevenue(), goals.monthlyRevenue), 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {getGoalProgress(getTotalRevenue(), goals.monthlyRevenue).toFixed(1)}% da meta atingida
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Meta de Lucro Líquido</h3>
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Meta: R$ {goals.monthlyProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      <span>Realizado: R$ {getNetProfit().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className={`h-4 rounded-full transition-all ${
                          getGoalStatus(getNetProfit(), goals.monthlyProfit) === 'success' ? 'bg-green-500' :
                          getGoalStatus(getNetProfit(), goals.monthlyProfit) === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(getGoalProgress(getNetProfit(), goals.monthlyProfit), 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {getGoalProgress(getNetProfit(), goals.monthlyProfit).toFixed(1)}% da meta atingida
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Limite de Despesas</h3>
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Limite: R$ {goals.maxExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      <span>Atual: R$ {getTotalExpenses().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className={`h-4 rounded-full transition-all ${
                          getGoalStatus(getTotalExpenses(), goals.maxExpenses, true) === 'success' ? 'bg-green-500' :
                          getGoalStatus(getTotalExpenses(), goals.maxExpenses, true) === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(getGoalProgress(getTotalExpenses(), goals.maxExpenses), 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {getGoalProgress(getTotalExpenses(), goals.maxExpenses).toFixed(1)}% do limite utilizado
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Meta de Fluxo de Caixa</h3>
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Meta: R$ {goals.minCashFlow.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      <span>Atual: R$ {getCashFlow().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className={`h-4 rounded-full transition-all ${
                          getGoalStatus(getCashFlow(), goals.minCashFlow) === 'success' ? 'bg-green-500' :
                          getGoalStatus(getCashFlow(), goals.minCashFlow) === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(getGoalProgress(getCashFlow(), goals.minCashFlow), 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {getGoalProgress(getCashFlow(), goals.minCashFlow).toFixed(1)}% da meta atingida
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4">Resumo de Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Status Geral</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {[
                      getGoalStatus(getTotalRevenue(), goals.monthlyRevenue),
                      getGoalStatus(getNetProfit(), goals.monthlyProfit),
                      getGoalStatus(getTotalExpenses(), goals.maxExpenses, true),
                      getGoalStatus(getCashFlow(), goals.minCashFlow)
                    ].filter(s => s === 'success').length} / 4
                  </p>
                  <p className="text-xs text-gray-500">Metas Atingidas</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Margem Atual</p>
                  <p className="text-2xl font-bold text-green-600">{getProfitMargin().toFixed(1)}%</p>
                  <p className="text-xs text-gray-500">Margem de Lucro</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Eficiência</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {getTotalRevenue() > 0 ? ((getTotalRevenue() - getTotalExpenses()) / getTotalRevenue() * 100).toFixed(1) : 0}%
                  </p>
                  <p className="text-xs text-gray-500">Receita vs Despesa</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Ticket Médio</p>
                  <p className="text-2xl font-bold text-orange-600">
                    R$ {getAverageTicket().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-gray-500">Por Transação</p>
                </div>
              </div>
            </div>
          </div>
        )}

// CONTEÚDO DA ABA FLUXO DE CAIXA - Adicionar antes da aba de receitas

        {activeTab === 'fluxo-caixa' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Fluxo de Caixa Detalhado</h2>
              <button
                onClick={() => setShowCashFlowModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" /> Nova Movimentação
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow p-6">
                <h3 className="text-sm opacity-90 mb-2">Total de Entradas</h3>
                <p className="text-3xl font-bold">
                  R$ {cashFlowEntries.filter(e => e.type === 'entrada').reduce((sum, e) => sum + e.amount, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg shadow p-6">
                <h3 className="text-sm opacity-90 mb-2">Total de Saídas</h3>
                <p className="text-3xl font-bold">
                  R$ {cashFlowEntries.filter(e => e.type === 'saida').reduce((sum, e) => sum + e.amount, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className={`bg-gradient-to-br ${getCashFlow() >= 0 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} text-white rounded-lg shadow p-6`}>
                <h3 className="text-sm opacity-90 mb-2">Saldo</h3>
                <p className="text-3xl font-bold">
                  R$ {getCashFlow().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {getCashFlowByMonth().length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold mb-4">Evolução Mensal do Fluxo de Caixa</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={getCashFlowByMonth()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => `R$ ${Number(value).toFixed(2)}`} />
                    <Legend />
                    <Area type="monotone" dataKey="entradas" stackId="1" stroke="#10b981" fill="#10b981" name="Entradas" />
                    <Area type="monotone" dataKey="saidas" stackId="2" stroke="#ef4444" fill="#ef4444" name="Saídas" />
                    <Area type="monotone" dataKey="saldo" stroke="#3b82f6" fill="#3b82f6" name="Saldo" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-bold">Movimentações</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cashFlowEntries.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          Nenhuma movimentação registrada
                        </td>
                      </tr>
                    ) : (
                      cashFlowEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(entry => (
                        <tr key={entry.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {new Date(entry.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              entry.type === 'entrada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {entry.type === 'entrada' ? 'Entrada' : 'Saída'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{entry.category}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{entry.description}</td>
                          <td className={`px-6 py-4 text-sm font-medium text-right ${
                            entry.type === 'entrada' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {entry.type === 'entrada' ? '+' : '-'} R$ {entry.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}


        {activeTab === 'indicadores' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Indicadores Avançados</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">EBITDA</h3>
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  R$ {calculateEBITDA().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-500 mt-2">Lucro antes de Juros, Impostos, Depreciação e Amortização</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">ROE</h3>
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-green-600">
                  {calculateROE().toFixed(2)}%
                </p>
                <p className="text-sm text-gray-500 mt-2">Retorno sobre Patrimônio Líquido</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">ROA</h3>
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-purple-600">
                  {calculateROA().toFixed(2)}%
                </p>
                <p className="text-sm text-gray-500 mt-2">Retorno sobre Ativos</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">CDG</h3>
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-3xl font-bold text-orange-600">
                  R$ {calculateCDG().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-500 mt-2">Capital de Giro</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">PMRV</h3>
                  <Activity className="w-6 h-6 text-cyan-600" />
                </div>
                <p className="text-3xl font-bold text-cyan-600">
                  {calculatePMRV().toFixed(0)} dias
                </p>
                <p className="text-sm text-gray-500 mt-2">Prazo Médio de Recebimento de Vendas</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">PMPF</h3>
                  <Activity className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-3xl font-bold text-red-600">
                  {calculatePMPF().toFixed(0)} dias
                </p>
                <p className="text-sm text-gray-500 mt-2">Prazo Médio de Pagamento a Fornecedores</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Liquidez Corrente</h3>
                  <DollarSign className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-3xl font-bold text-indigo-600">
                  {calculateLiquidezCorrente().toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-2">Capacidade de pagamento de curto prazo</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Liquidez Seca</h3>
                  <DollarSign className="w-6 h-6 text-teal-600" />
                </div>
                <p className="text-3xl font-bold text-teal-600">
                  {calculateLiquidezSeca().toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-2">Liquidez sem considerar estoques</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4">Análise de Indicadores</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900">EBITDA Positivo</p>
                    <p className="text-sm text-blue-700">
                      O EBITDA de R$ {calculateEBITDA().toLocaleString('pt-BR', { minimumFractionDigits: 2 })} indica boa capacidade operacional de geração de caixa.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-900">ROE Saudável</p>
                    <p className="text-sm text-green-700">
                      ROE de {calculateROE().toFixed(2)}% demonstra boa rentabilidade sobre o capital próprio investido.
                    </p>
                  </div>
                </div>

                {calculateLiquidezCorrente() < 1 && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900">Atenção: Liquidez Baixa</p>
                      <p className="text-sm text-red-700">
                        Liquidez corrente abaixo de 1.0 indica possível dificuldade em honrar compromissos de curto prazo.
                      </p>
                    </div>
                  </div>
                )}

                {calculateCDG() < 0 && (
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-900">Capital de Giro Negativo</p>
                      <p className="text-sm text-yellow-700">
                        CDG negativo requer atenção. Considere renegociar prazos ou buscar capital adicional.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}


        {activeTab === 'balancetes' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Balancete Patrimonial</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-4 text-green-700">ATIVO</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-700">Ativo Circulante</h4>
                      <span className="text-lg font-bold text-green-600">
                        R$ {calculateAtivoCirculante().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="pl-4 space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>• Caixa e Equivalentes</span>
                        <span>R$ {Math.max(getCashFlow(), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Contas a Receber</span>
                        <span>R$ {getTotalRevenue().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-700">Ativo Não Circulante</h4>
                      <span className="text-lg font-bold text-green-600">
                        R$ {calculateAtivoNaoCirculante().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="pl-4 space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>• Imobilizado</span>
                        <span>R$ {calculateAtivoNaoCirculante().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 border-green-600 pt-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-gray-900">TOTAL DO ATIVO</h4>
                      <span className="text-2xl font-bold text-green-700">
                        R$ {calculateAtivoTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-4 text-red-700">PASSIVO + PATRIMÔNIO LÍQUIDO</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-700">Passivo Circulante</h4>
                      <span className="text-lg font-bold text-red-600">
                        R$ {calculatePassivoCirculante().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="pl-4 space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>• Contas a Pagar</span>
                        <span>R$ {getTotalExpenses().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-700">Passivo Não Circulante</h4>
                      <span className="text-lg font-bold text-red-600">
                        R$ {calculatePassivoNaoCirculante().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="pl-4 space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>• Empréstimos de Longo Prazo</span>
                        <span>R$ {calculatePassivoNaoCirculante().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-blue-700">Patrimônio Líquido</h4>
                      <span className="text-lg font-bold text-blue-600">
                        R$ {calculatePatrimonioLiquido().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="pl-4 space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>• Capital Social + Lucros Acumulados</span>
                        <span>R$ {calculatePatrimonioLiquido().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 border-red-600 pt-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-gray-900">TOTAL DO PASSIVO + PL</h4>
                      <span className="text-2xl font-bold text-red-700">
                        R$ {(calculatePassivoTotal() + calculatePatrimonioLiquido()).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold mb-4">Composição do Ativo</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Ativo Circulante', value: calculateAtivoCirculante() },
                        { name: 'Ativo Não Circulante', value: calculateAtivoNaoCirculante() }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${((entry.value / calculateAtivoTotal()) * 100).toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#3b82f6" />
                    </Pie>
                    <Tooltip formatter={(value: any) => `R$ ${Number(value).toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold mb-4">Composição do Passivo + PL</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Passivo Circulante', value: calculatePassivoCirculante() },
                        { name: 'Passivo Não Circulante', value: calculatePassivoNaoCirculante() },
                        { name: 'Patrimônio Líquido', value: calculatePatrimonioLiquido() }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${((entry.value / (calculatePassivoTotal() + calculatePatrimonioLiquido())) * 100).toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#ef4444" />
                      <Cell fill="#f97316" />
                      <Cell fill="#3b82f6" />
                    </Pie>
                    <Tooltip formatter={(value: any) => `R$ ${Number(value).toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4">Análise Patrimonial</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Endividamento</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {((calculatePassivoTotal() / calculateAtivoTotal()) * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-500">Passivo / Ativo</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Composição do Endividamento</p>
                  <p className="text-2xl font-bold text-red-600">
                    {calculatePassivoTotal() > 0 ? ((calculatePassivoCirculante() / calculatePassivoTotal()) * 100).toFixed(1) : 0}%
                  </p>
                  <p className="text-xs text-gray-500">Curto Prazo / Total</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Imobilização do PL</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {calculatePatrimonioLiquido() > 0 ? ((calculateAtivoNaoCirculante() / calculatePatrimonioLiquido()) * 100).toFixed(1) : 0}%
                  </p>
                  <p className="text-xs text-gray-500">Ativo NC / PL</p>
                </div>
              </div>
            </div>
          </div>
        )}


        {activeTab === 'receitas' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestão de Receitas</h2>
              <button
                onClick={() => setShowRevenueModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" /> Nova Receita
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Valor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map(t => (
                    <tr key={t.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(t.date).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-4 text-sm">{t.description}</td>
                      <td className="px-6 py-4 text-sm">{t.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-green-600">
                        R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'despesas' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestão de Despesas</h2>
              <button
                onClick={() => setShowExpenseModal(true)}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                <Plus className="w-4 h-4" /> Nova Despesa
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm text-gray-600 mb-2">Despesas Fixas</h3>
                <p className="text-2xl font-bold text-red-600">R$ {getFixedExpenses().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm text-gray-600 mb-2">Despesas Variáveis</h3>
                <p className="text-2xl font-bold text-orange-600">R$ {getVariableExpenses().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Valor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {expenses.map(e => (
                    <tr key={e.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(e.date).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-4 text-sm">{e.description}</td>
                      <td className="px-6 py-4 text-sm">{e.category}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${e.type === 'fixa' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}>
                          {e.type === 'fixa' ? 'Fixa' : 'Variável'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-red-600">
                        R$ {e.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'ativos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Ativos e Depreciação/Amortização</h2>
              <button
                onClick={() => setShowAssetModal(true)}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                <Plus className="w-4 h-4" /> Novo Ativo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm text-gray-600 mb-2">Depreciação Mensal</h3>
                <p className="text-2xl font-bold text-purple-600">R$ {getDepreciation().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm text-gray-600 mb-2">Amortização Mensal</h3>
                <p className="text-2xl font-bold text-indigo-600">R$ {getAmortization().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vida Útil</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Mensal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {assets.map(a => {
                    const monthly = a.value / (a.usefulLife * 12);
                    return (
                      <tr key={a.id}>
                        <td className="px-6 py-4 text-sm font-medium">{a.name}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${a.type === 'depreciacao' ? 'bg-purple-100 text-purple-800' : 'bg-indigo-100 text-indigo-800'}`}>
                            {a.type === 'depreciacao' ? 'Depreciação' : 'Amortização'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">R$ {a.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        <td className="px-6 py-4 text-sm">{a.usefulLife} anos</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                          R$ {monthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'emprestimos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Empréstimos e Financiamentos</h2>
              <button
                onClick={() => setShowLoanModal(true)}
                className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
              >
                <Plus className="w-4 h-4" /> Novo Empréstimo
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm text-gray-600 mb-2">Juros Mensais Totais</h3>
              <p className="text-2xl font-bold text-orange-600">R$ {getLoanInterest().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taxa</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prazo</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Parcela</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loans.map(loan => {
                    const monthlyRate = loan.interestRate / 100 / 12;
                    const monthlyPayment = loan.amount * monthlyRate * Math.pow(1 + monthlyRate, loan.months) / (Math.pow(1 + monthlyRate, loan.months) - 1);
                    return (
                      <tr key={loan.id}>
                        <td className="px-6 py-4 text-sm font-medium">{loan.name}</td>
                        <td className="px-6 py-4 text-sm">R$ {loan.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        <td className="px-6 py-4 text-sm">{loan.interestRate}% a.a.</td>
                        <td className="px-6 py-4 text-sm">{loan.months} meses</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-orange-600">
                          R$ {monthlyPayment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal show={showRevenueModal} onClose={() => setShowRevenueModal(false)} title="Nova Receita">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input
              type="date"
              value={revenueForm.date}
              onChange={(e) => setRevenueForm({...revenueForm, date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              value={revenueForm.category}
              onChange={(e) => setRevenueForm({...revenueForm, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              {revenueCategories[companyType as keyof typeof revenueCategories].map((cat: string) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <input
              type="text"
              value={revenueForm.description}
              onChange={(e) => setRevenueForm({...revenueForm, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Venda de produto X"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              value={revenueForm.amount}
              onChange={(e) => setRevenueForm({...revenueForm, amount: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          <button
            onClick={addRevenue}
            disabled={!revenueForm.date || !revenueForm.category || !revenueForm.description || !revenueForm.amount}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Adicionar Receita
          </button>
        </div>
      </Modal>

      <Modal show={showExpenseModal} onClose={() => setShowExpenseModal(false)} title="Nova Despesa">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input
              type="date"
              value={expenseForm.date}
              onChange={(e) => setExpenseForm({...expenseForm, date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              value={expenseForm.category}
              onChange={(e) => setExpenseForm({...expenseForm, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="">Selecione...</option>
              {expenseCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Despesa</label>
            <select
              value={expenseForm.type}
              onChange={(e) => setExpenseForm({...expenseForm, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="fixa">Fixa</option>
              <option value="variavel">Variável</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <input
              type="text"
              value={expenseForm.description}
              onChange={(e) => setExpenseForm({...expenseForm, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="Ex: Aluguel do escritório"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              value={expenseForm.amount}
              onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="0.00"
            />
          </div>
          <button
            onClick={addExpense}
            disabled={!expenseForm.date || !expenseForm.category || !expenseForm.description || !expenseForm.amount}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Adicionar Despesa
          </button>
        </div>
      </Modal>

      <Modal show={showAssetModal} onClose={() => setShowAssetModal(false)} title="Novo Ativo">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Ativo</label>
            <input
              type="text"
              value={assetForm.name}
              onChange={(e) => setAssetForm({...assetForm, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Ex: Computador Dell"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              value={assetForm.type}
              onChange={(e) => setAssetForm({...assetForm, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="depreciacao">Depreciação (Bens Tangíveis)</option>
              <option value="amortizacao">Amortização (Bens Intangíveis)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              value={assetForm.value}
              onChange={(e) => setAssetForm({...assetForm, value: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vida Útil (anos)</label>
            <input
              type="number"
              value={assetForm.usefulLife}
              onChange={(e) => setAssetForm({...assetForm, usefulLife: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Ex: 5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Aquisição</label>
            <input
              type="date"
              value={assetForm.acquisitionDate}
              onChange={(e) => setAssetForm({...assetForm, acquisitionDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={addAsset}
            disabled={!assetForm.name || !assetForm.value || !assetForm.usefulLife}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Adicionar Ativo
          </button>
        </div>
      </Modal>

      <Modal show={showLoanModal} onClose={() => setShowLoanModal(false)} title="Novo Empréstimo">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Empréstimo</label>
            <input
              type="text"
              value={loanForm.name}
              onChange={(e) => setLoanForm({...loanForm, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="Ex: Financiamento Banco X"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              value={loanForm.amount}
              onChange={(e) => setLoanForm({...loanForm, amount: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Taxa de Juros (% ao ano)</label>
            <input
              type="number"
              step="0.01"
              value={loanForm.interestRate}
              onChange={(e) => setLoanForm({...loanForm, interestRate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="Ex: 12.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prazo (meses)</label>
            <input
              type="number"
              value={loanForm.months}
              onChange={(e) => setLoanForm({...loanForm, months: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="Ex: 24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
            <input
              type="date"
              value={loanForm.startDate}
              onChange={(e) => setLoanForm({...loanForm, startDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            onClick={addLoan}
            disabled={!loanForm.name || !loanForm.amount || !loanForm.interestRate || !loanForm.months}
            className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Adicionar Empréstimo
          </button>
        </div>
      </Modal>

      <Modal show={showGoalsModal} onClose={() => setShowGoalsModal(false)} title="Configurar Metas Financeiras">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta de Receita Mensal (R$)</label>
            <input
              type="number"
              value={goalsForm.monthlyRevenue}
              onChange={(e) => setGoalsForm({...goalsForm, monthlyRevenue: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 50000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta de Lucro Líquido (R$)</label>
            <input
              type="number"
              value={goalsForm.monthlyProfit}
              onChange={(e) => setGoalsForm({...goalsForm, monthlyProfit: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 15000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta de Margem de Lucro (%)</label>
            <input
              type="number"
              value={goalsForm.profitMargin}
              onChange={(e) => setGoalsForm({...goalsForm, profitMargin: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Limite Máximo de Despesas (R$)</label>
            <input
              type="number"
              value={goalsForm.maxExpenses}
              onChange={(e) => setGoalsForm({...goalsForm, maxExpenses: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 35000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Mínima de Fluxo de Caixa (R$)</label>
            <input
              type="number"
              value={goalsForm.minCashFlow}
              onChange={(e) => setGoalsForm({...goalsForm, minCashFlow: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 10000"
            />
          </div>
          <button
            onClick={saveGoals}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Salvar Metas
          </button>
        </div>
      </Modal>

      <Modal show={showCashFlowModal} onClose={() => setShowCashFlowModal(false)} title="Nova Movimentação de Caixa">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input
              type="date"
              value={cashFlowForm.date}
              onChange={(e) => setCashFlowForm({...cashFlowForm, date: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              value={cashFlowForm.type}
              onChange={(e) => setCashFlowForm({...cashFlowForm, type: e.target.value, category: ''})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              value={cashFlowForm.category}
              onChange={(e) => setCashFlowForm({...cashFlowForm, category: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              {cashFlowCategories[cashFlowForm.type as 'entrada' | 'saida'].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <input
              type="text"
              value={cashFlowForm.description}
              onChange={(e) => setCashFlowForm({...cashFlowForm, description: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Descrição da movimentação"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
            <input
              type="number"
              value={cashFlowForm.amount}
              onChange={(e) => setCashFlowForm({...cashFlowForm, amount: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              step="0.01"
            />
          </div>
          <button
            onClick={addCashFlowEntry}
            disabled={!cashFlowForm.category || !cashFlowForm.description || !cashFlowForm.amount}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Adicionar Movimentação
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default FinanceIAPro;
