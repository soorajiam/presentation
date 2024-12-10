DROP TABLE IF EXISTS slides;

CREATE TABLE slides (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  main_title TEXT,
  content_type TEXT CHECK(content_type IN ('text', 'list', 'mixed')) NOT NULL,
  content TEXT NOT NULL,
  slide_order INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data
INSERT INTO slides (title, main_title, content_type, content, slide_order)
SELECT 
  json_extract(value, '$.title'),
  NULL,
  CASE 
    WHEN json_type(json_extract(value, '$.content')) = 'array' AND 
         json_array_length(json_extract(value, '$.content')) > 0 AND
         json_type(json_array(json_extract(value, '$.content', '$[0]'))) = 'array'
    THEN 'mixed'
    WHEN json_type(json_extract(value, '$.content')) = 'array'
    THEN 'list'
    ELSE 'text'
  END,
  json_extract(value, '$.content'),
  rowid - 1
FROM json_each((SELECT readfile('content/presentation.json')), '$.slides'); 