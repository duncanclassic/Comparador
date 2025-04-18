import axios from 'axios';

const BASE_URL = 'https://fondos.dvatools.com/query';

export async function fetchFundList() {
  const { data } = await axios.get(`${BASE_URL}/funds`);
  return data;
}

export async function fetchFundReturns(fundIds = []) {
  const { data } = await axios.post(`${BASE_URL}/returns`, {
    funds: fundIds,
    from: '2024-12-31',
    to: new Date().toISOString().slice(0, 10),
    currency: 'CLP'
  });
  return data.returns;
}
