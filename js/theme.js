export function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  toggleBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    body.setAttribute('data-theme', newTheme);
    toggleBtn.textContent = newTheme === 'light' ? '🌙 ダークモード' : '☀️ ライトモード';

    console.log('data-theme changed to:', newTheme);
  });
}