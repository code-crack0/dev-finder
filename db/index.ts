import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
declare global {
    var db: PostgresJsDatabase<typeof schema> | undefined
}
let db:PostgresJsDatabase<typeof schema>;

const connectionString = process.env.DATABASE_URL!
if(process.env.NODE_ENV === 'production'){
    db = drizzle(postgres(connectionString,{prepare:false}))
}else{
    if(!global.db) global.db = drizzle(postgres(connectionString,{prepare:false}),{schema})
    db = global.db
}

export {db};