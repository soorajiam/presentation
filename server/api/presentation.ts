import { defineEventHandler } from 'h3'
import { D1Database } from '@cloudflare/workers-types'
import { initDatabase } from '../database/init'
import type { Slide, TransformedSlide } from '~/types/database'

export default defineEventHandler(async (event) => {
  const db = useDatabase('myDatabase') as D1Database
  
  await initDatabase(db)
  
  try {
    const slides = await db
      .prepare('SELECT * FROM slides ORDER BY slide_order ASC')
      .all() as Slide[]
    
    const transformedSlides: TransformedSlide[] = slides.map(slide => ({
      title: slide.title,
      content: JSON.parse(slide.content)
    }))

    return { slides: transformedSlides }
  } catch (error) {
    console.error('Database query error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch slides'
    })
  }
}) 