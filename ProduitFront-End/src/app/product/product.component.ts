import { Component, OnInit, ViewChild } from '@angular/core';
import { ProduitServiceService } from '../produit-service.service';
import { Product } from '../product';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AjouterProduitComponent } from '../ajouter-produit/ajouter-produit.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { error } from 'console';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  product: Product[] | undefined ;

  displayedColumns: string[] = ['nom', 'prix_u', 'quantite', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private produitService: ProduitServiceService, private dialog : MatDialog) { }


  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
   
    this.produitService.getProducts().subscribe(product => {
      
      this.product = product;
      this.dataSource = new MatTableDataSource(product);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
      console.log(this.product)
    });
    
  }


  openDialog() {
    this.dialog.open(AjouterProduitComponent,{
     width :'30%'
    })
 
     
   }

  deleteProduct(id: number) { 
    if (window.confirm('vous êtes sûr !!')) {
    this.produitService.deleteProduct(id)
    .subscribe(
      (response: string) => {
        console.log(response)
        alert(response) 
        this.listProducts();
    })}
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editproductTest2(row : any){
    this.dialog.open(AjouterProduitComponent,{width:'30%' , data:row})
  }
  }


