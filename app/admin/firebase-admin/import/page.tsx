'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { db } from '@/lib/firebase'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { certifications } from '@/data/certifications'
import { FiUpload, FiTrash2, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import Link from 'next/link'

export default function ImportPage() {
  const [importing, setImporting] = useState(false)
  const [clearing, setClearing] = useState(false)
  const [result, setResult] = useState<{
    success: number
    failed: number
    total: number
    errors: string[]
  } | null>(null)

  const importToFirebase = async () => {
    setImporting(true)
    setResult(null)

    let successCount = 0
    let errorCount = 0
    const errors: string[] = []

    try {
      for (const cert of certifications) {
        try {
          await addDoc(collection(db, 'certifications'), {
            name: cert.name,
            code: cert.code,
            gradient: cert.gradient,
            category: cert.category,
            price: cert.price,
            description: cert.description,
            imageUrl: cert.imageUrl,
            createdAt: Date.now()
          })
          successCount++
        } catch (error: any) {
          errorCount++
          errors.push(`${cert.code}: ${error.message}`)
        }
      }

      setResult({
        success: successCount,
        failed: errorCount,
        total: certifications.length,
        errors
      })
    } catch (error) {
      alert('Import failed! Check console.')
      console.error(error)
    } finally {
      setImporting(false)
    }
  }

  const clearDatabase = async () => {
    if (!confirm('⚠️ This will DELETE ALL certifications from Firebase! Are you sure?')) {
      return
    }

    setClearing(true)
    try {
      const querySnapshot = await getDocs(collection(db, 'certifications'))
      const deletePromises = querySnapshot.docs.map(document => 
        deleteDoc(doc(db, 'certifications', document.id))
      )
      await Promise.all(deletePromises)
      alert(`✅ Deleted ${querySnapshot.size} certifications from Firebase`)
      setResult(null)
    } catch (error) {
      alert('Failed to clear database!')
      console.error(error)
    } finally {
      setClearing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-red-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin/firebase-admin" className="text-purple-600 hover:text-purple-700 font-semibold mb-4 inline-block">
            ← Back to Firebase Admin
          </Link>
          <h1 className="text-4xl font-extrabold gradient-text mb-2">
            Import Certifications
          </h1>
          <p className="text-gray-600">
            Import {certifications.length} certifications from local data to Firebase
          </p>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-soft p-8 mb-6"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FiUpload className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Ready to Import</h2>
              <p className="text-gray-600 mb-4">
                This will import all {certifications.length} certifications from your local data file to Firebase Firestore.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✅ OSCP+, OSEP, OSWE, OSWA, OSED, OSDA, OSWP, BSCP</li>
                <li>✅ CPTS, CBBH (HackTheBox)</li>
                <li>✅ CRTO, CRTL (Zero-Point Security)</li>
                <li>✅ PNPT, PJPT (TCM Security)</li>
                <li>✅ PT1, CEH</li>
                <li>✅ CRTP, CRTE, KLCP (Altered Security)</li>
                <li>✅ eWPT, eMAPT, eCIR, eJPT, eCTHP, eWPTX, eCPPT</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={importToFirebase}
              disabled={importing || clearing}
              className={`btn-primary flex items-center gap-2 ${
                importing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FiUpload className="w-5 h-5" />
              {importing ? 'Importing...' : `Import ${certifications.length} Certifications`}
            </button>

            <button
              onClick={clearDatabase}
              disabled={importing || clearing}
              className={`btn-secondary flex items-center gap-2 border-2 border-red-200 hover:bg-red-50 text-red-600 ${
                clearing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FiTrash2 className="w-5 h-5" />
              {clearing ? 'Clearing...' : 'Clear Database'}
            </button>
          </div>
        </motion.div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-soft p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              {result.failed === 0 ? (
                <FiCheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <FiAlertCircle className="w-8 h-8 text-yellow-600" />
              )}
              <h2 className="text-2xl font-bold">Import Complete!</h2>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-600">{result.success}</div>
                <div className="text-sm text-green-700">Successful</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-red-600">{result.failed}</div>
                <div className="text-sm text-red-700">Failed</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-600">{result.total}</div>
                <div className="text-sm text-blue-700">Total</div>
              </div>
            </div>

            {result.errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-bold text-red-900 mb-2">Errors:</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  {result.errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6">
              <Link href="/admin/firebase-admin" className="btn-primary">
                Go to Firebase Admin Panel
              </Link>
            </div>
          </motion.div>
        )}

        {/* Warning */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>⚠️ Note:</strong> This will create duplicate entries if you run it multiple times. 
            Use "Clear Database" first if you want to re-import.
          </p>
        </div>
      </div>
    </div>
  )
}

