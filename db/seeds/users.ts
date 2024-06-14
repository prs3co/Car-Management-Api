import { Knex } from "knex";
import { encryptPassword } from "../../app/utils/encrypt";
import { env } from "process";
import 'dotenv/config'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
          name: 'superadmin',
          email: 'superadmin@gmail.com',
          password: await encryptPassword(env.SUPERADMIN_PASS as string),
          role: 'superadmin',
          avatar: '',
          created_by: 'system',
          updated_by: 'system',
          created_at: knex.fn.now(),
          updated_at: knex.fn.now()
        },
        {
          name: 'admin',
          email: 'admin@gmail.com',
          password: await encryptPassword(env.ADMIN_PASS as string),
          role: 'admin',
          avatar: '',
          created_by: 'system',
          updated_by: 'system',
          created_at: knex.fn.now(),
          updated_at: knex.fn.now()
        },
        {
          name: 'prascool',
          email: 'prascool@gmail.com',
          password: await encryptPassword(env.USER_PASS as string),
          role: 'user',
          avatar: '',
          created_by: 'system',
          updated_by: 'system',
          created_at: knex.fn.now(),
          updated_at: knex.fn.now()
        },
    ]);
};
