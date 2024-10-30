'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

export default function ProblemStatementComponent() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto p-6 rounded-xl "
    >
      <Card className=" border-none shadow-lg bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-blue-500">
            Mental Health Challenges in College
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-center text-gray-700">
            College students face significant mental health challenges, including anxiety, depression, and overwhelming stress due to academic pressures, social expectations, and life transitions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              index={0}
              stat="1 in 3"
              description="college students experience severe stress"
              bgColor="bg-[rgba(147,197,253,0.4)]"
              isHovered={hoveredCard === 0}
              setHovered={setHoveredCard}
            />
            <StatCard
              index={1}
              stat="Over 40%"
              description="of students report feeling anxious regularly"
              bgColor="bg-[rgba(196,181,253,0.4)]"
              isHovered={hoveredCard === 1}
              setHovered={setHoveredCard}
            />
            <StatCard
              index={2}
              stat="~20%"
              description="of students are affected by depression during college"
              bgColor="bg-[rgba(167,243,208,0.4)]"
              isHovered={hoveredCard === 2}
              setHovered={setHoveredCard}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
            <Link href="/about">Learn More About Our Mission</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

function StatCard({ index, stat, description, bgColor, isHovered, setHovered }: { 
  index: number;
  stat: string; 
  description: string; 
  bgColor: string;
  isHovered: boolean;
  setHovered: (index: number | null) => void;
}) {
  return (
    <motion.div
      className={`${bgColor} p-6 rounded-lg text-center cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setHovered(index)}
      onHoverEnd={() => setHovered(null)}
    >
      <motion.p 
        className="text-3xl font-bold text-gray-800"
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {stat}
      </motion.p>
      <motion.p 
        className="text-sm mt-3 text-gray-600"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: isHovered ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}