import pool from '../utils/pool';

export default class Cog {
    id;
    functions;
    firstuse;

    constructor(row) {
      this.id = row.id;
      this.functions = row.functions;
      this.firstuse = row.firstuse;
    }

    static async insert({ functions, firstuse }) {
      const { rows } = await pool.query('INSERT INTO cogs (functions, firstuse) VALUES ($1, $2) RETURNING *', [functions, firstuse]
      );

      return new Cog(rows[0]);
    }
  
    static async getById(id) {
      const { rows } = await pool.query('SELECT * FROM cogs WHERE id=$1', [id]);
  
      return new Cog(rows[0]);
    }
  
    static async getAll() {
      const { rows } = await pool.query('SELECT * from cogs');
  
      return rows.map((row) => new Cog(row));
    }
  
    static async updateById(id, { functions, firstuse }) {
      const currentCogs = await Cog.getById(id);
      const newFunctions = functions ?? currentCogs.functions;
      const newUse = firstuse ?? currentCogs.firstuse;
  
      const { rows } = await pool.query('UPDATE cogs SET functions=$1, firstuse=$2 WHERE id=$3 RETURNING *', [newFunctions, newUse, id]);
      
      return (rows[0]);
    }
  
    static async deleteById(id) {
      const { rows } = await pool.query('DELETE FROM cogs WHERE id=$1 RETURNING *', [id]);
  
      return  new Cog(rows[0]);
    }
}
