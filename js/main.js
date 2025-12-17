// 登录页面逻辑
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    // 检查是否已登录
    const currentUser = localStorage.getItem('toab_user');
    if (currentUser) {
        window.location.href = 'system.html';
        return;
    }
    
    // 检查是否已从官网解密获得凭证
    const isDecrypted = localStorage.getItem('toab_decrypted');
    const initialUsername = localStorage.getItem('toab_initial_username');
    const initialPassword = localStorage.getItem('toab_initial_password');
    
    // 如果已解密，可以预填充（但不自动填充密码，保持安全性）
    if (isDecrypted && initialUsername) {
        const usernameInput = document.getElementById('username');
        if (usernameInput) {
            usernameInput.value = initialUsername;
        }
    }
    
    // 登录表单提交
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            showError('请输入用户名和密码');
            return;
        }
        
        // 验证初始账户密码
        if (isDecrypted && initialUsername && initialPassword) {
            // 使用从官网解密获得的凭证验证
            if (username === initialUsername && password === initialPassword) {
                // 登录成功
                localStorage.setItem('toab_user', username);
                localStorage.setItem('toab_login_time', new Date().toISOString());
                localStorage.setItem('toab_first_login', 'true');
                
                // 跳转到系统主界面
                window.location.href = 'system.html';
                return;
            } else {
                showError('用户名或密码错误');
                return;
            }
        } else {
            // 未解密，提示用户先访问官网
            showError('请先访问官网首页获取系统访问凭证');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
            return;
        }
    });
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
});

