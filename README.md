# 未来考古局 - Web版

这是一个使用纯HTML/CSS/JavaScript重写的"未来考古局"应用，可以在浏览器中直接运行。

## 🚀 快速开始

### 方法1：直接打开HTML文件
1. 双击 `index.html` 文件
2. 浏览器会自动打开应用

### 方法2：使用本地服务器（推荐）
```bash
# 使用Python的简单HTTP服务器
python -m http.server 8000

# 或者使用Node.js的http-server
npx http-server
```

然后在浏览器中访问：http://localhost:8000

## 📱 功能特性

### ✅ 已完成的功能
1. **遗物档案浏览**
   - 展示5个模拟的科幻遗物
   - 卡片设计符合React Native版本规范
   - 特色遗物标记为"今日精选"

2. **遗物详情查看**
   - 完整的遗物信息展示
   - 使用说明、世界观背景、来源信息
   - 提交者信息和统计数据

3. **遗物生成器**
   - 双分类选择器
   - Claude AI API集成
   - 实时预览生成的遗物

4. **响应式设计**
   - 适配桌面和移动设备
   - 使用CSS Grid和Flexbox布局

### ⚙️ 技术架构
- **HTML5**: 语义化标记
- **CSS3**: 自定义属性、Grid布局、Flexbox
- **JavaScript (ES6)**: 模块化代码、异步API调用
- **无框架**: 不依赖React/Vue等框架

## 🔧 配置说明

### AI生成功能配置
要使用AI生成遗物功能，需要配置Claude API密钥：

1. 获取Claude API密钥（需要注册）
2. 在浏览器中打开应用后，按F12打开开发者工具
3. 在Console中设置API密钥：
   ```javascript
   window.EXPO_PUBLIC_CLAUDE_API_KEY = '你的_api_密钥';
   ```
4. 刷新页面即可使用生成功能

### 离线使用
如果没有API密钥，应用仍然可以：
- 浏览现有的5个模拟遗物
- 查看遗物详情
- 体验界面和交互

## 📁 文件结构
```
web/
├── index.html          # 主HTML文件
├── style.css          # 所有样式
├── script.js          # 主JavaScript逻辑
├── data.js            # 模拟数据和配置
├── theme.js           # 主题工具函数
└── README.md          # 本文件
```

## 🎨 设计规范
应用严格遵循React Native版本的视觉规范：
- **颜色**: 使用相同的紫色、青色、珊瑚色等调色板
- **间距**: 4px、8px、12px、16px、20px、24px的间距系统
- **排版**: 使用Google Fonts的"Noto Sans SC"字体
- **组件**: 卡片、徽章、按钮等组件样式一致

## 🌐 浏览器兼容性
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

## 🐛 故障排除

### 1. CORS错误
如果AI生成功能出现CORS错误，可以：
- 使用浏览器插件禁用CORS（仅开发环境）
- 部署到服务器上使用

### 2. 样式问题
如果样式显示不正常：
- 检查是否开启了CSS
- 检查网络连接，确保Google Fonts能加载

### 3. JavaScript错误
如果功能不工作：
- 检查浏览器Console中的错误信息
- 确保所有JS文件都正确加载

## 📱 移动设备支持
应用已针对移动设备优化：
- 触摸友好的按钮和交互
- 适配小屏幕的布局
- 响应式字体大小

## 🔄 与React Native版本对比

| 特性 | React Native版 | Web版 |
|------|---------------|-------|
| 平台 | iOS/Android | 浏览器 |
| 技术栈 | React Native/TypeScript | HTML/CSS/JS |
| 依赖 | Node.js/Expo | 无 |
| 运行 | 需要开发环境 | 直接打开 |
| AI生成 | 支持 | 支持 |
| 数据 | 本地模拟 | 本地模拟 |
| 导航 | React Navigation | 自定义路由 |

## 📄 许可证
本项目仅供学习和演示使用。

## 🤝 贡献
欢迎提交Issue和Pull Request来改进这个项目！