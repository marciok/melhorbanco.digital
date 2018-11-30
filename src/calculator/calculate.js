import nubank from '../banks/nubank.json';
import next from '../banks/next.json';

const nuconta = {
  bank: 'nubank',
  name: 'nuconta',
  noMonthlyFee: true,
  creditCard: true, 
  transfer: { value: 0 },
  rewards: {
    value: 19
  },
}

const nextLight = {
  bank: 'next',
  name: 'light',
  noMonthlyFee: true,
  creditCard: true, 
  transfer: { 
    value: 10,
    condition: '<1'
  },
  withdraw: { value: 0 },
  credit: true,
  payBarcode: true,
  phoneCharge: true, 
}

const nextNext = {
  bank: 'next',
  name: 'next',
  monthlyPayment: { value: 9.95 },
  creditCard: true, 
  transfer: { value: 0 },
  withdraw: { value: 0 },
  credit: true,
  payBarcode: true,
  phoneCharge: true, 
}

const nextTurbinado = {
  bank: 'next',
  name: 'turbinado',
  monthlyPayment: { value: 29.95 },
  rewards: true,
  creditCard: true, 
  transfer: { value: 0 },
  withdraw: { value: 0 },
  credit: true,
  payBarcode: true,
  phoneCharge: true, 
}

const neonAccount = {
  bank: 'neon',
  name: 'neon',
  noMonthlyFee: true,
  creditCard: true, 
  transfer: {
    value: 3.50,
    condition: '<1'
  },
  withdraw: {
    value: 6.90
  },
  payBarcode: true,
  phoneCharge: true, 
}

const neonPlus = {
  bank: 'neon',
  name: 'neon+',
  noMonthlyFee: true,
  creditCard: { value: 10 }, 
  transfer: { value: 0 },
  withdraw: { value: 0 },
  payBarcode: true,
  phoneCharge: true, 
}

const inter = {
  bank: 'inter',
  name: 'inter',
  noMonthlyFee: true,
  creditCard: true, 
  transfer: { value: 0 },
  withdraw: { value: 0 },
  credit: true,
  payBarcode: true,
  phoneCharge: true, 
}

const fetchGradeForBank = async (bank) => {
  const bankId = (() => {
    switch (bank) {
      case 'nubank': return nubank.reclameAquiId;
      case 'inter': return '12949';
      case 'next': return next.reclameAquiId;
      case 'neon': return 'Urk8S78EqfrlPEkn';
      default: throw new Error(`Unknown bank: ${bank}`);
    }
  })();

  const data = await fetch(`https://iosearch.reclameaqui.com.br/raichu-io-site-search-v1/query/companyComplains/10/0?company=${bankId}`,{"mode":"cors"})
  const result = await data.json();

  return result.complainResult.complains.companies[0].index.finalScore;
}

const calculateServicesCosts = (account, service, numberOfService) => {

  if (account[service] === undefined) {
    return NaN;
  }

  const value = account[service].value;

  if (account[service].condition === undefined) {
    return numberOfService * value;
  }

  const condition = account[service].condition;
  const operator = condition[0];
  const number = Number.parseInt(condition[1]);

  if (operator === '<') {
    if (number < numberOfService) {
      return (numberOfService - number) * value;
    } else {
      return 0;
    }
  }

  throw new Error(`Could not parse account: ${account} on service: ${service}`);
}


const calculateBankRank = async (userOptions) => {

  const accounts = [nuconta, nextLight, nextNext, nextTurbinado, neonAccount, neonPlus, inter];
  const requirementsPoints = accounts.map(account => {
    return Object.keys(userOptions).filter(option => userOptions[option] === true && account[option] !== undefined).length
  })

  const extrasFees = accounts.map(account => {
    return Object.keys(userOptions).map(option => {
      const feature = account[option];

      if (userOptions[option] !== false && feature !== undefined && feature.value !== undefined) {
        return feature.value;
      }

      return undefined;
    }).filter(n => n)
  })

  const transferCosts = accounts.map(account => calculateServicesCosts(account, 'transfer', userOptions.transfers));
  const withdrawCosts = accounts.map(account => calculateServicesCosts(account, 'withdraw', userOptions.withdraws));

  const banks = Array.from(new Set(accounts.map(account => account.bank)));

  const reputationGrades = [8, 9, 9, 9, 8, 8, 5];

  const supportGrades = {} 
  for (var j = 0; j < banks.length; j++) {
    supportGrades[banks[j]] = await fetchGradeForBank(banks[j]);
  }

  const finalGrades = [];

  for (var i = 0; accounts.length > i; i++) {
    const MAX_REQ_POINTS = 6;

    const requirements = ((10 * requirementsPoints[i]) / MAX_REQ_POINTS) * 4; 
    const reputation =  reputationGrades[i] * 3;
    const support =  supportGrades[accounts[i].bank] * 3;
    const grade = (requirements + reputation + support) / 10;
    const monthlyPayment = accounts[i].monthlyPayment;

    finalGrades.push({
      bank: accounts[i].bank,
      name: accounts[i].name,
      monthlyFee: monthlyPayment ? monthlyPayment.value : 0,
      grade: grade,
      extrasFees: extrasFees[i],
      transferCosts: transferCosts[i],
      withdrawCosts: withdrawCosts[i]
    });
  }

  console.log(requirementsPoints)

  return Promise.resolve(finalGrades.sort((grade1, grade2) => grade1.grade - grade2.grade));
}


export default calculateBankRank;

