const { productsDB } = require('../db');

export interface IProduct {
  _id?: string;
  name?: string;
  artist?: string;
  imageUrl?: string;
}

export default class Product implements IProduct {
  constructor(
    public _id?: string,
    public name?: string,
    public artist?: string,
    public imageUrl?: string,
  ) {}

  static from(doc: Partial<IProduct>): Product {
    return new Product(doc._id, doc.name, doc.artist, doc.imageUrl);
  }

  save(): Promise<IProduct> {
    return productsDB.insert(this as any);
  }

  static find(query: Record<string, any> = {}): Promise<IProduct[]> {
    return productsDB.find(query);
  }

  static findOne(query: Record<string, any> = {}): Promise<IProduct | null> {
    return productsDB.findOne(query);
  }

  static findById(id: string): Promise<IProduct | null> {
    return productsDB.findOne({ _id: id });
  }

  static create(doc: Partial<IProduct>): Promise<IProduct> {
    return productsDB.insert(doc);
  }

  static async findByIdAndUpdate(id: string, update: Partial<IProduct>): Promise<IProduct | null> {
    await productsDB.update({ _id: id }, { $set: update }, {});
    return Product.findById(id);
  }

  static async findByIdAndDelete(id: string): Promise<{ _id: string } | null> {
    const removed = await productsDB.remove({ _id: id }, {});
    return removed ? { _id: id } : null;
  }

  static remove(query: Record<string, any> = {}): Promise<number> {
    return productsDB.remove(query, {});
  }
}
