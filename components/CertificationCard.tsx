'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FiShoppingCart, FiStar } from 'react-icons/fi'
import { useState } from 'react'

interface Certification {
  id: string
  name: string
  code: string
  gradient: string
  category: string
  imageUrl: string
  price?: number
  description?: string
}

interface Props {
  certification: Certification
  onAddToCart?: (cert: Certification) => void
}

export default function CertificationCard({ certification, onAddToCart }: Props) {
  const [isAdded, setIsAdded] = useState(false)
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAdded(true)
    if (onAddToCart) {
      onAddToCart(certification)
    }
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="card p-0 h-full cursor-pointer group overflow-hidden"
    >
      <div className="relative">
        {/* Product Image */}
        <div className="relative w-full h-56 bg-gray-50 overflow-hidden">
          {certification.imageUrl ? (
            <>
              <div className={`absolute inset-0 ${certification.gradient} opacity-10`}></div>
              <Image
                src={certification.imageUrl}
                alt={`${certification.name} Badge`}
                fill
                className="object-contain p-6 group-hover:scale-110 transition-transform duration-300"
                sizes="300px"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </>
          ) : (
            <div className={`w-full h-full ${certification.gradient} flex items-center justify-center`}>
              <span className="text-white font-bold text-4xl tracking-wide">
                {certification.code}
              </span>
            </div>
          )}
          
          {/* Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              BESTSELLER
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          {/* Category */}
          <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
            {certification.category}
          </span>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
            {certification.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">(4.9)</span>
          </div>

          {/* Description */}
          {certification.description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {certification.description}
            </p>
          )}

          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                ${certification.price || 199}<span className="text-sm font-normal">.99</span>
              </div>
              <div className="text-xs text-gray-500 line-through">$299.99</div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                isAdded 
                  ? 'bg-green-600 text-white' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              <FiShoppingCart className="w-4 h-4" />
              {isAdded ? 'Added!' : 'Add to Cart'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

