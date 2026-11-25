document.addEventListener('DOMContentLoaded', () => {
  // 1. Search Dropdown Toggle
  const searchBtn = document.getElementById('searchToggleBtn');
  const searchDropdown = document.getElementById('searchDropdown');
  const searchForm = document.getElementById('headerSearchForm');

  if (searchBtn && searchDropdown) {
    searchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchDropdown.classList.toggle('open');
      const input = searchDropdown.querySelector('input');
      if (searchDropdown.classList.contains('open') && input) {
        input.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchDropdown.contains(e.target) && e.target !== searchBtn) {
        searchDropdown.classList.remove('open');
      }
    });
  }

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const kw = searchForm.querySelector('input').value.trim();
      window.location.href = kw
        ? `viec-lam.html?q=${encodeURIComponent(kw)}`
        : 'viec-lam.html';
    });
  }

  // 2. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }

  // 3. Scroll-to-Top Button
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 300);
    });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Toast Notification Helper
  window.showToast = (message) => {
    let toast = document.getElementById('globalToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'globalToast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // 5. Callback / Contact Forms Demo Handler
  document.querySelectorAll('.demo-callback-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = form.querySelector('input[name="name"]');
      const phoneInput = form.querySelector('input[name="phone"]');
      if (!phoneInput || !phoneInput.value.trim()) {
        window.showToast('Vui lòng nhập Số điện thoại / Zalo!');
        return;
      }
      const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'bạn';
      window.showToast(`Cảm ơn ${name}! Chúng tôi đã nhận thông tin và sẽ gọi lại ngay.`);
      form.reset();
    });
  });

  // 6. Keyword Filter on viec-lam.html
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');
  if (query) {
    const qLower = query.toLowerCase();
    const cards = document.querySelectorAll('.job-card');
    let matched = 0;
    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      if (text.includes(qLower)) {
        matched++;
      } else {
        card.style.display = 'none';
      }
    });
    const filterNotice = document.getElementById('searchFilterNotice');
    if (filterNotice) {
      filterNotice.style.display = 'block';
      filterNotice.innerHTML = `Kết quả tìm kiếm cho "<strong>${query}</strong>": ${matched} việc làm phù hợp. <a href="viec-lam.html" style="color:#1b4f9c;text-decoration:underline;margin-left:8px;">Xem tất cả</a>`;
    }
  }

  // 7. Music Toggle Button on viec-lam.html
  const musicBtn = document.getElementById('musicToggleBtn');
  if (musicBtn) {
    let playing = false;
    musicBtn.addEventListener('click', () => {
      playing = !playing;
      musicBtn.textContent = playing ? '♪ Đang phát nhạc...' : '♪ Bật nhạc';
      window.showToast(playing ? 'Đã bật nhạc nền demo' : 'Đã tắt nhạc nền');
    });
  }
});
