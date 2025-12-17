// 系统核心逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态
    const currentUser = localStorage.getItem('toab_user');
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    // 初始化系统
    initSystem();
    
    function initSystem() {
        // 设置用户信息
        const userInfo = document.getElementById('userInfo');
        if (userInfo) {
            userInfo.textContent = `用户: ${currentUser}`;
        }
        
        // 初始化导航
        initNavigation();
        
        // 初始化各个模块
        initDashboard();
        initFileSystem();
        initTerminal();
        initDecrypt();
        initStory();
        
        // 初始化退出按钮
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                if (confirm('确定要退出系统吗？')) {
                    localStorage.removeItem('toab_user');
                    localStorage.removeItem('toab_login_time');
                    window.location.href = 'index.html';
                }
            });
        }
    }
    
    // 导航系统
    function initNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const sections = document.querySelectorAll('.content-section');
        
        navButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetSection = this.getAttribute('data-section');
                
                // 更新按钮状态
                navButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // 更新内容区
                sections.forEach(s => s.classList.remove('active'));
                const target = document.getElementById(targetSection);
                if (target) {
                    target.classList.add('active');
                }
            });
        });
    }
    
    // 初始化仪表板
    function initDashboard() {
        const taskCount = document.getElementById('taskCount');
        const decryptCount = document.getElementById('decryptCount');
        const logPreview = document.getElementById('logPreview');
        
        if (taskCount) {
            const pendingStories = storyManager.getPendingStories();
            taskCount.textContent = pendingStories.length;
        }
        
        if (decryptCount) {
            const progress = storage.getProgress();
            decryptCount.textContent = progress.decryptedFiles.length;
        }
        
        if (logPreview) {
            const logs = storyManager.getAllStories().slice(0, 3);
            if (logs.length > 0) {
                logPreview.innerHTML = logs.map(log => 
                    `<p>${log.title}: ${log.content.substring(0, 50)}...</p>`
                ).join('');
            }
        }
    }
    
    // 初始化文件系统
    function initFileSystem() {
        const filePath = document.getElementById('filePath');
        const fileList = document.getElementById('fileList');
        const refreshBtn = document.getElementById('refreshFiles');
        
        function renderFileList() {
            if (!fileList) return;
            
            const files = fileSystem.getCurrentDirectory();
            const currentPath = fileSystem.getCurrentPath();
            
            if (filePath) {
                filePath.textContent = currentPath;
            }
            
            fileList.innerHTML = '';
            
            if (files.length === 0) {
                fileList.innerHTML = '<p style="color: var(--text-secondary); padding: 1rem;">目录为空</p>';
                return;
            }
            
            files.forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                
                const icon = file.type === 'directory' ? '📁' : '📄';
                const size = file.type === 'file' ? fileSystem.formatSize(file.size || 0) : '';
                const encrypted = file.encrypted ? ' [加密]' : '';
                
                fileItem.innerHTML = `
                    <div class="file-icon">${icon}</div>
                    <div class="file-name">${file.name}${encrypted}</div>
                    <div class="file-size">${size}</div>
                `;
                
                fileItem.addEventListener('click', function() {
                    if (file.type === 'directory') {
                        fileSystem.navigate(file.path);
                        renderFileList();
                    } else {
                        // 可以在这里实现文件查看功能
                        alert(`文件: ${file.name}\n路径: ${file.path}\n大小: ${size}`);
                    }
                });
                
                fileList.appendChild(fileItem);
            });
        }
        
        if (refreshBtn) {
            refreshBtn.addEventListener('click', renderFileList);
        }
        
        renderFileList();
    }
    
    // 初始化终端
    function initTerminal() {
        const terminalInput = document.getElementById('terminalInput');
        const terminalBody = document.getElementById('terminalBody');
        const clearBtn = document.getElementById('clearTerminal');
        
        if (!terminalInput || !terminalBody) return;
        
        function addTerminalLine(text, type = 'output') {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            
            const prompt = document.createElement('span');
            prompt.className = 'terminal-prompt';
            prompt.textContent = 'root@toab:~$';
            
            const content = document.createElement('span');
            content.className = `terminal-${type}`;
            content.textContent = text;
            
            line.appendChild(prompt);
            line.appendChild(content);
            terminalBody.appendChild(line);
            
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
        
        function executeCommand(command) {
            const parts = command.trim().split(' ');
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);
            
            switch (cmd) {
                case 'help':
                    addTerminalLine('可用命令:');
                    addTerminalLine('  help - 显示帮助信息');
                    addTerminalLine('  ls - 列出当前目录文件');
                    addTerminalLine('  cd <目录> - 切换目录');
                    addTerminalLine('  pwd - 显示当前路径');
                    addTerminalLine('  clear - 清空终端');
                    break;
                    
                case 'ls':
                    const files = fileSystem.getCurrentDirectory();
                    if (files.length === 0) {
                        addTerminalLine('目录为空', 'output');
                    } else {
                        files.forEach(file => {
                            const type = file.type === 'directory' ? 'DIR' : 'FILE';
                            const encrypted = file.encrypted ? ' [ENCRYPTED]' : '';
                            addTerminalLine(`${type.padEnd(4)} ${file.name}${encrypted}`, 'output');
                        });
                    }
                    break;
                    
                case 'cd':
                    if (args.length === 0) {
                        addTerminalLine('用法: cd <目录>', 'error');
                    } else {
                        const success = fileSystem.navigate(args[0]);
                        if (success) {
                            addTerminalLine(`已切换到: ${fileSystem.getCurrentPath()}`, 'success');
                        } else {
                            addTerminalLine(`错误: 无法切换到目录 "${args[0]}"`, 'error');
                        }
                    }
                    break;
                    
                case 'pwd':
                    addTerminalLine(fileSystem.getCurrentPath(), 'output');
                    break;
                    
                case 'clear':
                    terminalBody.innerHTML = '';
                    break;
                    
                case '':
                    // 空命令，不处理
                    break;
                    
                default:
                    addTerminalLine(`命令未找到: ${cmd}。输入 'help' 查看帮助。`, 'error');
            }
        }
        
        terminalInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const command = terminalInput.value;
                if (command.trim()) {
                    addTerminalLine(command, 'output');
                    executeCommand(command);
                    terminalInput.value = '';
                }
            }
        });
        
        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                terminalBody.innerHTML = '';
                addTerminalLine('欢迎使用 TOAB 终端系统', 'output');
            });
        }
    }
    
    // 初始化解密工具
    function initDecrypt() {
        const encryptedCode = document.getElementById('encryptedCode');
        const decryptedCode = document.getElementById('decryptedCode');
        const decryptBtn = document.getElementById('decryptBtn');
        const clearBtn = document.getElementById('clearDecrypt');
        
        if (!decryptBtn) return;
        
        decryptBtn.addEventListener('click', function() {
            const encrypted = encryptedCode.value.trim();
            if (!encrypted) {
                alert('请输入需要解密的代码');
                return;
            }
            
            const result = codeDecryptor.decrypt(encrypted);
            
            if (result.success) {
                decryptedCode.value = result.result;
                
                // 更新解密计数
                const progress = storage.getProgress();
                if (!progress.decryptedFiles.includes(encrypted)) {
                    progress.decryptedFiles.push(encrypted);
                    storage.saveProgress(progress);
                    
                    // 更新仪表板
                    const decryptCount = document.getElementById('decryptCount');
                    if (decryptCount) {
                        decryptCount.textContent = progress.decryptedFiles.length;
                    }
                }
            } else {
                alert(result.message);
            }
        });
        
        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                encryptedCode.value = '';
                decryptedCode.value = '';
            });
        }
    }
    
    // 初始化任务日志
    function initStory() {
        const storyTimeline = document.getElementById('storyTimeline');
        if (!storyTimeline) return;
        
        function renderStories() {
            const stories = storyManager.getAllStories();
            storyTimeline.innerHTML = '';
            
            stories.forEach(story => {
                const storyItem = document.createElement('div');
                storyItem.className = 'story-item';
                
                const completed = story.completed ? ' [已完成]' : ' [进行中]';
                const statusClass = story.completed ? 'success' : 'warning';
                
                storyItem.innerHTML = `
                    <h3>${story.title}${completed}</h3>
                    <p>${story.content}</p>
                    <div class="story-date">${storyManager.formatDate(story.date)}</div>
                `;
                
                storyTimeline.appendChild(storyItem);
            });
        }
        
        renderStories();
    }
});

