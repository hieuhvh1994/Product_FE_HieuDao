import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  form: any = {};
  status = 'Please fill all fields!';
  product: Product;
  errorName: any = {
    message: 'no_name'
  };
  errorDate: any = {
    message: 'no_date'
  };
  errorAvatar: any = {
    message: 'no_avatar'
  };
  errorDescription: any = {
    message: 'no_description'
  };
  success: any = {
    message: 'success'
  };
  constructor(
    private productService: ProductService
  ) { }
  ngOnInit(): void {
  }

  ngSubmit() {
    this.product = new Product (
      this.form.name,
      this.form.dateOfManufacture,
      this.form.avatarProduct,
      this.form.description
    );
    this.productService.addProduct(this.product).subscribe(data => {
      if (JSON.stringify(data) === JSON.stringify(this.errorName)) {
        this.status = 'Please enter a name!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.errorDate)) {
        this.status = 'Please enter a date!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.errorAvatar)) {
        this.status = 'Please upload an avatar!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.errorDescription)) {
        this.status = 'Please enter description!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.success)) {
        this.form = {};
        this.status = 'Create product successfully!';
      }
    });
  }

  onChangeAvatar($event: string) {
    this.form.avatarProduct = $event;
  }

}
