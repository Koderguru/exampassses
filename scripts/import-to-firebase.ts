// Import existing certifications to Firebase
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { certifications } from '../data/certifications'

const firebaseConfig = {
  apiKey: "AIzaSyBmVOABasFllynnTkHdytg4jkd5qBDCPtQ",
  authDomain: "blackhat-store.firebaseapp.com",
  projectId: "blackhat-store",
  storageBucket: "blackhat-store.firebasestorage.app",
  messagingSenderId: "922096818947",
  appId: "1:922096818947:web:37ccf97b0b9726bb6d6736"
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)

async function importCertifications() {
  console.log('🔥 Starting Firebase import...')
  console.log(`📦 Found ${certifications.length} certifications to import`)
  
  let successCount = 0
  let errorCount = 0

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
      console.log(`✅ Imported: ${cert.code} - ${cert.name}`)
    } catch (error) {
      errorCount++
      console.error(`❌ Failed to import ${cert.code}:`, error)
    }
  }

  console.log('\n📊 Import Summary:')
  console.log(`✅ Success: ${successCount}`)
  console.log(`❌ Failed: ${errorCount}`)
  console.log(`📦 Total: ${certifications.length}`)
  console.log('\n🎉 Import completed!')
  
  process.exit(0)
}

importCertifications().catch(error => {
  console.error('❌ Import failed:', error)
  process.exit(1)
})

