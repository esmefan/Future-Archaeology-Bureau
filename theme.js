// 未来考古局 - 主题工具函数

// 颜色定义
const colors = {
    purple: { 50: '#EEEDFE', 400: '#7F77DD', 600: '#534AB7', 800: '#3C3489' },
    teal: { 50: '#E1F5EE', 400: '#1D9E75', 600: '#0F6E56' },
    coral: { 50: '#FAECE7', 600: '#993C1D' },
    blue: { 50: '#E6F1FB', 600: '#185FA5' },
    green: { 50: '#EAF3DE', 600: '#3B6D11' },
    amber: { 50: '#FAEEDA', 600: '#854F0B' },
    gray: { 50: '#F1EFE8', 100: '#D3D1C7', 400: '#888780', 600: '#5F5E5A' },
};

// 源类型颜色
const sourceAccentColor = {
    film: colors.coral[600],
    novel: colors.blue[600],
    game: colors.green[600],
    original: colors.purple[600],
};

// 源类型徽章样式
const sourceBadgeStyle = {
    film: { backgroundColor: colors.coral[50], color: colors.coral[600] },
    novel: { backgroundColor: colors.blue[50], color: colors.blue[600] },
    game: { backgroundColor: colors.green[50], color: colors.green[600] },
    original: { backgroundColor: colors.purple[50], color: colors.purple[600] },
};

// 类别颜色映射
const categoryColorMap = {
    '赛博朋克': 'purple',
    '反乌托邦': 'coral',
    '时空悖论': 'teal',
    '多重宇宙': 'blue',
    '仿生人伦理': 'green',
    '人工智能觉醒': 'amber',
    '宇宙殖民': 'purple',
    '虫洞穿越': 'teal',
    '太空歌剧': 'blue',
    '量子意识': 'green',
    '记忆植入': 'amber',
    '末日科幻': 'coral',
    '外星文明等级': 'purple',
    '宇宙灾难': 'teal',
    '时间循环': 'blue',
    '脑机接口': 'green',
    '数字飞升': 'amber',
    '机械崛起': 'coral',
    '硬科幻': 'purple',
    '软科幻': 'teal',
};

// 获取标签样式
function getTagStyle(category) {
    const colorKey = categoryColorMap[category] || 'gray';
    const palette = colors[colorKey];
    return {
        backgroundColor: palette[50],
        color: palette[600],
    };
}

// 获取源类型徽章样式
function getSourceBadgeStyle(sourceType) {
    return sourceBadgeStyle[sourceType] || sourceBadgeStyle.original;
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// 获取源类型中文名称
function getSourceTypeChinese(type) {
    const map = {
        film: '电影',
        novel: '小说',
        game: '游戏',
        original: '原创',
    };
    return map[type] || '未知';
}

// 生成随机ID
function generateRandomId() {
    return 'relic-' + Math.random().toString(36).substr(2, 9);
}