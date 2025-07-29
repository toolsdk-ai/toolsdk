import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { ToolSDKApiClient } from 'toolsdk/api';

// Initialize Client
const toolSDK = new ToolSDKApiClient({
  apiKey: process.env.TOOLSDK_AI_API_KEY,
  baseURL: process.env.TOOLSDK_BASE_URL || "https://toolsdk.ai/api/openapi",
});
const openai  = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
});

const senderEmail = "noreply@a.com";
const recipientEmail = "kelvin@b.com";

// Get Tools
const searchMCP = await toolSDK.package('@toolsdk.ai/tavily-mcp', {
  TAVILY_API_KEY: process.env.TAVILY_API_KEY,
});
const emailMCP  = await toolSDK.package('@toolsdk.ai/mcp-send-email', {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
});
const searchTool = await searchMCP.getAISDKTool('tavily-search');
const emailTool  = await emailMCP.getAISDKTool('send-email');

// Generate Result with Tools
const completion = await generateText({
  model: openai('gpt-4.1'),
  messages: [{
    role: 'user',
    content: `Help me search for the latest AI news and send it to ${recipientEmail} from ${senderEmail}.`,
  }],
  tools: { searchTool, emailTool },
});

console.log("completion", JSON.stringify(completion, null, 2));
