import {createConnection} from 'typeorm'

createConnection().then(() => console.log('[SERVIDOR] Conectado ao banco de dados "crud" com PostgreSQL'))