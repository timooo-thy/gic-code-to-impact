"use server";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { internalData, ragData } from "@/lib/utils";

export async function continueConversation(messages: CoreMessage[]) {
  const result = await streamText({
    model: openai("gpt-4o-mini"),
    prompt: ragData + internalData + messages.slice(-1)[0].content,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}
