/**
 * ENGEL & VÖLKERS DÜSSELDORF
 * Premium Real Estate Website JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================
    // Preloader
    // ============================================
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 500);
    });

    // ============================================
    // Header Scroll Behavior
    // ============================================
    const header = document.getElementById('header');
    let lastScroll = 0;
    const scrollThreshold = 100;

    function handleHeaderScroll() {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for shadow
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', throttle(handleHeaderScroll, 100));

    // ============================================
    // Mobile Navigation
    // ============================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }

    // ============================================
    // Search Overlay
    // ============================================
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');

    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', function() {
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            searchOverlay.querySelector('input').focus();
        });

        searchClose.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close on click outside
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================
    // Hero Slider
    // ============================================
    const heroSlider = {
        slides: document.querySelectorAll('.hero-slide'),
        dots: document.querySelectorAll('.slider-dots .dot'),
        prevBtn: document.querySelector('.slider-prev'),
        nextBtn: document.querySelector('.slider-next'),
        currentIndex: 0,
        interval: null,
        duration: 6000,

        init() {
            if (!this.slides.length) return;

            this.bindEvents();
            this.startAutoPlay();
        },

        bindEvents() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prev());
            }
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.next());
            }

            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goTo(index));
            });
        },

        goTo(index) {
            this.slides[this.currentIndex].classList.remove('active');
            this.dots[this.currentIndex].classList.remove('active');

            this.currentIndex = index;

            if (this.currentIndex >= this.slides.length) this.currentIndex = 0;
            if (this.currentIndex < 0) this.currentIndex = this.slides.length - 1;

            this.slides[this.currentIndex].classList.add('active');
            this.dots[this.currentIndex].classList.add('active');

            this.resetAutoPlay();
        },

        next() {
            this.goTo(this.currentIndex + 1);
        },

        prev() {
            this.goTo(this.currentIndex - 1);
        },

        startAutoPlay() {
            this.interval = setInterval(() => this.next(), this.duration);
        },

        resetAutoPlay() {
            clearInterval(this.interval);
            this.startAutoPlay();
        }
    };

    heroSlider.init();

    // ============================================
    // Search Tabs
    // ============================================
    const searchTabs = document.querySelectorAll('.search-tab');
    
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            searchTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ============================================
    // Property Filter
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;

            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            propertyCards.forEach(card => {
                if (filter === 'all' || card.dataset.type === filter) {
                    card.style.display = '';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // ============================================
    // Favorite Button
    // ============================================
    const favoriteButtons = document.querySelectorAll('.btn-favorite');

    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });

    // ============================================
    // Animated Counter
    // ============================================
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const statsBar = document.querySelector('.stats-bar');
        if (!statsBar) return;

        const rect = statsBar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            countersAnimated = true;

            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
            });
        }
    }

    window.addEventListener('scroll', throttle(animateCounters, 100));
    animateCounters(); // Check on load

    // ============================================
    // Back to Top Button
    // ============================================
    const backToTopBtn = document.getElementById('backToTop');

    function handleBackToTop() {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    if (backToTopBtn) {
        window.addEventListener('scroll', throttle(handleBackToTop, 100));

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // Cookie Banner
    // ============================================
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieSettings = document.getElementById('cookieSettings');

    // Show cookie banner after a delay if not accepted
    if (cookieBanner && !localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('active');
        }, 2000);
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('active');
        });
    }

    if (cookieSettings) {
        cookieSettings.addEventListener('click', function() {
            // Open cookie settings modal
            console.log('Open cookie settings');
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    mobileToggle.click();
                }
            }
        });
    });

    // ============================================
    // Form Validation
    // ============================================
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            // Email validation
            const emailFields = form.querySelectorAll('input[type="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            emailFields.forEach(field => {
                if (field.value && !emailRegex.test(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                }
            });

            if (isValid) {
                // Simulate form submission
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird gesendet...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Erfolgreich gesendet!';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        form.reset();
                    }, 2000);
                }, 1500);
            }
        });

        // Remove error class on input
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    });

    // ============================================
    // Intersection Observer for Animations
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.property-card, .service-card, .shop-card, .district-card, .article-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // ============================================
    // Quick Filters (Search Overlay)
    // ============================================
    const quickFilters = document.querySelectorAll('.quick-filters .filter-chip');

    quickFilters.forEach(chip => {
        chip.addEventListener('click', function() {
            quickFilters.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ============================================
    // Utility Functions
    // ============================================
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // ============================================
    // Lazy Loading Images
    // ============================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ============================================
    // Testimonials Slider (Simple)
    // ============================================
    const testimonialNav = {
        prevBtn: document.querySelector('.testimonials-nav .prev'),
        nextBtn: document.querySelector('.testimonials-nav .next'),
        dots: document.querySelectorAll('.testimonials-nav .dot'),

        init() {
            if (!this.dots.length) return;

            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.dots.forEach(d => d.classList.remove('active'));
                    dot.classList.add('active');
                    // Add slide logic here if needed
                });
            });
        }
    };

    testimonialNav.init();

    // ============================================
    // Console Welcome Message
    // ============================================
    console.log('%c Engel & Völkers Düsseldorf ', 
        'background: #C41230; color: white; font-size: 16px; padding: 10px 20px; font-family: Georgia, serif;');
    console.log('%c Premium Real Estate Website ', 
        'color: #666; font-size: 12px;');

});
