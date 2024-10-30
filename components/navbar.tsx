'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, Heart, ChevronDown, User, Settings, HelpCircle, LogOut, Bell, CreditCard, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Chatbot', href: '/chatbot' },
  { name: 'Docs', href: '/chatbot' },
  { name: 'Our Team', href: '/chatbot' },
  { name: 'Contact Us', href: '/chatbot' },
]

export  default function NavbarComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])



  if (!isMounted) return null

  return (
    <nav className="bg-white shadow-md bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Heart className="h-8 w-8 text-black" />
              <span className="ml-2 text-2xl font-extrabold tracking-tight text-black">
                HeartfulMind
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:justify-center flex-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? 'text-black bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 '
                    : 'text-gray-700 hover:text-black hover:bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 '
                } transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Login/Profile */}
          <div className="hidden lg:flex lg:items-center  ">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 border px-2 py-4 transition-colors duration-200 text-black hover:bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
                    <Image
                      src="/arpan.jpg"
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full shadow-md"
                    />
                    <span className="font-medium">Arpan Saini</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 rounded-lg shadow-lg bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Arpan Saini</p>
                      <p className="text-xs leading-none text-gray-500">work.arpansaini@gmail.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center space-x-2 p-2 hover:bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-md transition-colors duration-200">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-2 p-2 hover:bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-md transition-colors duration-200">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-2 p-2 hover:bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-md transition-colors duration-200">
                    <BookOpen className="h-4 w-4" />
                    <span>My Courses</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-2 p-2 hover:bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-md transition-colors duration-200">
                    <CreditCard className="h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-2 p-2 hover:bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-md transition-colors duration-200">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-2 p-2 hover:bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-md transition-colors duration-200">
                    <HelpCircle className="h-4 w-4" />
                    <span>Help Center</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center space-x-2 p-2 hover:bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-md transition-colors duration-200" onClick={() => setIsLoggedIn(false)}>
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => setIsLoggedIn(true)}
                className="bg-black hover:bg-gray-800 text-white transition-colors duration-200"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden ">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-black">
                  <span className="sr-only">Open menu</span>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center" >
                      <Heart className="h-8 w-8 text-black" />
                      <span className="ml-2 text-xl font-bold text-black">
                        HeartfulMind
                      </span>
                    </Link>
                  </div>
                  <div className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`px-3 py-2 rounded-md text-base font-medium ${
                          pathname === item.href
                            ? 'text-black bg-gradient-to-br from-green-100 via-blue-100 to-purple-100'
                            : 'text-gray-700 hover:text-black hover:bg-gradient-to-br from-green-100 via-blue-100 to-purple-100'
                        } transition-colors duration-200`}
                      
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  {isLoggedIn && (
                    <>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <Image
                            src="/arpan.jpg"
                            alt="User Avatar"
                            width={40}
                            height={40}
                            className="rounded-full shadow-md"
                          />
                          <div>
                            <p className="font-medium text-black">Arpan Saini</p>
                            <p className="text-sm text-gray-500">work.arpansaini@gmail.com</p>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                          <Bell className="h-4 w-4 mr-2" />
                          Notifications
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Courses
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Button>
                      </div>
                    </>
                  )}
                  <div className="mt-auto">
                    {isLoggedIn ? (
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-black hover:text-gray-800 hover:bg-gray-100"
                        onClick={() => setIsLoggedIn(false)}
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-black hover:bg-gray-800 text-white transition-colors duration-200"
                        onClick={() => {
                          setIsLoggedIn(true)
                          
                        }}
                      >
                        Login
                      </Button>
                    )}
                  </div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}