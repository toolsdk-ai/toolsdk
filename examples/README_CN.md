# ToolSDK Examples

ToolSDK Examples 演示了如何使用 ToolSDK.ai 创建 AI 智能体，该智能体能够：

1. **搜索最新 AI 新闻** - 使用 Tavily 搜索引擎获取实时信息
2. **发送邮件通知** - 通过 Resend 服务发送整理后的内容
3. **多工具协作** - 展示了搜索工具、邮件工具和 AI 模型之间的协调工作

## 示例说明

两个示例文件夹展示了在相同业务场景下使用不同第三方 SDK 的实现方式：

### 📁 examples/openai

使用 **OpenAI SDK** 的实现示例：

- 直接集成 OpenAI API
- 手动管理工具调用流程
- 更精细的控制和自定义能力
- 适合需要深度定制的场景

### 📁 examples/ai-sdk

使用 **Vercel AI SDK** 的实现示例：

- 简化的工具集成方式
- 自动处理工具调用
- 内置流式响应支持
- 更好的 TypeScript 类型安全

## 快速开始

### 1. 环境配置

复制环境变量模板文件并填入必要的 API 密钥：

```bash
cp .env.example .env
```

需要配置以下 API 密钥：

```env
# ToolSDK.ai API Key
TOOLSDK_AI_API_KEY=your_toolsdk_api_key_here

# OpenAI API
OPENAI_API_KEY=your_openai_api_key_here

# Tavily API Key (用于网络搜索)
TAVILY_API_KEY=your_tavily_api_key_here

# Resend API Key (用于邮件发送)
RESEND_API_KEY=your_resend_api_key_here
```

### 2. 安装依赖

选择你想运行的示例，进入对应目录：

```bash
# OpenAI SDK 示例
cd openai
npm install

# 或者 Vercel AI SDK 示例
cd ai-sdk
npm install
```

### 3. 运行示例

```bash
npm run start
```

## 代码工作流程

无论使用哪种 SDK，整体工作流程都是一致的：

1. **初始化客户端** - 创建 ToolSDK 和 AI 模型客户端实例
2. **加载工具** - 加载搜索和邮件发送工具包
3. **第一次调用** - AI 模型决定使用搜索工具获取 AI 新闻
4. **执行搜索** - 调用 Tavily 搜索引擎获取最新新闻
5. **第二次调用** - AI 模型基于搜索结果决定发送邮件
6. **发送邮件** - 使用 Resend 服务发送整理后的新闻内容
7. **生成总结** - AI 模型生成最终执行摘要

## 自定义配置

你可以修改代码中的以下变量来自定义行为：

```javascript
const senderEmail = "noreply@a.com";      // 发件人邮箱
const recipientEmail = "kelvin@b.com";    // 收件人邮箱
```

## 使用的工具包

- **搜索工具**: `@toolsdk.ai/tavily-mcp` - 用于网络信息搜索
- **邮件工具**: `@toolsdk.ai/mcp-send-email` - 用于邮件发送
- **AI 模型**: 使用 OpenAI 的 GPT-4.1 模型协调工具调用和生成内容
