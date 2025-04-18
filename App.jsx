import React, { useEffect, useState, useMemo } from 'react';
import { fetchFundList, fetchFundReturns } from './api';
import FundSelector from './FundSelector';
import WeightInputs from './WeightInputs';
import ReturnsChart from './ReturnsChart';

function App() {
  const [funds, setFunds]             = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [returnsData, setReturnsData] = useState({});
  const [weights, setWeights]         = useState({});

  useEffect(() => {
    fetchFundList().then(setFunds);
  }, []);

  useEffect(() => {
    if (selectedIds.length) {
      fetchFundReturns(selectedIds).then(setReturnsData);
    } else {
      setReturnsData({});
    }
  }, [selectedIds]);

  useEffect(() => {
    if (selectedIds.length) {
      const equal = 100 / selectedIds.length;
      setWeights(prev => {
        const w = {};
        selectedIds.forEach(id => {
          w[id] = prev[id] ?? equal;
        });
        return w;
      });
    } else {
      setWeights({});
    }
  }, [selectedIds]);

  const portfolioSeries = useMemo(() => {
    if (!selectedIds.length) return [];

    const base = returnsData[selectedIds[0]] || [];
    return base.map((pt, idx) => {
      let agg = 0;
      selectedIds.forEach(id => {
        const ret = returnsData[id]?.[idx]?.pctChange || 0;
        const w   = (weights[id] || 0) / 100;
        agg += ret * w;
      });
      return { date: pt.date, pctChange: agg };
    });
  }, [returnsData, weights, selectedIds]);

  const chartData = useMemo(() => {
    const all = { ...returnsData };
    if (portfolioSeries.length) all['Portfolio'] = portfolioSeries;
    return all;
  }, [returnsData, portfolioSeries]);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Fund &amp; Portfolio Returns Comparison</h1>

      <FundSelector
        options={funds}
        value={selectedIds}
        onChange={setSelectedIds}
      />

      {selectedIds.length > 0 && (
        <WeightInputs
          funds={funds.filter(f => selectedIds.includes(f.id))}
          weights={weights}
          onChange={(id, val) =>
            setWeights(w => ({ ...w, [id]: val }))
          }
        />
      )}

      <div style={{ marginTop: 40 }}>
        {Object.keys(chartData).length > 0 ? (
          <ReturnsChart returnsByFund={chartData} />
        ) : (
          <p>Please select one or more funds to display their returns.</p>
        )}
      </div>
    </div>
  );
}

export default App;
