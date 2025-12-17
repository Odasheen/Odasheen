// 任务日志管理器
class StoryManager {
    constructor() {
        this.stories = [
            {
                id: 1,
                title: '系统接入：公共档案查询节点',
                content: '你通过一个过期的 TOAB 子域名接入了“公共信息查询节点”。当前连接为只读档案节点，核心生产网络已断开。系统自称：Archived Public Query Node (READ_ONLY, L0)。',
                date: new Date().toISOString(),
                completed: true
            },
            {
                id: 2,
                title: '初始任务：浏览文件系统',
                content: '你已获得文件系统的只读访问权限。建议先查看 /root/documents/readme.txt，了解该节点的用途和限制，然后再进入 /root/docs 目录查看正式档案。',
                date: new Date().toISOString(),
                completed: false
            },
            {
                id: 3,
                title: '外部解密任务 #001：《新员工伦理手册》',
                content: '在 /root/docs/handbook 目录下存放着《TOAB 新员工伦理手册》归档版本（toab_emp_ethics_v42.b64）。文件开头已注明 Encoding: Base64，请将其内容复制到任意在线 Base64 解码工具中，解析出明文后再阅读。',
                date: new Date().toISOString(),
                completed: false
            },
            {
                id: 4,
                title: '附加任务：2025-01-15 例行维护报告',
                content: '在 /root/docs/reports 目录中可以找到 2025-01-15_maintenance.log。报告描述了对“1999-2000 年全球跨世纪庆典”电视信号同步的微调过程，看起来只是技术性维护，但你总觉得这种对历史细节的修正值得多留意一下。',
                date: new Date().toISOString(),
                completed: false
            },
            {
                id: 5,
                title: '补充线索：档案部周报与加密附件',
                content: '在 /root/mail/archive/weekly_archive_2025-01-20.eml 中，档案部提到了 “2042-015 号历史节点” 以及一个使用 AES-128-CBC 加密的附件 attachment_encrypted.zip。邮件正文和隐藏注释给出了若干密码线索，但真正的解密工作要等你掌握更多信息之后再进行。',
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

