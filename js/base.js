document.addEventListener('DOMContentLoaded', () => {
  // ===== 資産入力セクション =====
  const assetForm = document.getElementById('asset-form');
  const assetAmountInput = document.getElementById('asset-amount');
  const assetMemoInput = document.getElementById('asset-memo');

  assetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = parseInt(assetAmountInput.value, 10);
    const memo = assetMemoInput.value;
    const date = new Date().toISOString().split('T')[0];

    const assetData = {
      date,
      amount,
      memo,
    };

    console.log('💰 資産データ:', assetData);
    let assetHistory = JSON.parse(localStorage.getItem('assets')) || [];
    assetHistory.push(assetData);
    localStorage.setItem('assets', JSON.stringify(assetHistory));
    // TODO: update chart
  });

  // ===== ルールチェックセクション =====
  const ruleForm = document.getElementById('rule-form');
  const newRuleInput = document.getElementById('new-rule');
  const ruleList = document.getElementById('rule-list');

  let savedRules = JSON.parse(localStorage.getItem('rules')) || [];

  ruleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const ruleText = newRuleInput.value.trim();
    if (!ruleText) return;

    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(' ' + ruleText));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑';
    deleteBtn.addEventListener('click', () => {
      const index = Array.from(ruleList.children).indexOf(li);
      savedRules.splice(index, 1);
      localStorage.setItem('rules', JSON.stringify(savedRules));
      ruleList.removeChild(li);
    });
    li.appendChild(deleteBtn);

    ruleList.appendChild(li);

    savedRules.push({ text: ruleText, done: false });
    localStorage.setItem('rules', JSON.stringify(savedRules));

    newRuleInput.value = '';
  });

  // ===== 明日のTODOセクション =====
  const todoForm = document.getElementById('todo-form');
  const newTodoInput = document.getElementById('new-todo');
  const todoList = document.getElementById('todo-list');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = newTodoInput.value.trim();
    if (!todoText) return;

    const li = document.createElement('li');
    li.textContent = todoText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑';
    deleteBtn.addEventListener('click', () => {
      const index = Array.from(todoList.children).indexOf(li);
      todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      todoList.removeChild(li);
    });
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    todos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));

    newTodoInput.value = '';
  });
  // ===== Load saved rules =====
  savedRules.forEach(rule => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = rule.done;

    checkbox.addEventListener('change', () => {
      rule.done = checkbox.checked;
      localStorage.setItem('rules', JSON.stringify(savedRules));
    });

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(' ' + rule.text));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑';
    deleteBtn.addEventListener('click', () => {
      const index = Array.from(ruleList.children).indexOf(li);
      savedRules.splice(index, 1);
      localStorage.setItem('rules', JSON.stringify(savedRules));
      ruleList.removeChild(li);
    });
    li.appendChild(deleteBtn);

    ruleList.appendChild(li);
  });

  // ===== Load saved todos =====
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑';
    deleteBtn.addEventListener('click', () => {
      const index = Array.from(todoList.children).indexOf(li);
      todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      todoList.removeChild(li);
    });
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
});
