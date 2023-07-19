import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AjouterProduitComponent } from './ajouter-produit/ajouter-produit.component';

const routes: Routes = [

  { path: '', component: ProductComponent }, 
  { path: 'add', component: AjouterProduitComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
