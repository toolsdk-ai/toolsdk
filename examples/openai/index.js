import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import OpenAI from "openai";
import { ToolSDKApiClient } from "toolsdk/api";

// Initialize Client
const toolSDK = new ToolSDKApiClient({
  apiKey: process.env.TOOLSDK_AI_API_KEY,
  baseURL: process.env.TOOLSDK_BASE_URL || "https://toolsdk.ai/api/openapi",
});
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
});

const senderEmail = "noreply@a.com";
const recipientEmail = "kelvin@b.com";

// Get Tools
const searchMCP = await toolSDK.package("@toolsdk.ai/tavily-mcp", {
  TAVILY_API_KEY: process.env.TAVILY_API_KEY,
});
const emailMCP = await toolSDK.package("@toolsdk.ai/mcp-send-email", {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
});
const searchTool = await searchMCP.getOpenAISDKTool("tavily-search");
const emailTool = await emailMCP.getOpenAISDKTool("send-email");

const messages = [
  {
    role: "user",
    content:
      `Help me search for the latest AI news and send it to ${recipientEmail} from ${senderEmail}.`,
  },
];

const completion = await openai.chat.completions.create({
  model: "gpt-4.1",
  messages,
  tools: [searchTool, emailTool],
});

console.log("Initial Completion:\n", JSON.stringify(completion, null, 2));

const toolMap = { "tavily-search": searchMCP, "send-email": emailMCP };


// Expected result: call tavily-search
for (const toolCall of completion.choices[0].message.tool_calls) {
  const { name: toolKey, arguments: argsStr } = toolCall.function;
  const inputData = JSON.parse(argsStr);

  const toolContent = await toolMap[toolKey].run({ toolKey, inputData });

  messages.push(
    { role: "assistant", tool_calls: [toolCall] },
    {
      role: "tool",
      content: JSON.stringify(toolContent),
      tool_call_id: toolCall.id,
    }
  );
}

// Ask OpenAI to generate the args for the next tool call (send-email)
const completion2 = await openai.chat.completions.create({
  model: "gpt-4.1",
  messages,
  tools: [searchTool, emailTool],
});

// Expected result: call send-email
for (const toolCall of completion2.choices[0].message.tool_calls) {
  const { name: toolKey, arguments: argsStr } = toolCall.function;
  const inputData = JSON.parse(argsStr);

  const toolContent = await toolMap[toolKey].run({ toolKey, inputData });

  messages.push(
    { role: "assistant", tool_calls: [toolCall] },
    {
      role: "tool",
      content: JSON.stringify(toolContent),
      tool_call_id: toolCall.id,
    }
  );
}

// The final result
const finalResponse = await openai.chat.completions.create({
  model: "gpt-4.1",
  messages,
});

if (finalResponse.choices[0].message) {
  messages.push(finalResponse.choices[0].message);
  console.log("messages", messages);
} else {
  console.error("Error:", JSON.stringify(finalResponse, null, 2));
}
