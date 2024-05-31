import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
    table.increments("id").primary()
    table.string("name", 255).notNullable()
    table.date('start_rent').notNullable()
    table.date('finish_rent').notNullable()
    table.float('price').notNullable().defaultTo(0)
    table.text('image')
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars")
}

