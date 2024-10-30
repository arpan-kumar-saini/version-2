'use client'

import Image from 'next/image'
import { Github, Linkedin, Twitter } from 'lucide-react'

const teamMembers = [
 
  {
    name: 'Ritu',
    role: 'UI/UX Designer',
    bio: 'Passionate about mental health and design, dedicated to creating impactful user experiences.',
    image: '/placeholder.svg?height=400&width=400',
    social: {
      twitter: 'https://twitter.com/ritu',
      linkedin: 'https://linkedin.com/in/ritu',
      github: 'https://github.com/ritu'
    }
  },
  {
    name: 'Arpan',
    role: 'Lead Developer',
    bio: 'Full Stack Developer expert with a passion for building innovative solutions.',
    image: '/arpan.jpg',
    social: {
      twitter: 'https://twitter.com/arpan',
      linkedin: 'https://linkedin.com/in/arpan',
      github: 'https://github.com/arpan'
    }
  },
  {
    name: 'Shilpa',
    role: 'Content Specialist',
    bio: 'Content provider who excels in crafting engaging and informative material.',
    image: '/placeholder.svg?height=400&width=400',
    social: {
      twitter: 'https://twitter.com/shilpa',
      linkedin: 'https://linkedin.com/in/shilpa',
      github: 'https://github.com/shilpa'
    }
  },
  {
    name: 'Akhilesh',
    role: 'AI Specialist',
    bio: 'AI expert focused on integrating advanced technologies to enhance user interaction.',
    image: '/placeholder.svg?height=400&width=400',
    social: {
      twitter: 'https://twitter.com/akhilesh',
      linkedin: 'https://linkedin.com/in/akhilesh',
      github: 'https://github.com/akhilesh'
    }
  }
]

export default function MeetTheTeamComponent() {
  return (
    <section className="py-16  ">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
                <div className="relative">
                  <Image
                    src={member.image}
                    alt={`${member.name}'s headshot`}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover transition-all duration-300 group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">
                        <Twitter size={24} />
                      </a>
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700 transition-colors">
                        <Linkedin size={24} />
                      </a>
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors">
                        <Github size={24} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{member.role}</p>
                  <p className="text-sm text-gray-700">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}