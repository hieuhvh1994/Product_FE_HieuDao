import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
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
  id: number;
  constructor(
    private productService: ProductService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      this.id = Number(paramMap.get('id'));
      this.productService.findProductById(this.id).subscribe(data => {
        console.log(data);
        this.form = data;
      });
    });
  }

  ngSubmit() {
    this.product = new Product (
      this.form.name,
      this.form.dateOfManufacture,
      this.form.avatarProduct,
      this.form.description
    );
    this.productService.updateProduct(this.id, this.product).subscribe(data => {
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
        this.status = 'Updated product successfully!';
      }
    });
  }

  onChangeAvatar($event: string) {
    this.form.avatarProduct = $event;
  }


}
