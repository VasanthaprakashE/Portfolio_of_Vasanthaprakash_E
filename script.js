// ============================================
// OPTIMIZED MAIN SCRIPT - NO ERRORS
// ============================================

// Initialize AOS
AOS.init({ duration: 1000, once: true });

// ============================================
// DARK MODE - PERSISTENT
// ============================================
function initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    // Load saved preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        html.classList.add('dark');
        updateDarkIcons(true);
    } else {
        html.classList.remove('dark');
        updateDarkIcons(false);
    }
    
    if (toggle) {
        toggle.addEventListener('click', () => {
            const isDark = html.classList.contains('dark');
            if (isDark) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                updateDarkIcons(false);
            } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                updateDarkIcons(true);
            }
        });
    }
}

function updateDarkIcons(isDark) {
    const toggle = document.getElementById('darkModeToggle');
    if (!toggle) return;
    const moon = toggle.querySelector('.fa-moon');
    const sun = toggle.querySelector('.fa-sun');
    if (isDark) {
        moon?.classList.add('hidden');
        sun?.classList.remove('hidden');
    } else {
        moon?.classList.remove('hidden');
        sun?.classList.add('hidden');
    }
}

// ============================================
// FEEDBACK FORM - WITH FALLBACK
// ============================================
function initFeedbackForm() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('fbName')?.value.trim();
        const email = document.getElementById('fbEmail')?.value.trim();
        const type = document.getElementById('fbType')?.value;
        const rating = document.getElementById('fbRating')?.value;
        const message = document.getElementById('fbMessage')?.value.trim();
        const statusDiv = document.getElementById('fbStatus');
        
        if (!name || !message || !type) {
            showStatus(statusDiv, '❌ Please fill all required fields', 'error');
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Create email content
        const subject = `[Portfolio] ${type} from ${name}`;
        const body = `Name: ${name}\nEmail: ${email || 'Not provided'}\nType: ${type}\nRating: ${rating}/5\n\nMessage:\n${message}\n\n---\nSubmitted from Portfolio Website`;
        const mailtoLink = `mailto:vasanthaprakash.e@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        try {
            // Try Google Sheets first
            const response = await fetch('https://script.google.com/macros/s/AKfycbznsFnGt4GU2ia-Fx9h7R9PvXGNBM-QWpvt9Hzp11r0OfHRv3zVWEk4HDFu7-8_np7E/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, type, rating, message, date: new Date().toISOString() })
            });
            
            showStatus(statusDiv, '✅ Feedback sent! Thank you!', 'success');
            form.reset();
            resetStars();
            
        } catch (error) {
            // Fallback to email client
            showStatus(statusDiv, '📧 Opening email client to send feedback...', 'info');
            window.open(mailtoLink, '_blank');
            form.reset();
            resetStars();
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

function showStatus(element, message, type) {
    if (!element) return;
    element.textContent = message;
    element.classList.remove('hidden', 'bg-green-100', 'bg-red-100', 'bg-blue-100', 'text-green-700', 'text-red-700', 'text-blue-700');
    
    if (type === 'success') element.classList.add('bg-green-100', 'text-green-700');
    else if (type === 'error') element.classList.add('bg-red-100', 'text-red-700');
    else element.classList.add('bg-blue-100', 'text-blue-700');
    
    setTimeout(() => element.classList.add('hidden'), 5000);
}

// ============================================
// STAR RATING
// ============================================
function initStarRating() {
    const stars = document.querySelectorAll('#ratingStars i');
    const ratingInput = document.getElementById('fbRating');
    if (!stars.length) return;
    
    function updateStars(rating) {
        stars.forEach((star, idx) => {
            if (idx < rating) {
                star.classList.remove('far');
                star.classList.add('fas');
                star.style.color = '#fbbf24';
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
                star.style.color = '';
            }
        });
    }
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.rating);
            ratingInput.value = rating;
            updateStars(rating);
        });
        
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.dataset.rating);
            updateStars(rating);
        });
        
        star.addEventListener('mouseleave', () => {
            const current = parseInt(ratingInput.value) || 0;
            updateStars(current);
        });
    });
}

function resetStars() {
    const ratingInput = document.getElementById('fbRating');
    if (ratingInput) ratingInput.value = '0';
    const stars = document.querySelectorAll('#ratingStars i');
    stars.forEach(star => {
        star.classList.remove('fas');
        star.classList.add('far');
        star.style.color = '';
    });
}

// ============================================
// COPY EMAIL
// ============================================
function initCopyEmail() {
    const copyBtn = document.getElementById('copyEmailBtn');
    if (!copyBtn) return;
    
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText('vasanthaprakash.e@gmail.com');
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.classList.remove('bg-blue-600');
            copyBtn.classList.add('bg-green-600');
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.classList.remove('bg-green-600');
                copyBtn.classList.add('bg-blue-600');
            }, 2000);
        } catch (err) {
            alert('Copy manually: vasanthaprakash.e@gmail.com');
        }
    });
}

// ============================================
// YEAR UPDATE
// ============================================
const yearElement = document.getElementById('currentYear');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// INITIALIZE ALL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initFeedbackForm();
    initStarRating();
    initCopyEmail();
    console.log('✅ Portfolio loaded successfully!');
});