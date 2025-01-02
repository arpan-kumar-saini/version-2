'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowUp,
  Bot,
  ChevronDown,
  Clipboard,
  PenBox,
  RefreshCcw,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Zap,
  History,
  X,
  Loader2,
  Settings,
  LogOut,
} from "lucide-react"
import Link from "next/link"

type Message = {
  role: 'user' | 'assistant'
  content: string
}
const gemApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const urlApi =`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${gemApiKey}`;

type User = {
  name: string
  email: string
  avatar: string
  preferences: {
    darkMode: boolean
    notifications: boolean
  }
}

const sampleChat: Message[] = [
  {
    role: 'assistant',
    content: "Hello! I'm your Mental Health Support assistant. How are you feeling today?"
  }
]

export default function MentalHealthChatComponent() {
  const [message, setMessage] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState('Mental Health Support v1.0')
  const [messages, setMessages] = useState<Message[]>(sampleChat)
  const [isProcessing, setIsProcessing] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const generateResponse = async (userMessage: string) => {
    try {
      const response = await fetch(
        urlApi,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `As a mental health support chatbot, respond to: ${userMessage}`
              }]
            }]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error:", error);
      return "I apologize, but I'm having trouble processing your request. Please try again.";
    }
  }

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const userMessage: Message = { 
      role: "user" as const, 
      content: message 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsProcessing(true);

    const aiResponse = await generateResponse(message);
    const assistantMessage: Message = { 
      role: "assistant" as const, 
      content: aiResponse 
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  }

  const handleLogin = (name: string, email: string) => {
    setUser({
      name,
      email,
      avatar: name[0].toUpperCase(),
      preferences: {
        darkMode: false,
        notifications: true
      }
    })
  }

  const handleLogout = () => {
    setUser(null)
  }

  const toggleDarkMode = () => {
    if (user) {
      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          darkMode: !user.preferences.darkMode
        }
      })
    }
  }

  const toggleNotifications = () => {
    if (user) {
      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          notifications: !user.preferences.notifications
        }
      })
    }
  }

  return (
    <div className={`grid md:grid-cols-[260px_1fr] min-h-screen w-full ${user?.preferences.darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 text-gray-800'}`}>
      {/* Sidebar */}
      <div className={`flex-col gap-2 border-r border-gray-300 ${isSidebarOpen ? 'flex' : 'hidden md:flex'}`}>
        {user ? (
          <div className="p-4 border-b border-gray-300">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-10 h-10">
                <AvatarFallback>{user.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
            <Button variant="outline" className="w-full mb-2" onClick={() => setIsProfileOpen(true)}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </Button>
          </div>
        ) : (
          <div className="p-4 border-b border-gray-300">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Log in</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log in</DialogTitle>
                  <DialogDescription>Enter your details to log in.</DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  handleLogin(formData.get('name') as string, formData.get('email') as string)
                }}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Name</Label>
                      <Input id="name" name="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">Email</Label>
                      <Input id="email" name="email" type="email" className="col-span-3" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Log in</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        )}

        <div className="sticky top-0 p-2">
          <Button variant="ghost" className="justify-start w-full gap-2 px-2 text-left">
            <div className="flex items-center justify-center rounded-full w-7 h-7 bg-gradient-to-r from-green-400 to-blue-500">
              <Bot className="w-4 h-4" />
            </div>
            <div className="overflow-hidden text-sm grow text-ellipsis whitespace-nowrap">Mental Health Support</div>
            <PenBox className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="grid gap-1 p-2">
            <div className="px-2 text-xs font-medium text-gray-600">Previous Chats</div>
            {['Coping with Stress', 'Anxiety Management', 'Depression Support'].map((chat, index) => (
              <Link
                key={index}
                href="#"
                className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-white/20"
              >
                {chat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col h-screen">
        <div className="sticky top-0 p-2 border-b border-gray-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <Button variant="ghost" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X className="w-5 h-5" /> : <History className="w-5 h-5" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                {selectedModel}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[300px]">
              <DropdownMenuItem onClick={() => setSelectedModel('Emotional Wellbeing v1.2')}>
                <Sparkles className="w-4 h-4 mr-2" />
                <div>
                  <div className="font-medium">Emotional Wellbeing</div>
                  <div className="text-sm text-gray-500">Comprehensive support for your mental health</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedModel('Stress Management v1.1')}>
                <Zap className="w-4 h-4 mr-2" />
                <div>
                  <div className="font-medium">Stress Management</div>
                  <div className="text-sm text-gray-500">Coping strategies for everyday challenges</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex items-start gap-4 mb-4">
              <Avatar className="w-8 h-8">
                <AvatarFallback>{msg.role === 'user' ? (user?.avatar || 'U') : 'AI'}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium mb-1">{msg.role === 'user' ? (user?.name || 'You') : 'Mental Health Support'}</div>
                <div className="prose dark:prose-invert">{msg.content}</div>
                {msg.role === 'assistant' && (
                  <div className="flex gap-2 mt-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="w-4 h-4 mr-1" /> Helpful
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsDown className="w-4 h-4 mr-1" /> Not helpful
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </div>
          )}
        </div>

        <div className="sticky bottom-0 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder="Type your message..."
                className="pr-12 resize-none"
                rows={3}
              />
              <Button
                size="icon"
                className="absolute right-2 bottom-2"
                onClick={handleSendMessage}
                disabled={isProcessing || !message.trim()}
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-center text-gray-500 mt-2">
              This is an AI assistant. Please verify any important information.
            </p>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Manage your preferences</DialogDescription>
          </DialogHeader>
          {user && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback>{user.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="darkMode">Dark Mode</Label>
                <Switch
                  id="darkMode"
                  checked={user.preferences.darkMode}
                  onCheckedChange={toggleDarkMode}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Notifications</Label>
                <Switch
                  id="notifications"
                  checked={user.preferences.notifications}
                  onCheckedChange={toggleNotifications}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}