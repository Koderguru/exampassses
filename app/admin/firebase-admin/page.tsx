'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiLogOut } from 'react-icons/fi'
import { auth, db } from '@/lib/firebase'
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  orderBy 
} from 'firebase/firestore'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Certification {
  id: string
  name: string
  code: string
  gradient: string
  category: string
  price: number
  description: string
  imageUrl: string
  createdAt?: number
}

export default function FirebaseAdminPage() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingCert, setEditingCert] = useState<Certification | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Login state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
      if (user) {
        loadCertifications()
      }
    })

    return () => unsubscribe()
  }, [])

  const loadCertifications = async () => {
    if (!db) {
      console.error('Firebase not configured')
      return
    }

    try {
      const q = query(collection(db, 'certifications'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const certs: Certification[] = []
      
      querySnapshot.forEach((doc) => {
        certs.push({ id: doc.id, ...doc.data() } as Certification)
      })
      
      setCertifications(certs)
    } catch (error) {
      console.error('Error loading certifications:', error)
      alert('Error loading certifications. Check console.')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    
    if (!auth) {
      setLoginError('Firebase is not configured. Please add environment variables.')
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      setEmail('')
      setPassword('')
    } catch (error: any) {
      console.error('Login error:', error)
      setLoginError(error.message || 'Invalid credentials')
    }
  }

  const handleLogout = async () => {
    if (!auth) return

    try {
      await signOut(auth)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleAddNew = () => {
    setEditingCert({
      id: '',
      name: '',
      code: '',
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
      category: '',
      price: 199.99,
      description: '',
      imageUrl: '',
      createdAt: Date.now()
    })
    setIsEditing(true)
  }

  const handleEdit = (cert: Certification) => {
    setEditingCert({ ...cert })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (!db) {
      alert('Firebase is not configured. Please add environment variables.')
      return
    }

    if (!confirm('Are you sure you want to delete this certification?')) return

    try {
      await deleteDoc(doc(db, 'certifications', id))
      await loadCertifications()
    } catch (error) {
      console.error('Error deleting:', error)
      alert('Error deleting certification')
    }
  }

  const handleSave = async () => {
    if (!editingCert) return

    if (!db) {
      alert('Firebase is not configured. Please add environment variables.')
      return
    }

    if (!editingCert.name || !editingCert.code || !editingCert.category) {
      alert('Please fill in all required fields!')
      return
    }

    try {
      if (editingCert.id) {
        // Update existing
        const certRef = doc(db, 'certifications', editingCert.id)
        await updateDoc(certRef, {
          name: editingCert.name,
          code: editingCert.code,
          gradient: editingCert.gradient,
          category: editingCert.category,
          price: editingCert.price,
          description: editingCert.description,
          imageUrl: editingCert.imageUrl
        })
      } else {
        // Add new
        await addDoc(collection(db, 'certifications'), {
          name: editingCert.name,
          code: editingCert.code,
          gradient: editingCert.gradient,
          category: editingCert.category,
          price: editingCert.price,
          description: editingCert.description,
          imageUrl: editingCert.imageUrl,
          createdAt: Date.now()
        })
      }

      await loadCertifications()
      setIsEditing(false)
      setEditingCert(null)
    } catch (error) {
      console.error('Error saving:', error)
      alert('Error saving certification')
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingCert(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-2xl font-bold gradient-text">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-red-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-center mb-2 gradient-text">Firebase Admin</h1>
          <p className="text-center text-gray-600 mb-6">Sign in with Firebase Auth</p>
          
          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="admin@blackhatstore.com"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Sign In with Firebase
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>🔥 Firebase Setup Required:</strong><br />
              1. Create Firebase project<br />
              2. Enable Email/Password auth<br />
              3. Add credentials to .env.local<br />
              4. Create admin user in Firebase Console
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold gradient-text mb-2">Firebase Admin Panel</h1>
            <p className="text-gray-600">Logged in as: <strong>{user.email}</strong></p>
          </div>
          <div className="flex gap-3">
            <a
              href="/admin/firebase-admin/import"
              className="btn-secondary flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              Import 25+ Certs
            </a>
            <button
              onClick={handleAddNew}
              className="btn-primary flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              Add New Certificate
            </button>
            <button
              onClick={handleLogout}
              className="btn-secondary flex items-center gap-2"
            >
              <FiLogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Edit Form Modal */}
        {isEditing && editingCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={handleCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingCert.id ? 'Edit' : 'Add'} Certification
                </h2>
                <button onClick={handleCancel} className="p-2 hover:bg-gray-100 rounded-lg">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Certification Name *
                  </label>
                  <input
                    type="text"
                    value={editingCert.name}
                    onChange={(e) => setEditingCert({ ...editingCert, name: e.target.value })}
                    className="input-field"
                    placeholder="e.g., OSCP Plus"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Code *
                  </label>
                  <input
                    type="text"
                    value={editingCert.code}
                    onChange={(e) => setEditingCert({ ...editingCert, code: e.target.value })}
                    className="input-field"
                    placeholder="e.g., OSCP+"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={editingCert.category}
                    onChange={(e) => setEditingCert({ ...editingCert, category: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Offensive Security"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingCert.price}
                    onChange={(e) => setEditingCert({ ...editingCert, price: parseFloat(e.target.value) || 0 })}
                    className="input-field"
                    placeholder="199.99"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gradient Class
                  </label>
                  <select
                    value={editingCert.gradient}
                    onChange={(e) => setEditingCert({ ...editingCert, gradient: e.target.value })}
                    className="input-field"
                  >
                    <option value="bg-gradient-to-br from-red-500 to-red-700">Red</option>
                    <option value="bg-gradient-to-br from-purple-500 to-purple-700">Purple</option>
                    <option value="bg-gradient-to-br from-blue-500 to-blue-700">Blue</option>
                    <option value="bg-gradient-to-br from-green-500 to-green-700">Green</option>
                    <option value="bg-gradient-to-br from-yellow-500 to-yellow-700">Yellow</option>
                    <option value="bg-gradient-to-br from-pink-500 to-pink-700">Pink</option>
                    <option value="bg-gradient-to-br from-indigo-500 to-indigo-700">Indigo</option>
                    <option value="bg-gradient-to-br from-cyan-500 to-cyan-700">Cyan</option>
                    <option value="bg-gradient-to-br from-orange-500 to-orange-700">Orange</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL (Imgur/ImgBB)
                  </label>
                  <input
                    type="url"
                    value={editingCert.imageUrl}
                    onChange={(e) => setEditingCert({ ...editingCert, imageUrl: e.target.value })}
                    className="input-field"
                    placeholder="https://i.imgur.com/abc123.png"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingCert.description}
                    onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                    className="input-field"
                    rows={3}
                    placeholder="Brief description..."
                  />
                </div>
              </div>

              {editingCert.imageUrl && (
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image Preview
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex justify-center">
                    <img
                      src={editingCert.imageUrl}
                      alt="Preview"
                      className="max-w-xs max-h-40 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Image not found</text></svg>'
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-8 flex gap-3 justify-end">
                <button onClick={handleCancel} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                  <FiSave className="w-4 h-4" />
                  Save to Firebase
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Certifications Table */}
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Image</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {certifications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No certifications in Firebase. Click &quot;Add New Certificate&quot;!
                    </td>
                  </tr>
                ) : (
                  certifications.map((cert) => (
                    <tr key={cert.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-purple-600">{cert.code}</span>
                      </td>
                      <td className="px-6 py-4 font-medium">{cert.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{cert.category}</td>
                      <td className="px-6 py-4 font-semibold">${cert.price}</td>
                      <td className="px-6 py-4">
                        {cert.imageUrl ? (
                          <img src={cert.imageUrl} alt={cert.name} className="w-12 h-12 object-contain rounded" />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs">No img</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleEdit(cert)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(cert.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

