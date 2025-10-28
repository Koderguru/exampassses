export interface Certification {
  id: string
  name: string
  code: string
  gradient: string
  category: string
  price: number
  description: string
  imageUrl: string
}

export const certifications: Certification[] = [
  // Offensive Security
  {
    id: 'oscp-plus',
    name: 'OSCP Plus',
    code: 'OSCP+',
    gradient: 'bg-gradient-to-br from-red-500 to-red-700',
    category: 'Offensive Security',
    price: 199.99,
    description: 'Offensive Security Certified Professional - Advanced penetration testing',
    imageUrl: 'https://images.credly.com/size/340x340/images/ec81134d-e80b-4eb5-ae07-0eb8e1a60fcd/image.png'
  },
  {
    id: 'osep',
    name: 'OSEP',
    code: 'OSEP',
    gradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
    category: 'Offensive Security',
    price: 249.99,
    description: 'Offensive Security Experienced Penetration Tester',
    imageUrl: 'https://images.credly.com/size/340x340/images/6b1f7c63-73bb-4636-8937-2e531b56e1a6/image.png'
  },
  {
    id: 'oswe',
    name: 'OSWE',
    code: 'OSWE',
    gradient: 'bg-gradient-to-br from-cyan-500 to-cyan-700',
    category: 'Offensive Security',
    price: 229.99,
    description: 'Offensive Security Web Expert',
    imageUrl: 'https://images.credly.com/size/340x340/images/b5e331a4-2fd4-4662-82c1-70c2b041a2fa/image.png'
  },
  {
    id: 'oswa',
    name: 'OSWA',
    code: 'OSWA',
    gradient: 'bg-gradient-to-br from-green-500 to-green-700',
    category: 'Offensive Security',
    price: 189.99,
    description: 'Offensive Security Wireless Assessor',
    imageUrl: 'https://images.credly.com/size/340x340/images/9e7c85d8-a75c-4983-89b5-d1e184ff4205/image.png'
  },
  {
    id: 'osed',
    name: 'OSED',
    code: 'OSED',
    gradient: 'bg-gradient-to-br from-amber-500 to-amber-700',
    category: 'Offensive Security',
    price: 259.99,
    description: 'Offensive Security Exploit Developer',
    imageUrl: 'https://images.credly.com/size/340x340/images/b6687b9e-42e4-49f9-8fcb-6f8214d93c05/image.png'
  },
  {
    id: 'osda',
    name: 'OSDA',
    code: 'OSDA',
    gradient: 'bg-gradient-to-br from-pink-500 to-pink-700',
    category: 'Offensive Security',
    price: 219.99,
    description: 'Offensive Security Defense Analyst',
    imageUrl: 'https://images.credly.com/size/340x340/images/d4ba7a4d-e0c3-4e32-b5e8-f1c888fd2b7e/image.png'
  },
  {
    id: 'oswp',
    name: 'OSWP',
    code: 'OSWP',
    gradient: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
    category: 'Offensive Security',
    price: 179.99,
    description: 'Offensive Security Wireless Professional',
    imageUrl: 'https://images.credly.com/size/340x340/images/bef89e3d-1e6d-42f8-9a0d-38025da425b5/image.png'
  },
  {
    id: 'bscp',
    name: 'BSCP',
    code: 'BSCP',
    gradient: 'bg-gradient-to-br from-teal-500 to-teal-700',
    category: 'PortSwigger',
    price: 169.99,
    description: 'Burp Suite Certified Practitioner',
    imageUrl: 'https://images.credly.com/size/340x340/images/7a8a58a4-1dc5-4d1f-af72-e55ce64eb156/image.png'
  },

  // HackTheBox
  {
    id: 'cpts',
    name: 'CPTS',
    code: 'CPTS',
    gradient: 'bg-gradient-to-br from-lime-500 to-lime-700',
    category: 'HackTheBox',
    price: 199.99,
    description: 'Certified Penetration Testing Specialist',
    imageUrl: 'https://academy.hackthebox.com/images/certifications/htb-certified-penetration-testing-specialist.jpg'
  },
  {
    id: 'cbbh',
    name: 'CBBH',
    code: 'CBBH',
    gradient: 'bg-gradient-to-br from-orange-500 to-orange-700',
    category: 'HackTheBox',
    price: 179.99,
    description: 'Certified Bug Bounty Hunter',
    imageUrl: 'https://academy.hackthebox.com/images/certifications/htb-certified-bug-bounty-hunter.jpg'
  },

  // Red Team Ops
  {
    id: 'crto',
    name: 'CRTO',
    code: 'CRTO',
    gradient: 'bg-gradient-to-br from-violet-500 to-violet-700',
    category: 'Zero-Point Security',
    price: 239.99,
    description: 'Certified Red Team Operator',
    imageUrl: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/89827204'
  },
  {
    id: 'crtl',
    name: 'CRTL',
    code: 'CRTL',
    gradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
    category: 'Zero-Point Security',
    price: 269.99,
    description: 'Certified Red Team Lead',
    imageUrl: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/89827205'
  },

  // TCM Security
  {
    id: 'pnpt',
    name: 'PNPT',
    code: 'PNPT',
    gradient: 'bg-gradient-to-br from-rose-500 to-rose-700',
    category: 'TCM Security',
    price: 189.99,
    description: 'Practical Network Penetration Tester',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0210/6838/4087/files/pnpt-badge.png'
  },
  {
    id: 'pjpt',
    name: 'PJPT',
    code: 'PJPT',
    gradient: 'bg-gradient-to-br from-fuchsia-500 to-fuchsia-700',
    category: 'TCM Security',
    price: 149.99,
    description: 'Practical Junior Penetration Tester',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0210/6838/4087/files/pjpt-badge.png'
  },

  // INE Security
  {
    id: 'pt1',
    name: 'PT1',
    code: 'PT1',
    gradient: 'bg-gradient-to-br from-sky-500 to-sky-700',
    category: 'INE Security',
    price: 199.99,
    description: 'Penetration Testing Student Level 1',
    imageUrl: 'https://ine.com/learning/certifications/internal/elearnsecurity-junior-penetration-tester-ejpt'
  },
  {
    id: 'ceh',
    name: 'CEH',
    code: 'CEH',
    gradient: 'bg-gradient-to-br from-red-600 to-red-800',
    category: 'EC-Council',
    price: 179.99,
    description: 'Certified Ethical Hacker',
    imageUrl: 'https://images.credly.com/size/340x340/images/c50b84f4-2fc1-4d42-9238-47d80a49aeee/image.png'
  },

  // Altered Security
  {
    id: 'crtp',
    name: 'CRTP',
    code: 'CRTP',
    gradient: 'bg-gradient-to-br from-purple-600 to-purple-800',
    category: 'Altered Security',
    price: 209.99,
    description: 'Certified Red Team Professional',
    imageUrl: 'https://www.alteredsecurity.com/images/crtp.png'
  },
  {
    id: 'crte',
    name: 'CRTE',
    code: 'CRTE',
    gradient: 'bg-gradient-to-br from-indigo-600 to-indigo-800',
    category: 'Altered Security',
    price: 249.99,
    description: 'Certified Red Team Expert',
    imageUrl: 'https://www.alteredsecurity.com/images/crte.png'
  },
  {
    id: 'klcp',
    name: 'KLCP',
    code: 'KLCP',
    gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    category: 'Pentester Academy',
    price: 219.99,
    description: 'Kerberos Level Certified Professional',
    imageUrl: 'https://www.pentesteracademy.com/img/klcp-badge.png'
  },

  // eLearnSecurity / INE
  {
    id: 'ewpt',
    name: 'eWPT',
    code: 'eWPT',
    gradient: 'bg-gradient-to-br from-cyan-600 to-cyan-800',
    category: 'eLearnSecurity',
    price: 169.99,
    description: 'eLearnSecurity Web Application Penetration Tester',
    imageUrl: 'https://images.credly.com/size/340x340/images/d16cc521-632e-4e1e-8b1f-94f8c4e1c7c5/eWPT.png'
  },
  {
    id: 'emapt',
    name: 'eMAPT',
    code: 'eMAPT',
    gradient: 'bg-gradient-to-br from-teal-600 to-teal-800',
    category: 'eLearnSecurity',
    price: 189.99,
    description: 'eLearnSecurity Mobile Application Penetration Tester',
    imageUrl: 'https://images.credly.com/size/340x340/images/3a5caa3e-d7e0-4d12-a9ea-63f1d837a046/eMAPT.png'
  },
  {
    id: 'ecir',
    name: 'eCIR',
    code: 'eCIR',
    gradient: 'bg-gradient-to-br from-green-600 to-green-800',
    category: 'eLearnSecurity',
    price: 199.99,
    description: 'eLearnSecurity Certified Incident Responder',
    imageUrl: 'https://images.credly.com/size/340x340/images/9c41cdb2-8482-4f0f-91f3-f5c4b0f3b3b7/eCIR.png'
  },
  {
    id: 'ejpt',
    name: 'eJPT',
    code: 'eJPT',
    gradient: 'bg-gradient-to-br from-lime-600 to-lime-800',
    category: 'eLearnSecurity',
    price: 139.99,
    description: 'eLearnSecurity Junior Penetration Tester',
    imageUrl: 'https://images.credly.com/size/340x340/images/3b745b74-f8a8-45e6-a97c-ab8d4c2a62ad/eJPT.png'
  },
  {
    id: 'ecthp',
    name: 'eCTHP',
    code: 'eCTHP',
    gradient: 'bg-gradient-to-br from-amber-600 to-amber-800',
    category: 'eLearnSecurity',
    price: 179.99,
    description: 'eLearnSecurity Certified Threat Hunting Professional',
    imageUrl: 'https://images.credly.com/size/340x340/images/2c8b1c8e-f0b3-4f91-9f8d-0f3f6e8a0e2e/eCTHP.png'
  },
  {
    id: 'ewptx',
    name: 'eWPTX',
    code: 'eWPTX',
    gradient: 'bg-gradient-to-br from-blue-600 to-blue-800',
    category: 'eLearnSecurity',
    price: 229.99,
    description: 'eLearnSecurity Web Application Penetration Tester eXtreme',
    imageUrl: 'https://images.credly.com/size/340x340/images/0b7e0f9e-30c1-4c16-a4c7-d4e8f3f0f3f3/eWPTX.png'
  },
  {
    id: 'ecppt',
    name: 'eCPPT',
    code: 'eCPPT',
    gradient: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
    category: 'eLearnSecurity',
    price: 209.99,
    description: 'eLearnSecurity Certified Professional Penetration Tester',
    imageUrl: 'https://images.credly.com/size/340x340/images/a0d2f89e-1c2e-4c3e-8e3e-8e8e8e8e8e8e/eCPPT.png'
  },
]

