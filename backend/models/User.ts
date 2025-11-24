const { usersDB } = require('../db');

export interface IUser {
  _id?: string;
  username?: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default class User implements IUser {
  constructor(
    public _id?: string,
    public username?: string,
    public password?: string,
    public createdAt?: string,
    public updatedAt?: string,
  ) {}

  static from(doc: Partial<IUser>): User {
    return new User(doc._id, doc.username, doc.password, doc.createdAt, doc.updatedAt);
  }

  save(): Promise<IUser> {
    return usersDB.insert(this as any);
  }

  static find(query: Record<string, any> = {}): Promise<IUser[]> {
    return usersDB.find(query);
  }

  static findOne(query: Record<string, any> = {}): Promise<IUser | null> {
    return usersDB.findOne(query);
  }

  static findById(id: string): Promise<IUser | null> {
    return usersDB.findOne({ _id: id });
  }

  static create(doc: Partial<IUser>): Promise<IUser> {
    return usersDB.insert(doc);
  }

  static async findByIdAndUpdate(id: string, update: Partial<IUser>): Promise<IUser | null> {
    await usersDB.update({ _id: id }, { $set: update }, {});
    return User.findById(id);
  }

  static async findByIdAndDelete(id: string): Promise<{ _id: string } | null> {
    const removed = await usersDB.remove({ _id: id }, {});
    return removed ? { _id: id } : null;
  }
}
