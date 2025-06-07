// src/components/ChatBox.jsx
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
  fetchChatByProject,
  fetchChatMessages,
  sendMessage,
} from "../../Redux/Chat/Action";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";


let stompClient = null;

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams(); // projectId
 
  const { chat, auth } = useSelector((store) => store);
  // console.log("Chat Msg :: ", chat.chat)
  const chatContainerRef = useRef(null);

  // Connect WebSocket
  useEffect(() => {
    if (chat.chat && auth.user) {
      const socket = new SockJS("http://localhost:5454/ws");
      stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
          stompClient.subscribe(
            `/user/${chat.chat.id}`,
            (message) => {
              const body = JSON.parse(message.body);
              dispatch(messageRecived(body));
            }
          );
        },
        onStompError: (frame) => {
          console.error("WebSocket error:", frame);
        },
      });
      stompClient.activate();

      return () => {
        stompClient.deactivate();
      };
    }
  }, [chat.chat, auth.user, dispatch]);

  useEffect(() => {
    dispatch(fetchChatByProject(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (chat.chat) {
      dispatch(fetchChatMessages(chat.chat.id));
    } 
  }, [chat.chat, dispatch]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat.messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const msg = {
      senderId: auth.user?.id,
      projectId: id,
      content: message,
    };

    console.log("msg :: ", msg)

    dispatch(
      sendMessage({
        message: msg,
        sendToServer: (payload) => {
          if (stompClient && stompClient.connected) {
            stompClient.publish({
              destination: `/app/chat/${chat.chat?.id}`,
              body: JSON.stringify(payload),
            });
          }
        },
      })
    );

    setMessage("");
  };

  const handleMessageChange = (e) => setMessage(e.target.value);
    

  return (
  <div className="sticky h-full">
    <div className="border border-slate-600/50 rounded-3xl shadow-2xl bg-slate-800/60 backdrop-blur-xl overflow-hidden h-full flex flex-col">
      <h1 className="border-b border-slate-600/50 p-6 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm text-xl font-bold text-white flex items-center gap-3">
        <div className="h-3 w-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
        Chat Box
        <span className="ml-auto bg-emerald-500/20 text-emerald-300 text-sm px-3 py-1 rounded-full font-medium">
          {chat.chat?.length || 0} messages
        </span>
      </h1>
      <ScrollArea className="h-[32rem] w-full p-6 flex gap-4 flex-col bg-gradient-to-b from-transparent to-slate-900/20 flex-1">
        {chat.chat?.map((item, i) =>
          item.sender.id === auth.user.id ? (
            <div key={i} ref={chatContainerRef} className="flex gap-4 mb-4 animate-fade-in group">
              <Avatar className="h-10 w-10 ring-2 ring-blue-400/60 shadow-lg hover:ring-blue-400 transition-all duration-300 bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0">
                <AvatarFallback className="bg-transparent text-white font-bold text-sm">{item.sender.fullName[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-2 py-4 px-5 border border-slate-600/30 rounded-ss-2xl rounded-e-xl bg-gradient-to-br from-slate-700/70 to-slate-800/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] max-w-[75%]">
                <p className="text-sm font-semibold text-blue-300">{item.sender.fullName}</p>
                <p className="text-slate-100 leading-relaxed">{item.content}</p>
                <div className="flex items-center gap-2 pt-1">
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  <span className="text-xs text-slate-400">
  {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
</span>

                </div>
              </div>
            </div>
          ) : (
            <div
              key={i}
              ref={chatContainerRef}
              className="flex mb-4 gap-4 justify-end animate-fade-in group"
            >
              <div className="space-y-2 py-4 px-5 border border-blue-500/30 rounded-se-2xl rounded-s-xl bg-gradient-to-bl from-blue-600/80 to-blue-700/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] max-w-[75%]">
                <p className="text-sm font-semibold text-blue-200">{item.sender.fullName}</p>
                <p className="text-white leading-relaxed">{item.content}</p>
                <div className="flex items-center gap-2 pt-1 justify-end">
                  <span className="text-xs text-blue-200">now</span>
                  <div className="w-1 h-1 bg-blue-200 rounded-full"></div>
                </div>
              </div>
              <Avatar className="h-10 w-10 ring-2 ring-blue-300/60 shadow-lg hover:ring-blue-300 transition-all duration-300 bg-gradient-to-br from-blue-400 to-blue-500 flex-shrink-0">
                <AvatarFallback className="bg-transparent text-white font-bold text-sm">{item.sender.fullName[0]}</AvatarFallback>
              </Avatar>
            </div>
          )
        )}
      </ScrollArea>
      <div className="relative bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm border-t border-slate-600/50 p-4">
        <Input
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
          className="py-4 pl-6 pr-16 bg-slate-600/50 backdrop-blur-sm border-slate-500/50 text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 rounded-2xl transition-all duration-300 hover:bg-slate-600/70 shadow-lg border-t-0 outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
        />
        <Button
          onClick={handleSendMessage}
          className="absolute right-6 top-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-10 w-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
          size="icon"
          variant="ghost"
        >
          <PaperPlaneIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);
};

export default ChatBox;
