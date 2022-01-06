export class Product {
  id: number;
  name: string;
  dateOfManufacture: Date;
  avatarProduct: string;
  description: string;


  constructor(name: string, dateOfManufacture: Date, avatarProduct: string, description: string) {
    this.name = name;
    this.dateOfManufacture = dateOfManufacture;
    this.avatarProduct = avatarProduct;
    this.description = description;
  }
}
