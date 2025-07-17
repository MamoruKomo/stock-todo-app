// ========== ダークモード切り替え ==========
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  toggleBtn.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', next);
    toggleBtn.textContent = next === 'light' ? '🌙 ダークモード' : '☀️ ライトモード';
  });
}

// ========== TODO セクション ==========
function setupTodoSection() {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('new-todo');
  const list = document.getElementById('todo-list');
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  function renderTodos() {
    list.innerHTML = '';
    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.classList.add('list-item');
      li.textContent = todo;

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.textContent = '🗑';
      deleteBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
      });

      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    todos.push(text);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    input.value = '';
  });

  renderTodos();
}

// ========== 自己ルールセクション ==========
function setupRuleSection() {
  const form = document.getElementById('rule-form');
  const input = document.getElementById('new-rule');
  const list = document.getElementById('rule-list');
  const highlightList = document.getElementById('highlight-rule-list');
  let rules = JSON.parse(localStorage.getItem('rules')) || [];

  function renderRules() {
    list.innerHTML = '';
    highlightList.innerHTML = '';

    rules.forEach((rule, index) => {
      const li = document.createElement('li');
      li.classList.add('list-item');
      li.textContent = rule.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.textContent = '🗑';
      deleteBtn.addEventListener('click', () => {
        rules.splice(index, 1);
        localStorage.setItem('rules', JSON.stringify(rules));
        renderRules();
      });

      li.appendChild(deleteBtn);
      list.appendChild(li);

      const highlightLi = document.createElement('li');
      highlightLi.textContent = ` ${rule.text}`;
      highlightList.appendChild(highlightLi);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    rules.push({ text });
    localStorage.setItem('rules', JSON.stringify(rules));
    renderRules();
    input.value = '';
  });

  renderRules();
}

// ========== 資産入力とグラフ ==========
let assetChart;
function setupAssetSection() {
  const form = document.getElementById('asset-form');
  const dateInput = document.getElementById('asset-date');
  const amountInput = document.getElementById('asset-amount');
  const ctx = document.getElementById('asset-chart').getContext('2d');

  let assetData = JSON.parse(localStorage.getItem('assetData')) || [];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = dateInput.value;
    const amount = parseFloat(amountInput.value);
    if (!date || isNaN(amount)) return;

    assetData.push({ date, amount });
    assetData.sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem('assetData', JSON.stringify(assetData));
    renderChart();
    form.reset();
  });

  function renderChart() {
    const labels = assetData.map(d => d.date);
    const data = assetData.map(d => d.amount);

    if (assetChart) assetChart.destroy();
    assetChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '資産額',
          data: data,
          borderColor: '#1e88e5',
          backgroundColor: 'transparent',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: false }
        }
      }
    });
  }

  renderChart();
}

// ========== 初期化 ==========
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupTodoSection();
  setupRuleSection();
  setupAssetSection();
});