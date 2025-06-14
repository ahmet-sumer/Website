// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const closeSidebar = document.getElementById('closeSidebar');
const navLinks = document.querySelectorAll('.nav-link');
const blogPosts = document.getElementById('blogPosts');

// Toggle Sidebar
menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
});

closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
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
        
        // Filter posts based on category (you can expand this)
        const category = link.textContent.trim();
        filterPosts(category);
    });
});


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
    // This is a simple example - you can expand it
    console.log(`Filtering posts for category: ${category}`);
    // Implement actual filtering logic here
}

// Search functionality
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

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
        
        // Load new posts (implement actual pagination logic)
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
function copyCode(button) {
    // Button'ın bulunduğu wrapper'ı bul
    const wrapper = button.closest('.code-block-wrapper');
    
    // Wrapper içindeki code elementini bul
    const codeElement = wrapper.querySelector('pre code');
    
    if (!codeElement) {
        console.error('Kod elementi bulunamadı');
        return;
    }
    
    // Kodu al (trim ile başındaki/sonundaki boşlukları temizle)
    const code = codeElement.textContent.trim();
    
    // Kopyalama işlemi
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code)
            .then(() => {
                // Başarılı mesajı
                const originalHTML = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Kopyalandı!';
                button.style.backgroundColor = '#4CAF50';
                button.style.color = 'white';
                
                // 2 saniye sonra eski haline döndür
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.style.backgroundColor = '';
                    button.style.color = '';
                }, 2000);
            })
            .catch(err => {
                console.error('Kopyalama hatası:', err);
                fallbackCopy(code);
            });
    } else {
        // Eski tarayıcılar için
        fallbackCopy(code);
    }
}

// Alternatif kopyalama metodu
function fallbackCopy(text) {
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
            // Geçici bildirim göster
            showNotification('Kopyalandı!');
        } else {
            alert('Kopyalama başarısız');
        }
    } catch (err) {
        console.error('Fallback kopyalama hatası:', err);
        alert('Kopyalama başarısız. Lütfen manuel olarak kopyalayın.');
    }
    
    document.body.removeChild(textArea);
}

// Opsiyonel: Bildirim gösterme fonksiyonu
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}
