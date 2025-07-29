# ToolSDK Examples

ToolSDK Examples demonstrates how to use ToolSDK.ai to create AI agents that can:

1. **Search for Latest AI News** - Use Tavily search engine to get real-time information
2. **Send Email Notifications** - Send organized content via Resend service
3. **Multi-tool Collaboration** - Showcase coordination between search tools, email tools, and AI models

## Example Overview

The examples folder contains two example sub-folders, demonstrating different third-party SDK implementations for the same business scenario:

### 📁 examples/openai

Implementation example using **OpenAI SDK**:

- Direct OpenAI API integration
- Manual tool call flow management
- Fine-grained control and customization capabilities
- Suitable for scenarios requiring deep customization

### 📁 examples/ai-sdk

Implementation example using **Vercel AI SDK**:

- Simplified tool integration approach
- Automatic tool call handling
- Built-in streaming response support
- Better TypeScript type safety

## Quick Start

### 1. Environment Setup

Copy the environment variables template file and fill in the required API keys:

```bash
cp .env.example .env
```

Configure the following API keys:

```env
# ToolSDK.ai API Key
TOOLSDK_AI_API_KEY=your_toolsdk_api_key_here

# OpenAI API
OPENAI_API_KEY=your_openai_api_key_here

# Tavily API Key (for web search)
TAVILY_API_KEY=your_tavily_api_key_here

# Resend API Key (for email sending)
RESEND_API_KEY=your_resend_api_key_here
```

### 2. Install Dependencies

Choose the example you want to run and enter the corresponding directory:

```bash
# OpenAI SDK example
cd openai
npm install

# Or Vercel AI SDK example
cd ai-sdk
npm install
```

### 3. Run Example

```bash
npm run start
```

## Code Workflow

Regardless of which SDK is used, the overall workflow is consistent:

1. **Initialize Clients** - Create ToolSDK and AI model client instances
2. **Load Tools** - Load search and email sending tool packages
3. **First Call** - AI model decides to use search tool to get AI news
4. **Execute Search** - Call Tavily search engine to get latest news
5. **Second Call** - AI model decides to send email based on search results
6. **Send Email** - Use Resend service to send organized news content
7. **Generate Summary** - AI model generates final execution summary

## Custom Configuration

You can modify the following variables in the code to customize behavior:

```javascript
const senderEmail = "noreply@a.com";      // Sender email
const recipientEmail = "kelvin@b.com";    // Recipient email
```

## Used Tool Packages

- **Search Tool**: `@toolsdk.ai/tavily-mcp` - For web information search
- **Email Tool**: `@toolsdk.ai/mcp-send-email` - For email sending
- **AI Model**: Uses OpenAI's GPT-4.1 model to coordinate tool calls and generate content
