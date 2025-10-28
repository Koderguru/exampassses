'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi'

interface Certification {
  id: string
  name: string
  code: string
  gradient: string
  category: string
  price: number
  description: string
  imageUrl: string
}

export default function AdminPage() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingCert, setEditingCert] = useState<Certification | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')

  // Simple authentication (change password as needed)
  const ADMIN_PASSWORD = 'blackhat2025'

  useEffect(() => {
    if (isAuthenticated) {
      loadCertifications()
    }
  }, [isAuthenticated])

  const loadCertifications = () => {
    const stored = localStorage.getItem('certifications')
    if (stored) {
      setCertifications(JSON.parse(stored))
    }
  }

  const saveCertifications = (certs: Certification[]) => {
    localStorage.setItem('certifications', JSON.stringify(certs))
    setCertifications(certs)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setPassword('')
    } else {
      alert('Incorrect password!')
    }
  }

  const handleAddNew = () => {
    setEditingCert({
      id: `cert-${Date.now()}`,
      name: '',
      code: '',
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
      category: '',
      price: 0,
      description: '',
      imageUrl: ''
    })
    setIsEditing(true)
  }

  const handleEdit = (cert: Certification) => {
    setEditingCert({ ...cert })
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this certification?')) {
      const updated = certifications.filter(c => c.id !== id)
      saveCertifications(updated)
    }
  }

  const handleSave = () => {
    if (!editingCert) return

    if (!editingCert.name || !editingCert.code || !editingCert.category) {
      alert('Please fill in all required fields!')
      return
    }

    const existing = certifications.find(c => c.id === editingCert.id)
    let updated: Certification[]

    if (existing) {
      updated = certifications.map(c => c.id === editingCert.id ? editingCert : c)
    } else {
      updated = [...certifications, editingCert]
    }

    saveCertifications(updated)
    setIsEditing(false)
    setEditingCert(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingCert(null)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-red-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-center mb-6 gradient-text">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>
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
            <h1 className="text-4xl font-extrabold gradient-text mb-2">Admin Panel</h1>
            <p className="text-gray-600">Manage certifications, images, and content</p>
          </div>
          <button
            onClick={handleAddNew}
            className="btn-primary flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" />
            Add New Certificate
          </button>
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
                  {certifications.find(c => c.id === editingCert.id) ? 'Edit' : 'Add'} Certification
                </h2>
                <button onClick={handleCancel} className="p-2 hover:bg-gray-100 rounded-lg">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
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

                {/* Code */}
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

                {/* Category */}
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

                {/* Price */}
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

                {/* Gradient */}
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

                {/* Image URL */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={editingCert.imageUrl}
                    onChange={(e) => setEditingCert({ ...editingCert, imageUrl: e.target.value })}
                    className="input-field"
                    placeholder="https://example.com/badge.png"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tip: Use imgur.com or imgbb.com to host images
                  </p>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingCert.description}
                    onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                    className="input-field"
                    rows={3}
                    placeholder="Brief description of the certification..."
                  />
                </div>
              </div>

              {/* Image Preview */}
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

              {/* Action Buttons */}
              <div className="mt-8 flex gap-3 justify-end">
                <button onClick={handleCancel} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                  <FiSave className="w-4 h-4" />
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Certifications List */}
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {certifications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No certifications yet. Click &quot;Add New Certificate&quot; to get started!
                    </td>
                  </tr>
                ) : (
                  certifications.map((cert) => (
                    <motion.tr
                      key={cert.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-purple-600">{cert.code}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{cert.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{cert.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">${cert.price}</span>
                      </td>
                      <td className="px-6 py-4">
                        {cert.imageUrl ? (
                          <img 
                            src={cert.imageUrl} 
                            alt={cert.name}
                            className="w-12 h-12 object-contain rounded"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" fill="%23ddd"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="10">No img</text></svg>'
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                            No img
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleEdit(cert)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(cert.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-3">📝 Quick Tips:</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Upload images to <a href="https://imgur.com" target="_blank" className="underline font-semibold">imgur.com</a> or <a href="https://imgbb.com" target="_blank" className="underline font-semibold">imgbb.com</a></li>
            <li>• Copy the direct image link and paste it in the &quot;Image URL&quot; field</li>
            <li>• Changes are saved to localStorage (browser storage)</li>
            <li>• Export your data regularly to avoid losing it</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

