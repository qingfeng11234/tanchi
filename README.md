# 网页端单机炸金花

一个纯前端（HTML/CSS/JS）的 3 人单机炸金花小游戏。

## 本地运行（自己玩）

### 方式 1：直接双击（最简单）
> 适合不会写命令的同学。

1. 打开你保存项目的文件夹（里面要能看到 `index.html`）。
2. 找到 `index.html` 文件。
3. 鼠标**双击** `index.html`。
4. 系统会自动用默认浏览器打开游戏页面。

如果双击没反应：
- **Windows**：右键 `index.html` → `打开方式` → 选 Chrome / Edge。
- **macOS**：右键 `index.html` → `打开方式` → 选 Safari / Chrome。
- **Linux(Ubuntu)**：右键 `index.html` → `打开方式` → 选 Firefox / Chrome。

你也可以用命令直接打开（可选）：
```bash
# Linux
xdg-open index.html

# macOS
open index.html

# Windows PowerShell
start index.html
```


### 找不到项目文件夹怎么办（重点）
如果你不知道项目在哪，先在终端执行：
```bash
find ~ -type f -name "index.html" 2>/dev/null
```

如果结果很多（你这种情况很常见），再执行下面命令，只筛出“页面里包含"炸金花"文字”的文件：
```bash
find ~ -type f -name "index.html" 2>/dev/null | while read -r f; do
  if grep -q "炸金花" "$f"; then
    echo "$f"
  fi
done
```

然后从筛选结果里选你的项目路径，例如：
`/home/你的用户名/snake-game/index.html`

拿到路径后这样进入项目目录：
```bash
cd /home/你的用户名/snake-game
pwd
ls
```

看到 `index.html`，并且运行 `grep -n "炸金花" index.html` 有输出，就说明找对了。

### 方式 2：本地服务（更稳）
```bash
cd /你的项目目录/tanchi
python3 -m http.server 8000
```
然后访问：`http://127.0.0.1:8000/index.html`

---

## 给别人“点链接就能玩”

你要的是**公网链接**。这个项目是静态网页，最推荐这 2 种免费方式：

### 方案 A：GitHub Pages（长期稳定）
1. 把项目上传到 GitHub 仓库（至少包含 `index.html`）。
2. 进入仓库：`Settings` → `Pages`。
3. `Build and deployment` 里选择：
   - Source: `Deploy from a branch`
   - Branch: `main` / `(root)`
4. 保存后等待 1~3 分钟。
5. 会得到一个可分享链接：
   - `https://你的用户名.github.io/你的仓库名/`

### 方案 B：Netlify Drop（最快）
1. 打开 https://app.netlify.com/drop
2. 把整个项目文件夹拖进去。
3. 几秒后自动得到公网链接（可直接分享）。

> 说明：我可以帮你把代码和部署配置都准备好，但最终“生成你自己的公网链接”需要你登录自己的 GitHub/Netlify 账号执行发布。

---

## 当前版本功能

- 固定 3 人：你 + 2 个 AI
- 牌桌风格 UI，支持移动端自适应
- 回合提示清晰（当前行动方、你需跟注金额）
- 虚拟货币系统（不涉及真钱）
- 你的金币可手动设置
- 支持随时给自己添加金币
- 默认规则：底注、跟注、加注、弃牌、看牌、比牌

## 说明

本项目仅用于娱乐和学习，不涉及真钱交易。
