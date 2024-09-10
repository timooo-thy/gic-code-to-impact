"use server";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { internalData, ragData } from "@/lib/utils";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function continueConversation(messages: CoreMessage[]) {
  await sleep(2000);
  const result = await streamText({
    model: openai("gpt-4o-mini"),
    prompt: ragData + internalData + messages.slice(-1)[0].content,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}
