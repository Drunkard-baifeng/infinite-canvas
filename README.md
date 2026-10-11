<p align="center">
  <img src="web/public/logo.svg" width="96" alt="infinite-canvas logo">
</p>

<h1 align="center">极速画布</h1>

## 关于本分支

这是由 [Drunkard-baifeng](https://github.com/Drunkard-baifeng) 个人维护的分支，基于 [basketikun/infinite-canvas](https://github.com/basketikun/infinite-canvas) 开发。

本分支会持续同步上游更新，并在此基础上加入个人需要的功能和调整。项目的完整介绍、使用文档和最新上游动态，请前往[原仓库](https://github.com/basketikun/infinite-canvas)查看。

本分支维护者联系方式：**QQ 1591446524**。

## 项目简介

极速画布是一款面向图片创作的开源工作台，将画布编排、AI 图片生成、参考图编辑、对话助手、提示词库和素材管理整合在同一个界面中。

主要功能：

- 无限画布与多种内容节点
- AI 图片、视频、音频和文本生成
- 参考图编辑与画布助手
- 本地素材、提示词和生成记录管理
- OpenAI 兼容接口与自定义调用脚本
- Canvas Agent 与插件扩展

> 项目仍处于开发阶段，本分支与上游均可能调整功能和本地数据结构。画布、素材、API Key 等数据主要保存在浏览器本地，请自行做好备份。

## 快速开始

### 本地开发

```bash
git clone -b main https://github.com/Drunkard-baifeng/infinite-canvas.git
cd infinite-canvas/web
bun install
bun run dev
```

启动后访问 `http://localhost:3000`，在侧边菜单的配置中填写 OpenAI 兼容接口的 `Base URL` 和 `API Key`。

### Docker 运行

```bash
git clone -b main https://github.com/Drunkard-baifeng/infinite-canvas.git
cd infinite-canvas
docker compose up -d
```

## 文档

- [1Panel 部署与 GitHub 自动构建](docs/content/docs/overview/docker.zh-CN.mdx)

- [快速开始](docs/content/docs/overview/quick-start.mdx)
- [功能介绍](docs/content/docs/overview/features.mdx)
- [画布节点操作手册](docs/content/docs/canvas/canvas-node-manual.mdx)
- [画布快捷键](docs/content/docs/canvas/canvas-shortcuts.mdx)
- [待办事项](docs/content/docs/progress/todo.mdx)
- [原仓库](https://github.com/basketikun/infinite-canvas)

## 上游同步

本分支会根据实际情况同步 `basketikun/infinite-canvas` 的更新。个人调整与上游内容可能存在差异，具体以本仓库提交记录为准。

## 开源协议

本项目沿用上游的 [MIT License](LICENSE)。
