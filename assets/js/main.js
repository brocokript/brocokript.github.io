(function(){
  const body = document.body;
  const menuBtn = document.querySelector('[data-menu-btn]');
  const navLinks = document.querySelector('[data-nav-links]');

  if (menuBtn && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      body.classList.remove('no-scroll');
    };

    menuBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      body.classList.toggle('no-scroll', open);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1020) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  document.querySelectorAll('[data-faq]').forEach((item) => {
    const question = item.querySelector('button');
    if (!question) return;
    question.addEventListener('click', () => item.classList.toggle('open'));
  });
})();

(function(){
  const galleryRoot = document.querySelector('[data-interface-gallery]');
  if (!galleryRoot) return;

  const slides = [
    { title: 'Cifrado', subtitle: 'Flujo principal', file: 'app-cifrado.png', alt: 'Pantalla de cifrado de BrocoKript' },
    { title: 'Archivos', subtitle: 'Inventario', file: 'app-archivos.png', alt: 'Pantalla de inventario de archivos' },
    { title: 'Licencia', subtitle: 'Activación', file: 'app-licencia.png', alt: 'Pantalla de licencia' },
    { title: 'Descifrado', subtitle: 'Recuperación', file: 'app-descifrado.png', alt: 'Pantalla de descifrado' },
    { title: 'Ajustes', subtitle: 'Configuración', file: 'app-ajustes.png', alt: 'Pantalla de ajustes' }
  ];

  const image = galleryRoot.querySelector('[data-gallery-image]');
  const title = galleryRoot.querySelector('[data-gallery-title]');
  const subtitle = galleryRoot.querySelector('[data-gallery-subtitle]');
  const prev = galleryRoot.querySelector('[data-gallery-prev]');
  const next = galleryRoot.querySelector('[data-gallery-next]');
  const dots = Array.from(galleryRoot.querySelectorAll('[data-gallery-dot]'));

  if (!image || !title || !subtitle) return;

  const initialSrc = image.getAttribute('src') || '';
  const basePath = initialSrc.replace(/app-cifrado\.png.*$/, '');

  let index = 0;
  let timer = null;

  function render(i){
    index = (i + slides.length) % slides.length;
    const slide = slides[index];
    image.src = `${basePath}${slide.file}`;
    image.alt = slide.alt;
    title.textContent = slide.title;
    subtitle.textContent = slide.subtitle;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
    });
  }

  function start(){
    stop();
    timer = window.setInterval(() => {
      render(index + 1);
    }, 3600);
  }

  function stop(){
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  if (prev) {
    prev.addEventListener('click', () => {
      render(index - 1);
      start();
    });
  }

  if (next) {
    next.addEventListener('click', () => {
      render(index + 1);
      start();
    });
  }

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
      render(dotIndex);
      start();
    });
  });

  galleryRoot.addEventListener('mouseenter', stop);
  galleryRoot.addEventListener('mouseleave', start);

  render(0);
  start();
})();

