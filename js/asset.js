// js/asset.js
import Chart from 'https://cdn.jsdelivr.net/npm/chart.js';

export let assetChart;

/**
 * ページ読み込み時に一度だけ呼び出し、
 * localStorage の履歴をもとにチャートを初期描画します。
 */
export function initAssetChart() {
  const ctx = document.getElementById('asset-chart').getContext('2d');
  const history = JSON.parse(localStorage.getItem('assets')) || [];
  const labels = history.map(a => a.date);
  const data = history.map(a => a.amount);

  assetChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: '資産額推移',
        data,
        borderColor: getComputedStyle(document.documentElement)
                      .getPropertyValue('--primary').trim(),
        backgroundColor: 'transparent',
        tension: 0.3,
      }]
    },
    options: {
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          title: { display: true, text: '日付' },
          ticks: { maxRotation: 45, minRotation: 0 }
        },
        y: {
          title: { display: true, text: '資産額 (¥)' },
          beginAtZero: false
        }
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  });
}


export function updateAssetChart() {
  if (!assetChart) return;
  const history = JSON.parse(localStorage.getItem('assets')) || [];
  assetChart.data.labels = history.map(a => a.date);
  assetChart.data.datasets[0].data = history.map(a => a.amount);
  assetChart.update();
}