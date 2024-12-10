import { schema } from '../schema'

export default async function(db: any) {
  // Create initial tables
  for (const table of Object.values(schema)) {
    await db.prepare(table.schema).run()
  }
} 