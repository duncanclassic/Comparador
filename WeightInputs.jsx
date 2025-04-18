import React from 'react';

export default function WeightInputs({ funds, weights, onChange }) {
  const total = funds.reduce((sum, f) => sum + (weights[f.id] || 0), 0);

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Portfolio Weights (%)</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Fund</th>
            <th style={{ textAlign: 'right' }}>Weight %</th>
          </tr>
        </thead>
        <tbody>
          {funds.map(fund => (
            <tr key={fund.id}>
              <td>{fund.name}</td>
              <td style={{ textAlign: 'right' }}>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={weights[fund.id] ?? 0}
                  onChange={e =>
                    onChange(fund.id, parseFloat(e.target.value) || 0)
                  }
                  style={{ width: 60 }}
                />%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Total: <strong>{total.toFixed(1)}%</strong>{' '}
        {total.toFixed(1) !== '100.0' && (
          <span style={{ color: 'red' }}>– must equal 100%</span>
        )}
      </p>
    </div>
  );
}
