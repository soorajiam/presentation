export const schema = {
  slides: {
    schema: `
      CREATE TABLE IF NOT EXISTS slides (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        main_title TEXT,
        content_type TEXT CHECK(content_type IN ('text', 'list', 'mixed')) NOT NULL,
        content TEXT NOT NULL,
        slide_order INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `
  }
} 