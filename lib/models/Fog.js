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
}
