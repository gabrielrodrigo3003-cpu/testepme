import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight, Download, Plus, Calendar, Building2, Package, Briefcase, X } from 'lucide-react';

const FinanceIAPro = () => {
  const [companyType, setCompanyType] = useState('produto');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [loans, setLoans] = useState<any[]>([]);
  
  const [showRevenueModal, setShowRevenueModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);

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
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  useEffect(() => {
    if (transactions.length > 0 || expenses.length > 0 || assets.length > 0 || loans.length > 0) {
      saveData();
    }
  }, [transactions, expenses, assets, loans, companyType]);

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

  const getCashFlow = () => getTotalRevenue() - getTotalExpenses();

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

  const KPICard = ({ title, value, subtitle, icon: Icon, trend, color }: any) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{title}</span>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
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
              />
              <KPICard
                title="Despesas Totais"
                value={`R$ ${getTotalExpenses().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                icon={TrendingDown}
                color="text-red-600"
              />
              <KPICard
                title="Lucro Líquido"
                value={`R$ ${getNetProfit().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                subtitle={`${getProfitMargin().toFixed(1)}% de margem`}
                icon={TrendingUp}
                color={getNetProfit() >= 0 ? 'text-green-600' : 'text-red-600'}
              />
              <KPICard
                title="Fluxo de Caixa"
                value={`R$ ${getCashFlow().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                icon={DollarSign}
                color={getCashFlow() >= 0 ? 'text-green-600' : 'text-red-600'}
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
    </div>
  );
};

export default FinanceIAPro;
