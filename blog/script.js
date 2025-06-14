// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const closeSidebar = document.getElementById('closeSidebar');
const navLinks = document.querySelectorAll('.nav-link');
const blogPosts = document.getElementById('blogPosts');

// Toggle Sidebar
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
    });
}

if (closeSidebar) {
    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024 && sidebar && menuToggle) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Active Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Close sidebar on mobile after clicking
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
        }
        
        // Filter posts based on category
        const category = link.textContent.trim();
        filterPosts(category);
    });
});

// Sample blog posts data
const blogData = [
    {
        category: 'Security',
        date: '15 Aralık 2024',
        title: 'OWASP Top 10: Web Application Security Riskleri',
        excerpt: 'Modern web uygulamalarında en sık karşılaşılan güvenlik açıklarını ve bunlara karşı alınabilecek önlemleri detaylı olarak inceliyoruz...',
        tags: ['#OWASP', '#WebSecurity', '#PenTest']
    },
    {
        category: 'CTF',
        date: '10 Aralık 2024',
        title: 'HackTheBox - Keeper Makinesi Çözümü',
        excerpt: 'HTB\'nin popüler makinelerinden Keeper\'ın detaylı çözüm adımları. Initial foothold\'dan root\'a kadar tüm süreci açıklıyorum...',
        tags: ['#HackTheBox', '#CTF', '#Linux']
    },
    {
        category: 'Tools',
        date: '5 Aralık 2024',
        title: 'Burp Suite Extensions: En Kullanışlı 10 Eklenti',
        excerpt: 'Web application penetration testing\'de işinizi kolaylaştıracak en iyi Burp Suite eklentilerini ve kullanım örneklerini paylaşıyorum...',
        tags: ['#BurpSuite', '#Tools', '#WebPentest']
    },
    {
        category: 'Tutorial',
        date: '1 Aralık 2024',
        title: 'Python ile Basit Port Scanner Yazımı',
        excerpt: 'Sıfırdan Python kullanarak nasıl port scanner yazabileceğinizi, socket programlama temellerini öğrenerek anlatıyorum...',
        tags: ['#Python', '#Coding', '#NetworkSecurity']
    }
];

// Filter posts function
function filterPosts(category) {
    console.log(`Filtering posts for category: ${category}`);
    // Implement actual filtering logic here
}

// Search functionality
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

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

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const posts = document.querySelectorAll('.blog-card');
    
    posts.forEach(post => {
        const title = post.querySelector('.post-title').textContent.toLowerCase();
        const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
        const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || tags.some(tag => tag.includes(searchTerm))) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

// Pagination
const pageButtons = document.querySelectorAll('.page-btn');

pageButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        pageButtons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Load new posts
        loadPage(this.textContent);
    });
});

function loadPage(pageNumber) {
    console.log(`Loading page ${pageNumber}`);
    // Implement actual pagination logic here
}

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Dynamic content loading simulation
function createBlogPost(data) {
    return `
        <article class="blog-card">
            <div class="post-meta">
                <span class="category">${data.category}</span>
                <span class="date">${data.date}</span>
            </div>
            <h2 class="post-title">${data.title}</h2>
            <p class="post-excerpt">${data.excerpt}</p>
            <div class="post-tags">
                ${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="#" class="read-more">Devamını Oku <i class="fas fa-arrow-right"></i></a>
        </article>
    `;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Blog site loaded successfully!');
});