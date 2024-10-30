import React from 'react'
import Herosection from "@/components/hero-section"
import Problemstatement from "@/components/problem-statement"
import Features from "@/components/features"
import Working from "@/components/working"
import Testimonials from "@/components/testimonials"
import Team from "@/components/team"

function page() {
  return (
    
    <div className='bg-gradient-to-br from-green-50 via-blue-50 to-purple-50  dark:from-green-950 dark:via-blue-950 dark:to-purple-950'>
    <Herosection/>
    <Problemstatement/>
    <Features/>
    <Working/>
    <Testimonials/>
    <Team/>
    </div>
    
    
  )
}

export default page