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
  },
  {
    role: 'user',
    content: "I've been feeling a bit overwhelmed lately with work and personal life."
  },
  {
    role: 'assistant',
    content: "I'm sorry to hear that you're feeling overwhelmed. It's a common experience, especially when balancing work and personal life. Let's explore some strategies that might help you manage these feelings. Would you like to start with some quick stress-relief techniques or discuss ways to improve your work-life balance?"
  }
]

export default function MentalHealthChatComponent() {
  const [message, setMessage] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState('Mental Health Support v1.0')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>(sampleChat)
  const [isProcessing, setIsProcessing] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (message.trim() === '') return

    const newUserMessage: Message = { role: 'user', content: message }
    setMessages(prevMessages => [newUserMessage, ...prevMessages])
    setMessage('')
    setIsProcessing(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    const newAssistantMessage: Message = {
      role: 'assistant',
      content: `I understand that you're feeling ${message.toLowerCase()}. It's important to acknowledge these feelings. Let's explore some strategies that might help you cope with this. Would you like to try some relaxation techniques or discuss ways to address the root causes of these feelings?`
    }
    setMessages(prevMessages => [newAssistantMessage, ...prevMessages])
    setIsProcessing(false)
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
    <div className={`grid md:grid-cols-[260px_1fr] min-h-screen w-full ${user?.preferences.darkMode ? ' text-white' : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 text-gray-800'}`}>
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
              <Settings className="w-4 h-4 mr-2 bg-gradient-to-br from-green-50 rounded-ld via-blue-50  to-purple-50" />
              Settings
            </Button>
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2 bg-gradient-to-br from-green-50 rounded-ld via-blue-50  to-purple-50" />
              Log out
            </Button>
          </div>
        ) : (
          <div className="p-4 border-b border-gray-300 bg-gradient-to-br from-green-50 rounded-ld via-blue-50  to-purple-50">
            <Dialog >
              
              
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
                  <div className="grid gap-4 py-4 bg-gradient-to-br from-green-50 rounded-ld via-blue-50  to-purple-50">
                    <div className="grid grid-cols-4 items-center gap-4 bg-gradient-to-br from-green-50 rounded-ld via-blue-50  to-purple-50">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" name="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 bg-gradient-to-br from-green-50 rounded-ld via-blue-50  to-purple-50">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
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
            <div className="px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Today</div>
            <Link
              href="#"
              className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-white/20"
            >
              Coping with Stress and Anxiety
            </Link>
            <Link
              href="#"
              className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-white/20"
            >
              Mindfulness Techniques for Mental Health
            </Link>
          </div>
          <div className="grid gap-1 p-2">
            <div className="px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Yesterday</div>
            <Link
              href="#"
              className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-white/20"
            >
              Building Resilience in Difficult Times
            </Link>
            <Link
              href="#"
              className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-white/20"
            >
              Self-Care Strategies for Mental Wellness
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col h-screen">
        <div className="sticky top-0 p-2 border-b border-gray-300 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:bg-gray-800 z-10">
          <Button variant="ghost" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X className="w-5 h-5" /> : <History className="w-5 h-5" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1 rounded-xl px-3 h-10 text-lg bg-gradient-to-br from-green-100 via-blue-100  to-purple-100">
                {selectedModel}
                <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[300px] bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700">
              <DropdownMenuItem onClick={() => setSelectedModel('Emotional Wellbeing v1.2')} className="focus:bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 dark:focus:bg-gray-700">
                <Sparkles className="w-4 h-4 mr-2" />
                <div>
                  <div className="font-medium">Emotional Wellbeing</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Comprehensive support for your mental health</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedModel('Stress Management v1.1')} className="focus:bg-gradient-to-br from-green-100 via-blue-100  to-purple-100 dark:focus:bg-gray-700">
                <Zap className="w-4 h-4 mr-2" />
                <div>
                  <div className="font-medium">Stress Management</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Coping strategies for everyday challenges</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div 
          ref={chatContainerRef}
          className="flex flex-col-reverse flex-1 pb-72 w-full mx-auto p-4 overflow-y-auto"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#CBD5E0 #EDF2F7',
          }}
        >
          {isProcessing && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing your message...
            </div>
          )}
          {messages.map((msg, index) => (
            <div key={index} className="flex items-start gap-4 w-full mb-8">
              <Avatar className="w-6 h-6 border border-gray-300 dark:border-gray-700">
                <AvatarFallback>{msg.role === 'user' ? (user?.avatar || 'U') : 'AI'}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1 flex-1">
                <div className="font-semibold">{msg.role === 'user' ? (user?.name || 'You') : 'Mental Health Support'}</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {msg.content}
                </div>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                      <Clipboard className="w-4 h-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="sr-only">Helpful</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                      <ThumbsDown className="w-4 h-4" />
                      <span className="sr-only">Not helpful</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                      <RefreshCcw className="w-4 h-4" />
                      <span className="sr-only">Regenerate response</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="sticky bottom-0  w-full mx-auto p-4 bg-gradient-to-br from-green-50 rounded-ld via-blue-50  to-purple-50  dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
          <div className="relative">
            <Textarea
              placeholder="Type your message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                setIsTyping(e.target.value.length > 0)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              className={`min-h-[80px] w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-2xl resize-none p-4 pr-12 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 transition-all ${isTyping ? 'border-blue-500 shadow-lg' : ''}`}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute w-8 h-8 rounded-full top-3 right-3 bg-gradient-to-r from-green-400 to-blue-500"
              onClick={handleSendMessage}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
              <span className="sr-only">Send</span>
            </Button>
          </div>
          <p className="mt-2 text-xs text-center text-gray-600 dark:text-gray-400">
            This is an AI assistant. Consider checking important information.
          </p>
        </div>
      </div>

      {/* Profile Settings Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profile Settings</DialogTitle>
            <DialogDescription>Manage your profile and preferences.</DialogDescription>
          </DialogHeader>
          {user && (
            <div className="grid gap-4 py-4 ">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback>{user.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch
                  id="dark-mode"
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