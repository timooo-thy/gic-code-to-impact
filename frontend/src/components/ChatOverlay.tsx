"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CoreToolMessage, type CoreMessage } from "ai";
import { readStreamableValue } from "ai/rsc";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, X } from "lucide-react";
import { continueConversation } from "@/actions/chatActions";

const initialMessages = {
  role: "assistant",
  content: "Hello! How can I assist you today?",
} as CoreMessage;

export function ChatOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<CoreMessage[]>([initialMessages]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 p-0"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      )}
      {isOpen && (
        <Card className="w-80 h-[500px] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GIC Superbot</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden">
            <ScrollArea className="h-72 w-full pr-4" ref={scrollAreaRef}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`mb-4 ${
                    m.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }  break-all whitespace-pre-wrap`}
                  >
                    {m.role === "user" ? "User: " : "AI: "}
                    {m.content as string}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <form
              className="flex w-full space-x-2"
              onSubmit={async (e) => {
                e.preventDefault();
                const newMessages: CoreMessage[] = [
                  ...messages,
                  { content: input, role: "user" },
                ];

                setMessages(newMessages);
                setInput("");

                const result = await continueConversation(newMessages);

                for await (const content of readStreamableValue(result)) {
                  setMessages([
                    ...newMessages,
                    {
                      role: "assistant",
                      content: content as string,
                    },
                  ]);
                }
              }}
            >
              <Input
                className="flex-grow"
                value={input}
                placeholder="Say something..."
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type="submit">Send</Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
