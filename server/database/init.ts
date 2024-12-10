import { D1Database } from '@cloudflare/workers-types'
import { seedDatabase } from './seed'

export async function initDatabase(db: D1Database) {
  try {
    // In development, seed the database
    if (process.env.NODE_ENV === 'development') {
      await seedDatabase(db)
    }
  } catch (error) {
    console.error('Database initialization error:', error)
  }
} 