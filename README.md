# 学术个人主页模版（GitHub Pages）

简洁的计算机/AI 科研方向个人主页，**不含个人照片**，适合硕士生展示论文、研究方向与联系方式。

设计参考了 [letianhuang.github.io](https://letianhuang.github.io)、[larrrry1412.github.io](https://larrrry1412.github.io) 等常见学术主页风格（无个人照片）。

## 功能

- About、Research、Education、Publications、News、Contact
- 论文列表由 `assets/data/publications.js` 驱动，支持 PDF / arXiv / Code 等链接
- 一键展开 / 复制 BibTeX
- 深色模式
- 响应式布局，打印友好

## 本地预览

```bash
cd "/Users/njfan/Desktop/my website"
python3 -m http.server 8080
```

浏览器打开 http://localhost:8080

## 部署到 GitHub Pages

### 方式 A：用户主页（`username.github.io`）

1. 在 GitHub 新建仓库，命名为 **`你的用户名.github.io`**
2. 将本目录所有文件推送到该仓库的 `main` 分支
3. 打开仓库 **Settings → Pages**，Source 选 **Deploy from a branch**，Branch 选 `main` / `/ (root)`
4. 等待几分钟后访问 `https://你的用户名.github.io`

### 方式 B：项目主页（`username.github.io/项目名`）

1. 新建任意仓库，将文件推送到 `main`
2. Settings → Pages → Branch 选 `main`，文件夹选 `/ (root)`
3. 若站点在子路径下，需在 `index.html` 里为 CSS/JS 路径加上仓库名前缀（或改用用户主页仓库）

## 如何修改内容

| 修改项 | 文件 |
|--------|------|
| 姓名、简介、链接、新闻、教育经历 | `index.html` |
| 论文列表、你的名字（高亮用） | `assets/data/publications.js` |
| 颜色、字体、排版 | `assets/css/style.css` |
| CV 下载 | 将 PDF 放到 `assets/cv.pdf` |

### 添加一篇论文

编辑 `assets/data/publications.js`，在 `PUBLICATIONS` 数组中追加对象，例如：

```javascript
{
  title: "Your Paper Title",
  authors: ["Your Name", "Coauthor"],
  venue: "CVPR",
  year: 2025,
  highlight: true,
  links: { pdf: "#", arxiv: "https://arxiv.org/abs/xxxx" },
  bibtex: `@inproceedings{...}`
}
```

将 `SITE_CONFIG.authorMe` 设为你在作者列表中的写法，主页会自动高亮你的名字。

## 文件结构

```
.
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── data/publications.js
│   └── cv.pdf          ← 自行添加
└── README.md
```

## 许可

模版可自由修改使用。若 fork 自他人项目，请保留相应署名。
