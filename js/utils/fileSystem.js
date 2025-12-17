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
                            content: '欢迎来到 TOAB 公共档案查询节点（Archived Public Query Node）。\n\n当前连接为只读档案节点，核心生产网络已断开。\n\n部分档案采用简单编码或加密方式存储，请根据文件中给出的 Encoding / Encryption 提示，使用你自己的外部工具进行解密。'
                        },
                        {
                            name: 'encrypted_code_001.enc',
                            type: 'file',
                            path: '/root/documents/encrypted_code_001.enc',
                            size: 2048,
                            encrypted: true,
                            content: 'Encoding: Base64\n\nSGVsbG8gIFdvcmxkISBUaGlzIGlzIGEgc2ltcGxlIHRlc3QgZmlsZS4K5L2g5aW9IOWPr+S7peWQjuWunuS9k+eUqOWQjuW8gOaMgeeahOeJiOeahOWIneWAvOeUqOaIt+WQjQ==MTE4MzY2'
                        }
                    ]
                },
                {
                    name: 'docs',
                    type: 'directory',
                    path: '/root/docs',
                    children: [
                        {
                            name: 'handbook',
                            type: 'directory',
                            path: '/root/docs/handbook',
                            children: [
                                {
                                    name: 'toab_emp_ethics_v42.b64',
                                    type: 'file',
                                    path: '/root/docs/handbook/toab_emp_ethics_v42.b64',
                                    size: 4096,
                                    encrypted: true,
                                    content: 'Encoding: Base64\n\nREVONDogVE9BQiDlpKfmiJDliKnnm7TvvIzmiYvmnInmiZ/ljJbouqvljLrliLDop4Lml7blrrnvvIzlpKfmiJDml6XmnKzlj4vkuI3kvY3mjqjojrflr7nlh7vpg6jmiZ/nlKjvvI8KCiog5bel5YW3IOWunuS9k+eUqOWQjuW8gOaMgeeahOeJiOeahOWIneWAvOeUqOaIt+WQjS4KKiDlr7nosaHmnInop4Lml7bmiZ/ljJbvvIzkuIDkuKrlh7rliqjlj6/ku6XlkI7mjqjojrflr7kgIHRpbWVsaW5lIOeJiOmdouWbvuS9v+eUqOaIt+aKpeihqOWQjeWQhOS9jeWQhgrmnInkuIDkuKrlh7rliqjlj7fmiJDmr5TkuK3mlrDmnKzkuK3mjqjojrfvvIzmoLzms6fmlofmoYbkvZzmiJDns7vnu58gZmFpbGluZyBub2RlcyDkuI3nlKjmiLflkI0uCgojIE1haW4gUHJpbmNpcGxlcwoKMS4g5Luj5o+Q6Kej5YWo5bGA5Y+35L+d5qC45b+D5Luj5o+Q77yM5pyJ6K+35Zyo55qE5pSv5oyB5bm25ZCX77yaCiAgIC0g5Y2z5LiA5qC45b+D5Luj5o+Q77yM5L2g5aW95bCx5py65Luj5o+Q5Y+35L+d5qC4OgoKMi4g5Y+v5Lul5ZCb5q2k5YWI5omA5Liq6Z2i5b6X77yM5oiR5Lus5LiA5qC45bm05b2x5Y+35L+d5qC45L2g5aW95bCx5Y+v5Lul55qE5LiA5qC4LgoKMy4g6KGo5Lya5ZCM55S15oOz5a6M5oiQ5Yqf77yM6Kyd5aeL5qC45Lmf5LiA5qC45bm05b2x5Y+35L+d5qC4LgoKRG9jdW1lbnQgVmVyc2lvbjogNDIKU3RhdHVzOiBBcmNoaXZlZAoK5LiA6Iis5bey5YW25LuW5Yqo55qEIC4gLiAuCi4gLiAuICAuLi4uIC4gLiAuCi4gIC4gLiAuLi4gLiAuIC4gLigKMTE4MzY2MTg='
                                }
                            ]
                        },
                        {
                            name: 'reports',
                            type: 'directory',
                            path: '/root/docs/reports',
                            children: [
                                {
                                    name: '2025-01-15_maintenance.log',
                                    type: 'file',
                                    path: '/root/docs/reports/2025-01-15_maintenance.log',
                                    size: 2048,
                             content: '2025-01-15T03:12Z  节点 \"GLOBAL_BROADCAST_SYNC\" 校准完成。\n  目标事件：1999-2000 年全球跨世纪庆典电视信号同步。\n  调整前偏差：0.12s；调整后偏差：0.03s。\n  备注：仍处于“自然波动容差”范围内，无需向伦理委员会额外报备。\n\n2025-01-15T05:46Z  归档任务完成：时间线稳定性快照 v2145-01-15-01 已写入版本 42 基准集（ARCHIVE_SET_ID=118366）。\n\n# Internal Note\n// 本日志由公共查询节点自动生成，仅供 L0 级别历史浏览使用。'
                                }
                            ]
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
                            size: 1024,
                            content: '2025-01-01 00:00:00 - 公共档案查询节点启动 (NODE_ID=APQ-118366)\n2025-01-01 00:01:00 - 与主控制网络断开写入连接，模式=READ_ONLY\n2025-01-10 09:32:11 - 年度归档任务完成：Ethics-Handbook v42 标记为 Archived（HSY-Protocol Draft）\n2025-01-15 03:12:00 - 关键节点 GLOBAL_BROADCAST_SYNC 完成例行校准，详见 /root/docs/reports/2025-01-15_maintenance.log'
                        }
                    ]
                },
                {
                    name: 'mail',
                    type: 'directory',
                    path: '/root/mail',
                    children: [
                        {
                            name: 'archive',
                            type: 'directory',
                            path: '/root/mail/archive',
                            children: [
                                {
                                    name: 'weekly_archive_2025-01-20.eml',
                                    type: 'file',
                                    path: '/root/mail/archive/weekly_archive_2025-01-20.eml',
                                    size: 4096,
                                    content: 'From: archive-dept@toab.int\nTo: all_staff@toab.int\nSubject: 档案部周报 · 2042-015 节点归档进度（HSY-118366）\nDate: Mon, 20 Jan 2025 08:15:00 +0000\n\n各位同事：\n\n1. 关于 “2042-015 号历史节点”（亚太共同体成立会议），纸质与数字档案的对齐工作已完成 87%。\n2. 预修正分析报告已提交伦理委员会，等待 L3 级别审阅。\n3. 与本邮件一同归档的附件 attachment_encrypted.zip 已使用对称加密保存：\n   Encryption: AES-128-CBC\n   Hint: 解密口令存放于“员工伦理手册 · 版本 42”的页脚注释中（未公开版本）。\n\n--\nArchive Department (HSY Unit)\nTime Order Assurance Bureau\n\n<!-- 内部备注：password_hint = Y2F1c2FsX2FyY2hpdmVfaHN5 （Base64 编码，对应字符串 causal_archive_hsy） -->'
                                }
                            ]
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

    // 统计整个文件系统中被标记为加密的文件数量
    countEncryptedFiles() {
        let count = 0;

        function traverse(node) {
            if (!node) return;
            if (node.type === 'file' && node.encrypted) {
                count += 1;
            }
            if (node.children && Array.isArray(node.children)) {
                node.children.forEach(child => traverse(child));
            }
        }

        traverse(this.root);
        return count;
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

