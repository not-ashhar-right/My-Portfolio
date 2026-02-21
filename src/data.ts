import { LucideIcon, Code, GraduationCap, Trophy, FolderGit2, Award, Mail, User } from 'lucide-react';

export interface Section {
  id: string;
  title: string;
  icon: LucideIcon;
  content: any;
}

export const sections: Section[] = [
  {
    id: 'details',
    title: 'My Details',
    icon: User,
    content: {
      name: 'K Mohammad Ashhar',
      role: 'Computer Science Student',
      bio: 'I am a 2nd year Computer Science and Engineering student at Bangalore Institute of Technology. I am passionate about building scalable web applications and solving complex problems using Data Structures and Algorithms.',
      location: 'Bangalore, India',
      email: 'ashhar8925@gmail.com',
    }
  },
  {
    id: 'qualification',
    title: 'Qualification',
    icon: GraduationCap,
    content: [
      {
        degree: 'B.E. in Computer Science and Engineering',
        institution: 'Bangalore Institute of Technology',
        year: '2022 - 2026 (Expected)',
        details: 'Currently in 2nd Year. Focusing on Core CS subjects and Web Development.'
      },
      // Add more if needed (e.g., High School)
    ]
  },
  {
    id: 'achievements',
    title: 'Achievements',
    icon: Trophy,
    content: [
      {
        title: 'LeetCode Problem Solver',
        description: 'Solved 88+ problems on LeetCode, focusing on Arrays, Strings, and Linked Lists.',
        link: 'https://leetcode.com/' // Placeholder if not provided
      },
      // Add more achievements
    ]
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: FolderGit2,
    content: [
      {
        title: 'Safe Scan',
        description: 'A security-focused application designed to scan and detect vulnerabilities.',
        tech: ['HTML', 'CSS', 'JavaScript'],
      },
      {
        title: 'Money Heist',
        description: 'A financial management or game-themed application.',
        tech: ['HTML', 'CSS', 'JavaScript'],
      },
      {
        title: 'Blind Assist',
        description: 'An accessibility tool designed to assist visually impaired individuals.',
        tech: ['HTML', 'CSS', 'JavaScript'],
      }
    ]
  },
  {
    id: 'certifications',
    title: 'Certifications',
    icon: Award,
    content: [
      {
        title: 'Web Development Bootcamp',
        issuer: 'Udemy/Coursera (Example)',
        date: '2023'
      },
      // Add more certifications
    ]
  },
  {
    id: 'contact',
    title: 'Contact Details',
    icon: Mail,
    content: {
      email: 'ashhar8925@gmail.com',
      github: 'https://github.com/not-ashhar-right',
      linkedin: 'https://www.linkedin.com/in/k-mohammed-ashhar-445636312/',
    }
  }
];
