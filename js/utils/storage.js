// 本地存储工具类
class StorageManager {
    constructor() {
        this.prefix = 'toab_';
    }
    
    // 保存数据
    set(key, value) {
        try {
            const data = JSON.stringify(value);
            localStorage.setItem(this.prefix + key, data);
            return true;
        } catch (e) {
            console.error('Storage save error:', e);
            return false;
        }
    }
    
    // 获取数据
    get(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(this.prefix + key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('Storage get error:', e);
            return defaultValue;
        }
    }
    
    // 删除数据
    remove(key) {
        try {
            localStorage.removeItem(this.prefix + key);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    }
    
    // 清空所有 TOAB 相关数据
    clear() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (e) {
            console.error('Storage clear error:', e);
            return false;
        }
    }
    
    // 获取用户信息
    getUser() {
        return localStorage.getItem('toab_user') || 'Guest';
    }
    
    // 保存游戏进度
    saveProgress(progress) {
        return this.set('progress', progress);
    }
    
    // 获取游戏进度
    getProgress() {
        return this.get('progress', {
            level: 1,
            decryptedFiles: [],
            completedTasks: [],
            unlockedSections: ['dashboard', 'files', 'terminal', 'decrypt']
        });
    }
}

// 导出单例
const storage = new StorageManager();

