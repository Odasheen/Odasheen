// 任务日志管理器
class StoryManager {
    constructor() {
        this.stories = [
            {
                id: 1,
                title: '系统初始化',
                content: 'TOAB 系统已成功启动。欢迎来到目标操作分析基地。',
                date: new Date().toISOString(),
                completed: true
            },
            {
                id: 2,
                title: '文件系统访问',
                content: '你已获得文件系统访问权限。开始探索系统中的文件吧。',
                date: new Date().toISOString(),
                completed: false
            },
            {
                id: 3,
                title: '解密任务 #001',
                content: '在 documents 目录中发现加密文件 encrypted_code_001.enc，需要解密。',
                date: new Date().toISOString(),
                completed: false
            }
        ];
    }
    
    // 获取所有任务
    getAllStories() {
        return this.stories;
    }
    
    // 获取未完成的任务
    getPendingStories() {
        return this.stories.filter(story => !story.completed);
    }
    
    // 获取已完成的任务
    getCompletedStories() {
        return this.stories.filter(story => story.completed);
    }
    
    // 标记任务为完成
    completeStory(id) {
        const story = this.stories.find(s => s.id === id);
        if (story) {
            story.completed = true;
            story.completedDate = new Date().toISOString();
            return true;
        }
        return false;
    }
    
    // 添加新任务
    addStory(title, content) {
        const newStory = {
            id: this.stories.length + 1,
            title: title,
            content: content,
            date: new Date().toISOString(),
            completed: false
        };
        this.stories.push(newStory);
        return newStory;
    }
    
    // 格式化日期
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// 导出单例
const storyManager = new StoryManager();

