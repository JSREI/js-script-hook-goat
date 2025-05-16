// 获取GitHub star数量
function fetchStarCount() {
    // 检查本地缓存
    const cachedData = localStorage.getItem('githubStarData');
    if (cachedData) {
        const data = JSON.parse(cachedData);
        // 检查缓存是否在一小时内
        if (Date.now() - data.timestamp < 3600000) {
            document.getElementById('star-count').textContent = data.stars;
            return;
        }
    }
    
    // 如果没有缓存或缓存已过期，则获取新数据
    fetch('https://api.github.com/repos/JSREI/js-script-hook-goat')
        .then(response => response.json())
        .then(data => {
            const starCount = data.stargazers_count;
            document.getElementById('star-count').textContent = starCount;
            
            // 保存到本地缓存
            localStorage.setItem('githubStarData', JSON.stringify({
                stars: starCount,
                timestamp: Date.now()
            }));
        })
        .catch(error => {
            console.error('无法获取Star数量:', error);
            document.getElementById('star-count').textContent = 'N/A';
        });
}

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    // 获取star数
    fetchStarCount();
    
    // 导航激活状态处理
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.screen');
    
    function setActiveLink() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight/3)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // 初始设置
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 