import { Component, OnInit,Inject, ViewChild  } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ProduitServiceService } from '../produit-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../product';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { error } from 'console';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css']
})
export class AjouterProduitComponent implements OnInit {
  actionBtn : String ="Ajouter"
  productForm !: FormGroup;
  product: Product[] | undefined ;

  displayedColumns: string[] = ['nom', 'prix_u', 'quantite', 'action'];
  dataSource!: MatTableDataSource<any>;

  
  constructor(private formBuilder : FormBuilder,private produitService : ProduitServiceService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<AjouterProduitComponent>, private dialog : MatDialog, private router: Router) { }
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    

    this.productForm = this.formBuilder.group({
      nom : ['',Validators.required],
      quantite : [0,Validators.required],
      prix_u : [0,Validators.required],

    })
console.log(this.editData)
    if(this.editData){
     this.actionBtn = "Modifier" 
this.productForm.controls['nom'].setValue(this.editData.nom);
this.productForm.controls['quantite'].setValue(this.editData.quantite);
this.productForm.controls['prix_u'].setValue(this.editData.prix_u);
    }

    
  }
addproduct(){
console.log(this.productForm.value);
  if(!this.editData){
    if(this.productForm.valid){this.produitService.createProduct(this.productForm.value)
    .subscribe(
      (response: string) => {
        alert(response)
        this.dialogRef.close('Ajouter');
        this.router.navigate(['']);
  })
  }
    
}
else{this.editproduct()}
}

editproduct(){
  this.produitService.putproduct(this.productForm.value,this.editData.id)
  .subscribe((response: string) => {
    alert(response)
    this.dialogRef.close('Modifier');
    this.reloadCurrentRoute();

  })
}

 //Fonction pour recharger la route actuelle
reloadCurrentRoute() {
  this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
    this.router.navigate([this.router.url]);
  });
}
  listProducts() {
   
    this.produitService.getProducts().subscribe(product => {
      
      this.product = product;
      this.dataSource = new MatTableDataSource(product);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    }); 
  }

}
