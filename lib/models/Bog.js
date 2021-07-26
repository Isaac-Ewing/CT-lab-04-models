import pool from '../utils/pool';

export default class Bog {
    id;
    type;
    climate;
    substrate;

    constructor(row) {
      this.id = row.id;
      this.type = row.type;
      this.climate = row.climate;
      this.substrate = row.substrate;
    }

    static async insert({ type, climate, substrate }) {
      const { rows } = await pool.query('INSERT INTO bogs (type, climate, substrate) VALUES ($1, $2, $3) RETURNING *', [type, climate, substrate]
      );

      return new Bog(rows[0]);
    }

    static async getById(id) {
      const { rows } = await pool.query('SELECT * FROM bogs WHERE id=$1', [id]);

      return new Bog(rows[0]);
    }

    static async getAll() {
      const { rows } = await pool.query('SELECT * from bogs');

      return rows.map((row) => new Bog(row));
    }

    static async updateById(id, { type, climate, substrate }) {
      const currentBogs = await Bog.getById(id);
      const newType = type ?? currentBogs.type;
      const newClimate = climate ?? currentBogs.climate;
      const newSubstrate = substrate ?? currentBogs.substrate;

      const { rows } = await pool.query('UPDATE bogs SET type=$1, climate=$2, substrate=$3 WHERE id=$4 RETURNING *', [newType, newClimate, newSubstrate, id]);

      return new Bog(rows[0]);
    }

    static async deleteById(id) {
      const { rows } = await pool.query('DELETE FROM bogs WHERE id=$1 RETURNING *', [id]);

      return  new Bog(rows[0]);
    }
}
