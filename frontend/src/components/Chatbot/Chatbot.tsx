import { useRef, useState } from "react";
import {
  ChatBubbleBottomCenterText16Solid,
  CrossOutline,
} from "../Icons/Icons";
import {
  useAnalyzeImageMutation,
  useChatMutation,
} from "@/redux/user/chatbotAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; 
import { formatResponse } from "./textFormatter";

interface ChatMessage {
  sender: "user" | "bot";
  message: string;
}

function Chatbot() {
  const [showChat, setShowChat] = useState(false);
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chat, { isLoading: chatLoading }] = useChatMutation();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [analyzeImage, { isLoading: imageLoading }] = useAnalyzeImageMutation();

  const handleSendMessage = async () => {
    if (!input.trim() && !imageFile) return;

    if (imageFile) {
      // Show user's prompt in chat
      if (input.trim()) {
        setChatMessages((prev) => [
          ...prev,
          { sender: "user", message: input },
        ]);
      }

      const formData = new FormData();
      formData.append(
        "prompt",
        input || "Suggest makeup colors suitable for this skin tone."
      );
      formData.append("file", imageFile);

      setInput("");
      setImageFile(null);

      try {
        const response = await analyzeImage(formData).unwrap();
        setChatMessages((prev) => [
          ...prev,
          { sender: "bot", message: response.response },
        ]);
      } catch (err) {
        setChatMessages((prev) => [
          ...prev,
          { sender: "bot", message: "Failed to analyze the image." },
        ]);
      }
    } else {
      const userMessage = input;
      setChatMessages((prev) => [
        ...prev,
        { sender: "user", message: userMessage },
      ]);
      setInput("");

      try {
        const response = await chat({ message: userMessage }).unwrap();
        setChatMessages((prev) => [
          ...prev,
          { sender: "bot", message: response.response },
        ]);
      } catch (err:any) {
        setChatMessages((prev) => [
          ...prev,
          { sender: "bot", message: "Sorry, something went wrong." },
        ]);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  // UI Below
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!showChat ? (
        <div
          onClick={() => setShowChat(true)}
          className="bg-white p-3 rounded-full cursor-pointer shadow-lg hover:scale-105 transition"
        >
          <ChatBubbleBottomCenterText16Solid className="text-4xl text-primary" />
        </div>
      ) : (
        <div className="chatbox relative shadow-2xl rounded-2xl h-[40rem] w-[24rem] bg-white flex flex-col overflow-hidden border border-gray-200">
          {/* Close Icon */}
          <div
            className="absolute cursor-pointer text-2xl right-3 top-3 text-gray-500 hover:text-red-500 transition"
            onClick={() => setShowChat(false)}
          >
            <CrossOutline />
          </div>

          {/*    Header    */}
          <div className="p-2 font-semibold text-lg border-b text-center">
            Your Beauty Assistant
          </div>

          {/* Chat History */}
          <ScrollArea className="flex-1 px-4 py-2 space-y-3 overflow-y-auto">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-2 text-sm my-4",
                  msg.sender === "user"
                    ? "ml-auto bg-primary text-white"
                    : "mr-auto bg-gray-200 text-black"
                )}
              >
                {formatResponse(msg.message)}
              </div>
            ))}
            {(chatLoading || imageLoading) && (
              <div className="text-xs text-gray-500 italic">Thinking...</div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="p-3 border-t flex flex-col gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                imageFile
                  ? "Describe the image (optional)..."
                  : "Ask me anything..."
              }
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            {imageFile ? (
              <p
                className=" border rounded-md p-1
            truncate 
            "
              >
                {imageFile?.name}
              </p>
            ) : (
              <></>
            )}

            <div className="flex items-center justify-between gap-2">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="
            max-w-32 truncate
                  "
              >
                {imageFile ? "Image" : "Upload Image"}
              </Button>

              <Button
                onClick={handleSendMessage}
                className="text-white cursor-pointer"
                disabled={chatLoading || imageLoading}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Chatbot;
