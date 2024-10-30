'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Book, UserCircle, Users } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function EnhancedFeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const features = [
    {
      title: "AI Chatbot",
      description: "Chat with our empathetic AI for stress management.",
      icon: MessageSquare,
      color: "rgba(167, 243, 208, 0.2)",
      hoverColor: "rgba(167, 243, 208, 0.4)",
      buttonText: "Learn More",
      href: "/chatbot"
    },
    {
      title: "Mental Health Guide",
      description: "Explore expert-curated guides for emotional well-being.",
      icon: Book,
      color: "rgba(147, 197, 253, 0.2)",
      hoverColor: "rgba(147, 197, 253, 0.4)",
      buttonText: "Explore Guides",
      href: "/guides"
    },
    {
      title: "Personalized Support",
      description: "Receive tailored advice based on your mood and needs.",
      icon: UserCircle,
      color: "rgba(196, 181, 253, 0.2)",
      hoverColor: "rgba(196, 181, 253, 0.4)",
      buttonText: "Get Support",
      href: "/support"
    },
    {
      title: "Community Connection",
      description: "Join a supportive community to share and connect.",
      icon: Users,
      color: "rgba(167, 243, 208, 0.2)",
      hoverColor: "rgba(167, 243, 208, 0.4)",
      buttonText: "Join Community",
      href: "/community"
    }
  ]

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8  ">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What We Offer
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="flex flex-col h-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                style={{ 
                  backgroundColor: hoveredIndex === index ? feature.hoverColor : feature.color
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardHeader>
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <feature.icon className="w-full h-full text-primary" />
                    <div className="absolute inset-0 bg-primary opacity-20 rounded-full animate-ping" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-center text-muted-foreground">{feature.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant="outline">
                    <Link href={feature.href}>{feature.buttonText}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}