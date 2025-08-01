// Global Variables
let currentPage = 1;
const postsPerPage = 4;
let allPosts = [];
let filteredPosts = [];
let activeFilter = 'all';
let searchTerm = '';

// DOM Elements
let sidebar, menuToggle, closeSidebar, navLinks, blogPosts;
let searchInput, searchBtn, filterInfo, resultCount, clearFilters;
let noResults, pagination, themeToggle, mobileThemeToggle;
let themeIcon, mobileThemeIcon;

// Safe DOM element getter
function safeGetElement(id) {
    try {
        return document.getElementById(id);
    } catch (error) {
        console.warn(`Element with id '${id}' not found`);
        return null;
    }
}

function safeGetElements(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Elements with selector '${selector}' not found`);
        return [];
    }
}

// Initialize DOM elements safely
function initializeElements() {
    sidebar = safeGetElement('sidebar');
    menuToggle = safeGetElement('menuToggle');
    closeSidebar = safeGetElement('closeSidebar');
    navLinks = safeGetElements('.nav-link');
    blogPosts = safeGetElement('blogPosts');
    searchInput = safeGetElement('searchInput');
    searchBtn = safeGetElement('searchBtn');
    filterInfo = safeGetElement('filterInfo');
    resultCount = safeGetElement('resultCount');
    clearFilters = safeGetElement('clearFilters');
    noResults = safeGetElement('noResults');
    pagination = safeGetElement('pagination');
    themeToggle = safeGetElement('themeToggle');
    mobileThemeToggle = safeGetElement('mobileThemeToggle');
    themeIcon = safeGetElement('themeIcon');
    mobileThemeIcon = safeGetElement('mobileThemeIcon');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('DOM loaded, initializing...');
        initializeElements();
        initializeTheme();
        initializeBlog();
        bindEvents();
        console.log('Initialization complete');
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

// ===== THEME MANAGEMENT =====
function initializeTheme() {
    try {
        const savedTheme = localStorage.getItem('pixrei-theme') || 'dark';
        setTheme(savedTheme);
    } catch (error) {
        console.warn('Theme initialization error:', error);
        setTheme('dark');
    }
}

function toggleTheme() {
    try {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    } catch (error) {
        console.error('Theme toggle error:', error);
    }
}

function setTheme(theme) {
    try {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('pixrei-theme', theme);
        updateThemeIcons(theme);
        
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    } catch (error) {
        console.error('Set theme error:', error);
    }
}

function updateThemeIcons(theme) {
    try {
        const iconClass = theme === 'dark' ? 'fa-sun' : 'fa-moon';
        
        if (themeIcon) themeIcon.className = `fas ${iconClass}`;
        if (mobileThemeIcon) mobileThemeIcon.className = `fas ${iconClass}`;
    } catch (error) {
        console.warn('Theme icon update error:', error);
    }
}

// ===== BLOG INITIALIZATION =====
function initializeBlog() {
    try {
        collectExistingPosts();
        filterAndShowPosts();
    } catch (error) {
        console.error('Blog initialization error:', error);
    }
}

function collectExistingPosts() {
    try {
        const existingCards = safeGetElements('.blog-card');
        allPosts = [];
        
        existingCards.forEach((card, index) => {
            if (card) {
                const postData = {
                    element: card,
                    category: card.getAttribute('data-category') || 'uncategorized',
                    tags: card.getAttribute('data-tags') || '',
                    title: card.querySelector('.post-title')?.textContent?.toLowerCase() || '',
                    excerpt: card.querySelector('.post-excerpt')?.textContent?.toLowerCase() || '',
                    html: card.outerHTML,
                    index: index
                };
                allPosts.push(postData);
            }
        });
        
        console.log(`Collected ${allPosts.length} posts`);
    } catch (error) {
        console.error('Post collection error:', error);
        allPosts = [];
    }
}

// ===== FILTERING SYSTEM =====
function filterPosts(category) {
    try {
        console.log(`Filtering posts for category: ${category}`);
        activeFilter = category;
        searchTerm = '';
        
        if (searchInput) searchInput.value = '';
        
        updateActiveNavLink(category);
        filterAndShowPosts();
    } catch (error) {
        console.error('Filter posts error:', error);
    }
}

function filterAndShowPosts() {
    try {
        console.log(`Applying filters - Category: ${activeFilter}, Search: "${searchTerm}"`);
        
        filteredPosts = allPosts.filter(post => {
            try {
                const categoryMatch = activeFilter === 'all' || 
                                    post.category.toLowerCase() === activeFilter.toLowerCase();
                
                const searchMatch = searchTerm === '' || 
                                  post.title.includes(searchTerm.toLowerCase()) ||
                                  post.excerpt.includes(searchTerm.toLowerCase()) ||
                                  post.tags.toLowerCase().includes(searchTerm.toLowerCase());
                
                return categoryMatch && searchMatch;
            } catch (error) {
                console.warn('Post filter error:', error);
                return false;
            }
        });
        
        console.log(`Filtered to ${filteredPosts.length} posts`);
        
        currentPage = 1;
        showPage(currentPage);
        updateFilterInfo();
    } catch (error) {
        console.error('Filter and show posts error:', error);
    }
}

function updateActiveNavLink(category) {
    try {
        navLinks.forEach(link => {
            if (link) {
                link.classList.remove('active');
                if (link.getAttribute('data-filter') === category) {
                    link.classList.add('active');
                }
            }
        });
    } catch (error) {
        console.warn('Active nav link update error:', error);
    }
}

// ===== SEARCH FUNCTIONALITY =====
function performSearch() {
    try {
        searchTerm = searchInput ? searchInput.value.trim() : '';
        console.log(`Searching for: "${searchTerm}"`);
        filterAndShowPosts();
        
        if ((searchTerm || activeFilter !== 'all') && clearFilters) {
            clearFilters.style.display = 'inline-block';
        }
    } catch (error) {
        console.error('Search error:', error);
    }
}

function clearAllFilters() {
    try {
        console.log('Clearing all filters');
        activeFilter = 'all';
        searchTerm = '';
        
        if (searchInput) searchInput.value = '';
        
        navLinks.forEach(link => {
            if (link) link.classList.remove('active');
        });
        
        const allLink = document.querySelector('[data-filter="all"]');
        if (allLink) allLink.classList.add('active');
        
        if (clearFilters) clearFilters.style.display = 'none';
        filterAndShowPosts();
    } catch (error) {
        console.error('Clear filters error:', error);
    }
}

// ===== PAGINATION =====
function showPage(page) {
    try {
        console.log(`Showing page ${page}`);
        
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;
        const postsToShow = filteredPosts.slice(start, end);
        
        if (blogPosts) {
            blogPosts.innerHTML = '';
            
            if (postsToShow.length === 0) {
                if (noResults) noResults.style.display = 'block';
                if (pagination) pagination.style.display = 'none';
            } else {
                if (noResults) noResults.style.display = 'none';
                if (pagination) pagination.style.display = 'flex';
                
                postsToShow.forEach(post => {
                    blogPosts.innerHTML += post.html;
                });
            }
        }
        
        updatePaginationInfo();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Show page error:', error);
    }
}

function updatePaginationInfo() {
    try {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        const pageInfo = safeGetElement('pageInfo');
        const prevBtn = safeGetElement('prevBtn');
        const nextBtn = safeGetElement('nextBtn');
        
        if (pageInfo) pageInfo.textContent = `${currentPage} / ${Math.max(totalPages, 1)}`;
        
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
            prevBtn.style.opacity = currentPage === 1 ? '0.5' : '1';
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages || totalPages === 0;
            nextBtn.style.opacity = (currentPage === totalPages || totalPages === 0) ? '0.5' : '1';
        }
    } catch (error) {
        console.warn('Pagination info update error:', error);
    }
}

function updateFilterInfo() {
    try {
        const count = filteredPosts.length;
        let infoText = `${count} post${count !== 1 ? 's' : ''} found`;
        
        if (activeFilter !== 'all') {
            infoText += ` in ${activeFilter}`;
        }
        
        if (searchTerm) {
            infoText += ` for "${searchTerm}"`;
        }
        
        if (resultCount) resultCount.textContent = infoText;
    } catch (error) {
        console.warn('Filter info update error:', error);
    }
}

// ===== EVENT LISTENERS =====
function bindEvents() {
    try {
        console.log('Binding events...');
        
        // Theme toggle
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener('click', toggleTheme);
        }
        
        // Keyboard shortcut
        document.addEventListener('keydown', (e) => {
            if (e.key === 't' || e.key === 'T') {
                if (!document.activeElement.matches('input, textarea')) {
                    toggleTheme();
                }
            }
        });

        // Sidebar
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.add('active');
            });
        }

        if (closeSidebar && sidebar) {
            closeSidebar.addEventListener('click', () => {
                sidebar.classList.remove('active');
            });
        }

        // Navigation links
        navLinks.forEach((link) => {
            if (link) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const category = link.getAttribute('data-filter');
                    filterPosts(category);
                    
                    if (window.innerWidth <= 1024 && sidebar) {
                        sidebar.classList.remove('active');
                    }
                });
            }
        });

        // Search
        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
        }
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }

        // Clear filters
        if (clearFilters) {
            clearFilters.addEventListener('click', clearAllFilters);
        }

        // Pagination
        const prevBtn = safeGetElement('prevBtn');
        const nextBtn = safeGetElement('nextBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    showPage(currentPage);
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    showPage(currentPage);
                }
            });
        }

        console.log('Events bound successfully');
    } catch (error) {
        console.error('Event binding error:', error);
    }
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== EXPORT FOR EXTERNAL USE =====
window.BlogSystem = {
    filterPosts,
    performSearch,
    clearAllFilters,
    toggleTheme,
    get allPosts() { return allPosts; },
    get filteredPosts() { return filteredPosts; },
    get currentPage() { return currentPage; },
    get activeFilter() { return activeFilter; }
};

console.log('Script loaded successfully');
