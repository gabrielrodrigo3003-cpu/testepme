import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight, Download, Plus, Calendar, Building2, Package, Briefcase, X, Target, Activity, BarChart3, PieChart as PieChartIcon, Settings } from 'lucide-react';

const FinanceIAProV2 = () => {
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
    unitPrice: '',
    paymentType: 'vista' // vista ou prazo
  });

  const [expenseForm, setExpenseForm] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    category: '',
    type: 'fixa',
    paymentType: 'vista' // vista ou prazo
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
    type: 'entrada', // entrada ou saida
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
      const goalsData = localStorage.getItem('goals');
      const cashFlowData = localStorage.getItem('cashFlowEntries');

      if (transData) setTransactions(JSON.parse(transData));
      if (expData) setExpenses(JSON.parse(expData));
      if (assetsData) setAssets(JSON.parse(assetsData));
      if (loansData) setLoans(JSON.parse(loansData));
      if (typeData) setCompanyType(typeData);
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
    saveData();
  }, [transactions, expenses, assets, loans, companyType, goals, cashFlowEntries]);

  const addRevenue = () => {
    const newTransaction = {
      id: Date.now(),
      ...revenueForm,
      amount: parseFloat(revenueForm.amount),
      type: 'receita'
    };
    setTransactions([...transactions, newTransaction]);
    
    // Adicionar entrada no fluxo de caixa se for à vista
    if (revenueForm.paymentType === 'vista') {
      const cashEntry = {
        id: Date.now() + 1,
        date: revenueForm.date,
        type: 'entrada',
        category: 'Vendas à Vista',
        description: revenueForm.description,
        amount: parseFloat(revenueForm.amount)
      };
      setCashFlowEntries([...cashFlowEntries, cashEntry]);
    }
    
    setRevenueForm({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: '',
      category: '',
      quantity: '',
      unitPrice: '',
      paymentType: 'vista'
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
    
    // Adicionar saída no fluxo de caixa se for à vista
    if (expenseForm.paymentType === 'vista') {
      const cashEntry = {
        id: Date.now() + 1,
        date: expenseForm.date,
        type: 'saida',
        category: 'Despesas Operacionais',
        description: expenseForm.description,
        amount: parseFloat(expenseForm.amount)
      };
      setCashFlowEntries([...cashFlowEntries, cashEntry]);
    }
    
    setExpenseForm({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: '',
      category: '',
      type: 'fixa',
      paymentType: 'vista'
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
    
    // Adicionar entrada no fluxo de caixa
    const cashEntry = {
      id: Date.now() + 1,
      date: loanForm.startDate,
      type: 'entrada',
      category: 'Empréstimos Recebidos',
      description: loanForm.name,
      amount: parseFloat(loanForm.amount)
    };
    setCashFlowEntries([...cashFlowEntries, cashEntry]);
    
    setLoanForm({
      name: '',
      amount: '',
      interestRate: '',
      months: '',
      startDate: new Date().toISOString().split('T')[0]
    });
    setShowLoanModal(false);
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

  // Cálculos financeiros
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

  // Cálculo de progresso das metas
  const getGoalProgress = (actual: number, goal: number) => {
    if (goal === 0) return 0;
    return Math.min((actual / goal) * 100, 100);
  };

  const getGoalStatus = (actual: number, goal: number, isMax: boolean = false) => {
    if (goal === 0) return 'neutral';
    const ratio = actual / goal;
    
    if (isMax) {
      // Para metas máximas (despesas), menor é melhor
      if (ratio <= 0.8) return 'success';
      if (ratio <= 1) return 'warning';
      return 'danger';
    } else {
      // Para metas mínimas (receita, lucro), maior é melhor
      if (ratio >= 1) return 'success';
      if (ratio >= 0.8) return 'warning';
      return 'danger';
    }
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
        message: `Atenção! Suas saídas superam as entradas em R$ ${Math.abs(cashFlow).toFixed(2)}. Ação imediata necessária.`,
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
      {goal && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Meta: {goal}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
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
              <button
                onClick={() => setShowGoalsModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium"
              >
                <Target className="w-4 h-4" />
                Metas
              </button>
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
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Building2 },
              { id: 'metas', label: 'Metas', icon: Target },
              { id: 'fluxo-caixa', label: 'Fluxo de Caixa', icon: Activity },
              { id: 'receitas', label: 'Receitas', icon: TrendingUp },
              { id: 'despesas', label: 'Despesas', icon: TrendingDown },
              { id: 'ativos', label: 'Ativos', icon: Package },
              { id: 'emprestimos', label: 'Empréstimos', icon: Briefcase }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
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

      {/* Content - continuará na próxima parte */}
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard, Metas, Fluxo de Caixa e outras abas serão implementadas */}
        <div className="text-center text-gray-500 py-12">
          Conteúdo em implementação...
        </div>
      </div>
    </div>
  );
};

export default FinanceIAProV2;
