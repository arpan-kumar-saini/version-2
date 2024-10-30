'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/arpan.jpg",
    role: "Computer Science Student",
    content: "This platform revolutionized my study habits. The collaborative features and resource access helped me ace my exams!",
    rating: 5,
  },
  {
    id: 2,
    name: "Samantha Lee",
    avatar: "/arpan.jpg",
    role: "Biology Major",
    content: "I love how easy it is to connect with peers and share notes. My grades have improved significantly since I started using this platform.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar: "/arpan.jpg",
    role: "Engineering Student",
    content: "The interactive study tools and personalized learning paths have made complex topics much easier to grasp. Highly recommended!",
    rating: 5,
  },
]

export default function TestimonialsSectionComponent() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Success Stories</h2>
        <Card className="bg-white shadow-lg bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 ">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" size="icon" onClick={prevTestimonial} aria-label="Previous testimonial">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-4">
                <div className="relative">
                <Image
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  width={64} // Adjust width to match `w-16`
                  height={64} // Adjust height to match `h-16`
                  className="rounded-full object-cover border-2 border-primary"
                />
                <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-1">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{testimonials[currentTestimonial].name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
              <Button variant="outline" size="icon" onClick={nextTestimonial} aria-label="Next testimonial">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <blockquote className="text-center italic text-lg">
            &quot;{testimonials[currentTestimonial].content}&quot;
            </blockquote>
            <div className="flex justify-center mt-4">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-center mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${
                index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}