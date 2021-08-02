import pool from '../utils/pool';

export default class Fog {
    id;
    type;
    formedby;

    constructor(row) {
      this.id = row.id;
      this.type = row.type;
      this.formedby = row.formedby;
    }

    static async insert({ type, formedby }) {
      const { rows } = await pool.query('INSERT INTO fogs (type, formedby) VALUES ($1, $2) RETURNING *', [type, formedby]
      );
      return new Fog(rows[0]);
    }
    static async getById(id) {
      const { rows } = await pool.query('SELECT * FROM fogs WHERE id=$1', [id]);
    
      return new Fog(rows[0]);
    }
    
    static async getAll() {
      const { rows } = await pool.query('SELECT * from fogs');
    
      return rows.map((row) => new Fog(row));
    }
    
    static async updateById(id, { type, formedby }) {
      const currentFogs = await Fog.getById(id);
      const newType = type ?? currentFogs.type;
      const newFormation = formedby ?? currentFogs.formedby;
    
      const { rows } = await pool.query('UPDATE fogs SET type=$1, formedby=$2 WHERE id=$3 RETURNING *', [newType, newFormation, id]);
        
      return (rows[0]);
    }
    
    static async deleteById(id) {
      const { rows } = await pool.query('DELETE FROM fogs WHERE id=$1 RETURNING *', [id]);
    
      return  new Fog(rows[0]);
    }
}

