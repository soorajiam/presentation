export interface Slide {
  id: number
  title: string
  main_title: string | null
  content_type: 'text' | 'list' | 'mixed'
  content: string // JSON string
  slide_order: number
  created_at: string
}

export interface TransformedSlide {
  title: string
  content: string | string[] | (string | string[])[]
} 