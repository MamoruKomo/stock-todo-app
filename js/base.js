import { initAssetChart, updateAssetChart } from './asset.js';
import { initTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initAssetChart();

  // ===== 資産入力セクション =====
  const assetForm = document.getElementById('asset-form');
  const assetAmountInput = document.getElementById('asset-amount');
  const assetMemoInput = document.getElementById('asset-memo');

  assetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = parseInt(assetAmountInput.value, 10);
    const memo = assetMemoInput.value;
    const date = new Date().toISOString().split('T')[0];

    const assetData = { date, amount, memo };
    console.log('💰 資産データ:', assetData);

    let assetHistory = JSON.parse(localStorage.getItem('assets')) || [];
    assetHistory.push(assetData);
    localStorage.setItem('assets', JSON.stringify(assetHistory));
    updateAssetChart();
  });

  // ===== ルールチェックセクション =====
  const ruleForm = document.getElementById('rule-form');
  const newRuleInput = document.getElementById('new-rule');
  const ruleList = document.getElementById('rule-list');
  let savedRules = JSON.parse(localStorage.getItem('rules')) || [];

  function renderRule(rule, index) {
    const li = document.createElement('li');
    li.classList.add('list-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = rule.done;
    checkbox.addEventListener('change', () => {
      savedRules[index].done = checkbox.checked;
      localStorage.setItem('rules', JSON.stringify(savedRules));
    });

    const text = document.createTextNode(' ' + rule.text);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '🗑';
    deleteBtn.addEventListener('click', () => {
      savedRules.splice(index, 1);
      localStorage.setItem('rules', JSON.stringify(savedRules));
      renderAllRules();
    });

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);
    return li;
  }

  function renderAllRules() {
    ruleList.innerHTML = '';
    savedRules.forEach((rule, i) => {
      ruleList.appendChild(renderRule(rule, i));
    });
  }

  ruleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const ruleText = newRuleInput.value.trim();
    if (!ruleText) return;

    savedRules.push({ text: ruleText, done: false });
    localStorage.setItem('rules', JSON.stringify(savedRules));
    renderAllRules();
    newRuleInput.value = '';
  });

  renderAllRules();

  // ===== 明日のTODOセクション =====
  const todoForm = document.getElementById('todo-form');
  const newTodoInput = document.getElementById('new-todo');
  const todoList = document.getElementById('todo-list');
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = newTodoInput.value.trim();
    if (!todoText) return;

    todos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    newTodoInput.value = '';
  });

  function renderTodos() {
    todoList.innerHTML = '';
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
      todoList.appendChild(li);
    });
  }

  renderTodos();
});
