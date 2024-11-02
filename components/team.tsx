'use client'

import Image from 'next/image'
import { Github, Linkedin, Instagram} from 'lucide-react'

const teamMembers = [
 
  
  {
    name: 'Arpan',
    role: 'Lead Developer',
    bio: 'Full Stack Developer expert with a passion for building innovative solutions.',
    image: '/arpan.jpg',
    social: {
      instagram: 'https://instagram.com/arpan_kumar_saini',
      linkedin: 'https://linkedin.com/in/arpansaini',
      github: 'https://github.com/arpan-kumar-saini'
    }
  },
  {
    name: 'Ritu',
    role: 'UI/UX Designer',
    bio: 'Passionate about mental health and design, dedicated to creating impactful UI/UX.',
    image: '/ritu.jpg',
    social: {
      instagram: 'https://instagram.com/ritu',
      linkedin: 'https://linkedin.com/in/ritu',
      github: 'https://github.com/ritu'
    }
  },

  {
    name: 'Shilpa',
    role: 'Content Specialist',
    bio: 'Content provider who excels in crafting engaging and informative material.',
    image: '/shilpa.jpeg',
    social: {
      instagram: 'https://twitter.com/shilpa',
      linkedin: 'https://linkedin.com/in/shilpa',
      github: 'https://github.com/shilpa'
    }
  },
  {
    name: 'Akhilesh',
    role: 'AI Specialist',
    bio: 'AI expert focused on integrating advanced technologies to enhance user interaction.',
    image: '/akhilesh.jpeg',
    social: {
      instagram: 'https://twitter.com/akhilesh',
      linkedin: 'https://linkedin.com/in/akhilesh',
      github: 'https://github.com/akhilesh'
    }
  }
  
]

export default function MeetTheTeamComponent() {
  return (
    <section className="py-16  " id='team'>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
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
                      <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">
                        <Instagram size={24} />
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
                <div className="p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-sm  font-medium text-blue-600 mb-4">{member.role}</p>
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