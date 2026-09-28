# Resonance Archive / 共鸣档案

张铧心（Huaxin Zhang）的双语互动作品集，定位为 **游戏策划 × AI 产品**。访客可以直接阅读完整案例，也可以把五个真实项目当作五个音游关卡体验。

## 当前项目

1. **Pixel World** — 十 Agent 复核工作流与可玩 AI 游戏生成
2. **雨夜游戏厅** — 叙事游戏策划、本地玩家画像与匿名试玩分析
3. **I Wanna Be the Zomboy** — 七关卡、四 Boss 的硬核平台游戏策划
4. **Auto Tune** — X / Facebook / Instagram 浏览器自动化原型
5. **文献查阅辅助工具** — 翻译、高亮、笔记、导图与专注计时工作台

页面会根据浏览器语言自动选择中文或英文，右上角可以随时切换；选择会保存在浏览器本地。

## 本地运行

```bash
pnpm install
pnpm dev
```

打开 `http://localhost:3000`。主要入口：

- `/` 或 `/play/`：五关音游作品集
- `/explore/`：完整项目与个人经历

## 验证与构建

```bash
pnpm lint
pnpm test
pnpm build
```

项目使用 Next.js 静态导出。构建完成后，`out/` 中是无需 Node.js 服务器的完整站点。

## Upma 部署

将 `out/` 内的所有文件直接压缩，确保压缩包根目录能看到 `index.html` 与 `_next/`，再上传到 Upma。不要把外层 `out` 文件夹一起套入压缩包。

## GitHub / Vercel 部署

源代码可以直接上传 GitHub。Vercel 导入仓库后保持 Next.js 默认构建设置即可；构建命令为 `pnpm build`。

## 技术结构

- Next.js 15、React 19、TypeScript
- Phaser 3 音游场景与 Web Audio
- Zustand 界面状态
- GSAP 案例面板动画
- Vitest 数据与节奏逻辑测试
- 纯静态输出，无运行时 CMS、数据库或服务器 API

## 音乐说明

五个关卡使用五个不同版本的 *Csikós Post* 录音。作品本身属于公版曲目，但具体录音和编曲仍可能存在版权；公开推广或商业部署前，请替换为自录或已获授权音源。
