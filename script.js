// 未来考古局 - 主JavaScript文件

// 全局状态
let currentView = 'feed';
let currentRelicId = null;

// DOM元素缓存
let navButtons, views, relicsContainer, category1Select, category2Select, generateBtn,
    errorBox, errorText, previewSection, previewCard, loadingOverlay;

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    // 缓存DOM元素
    navButtons = document.querySelectorAll('.nav-btn');
    views = document.querySelectorAll('.view');
    relicsContainer = document.getElementById('relics-container');
    category1Select = document.getElementById('category1');
    category2Select = document.getElementById('category2');
    generateBtn = document.getElementById('generate-btn');
    errorBox = document.getElementById('error-box');
    errorText = document.getElementById('error-text');
    previewSection = document.getElementById('preview-section');
    previewCard = document.getElementById('preview-card');
    loadingOverlay = document.getElementById('loading');

    // 初始化事件监听器
    initEventListeners();

    // 初始化选择器
    populateCategorySelectors();

    // 渲染初始页面
    renderFeed();
});

// 初始化事件监听器
function initEventListeners() {
    // 导航按钮点击
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.dataset.view;
            switchView(view);
        });
    });

    // 生成按钮点击
    generateBtn.addEventListener('click', generateRelic);

    // 返回按钮事件委托
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('back-btn')) {
            e.preventDefault();
            switchView('feed');
        }

        // 提交遗物按钮
        if (e.target.classList.contains('submit-btn') || e.target.closest('.submit-btn')) {
            e.preventDefault();
            const relicData = window.generatedRelic;
            if (relicData) {
                mockRelics.unshift(relicData);
                switchView('feed');
                alert('提交成功！遗物已添加到档案库。');
            }
        }
    });
}

// 填充分类选择器
function populateCategorySelectors() {
    categories.forEach(category => {
        const option1 = document.createElement('option');
        option1.value = category;
        option1.textContent = category;
        category1Select.appendChild(option1.cloneNode(true));

        const option2 = option1.cloneNode(true);
        category2Select.appendChild(option2);
    });

    // 设置默认值
    category1Select.value = categories[0];
    category2Select.value = categories[1];
}

// 切换视图
function switchView(view) {
    // 更新当前视图
    currentView = view;

    // 更新导航按钮状态
    navButtons.forEach(button => {
        if (button.dataset.view === view) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // 显示/隐藏视图
    views.forEach(viewElement => {
        if (viewElement.id === `${view}-view`) {
            viewElement.classList.add('active');
        } else {
            viewElement.classList.remove('active');
        }
    });

    // 隐藏详情视图
    const detailView = document.getElementById('detail-view');
    if (view !== 'detail') {
        detailView.classList.remove('active');
    }

    // 执行特定视图的初始化
    switch (view) {
        case 'feed':
            renderFeed();
            break;
        case 'detail':
            if (currentRelicId) {
                renderRelicDetail(currentRelicId);
            }
            break;
        case 'generator':
            clearPreview();
            break;
    }
}

// 渲染Feed页面
function renderFeed() {
    relicsContainer.innerHTML = '';

    mockRelics.forEach(relic => {
        const card = createRelicCard(relic);
        relicsContainer.appendChild(card);
    });
}

// 创建遗物卡片
function createRelicCard(relic) {
    const card = document.createElement('div');
    card.className = 'relic-card';
    if (relic.isFeatured) {
        card.classList.add('featured');
    }

    const accentColor = sourceAccentColor[relic.source.type];
    const tagStyle = getTagStyle(relic.categories[0] || '');
    const sourceBadge = getSourceBadgeStyle(relic.source.type);

    card.innerHTML = `
        <div class="card-accent" style="background-color: ${accentColor}"></div>
        <div class="card-body">
            <div class="card-top-row">
                <div class="relic-name">${relic.name}</div>
                ${relic.isFeatured ?
                    '<div class="featured-badge">今日精选</div>' :
                    `<div class="relic-year">${relic.year}年</div>`
                }
            </div>
            <div class="relic-tagline">${relic.tagline}</div>
            <div class="card-bottom-row">
                <div class="category-container">
                    ${relic.categories.slice(0, 2).map(category => {
                        const style = getTagStyle(category);
                        return `<div class="category-pill" style="background-color: ${style.backgroundColor}; color: ${style.color}">${category}</div>`;
                    }).join('')}
                </div>
                <div class="source-badge" style="background-color: ${sourceBadge.backgroundColor}; color: ${sourceBadge.color}">
                    ${getSourceTypeChinese(relic.source.type)}
                </div>
            </div>
        </div>
    `;

    // 添加点击事件
    card.addEventListener('click', () => {
        currentRelicId = relic.id;
        switchView('detail');
    });

    return card;
}

// 渲染遗物详情
function renderRelicDetail(relicId) {
    const relic = mockRelics.find(r => r.id === relicId);
    if (!relic) return;

    const detailView = document.getElementById('detail-view');
    const sourceBadge = getSourceBadgeStyle(relic.source.type);

    detailView.innerHTML = `
        <div class="detail-container">
            <div class="detail-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                    返回遗物档案
                </button>
            </div>
            <div class="detail-content">
                <div class="era-row">
                    <div class="year-pill">${relic.year}年</div>
                    ${relic.realWorldEcho ? `
                        <div class="echo-indicator">
                            <div class="echo-dot"></div>
                            <div class="echo-text">已成真 · ${relic.realWorldEcho.verifiedYear}年原型</div>
                        </div>
                    ` : ''}
                </div>

                <div class="image-area">
                    <div class="image-placeholder"></div>
                    <div class="ai-label">AI · 已生成</div>
                </div>

                <div class="detail-relic-name">${relic.name}</div>
                <div class="detail-tagline">${relic.tagline}</div>

                <div class="detail-category-row">
                    ${relic.categories.map(category => {
                        const style = getTagStyle(category);
                        return `<div class="detail-category-pill" style="background-color: ${style.backgroundColor}; color: ${style.color}">${category}</div>`;
                    }).join('')}
                </div>

                <div class="divider"></div>

                <div class="usage-block">
                    <div class="usage-label">使用说明</div>
                    <div class="usage-body">${relic.usageInstructions}</div>
                </div>

                <div class="world-label">世界观背景</div>
                <div class="world-body">${relic.worldBackground}</div>

                <div class="divider"></div>

                <div class="source-block">
                    <div class="source-header">
                        <div class="source-type-badge" style="background-color: ${sourceBadge.backgroundColor}; color: ${sourceBadge.color}">
                            ${getSourceTypeChinese(relic.source.type)}
                        </div>
                        <div class="source-title">${relic.source.title}</div>
                        <div class="source-year">${relic.source.releaseYear}年</div>
                    </div>
                    <div class="source-body">
                        <div class="source-row">
                            <div class="source-key">${relic.source.type === 'film' ? '集名' : relic.source.type === 'novel' ? '章节' : '章节'}</div>
                            <div class="source-value">${relic.source.detail}</div>
                        </div>
                        <div class="source-row">
                            <div class="source-key">${relic.source.type === 'film' ? '导演' : '作者'}</div>
                            <div class="source-value">${relic.source.author}</div>
                        </div>
                        <div class="source-row">
                            <div class="source-key">出现方式</div>
                            <div class="source-value">${relic.source.appearance}</div>
                        </div>
                        ${relic.source.quote ? `<div class="quote">${relic.source.quote}</div>` : ''}
                    </div>
                </div>

                ${relic.realWorldEcho ? `
                    <div class="echo-banner">
                        <div class="echo-banner-dot"></div>
                        <div class="echo-banner-text">${relic.realWorldEcho.description}</div>
                    </div>
                ` : ''}

                <div class="submitter-row">
                    <div class="avatar">${relic.submittedBy.avatarInitial}</div>
                    <div class="submitter-info">
                        <div class="submitter-name">${relic.submittedBy.username}</div>
                        <div class="submitter-meta">
                            ${formatDate(relic.submittedBy.submittedAt)} · ${relic.submittedBy.universeTag}
                        </div>
                    </div>
                </div>

                <div class="action-row">
                    <button class="action-btn action-btn-primary">收藏遗物</button>
                    <button class="action-btn action-btn-outline">加入宇宙</button>
                    <button class="action-btn action-btn-outline">质疑档案</button>
                </div>

                <div class="stats-bar">
                    <div class="stat-item">
                        <div class="stat-number">${relic.stats.saves}</div>
                        <div class="stat-label">收藏</div>
                    </div>
                    <div class="stat-divider"></div>
                    <div class="stat-item">
                        <div class="stat-number">${relic.stats.comments}</div>
                        <div class="stat-label">讨论</div>
                    </div>
                    <div class="stat-divider"></div>
                    <div class="stat-item">
                        <div class="stat-number">${relic.stats.relatedRelics}</div>
                        <div class="stat-label">关联遗物</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 切换视图
    switchView('detail');
}

// 生成遗物
async function generateRelic() {
    const category1 = category1Select.value;
    const category2 = category2Select.value;

    // 验证API密钥
    const apiKey = window.EXPO_PUBLIC_CLAUDE_API_KEY;
    if (!apiKey) {
        showError('请设置 EXPO_PUBLIC_CLAUDE_API_KEY 环境变量');
        return;
    }

    // 显示加载指示器
    loadingOverlay.classList.remove('hidden');
    generateBtn.disabled = true;
    clearPreview();
    hideError();

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1000,
                system: '你是一个科幻世界档案员。只返回合法JSON，不要markdown代码块或任何前缀文字。',
                messages: [
                    {
                        role: 'user',
                        content: `根据以下分类生成一条遗物档案JSON，严格符合Relic interface结构，所有字段用中文填写，source.type设为original，year在2040到2200之间，id用随机字符串：分类：${category1} × ${category2}`,
                    },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(`API 请求失败: ${response.status}`);
        }

        const data = await response.json();
        const content = data.content[0].text;

        // 尝试解析 JSON
        let parsed;
        try {
            // 去除可能的 markdown 代码块
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content);
        } catch (e) {
            throw new Error('无法解析 AI 返回的 JSON');
        }

        // 验证必要字段
        if (!parsed.id || !parsed.name || !parsed.tagline) {
            throw new Error('返回的 JSON 缺少必要字段');
        }

        // 确保 source.type 为 original
        parsed.source = { ...parsed.source, type: 'original' };
        // 添加默认提交者信息和统计
        parsed.submittedBy = parsed.submittedBy || {
            userId: 'user-generator',
            username: 'AI 档案员',
            avatarInitial: 'AI',
            universeTag: '#AI生成',
            submittedAt: new Date().toISOString(),
        };
        parsed.stats = parsed.stats || {
            saves: 0,
            comments: 0,
            relatedRelics: 0,
        };

        // 存储生成的遗物
        window.generatedRelic = parsed;

        // 显示预览
        renderPreview(parsed);

    } catch (err) {
        showError(err.message || '未知错误');
    } finally {
        // 隐藏加载指示器
        loadingOverlay.classList.add('hidden');
        generateBtn.disabled = false;
    }
}

// 渲染预览
function renderPreview(relic) {
    const sourceBadge = getSourceBadgeStyle(relic.source.type);

    previewCard.innerHTML = `
        <div class="preview-header">
            <div class="preview-name">${relic.name}</div>
            <div class="preview-year">${relic.year}年</div>
        </div>
        <div class="preview-tagline">${relic.tagline}</div>
        <div class="preview-categories">
            ${relic.categories.slice(0, 3).map(category => {
                const style = getTagStyle(category);
                return `<div class="preview-category-pill" style="background-color: ${style.backgroundColor}; color: ${style.color}">${category}</div>`;
            }).join('')}
        </div>
        <div class="preview-source">来源: ${relic.source.title} (${relic.source.releaseYear})</div>
        <div class="preview-usage">${relic.usageInstructions}</div>
        <button class="submit-btn">提交遗物</button>
    `;

    previewSection.classList.remove('hidden');
}

// 清除预览
function clearPreview() {
    previewSection.classList.add('hidden');
    previewCard.innerHTML = '';
    delete window.generatedRelic;
}

// 显示错误
function showError(message) {
    errorText.textContent = message;
    errorBox.classList.remove('hidden');
}

// 隐藏错误
function hideError() {
    errorBox.classList.add('hidden');
}