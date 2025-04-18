import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

export default function ReturnsChart({ returnsByFund }) {
  const datasets = Object.entries(returnsByFund).map(([label, points]) => ({
    label,
    data: points.map(p => ({ x: p.date, y: p.pctChange })),
    fill: false,
    tension: 0.2,
    borderWidth: label === 'Portfolio' ? 3 : 2,
    borderDash: label === 'Portfolio' ? [5, 5] : []
  }));

  const data = { datasets };
  const options = {
    parsing: false,
    scales: {
      x: {
        type: 'time',
        time: { unit: 'month', displayFormats: { month: 'MMM yy' } },
        title: { display: true, text: 'Date' }
      },
      y: {
        ticks: { callback: v => v + '%' },
        title: { display: true, text: 'Return (%)' }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)}%`
        }
      }
    }
  };

  return <Line data={data} options={options} />;
}
