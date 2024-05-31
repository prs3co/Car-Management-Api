import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cars").del();

    // Inserts seed entries
    await knex("cars").insert([
        { name: "Mustang", start_rent: "2024-05-23", finish_rent: "2024-05-23", price: 3000000, image: null},
        { name: "Supra", start_rent: "2024-05-22", finish_rent: "2024-05-22", price: 2000000, image: null},
    ]);
};
