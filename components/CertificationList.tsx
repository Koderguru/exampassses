'use client'

import { useEffect, useState } from 'react'
import { certifications as defaultCertifications } from '@/data/certifications'
import CertificationCard from './CertificationCard'
import { motion } from 'framer-motion'
import { db } from '@/lib/firebase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

interface Certification {
  id: string
  name: string
  code: string
  gradient: string
  category: string
  imageUrl: string
  price: number
  description: string
}

export default function CertificationList() {
  const [certifications, setCertifications] = useState<Certification[]>(defaultCertifications)
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [usingFirebase, setUsingFirebase] = useState(false)

  useEffect(() => {
    // Try to load from Firebase first
    try {
      const q = query(collection(db, 'certifications'), orderBy('createdAt', 'desc'))
      
      // Real-time listener for Firebase
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const firebaseCerts: Certification[] = []
          querySnapshot.forEach((doc) => {
            firebaseCerts.push({ id: doc.id, ...doc.data() } as Certification)
          })
          
          if (firebaseCerts.length > 0) {
            setCertifications(firebaseCerts)
            setUsingFirebase(true)
            console.log('🔥 Loaded from Firebase:', firebaseCerts.length, 'certifications')
          }
        } else {
          // Fallback to localStorage or default
          loadLocalData()
        }
        setLoading(false)
      }, (error) => {
        console.error('Firebase error, using local data:', error)
        loadLocalData()
        setLoading(false)
      })

      return () => unsubscribe()
    } catch (error) {
      console.error('Firebase not configured, using local data:', error)
      loadLocalData()
      setLoading(false)
    }

    // Load cart count
    const cart = localStorage.getItem('cart')
    if (cart) {
      try {
        const cartItems = JSON.parse(cart)
        setCartCount(cartItems.length)
      } catch (e) {
        console.error('Error loading cart:', e)
      }
    }
  }, [])

  const loadLocalData = () => {
    const stored = localStorage.getItem('certifications')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed && parsed.length > 0) {
          setCertifications(parsed)
          setUsingFirebase(false)
          return
        }
      } catch (e) {
        console.error('Error loading certifications:', e)
      }
    }
    // Use default data
    setCertifications(defaultCertifications)
    setUsingFirebase(false)
  }

  const handleAddToCart = (cert: Certification) => {
    // Get existing cart
    const cart = localStorage.getItem('cart')
    let cartItems = cart ? JSON.parse(cart) : []
    
    // Check if item already in cart
    const existingItem = cartItems.find((item: Certification) => item.id === cert.id)
    
    if (!existingItem) {
      cartItems.push(cert)
      localStorage.setItem('cart', JSON.stringify(cartItems))
      setCartCount(cartItems.length)
      
      // Update cart badge in navbar
      window.dispatchEvent(new Event('cartUpdated'))
      
      // Show notification
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('showNotification', {
          detail: { message: `${cert.name} added to cart!`, type: 'success' }
        })
        window.dispatchEvent(event)
      }
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p className="mt-4 text-gray-600">Loading certifications...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
              ease: 'easeOut'
            }}
          >
            <CertificationCard certification={cert} onAddToCart={handleAddToCart} />
          </motion.div>
        ))}
      </div>

      {certifications.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl mb-4">No certifications available</p>
          <p className="text-sm">Go to Firebase Admin to add certifications!</p>
        </div>
      )}
    </div>
  )
}

