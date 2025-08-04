// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.init();
    }

    init() {
        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem('pixrei-theme') || 'dark';
        this.setTheme(savedTheme);
        
        // Bind events
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Keyboard shortcut - T key
        document.addEventListener('keydown', (e) => {
            if (e.key === 't' || e.key === 'T') {
                if (!document.activeElement.matches('input, textarea')) {
                    this.toggleTheme();
                }
            }
        });
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('pixrei-theme', theme);
        this.updateThemeIcon(theme);
        
        // Smooth transition
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    updateThemeIcon(theme) {
        if (this.themeIcon) {
            const iconClass = theme === 'dark' ? 'fa-sun' : 'fa-moon';
            this.themeIcon.className = `fas ${iconClass}`;
        }
    }
}

// Reading Progress Bar
class ReadingProgress {
    constructor() {
        this.progressBar = document.getElementById('readingProgress');
        this.init();
    }

    init() {
        if (this.progressBar) {
            window.addEventListener('scroll', () => this.updateProgress());
            this.updateProgress();
        }
    }

    updateProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        this.progressBar.style.width = Math.min(scrolled, 100) + '%';
    }
}

// Table of Contents Management
class TableOfContents {
    constructor() {
        this.tocLinks = document.querySelectorAll('.table-of-contents a');
        this.headings = document.querySelectorAll('h2[id], h3[id], h4[id]');
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateActiveSection();
    }

    bindEvents() {
        // Smooth scrolling for TOC links
        this.tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without triggering scroll
                    history.pushState(null, null, targetId);
                }
            });
        });

        // Update active section on scroll
        window.addEventListener('scroll', () => this.updateActiveSection());
    }

    updateActiveSection() {
        let current = '';
        
        this.headings.forEach(heading => {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= 100) {
                current = '#' + heading.id;
            }
        });

        // Update active TOC link
        this.tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }
}

// Code Copy Functionality
function copyCode(button) {
    const wrapper = button.closest('.code-block-wrapper');
    const codeElement = wrapper.querySelector('pre code');
    
    if (!codeElement) {
        console.error('Code element not found');
        return;
    }
    
    const code = codeElement.textContent.trim();
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code)
            .then(() => {
                showCopySuccess(button);
            })
            .catch(err => {
                console.error('Copy failed:', err);
                fallbackCopy(code, button);
            });
    } else {
        fallbackCopy(code, button);
    }
}

function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.style.background = 'var(--primary-green)';
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = '';
    }, 2000);
}

function fallbackCopy(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(button);
        } else {
            showNotification('Copy failed');
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showNotification('Copy failed. Please copy manually.');
    }
    
    document.body.removeChild(textArea);
}

// Comment System
class CommentSystem {
    constructor() {
        this.commentForm = document.getElementById('commentForm');
        this.init();
    }

    init() {
        if (this.commentForm) {
            this.commentForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('commentName').value;
        const email = document.getElementById('commentEmail').value;
        const text = document.getElementById('commentText').value;
        
        if (!name || !email || !text) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Here you would normally send to your backend
        this.addComment({ name, email, text });
        this.commentForm.reset();
        showNotification('Comment submitted successfully!', 'success');
    }

    addComment(commentData) {
        const commentsList = document.querySelector('.comments-list');
        const commentElement = this.createCommentElement(commentData);
        commentsList.insertAdjacentHTML('afterbegin', commentElement);
    }

    createCommentElement(data) {
        return `
            <div class="comment">
                <div class="comment-header">
                    <div class="comment-author">
                        <div class="comment-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <strong>${data.name}</strong>
                    </div>
                    <span class="comment-date">Just now</span>
                </div>
                <div class="comment-content">
                    <p>${data.text}</p>
                </div>
            </div>
        `;
    }
}

// Image Zoom Functionality
class ImageZoom {
    constructor() {
        this.images = document.querySelectorAll('.post-content img');
        this.init();
    }

    init() {
        this.images.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => this.openZoom(img));
        });
    }

    openZoom(img) {
        const overlay = document.createElement('div');
        overlay.className = 'image-overlay';
        overlay.innerHTML = `<img src="${img.src}" alt="${img.alt}" class="zoomed-image">`;
        
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        
        overlay.addEventListener('click', () => this.closeZoom(overlay));
        
        // ESC key to close
        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                this.closeZoom(overlay);
                document.removeEventListener('keydown', handleKeydown);
            }
        };
        document.addEventListener('keydown', handleKeydown);
    }

    closeZoom(overlay) {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
    }
}

// Share Functionality
class ShareManager {
    constructor() {
        this.bindShareButtons();
    }

    bindShareButtons() {
        const shareButtons = document.querySelectorAll('.share-btn');
        shareButtons.forEach(btn => {
            if (btn.getAttribute('href') === 'mailto:') {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.copyToClipboard();
                });
            }
        });
    }

    copyToClipboard() {
        const url = window.location.href;
        const title = document.title;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                showNotification('Link copied to clipboard!', 'success');
            });
        } else {
            // Fallback
            const textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Link copied to clipboard!', 'success');
        }
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary-green)' : type === 'error' ? '#e74c3c' : 'var(--primary-blue)'};
        color: ${type === 'success' || type === 'error' ? 'white' : 'var(--bg-dark)'};
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Line Numbers for Code Blocks
class CodeLineNumbers {
    constructor() {
        this.init();
    }

    init() {
        const codeBlocks = document.querySelectorAll('.code-block-wrapper pre code');
        codeBlocks.forEach(code => this.addLineNumbers(code));
    }

    addLineNumbers(codeElement) {
        const lines = codeElement.textContent.split('\n');
        const lineCount = lines.length;
        
        // Don't add line numbers if there's only one line
        if (lineCount <= 1) return;
        
        const pre = codeElement.parentElement;
        
        // Check if line numbers already exist
        if (pre.querySelector('.line-numbers')) return;
        
        const lineNumbers = document.createElement('div');
        lineNumbers.className = 'line-numbers';
        
        for (let i = 1; i <= lineCount; i++) {
            const lineNumber = document.createElement('div');
            lineNumber.textContent = i;
            lineNumbers.appendChild(lineNumber);
        }
        
        pre.insertBefore(lineNumbers, codeElement);
    }
}

// Smooth Scroll for Anchor Links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`Page loaded in ${loadTime}ms`);
                
                // Report Core Web Vitals if available
                if ('web-vital' in window) {
                    this.reportWebVitals();
                }
            }
        });
    }

    reportWebVitals() {
        // This would integrate with your analytics
        console.log('Web Vitals monitoring active');
    }
}

// Main Application
class PostPageApp {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Initialize all components
            this.themeManager = new ThemeManager();
            this.readingProgress = new ReadingProgress();
            this.tableOfContents = new TableOfContents();
            this.commentSystem = new CommentSystem();
            this.imageZoom = new ImageZoom();
            this.shareManager = new ShareManager();
            this.codeLineNumbers = new CodeLineNumbers();
            this.smoothScroll = new SmoothScroll();
            this.performanceMonitor = new PerformanceMonitor();

            // Add loaded class to body
            document.body.classList.add('loaded');
            
            console.log('Post page initialized successfully');
        } catch (error) {
            console.error('Error initializing post page:', error);
        }
    }
}

// Initialize the application
const app = new PostPageApp();

// Additional utility functions
const Utils = {
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    formatDate: (date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    }
};

// Export for external use
window.PostPage = {
    ThemeManager,
    ReadingProgress,
    TableOfContents,
    CommentSystem,
    ImageZoom,
    ShareManager,
    Utils
};

// Handle browser back/forward navigation
window.addEventListener('popstate', (e) => {
    console.log('Navigation state changed');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC key to close any modals
    if (e.key === 'Escape') {
        const overlay = document.querySelector('.image-overlay');
        if (overlay) {
            document.body.removeChild(overlay);
            document.body.style.overflow = '';
        }
    }
    
    // Ctrl/Cmd + K to focus search (if exists)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="search"]');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Print optimization
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});
class BlogFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn, .nav-link[data-filter]');
        this.blogPosts = document.querySelectorAll('.blog-card, .post-card');
        this.activeFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.showAllPosts();
    }

    bindEvents() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = button.getAttribute('data-filter') || 
                              button.textContent.toLowerCase().trim();
                this.filterPosts(filter);
                this.updateActiveButton(button);
            });
        });
    }

    filterPosts(category) {
        this.activeFilter = category;
        
        this.blogPosts.forEach(post => {
            const postCategories = post.getAttribute('data-categories') || '';
            const postTags = post.getAttribute('data-tags') || '';
            const searchText = (postCategories + ' ' + postTags).toLowerCase();
            
            if (category === 'all' || 
                searchText.includes(category.toLowerCase()) ||
                post.classList.contains(category.toLowerCase())) {
                
                post.style.display = 'block';
                post.classList.add('filter-show');
                post.classList.remove('filter-hide');
            } else {
                post.style.display = 'none';
                post.classList.add('filter-hide');
                post.classList.remove('filter-show');
            }
        });

        this.updatePostCount();
    }

    updateActiveButton(activeButton) {
        this.filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    updatePostCount() {
        const visiblePosts = document.querySelectorAll('.blog-card:not([style*="none"]), .post-card:not([style*="none"])');
        const countElement = document.querySelector('.posts-count');
        
        if (countElement) {
            countElement.textContent = `${visiblePosts.length} posts found`;
        }
    }

    showAllPosts() {
        this.blogPosts.forEach(post => {
            post.style.display = 'block';
            post.classList.remove('filter-hide');
            post.classList.add('filter-show');
        });
    }
}

// ====================================
// SCROLL TO TOP FUNCTIONALITY
// ====================================
        
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
            
        if (scrollToTopBtn) {
                // Show/hide scroll to top button
                window.addEventListener('scroll', function() {
                    if (window.pageYOffset > 300) {
                        scrollToTopBtn.classList.add('visible');
                    } else {
                        scrollToTopBtn.classList.remove('visible');
                    }
                });
                
                // Scroll to top when button is clicked
                scrollToTopBtn.addEventListener('click', function() {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
        });


