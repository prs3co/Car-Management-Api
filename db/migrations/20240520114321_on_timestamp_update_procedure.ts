import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.raw(
    `
      CREATE OR REPLACE FUNCTION on_update_timestamp()
      RETURNS trigger AS $$
      BEGIN
        NEW.update_at = now();
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `
  )
}


export async function down(knex: Knex): Promise<void> {
  return knex.raw(
    `
      DROP FUNCTION on_update_timestamp()
    `
  )
}

