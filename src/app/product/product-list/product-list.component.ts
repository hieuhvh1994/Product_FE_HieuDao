import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {ProductDeleteComponent} from '../product-delete/product-delete.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'dateOfManufacture', 'description', 'avatarProduct', 'edit', 'delete'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  products: Product[] = [];
  status: any;
  id: number;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.productService.getAll().subscribe(data => {
      this.products = data;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
    });
  }

  getDeleteDialog(id: number) {
    const deleteDialog = this.dialog.open(ProductDeleteComponent);
    deleteDialog.afterClosed().subscribe(choice => {
      if (choice) {
        this.productService.deleteProduct(id).subscribe(data => {
          console.log('id: ' + id);
          this.getAll();
        });

      }
    });
  }

}
