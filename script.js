(function () {

    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', function () {
        nav.classList.toggle('is-scrolled', window.scrollY > 50);
    }, { passive: true });

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navToggle.classList.toggle('is-open');
            navLinks.classList.toggle('is-open');
        });

        navLinks.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('is-open');
                navLinks.classList.remove('is-open');
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('is-open');
                navLinks.classList.remove('is-open');
                navToggle.focus();
            }
        });
    }

    setTimeout(function () {
        if (hero) hero.classList.add('ready');
    }, 100);

    function addDelays(section) {
        var items = section.querySelectorAll('[data-anim]');
        items.forEach(function (el, i) {
            if (i > 0) el.setAttribute('data-delay', String(i));
        });
    }

    document.querySelectorAll('section').forEach(addDelays);

    var scrollObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('[data-anim]').forEach(function (el) {
        scrollObserver.observe(el);
    });

    function countUp(el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        var duration = 1600;
        var start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            var elapsed = timestamp - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(step);
    }

    var statObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                countUp(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('.stat-val[data-target]').forEach(function (el) {
        statObserver.observe(el);
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (!href || href === '#') return;
            var target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            var offset = 80;
            var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

}());
