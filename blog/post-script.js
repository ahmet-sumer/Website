// Reading Progress Bar
function updateReadingProgress() {
    const article = document.querySelector('.post-content');
    const progressBar = document.getElementById('readingProgress');
    
    if (!article || !progressBar) return;
    
    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    
    const progress = Math.max(0, Math.min(100, 
        ((scrollPosition - articleTop + windowHeight) / articleHeight) * 100
    ));
    
    progressBar.style.width = progress + '%';
}

// Copy Code Functionality - Global function for onclick
window.copyCode = function(button) {
    const pre = button.closest('pre');
    const code = pre.querySelector('code');
    const text = code.textContent || code.innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Kopyalandı!';
        button.style.backgroundColor = '#00cc6a';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Kopyalama hatası:', err);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Update reading progress
    updateReadingProgress();
    window.addEventListener('scroll', updateReadingProgress);
    window.addEventListener('resize', updateReadingProgress);
    
    // Add line numbers to code blocks
    setTimeout(() => {
        document.querySelectorAll('.post-content pre code').forEach((code) => {
            const pre = code.parentElement;
            
            // Skip if already has line numbers
            if (pre.querySelector('.line-numbers')) return;
            
            // Get lines
            const text = code.textContent;
            const lines = text.split('\n');
            if (lines[lines.length - 1] === '') lines.pop();
            
            // Create line numbers
            const lineNumbers = document.createElement('span');
            lineNumbers.className = 'line-numbers';
            lineNumbers.setAttribute('aria-hidden', 'true');
            
            for (let i = 1; i <= lines.length; i++) {
                lineNumbers.textContent += i + '\n';
            }
            
            pre.insertBefore(lineNumbers, code);
            pre.style.position = 'relative';
            pre.style.paddingLeft = '3.5em';
        });
    }, 100);
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    
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
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 && sidebar && menuToggle) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
    
    // Smooth scroll for table of contents
    document.querySelectorAll('.table-of-contents a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offset = 80;
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight current section in TOC
    const sections = document.querySelectorAll('.post-content h2[id], .post-content h3[id]');
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    
    function highlightTOC() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightTOC);
    highlightTOC();
    
    // Comment form
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('commentName').value;
            const email = document.getElementById('commentEmail').value;
            const text = document.getElementById('commentText').value;
            
            console.log('Yorum gönderildi:', { name, email, text });
            
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Yorumunuz başarıyla gönderildi!';
            
            commentForm.appendChild(successMessage);
            commentForm.reset();
            
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const icon = darkModeToggle.querySelector('i');
            
            if (document.body.classList.contains('light-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            const icon = darkModeToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    }
    
    // Image zoom
    document.querySelectorAll('.post-content img').forEach(img => {
        img.style.cursor = 'zoom-in';
        
        img.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.className = 'image-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                cursor: zoom-out;
            `;
            
            const zoomedImg = document.createElement('img');
            zoomedImg.src = img.src;
            zoomedImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 8px;
            `;
            
            overlay.appendChild(zoomedImg);
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', () => {
                overlay.remove();
            });
        });
    });
    
    console.log('Post script loaded successfully!');
});

document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll('.copy-code-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const wrapper = this.parentElement;
            const code = wrapper.querySelector('pre code');
            
            if (code) {
                const text = code.textContent;
                
                // Textarea yöntemi
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.setAttribute('readonly', '');
                textarea.style.position = 'absolute';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                
                // Görsel geri bildirim
                this.innerHTML = '<i class="fas fa-check"></i> Kopyalandı!';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i> Kopyala';
                }, 2000);
            }
        });
    });
});
