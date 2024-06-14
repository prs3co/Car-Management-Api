import { Model, ModelObject } from 'objection';

export class UsersModel extends Model {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  role!: string;
  avatar!: string;
  created_by!: string;
  updated_by!: string;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return 'users'
  }
}

export type UsersModelType = ModelObject<UsersModel>
export type Users = Omit<UsersModelType, 'id' | 'created_at' | 'updated_at'>;
