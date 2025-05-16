// 获取GitHub仓库的star数
document.addEventListener('DOMContentLoaded', function() {
    // 获取GitHub仓库星星数
    fetch('https://api.github.com/repos/JSREI/js-script-hook-goat')
        .then(response => response.json())
        .then(data => {
            document.getElementById('star-count').textContent = data.stargazers_count || 0;
        })
        .catch(error => {
            console.error('获取仓库数据失败:', error);
        });
    
    // 分屏导航功能
    const screenDots = document.querySelectorAll('.screen-dot');
    const screens = document.querySelectorAll('.screen');
    const screenContainer = document.querySelector('.screen-container');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // 点击分屏导航点切换屏幕
    screenDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetId = dot.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            // 平滑滚动到目标屏幕
            targetElement.scrollIntoView({ behavior: 'smooth' });
            
            // 更新活动状态
            screenDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            
            // 更新导航菜单高亮
            navLinks.forEach(link => {
                link.classList.remove('active');
                if(link.getAttribute('href') === `#${targetId}`) {
                    link.classList.add('active');
                }
            });
        });
    });
    
    // 点击导航链接，同步更新分页指示器
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // 去掉#
            const targetElement = document.getElementById(targetId);
            
            // 滚动到目标元素
            targetElement.scrollIntoView({ behavior: 'smooth' });
            
            // 更新导航高亮
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // 更新分页指示器高亮
            screenDots.forEach(dot => {
                dot.classList.remove('active');
                if(dot.getAttribute('data-target') === targetId) {
                    dot.classList.add('active');
                }
            });
        });
    });
    
    // 监听滚动，更新导航点和菜单状态
    screenContainer.addEventListener('scroll', () => {
        const currentScrollPos = screenContainer.scrollTop;
        const windowHeight = window.innerHeight;
        
        // 判断当前可见的屏幕
        screens.forEach((screen, index) => {
            const rect = screen.getBoundingClientRect();
            const screenTop = rect.top + currentScrollPos - screenContainer.offsetTop;
            const screenBottom = screenTop + screen.offsetHeight;
            
            // 如果当前屏幕在视口中
            if (currentScrollPos >= screenTop - windowHeight/2 && 
                currentScrollPos < screenBottom - windowHeight/2) {
                const currentId = screen.getAttribute('id');
                
                // 更新导航点的活动状态
                screenDots.forEach(dot => {
                    dot.classList.remove('active');
                    if(dot.getAttribute('data-target') === currentId) {
                        dot.classList.add('active');
                    }
                });
                
                // 更新导航菜单的活动状态
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}); 