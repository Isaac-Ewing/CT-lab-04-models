import pool from '../utils/pool';

export default class Log {
    id;
    type;
    exists;

    constructor(row) {
      this.id = row.id;
      this.type = row.type;
      this.exists = row.exists;
    }

    static async insert({ type, exists }) {
      const { rows } = await pool.query('INSERT INTO logs (type, exists) VALUES ($1, $2) RETURNING *', [type, exists]
      );

      return new Log(rows[0]);
    }
  
    static async getById(id) {
      const { rows } = await pool.query('SELECT * FROM logs WHERE id=$1', [id]);
  
      return new Log(rows[0]);
    }
  
    static async getAll() {
      const { rows } = await pool.query('SELECT * from logs');
  
      return rows.map((row) => new Log(row));
    }
  
    static async updateById(id, { type, exists }) {
      const currentLogs = await Log.getById(id);
      const newType = type ?? currentLogs.type;
      const newExistance = exists ?? currentLogs.exists;
  
      const { rows } = await pool.query('UPDATE logs SET type=$1, exists=$2 WHERE id=$3 RETURNING *', [newType, newExistance, id]);
      
      return (rows[0]);
    }
  
    static async deleteById(id) {
      const { rows } = await pool.query('DELETE FROM logs WHERE id=$1 RETURNING *', [id]);
  
      return  new Log(rows[0]);
    }
}
