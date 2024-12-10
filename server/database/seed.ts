import { D1Database } from '@cloudflare/workers-types'
import presentationData from '../../content/presentation.json'

export async function seedDatabase(db: D1Database) {
  try {
    // Check if data exists
    const existingSlides = await db.prepare('SELECT COUNT(*) as count FROM slides').first()
    
    if (!existingSlides || existingSlides.count === 0) {
      // Prepare the insert statement
      const insert = db.prepare(`
        INSERT INTO slides (title, main_title, content_type, content, slide_order)
        VALUES (?, ?, ?, ?, ?)
      `)

      // Insert each slide
      for (const [index, slide] of presentationData.slides.entries()) {
        const contentType = Array.isArray(slide.content) ? 
          (slide.content.every(item => typeof item === 'string') ? 'list' : 'mixed') : 
          'text'

        await insert.bind(
          slide.title,
          null,
          contentType,
          JSON.stringify(slide.content),
          index
        ).run()
      }
    }
  } catch (error) {
    console.error('Seeding error:', error)
    throw error
  }
} 