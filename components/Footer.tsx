'use client'

import Link from 'next/link'
import { FaTelegram, FaDiscord } from 'react-icons/fa'
import { SiApple, SiGoogle, SiMastercard, SiVisa, SiPaypal } from 'react-icons/si'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-red-600 to-red-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href="https://t.me/FsKnockouT"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:text-red-100 transition-colors group"
              >
                <FaTelegram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Telegram: @FsKnockouT</span>
              </a>
              <a
                href="https://discord.com/users/FsKnockouT"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:text-red-100 transition-colors group"
              >
                <FaDiscord className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Discord: FsKnockouT</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-red-100 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-red-100 transition-colors">
                  All Certifications
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-100 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-100 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Region */}
          <div>
            <h3 className="text-lg font-bold mb-4">Region</h3>
            <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer backdrop-blur-sm">
              <option value="US" className="text-gray-900">United States (USD $)</option>
              <option value="UK" className="text-gray-900">United Kingdom (GBP £)</option>
              <option value="EU" className="text-gray-900">European Union (EUR €)</option>
              <option value="IN" className="text-gray-900">India (INR ₹)</option>
              <option value="CA" className="text-gray-900">Canada (CAD $)</option>
              <option value="AU" className="text-gray-900">Australia (AUD $)</option>
            </select>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-sm text-red-100 mb-3">
              Get notified about new certifications and exclusive offers
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              />
              <button className="px-4 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="font-semibold">We Accept:</span>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <SiApple className="w-5 h-5" />
                <span className="text-sm font-medium">Apple Pay</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <SiGoogle className="w-5 h-5" />
                <span className="text-sm font-medium">Google Pay</span>
              </div>
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <SiMastercard className="w-8 h-6" />
              </div>
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <SiVisa className="w-8 h-6" />
              </div>
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <SiPaypal className="w-8 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-red-100">
            <p>&copy; 2025, BlackHat Store Powered by Next.js</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of service
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact information
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

