// 官网首页逻辑 - 优化后的线索系统
document.addEventListener('DOMContentLoaded', function() {
    const hiddenSection = document.getElementById('hiddenDecrypt');
    const decryptKeyInput = document.getElementById('decryptKey');
    const decryptSubmit = document.getElementById('decryptSubmit');
    const decryptResult = document.getElementById('decryptResult');
    const decryptError = document.getElementById('decryptError');
    const goToLoginBtn = document.getElementById('goToLogin');
    const joinUsLink = document.getElementById('joinUsLink');
    
    // 线索系统：访问密钥隐藏在页面内容中
    // 线索1：新闻动态中明确提到 "系统访问密钥已更新为：hsy131g171g"
    // 密钥格式：不区分大小写，允许有无连字符的轻微变体
    
    // 有效的访问密钥（基于页面内容中的线索）——包含贯穿全局的代号 HSY
    const validKeys = [
        'hsy131g171g',        // 新闻中明确提到的系统访问密钥（主要）
        'HSY131G171G',        // 大写版本
        'HSY-131G-171G'       // 带连字符形式（备用）
    ];
    
    // 初始账户信息（通过解密获得）
    const initialCredentials = {
        username: 'admin',
        password: 'TOAB@2025#Secure'
    };
    
    // 控制台不再输出额外线索，保持登录流程的隐蔽感
    
    // 点击"加入我们"链接显示解密面板
    if (joinUsLink) {
        joinUsLink.addEventListener('click', function(e) {
            e.preventDefault();
            showDecryptPanel();
        });
    }
    
    // 显示解密面板
    function showDecryptPanel() {
        if (hiddenSection) {
            hiddenSection.classList.add('active');
            hiddenSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            setTimeout(() => {
                decryptKeyInput.focus();
            }, 300);
        }
    }
    
    // 解密验证
    decryptSubmit.addEventListener('click', function() {
        validateDecryptKey();
    });
    
    decryptKeyInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validateDecryptKey();
        }
    });
    
    // 不再在输入过程中给出额外提示

    function validateDecryptKey() {
        const inputKey = decryptKeyInput.value.trim();
        
        decryptError.style.display = 'none';
        decryptResult.style.display = 'none';
        
        if (!inputKey) {
            showError('请输入访问密钥');
            return;
        }
        
        // 验证密钥（不区分大小写，支持部分匹配）
        const isValid = validKeys.some(key => {
            const keyLower = key.toLowerCase();
            const inputLower = inputKey.toLowerCase();
            return keyLower === inputLower || 
                   keyLower.replace(/-/g, '') === inputLower.replace(/-/g, '') ||
                   keyLower.replace(/-/g, '') === inputLower;
        });
        
        if (isValid) {
            showCredentials();
            localStorage.setItem('toab_decrypted', 'true');
            localStorage.setItem('toab_decrypt_time', new Date().toISOString());
        } else {
            showError('访问密钥错误，请重试');
        }
    }
    
    function showCredentials() {
        const revealedUsername = document.getElementById('revealedUsername');
        const revealedPassword = document.getElementById('revealedPassword');
        
        if (revealedUsername && revealedPassword) {
            revealedUsername.textContent = initialCredentials.username;
            revealedPassword.textContent = initialCredentials.password;
        }
        
        decryptResult.style.display = 'block';
        decryptError.style.display = 'none';
        
        localStorage.setItem('toab_initial_username', initialCredentials.username);
        localStorage.setItem('toab_initial_password', initialCredentials.password);
        
        console.log('%c✓ 验证成功！已获得系统访问凭证', 'color: #2a9d8f; font-size: 14px; font-weight: bold;');
    }
    
    function showError(message) {
        if (decryptError) {
            decryptError.querySelector('p').textContent = '✗ ' + message;
            decryptError.style.display = 'block';
            decryptResult.style.display = 'none';
        }
    }
    
    // 前往登录页面
    if (goToLoginBtn) {
        goToLoginBtn.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
    
    // 平滑滚动
    window.scrollToSection = function(sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // 页面加载动画
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // 与真实历史时间挂钩的展示条
    const historyTodayEl = document.getElementById('historyToday');
    if (historyTodayEl) {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const formattedDate = `${year}年${month}月${day}日`;

        // 真实世界中的若干关键历史事件（示例链接，可按需替换）
        const historyEvents = [
            {
                year: 2001,
                title: '2001 年美国的四起有组织的恐怖袭击事件',
                url: 'https://baike.baidu.com/item/9%C2%B711%E4%BA%8B%E4%BB%B6?fromModule=lemma_search-box'
            },
            {
                year: 2008,
                title: '2008 年全球金融危机爆发',
                url: 'https://baike.baidu.com/item/2008%E5%B9%B4%E7%BE%8E%E5%9B%BD%E9%87%91%E8%9E%8D%E5%8D%B1%E6%9C%BA?fromModule=lemma_search-box'
            },
            {
                year: 2020,
                title: '2020 年新冠疫情在全球蔓延',
                url: 'https://baike.baidu.com/item/%E6%96%B0%E5%86%A0%E7%96%AB%E6%83%85?fromModule=lemma_search-box'
            },
        ];

        const eventsHtml = historyEvents.map(event => `
            <a class="history-event" href="${event.url}" target="_blank" rel="noopener noreferrer">
                <span class="history-event-year">${event.year}</span>
                <span class="history-event-title">${event.title}</span>
            </a>
        `).join('');

        historyTodayEl.innerHTML = `
            <div class="history-main">
                <span class="history-label">现实时间</span>
                <span class="history-date">${formattedDate}</span>
            </div>
            <div class="history-events">
                ${eventsHtml}
            </div>
        `;
    }
});
