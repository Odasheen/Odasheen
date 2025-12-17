// 文件系统模拟
class FileSystem {
    constructor() {
        this.root = {
            name: 'root',
            type: 'directory',
            path: '/root',
            children: [
                {
                    name: 'documents',
                    type: 'directory',
                    path: '/root/documents',
                    children: [
                        {
                            name: 'readme.txt',
                            type: 'file',
                            path: '/root/documents/readme.txt',
                            size: 1024,
                            content: '欢迎来到 TOAB 系统。\n\n这是一个模拟的文件系统。\n\n开始你的解密之旅吧！'
                        },
                        {
                            name: 'encrypted_code_001.enc',
                            type: 'file',
                            path: '/root/documents/encrypted_code_001.enc',
                            size: 2048,
                            encrypted: true,
                            content: 'SGVsbG8gV29ybGQhIFRoaXMgaXMgZW5jcnlwdGVkIGNvZGUu'
                        }
                    ]
                },
                {
                    name: 'logs',
                    type: 'directory',
                    path: '/root/logs',
                    children: [
                        {
                            name: 'system.log',
                            type: 'file',
                            path: '/root/logs/system.log',
                            size: 512,
                            content: '2025-01-01 00:00:00 - 系统启动\n2025-01-01 00:01:00 - 初始化完成'
                        }
                    ]
                },
                {
                    name: 'data',
                    type: 'directory',
                    path: '/root/data',
                    children: []
                }
            ]
        };
        this.currentPath = '/root';
    }
    
    // 获取当前路径
    getCurrentPath() {
        return this.currentPath;
    }
    
    // 设置当前路径
    setCurrentPath(path) {
        this.currentPath = path;
    }
    
    // 根据路径获取节点
    getNodeByPath(path) {
        const parts = path.split('/').filter(p => p);
        let current = this.root;
        
        for (const part of parts) {
            if (current.type !== 'directory' || !current.children) {
                return null;
            }
            const found = current.children.find(child => child.name === part);
            if (!found) {
                return null;
            }
            current = found;
        }
        
        return current;
    }
    
    // 获取当前目录的文件列表
    getCurrentDirectory() {
        const node = this.getNodeByPath(this.currentPath);
        if (!node || node.type !== 'directory') {
            return [];
        }
        return node.children || [];
    }
    
    // 格式化文件大小
    formatSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
    
    // 获取文件内容
    getFileContent(path) {
        const node = this.getNodeByPath(path);
        if (!node || node.type !== 'file') {
            return null;
        }
        return node.content || '';
    }
    
    // 检查文件是否加密
    isFileEncrypted(path) {
        const node = this.getNodeByPath(path);
        return node && node.encrypted === true;
    }
    
    // 导航到指定路径
    navigate(path) {
        if (path.startsWith('/')) {
            // 绝对路径
            const node = this.getNodeByPath(path);
            if (node && node.type === 'directory') {
                this.currentPath = path;
                return true;
            }
        } else {
            // 相对路径
            if (path === '..') {
                // 返回上一级
                const parts = this.currentPath.split('/').filter(p => p);
                if (parts.length > 1) {
                    parts.pop();
                    this.currentPath = '/' + parts.join('/');
                    return true;
                }
            } else {
                // 进入子目录
                const newPath = this.currentPath === '/root' 
                    ? `/root/${path}` 
                    : `${this.currentPath}/${path}`;
                const node = this.getNodeByPath(newPath);
                if (node && node.type === 'directory') {
                    this.currentPath = newPath;
                    return true;
                }
            }
        }
        return false;
    }
}

// 导出单例
const fileSystem = new FileSystem();

