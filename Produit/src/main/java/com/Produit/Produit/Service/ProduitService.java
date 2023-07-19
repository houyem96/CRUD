package com.Produit.Produit.Service;

import com.Produit.Produit.Model.Produit;
import com.Produit.Produit.Repository.ProduitRepo;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService {

    @Autowired
    private ProduitRepo produitRepo ;

    public ProduitService( ProduitRepo produitRepo) {
        this.produitRepo = produitRepo;
    }
    public List<Produit> getAllProducts() {
        return produitRepo.findAll();
    }
    public Produit getProductById(Long id) throws NotFoundException {
        return produitRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Product not found with id: " + id));
    }
    public Produit createProduct(Produit produit) {


        return produitRepo.save(produit);
    }


    public void deleteProduct(Long id) {
        produitRepo.deleteById(id);
    }




    public Produit updateProduct(Long id, Produit productDetails) throws NotFoundException {
        Produit product = getProductById(id);

       // product.setId(productDetails.getId());
        product.setNom(productDetails.getNom());
        product.setQuantite(productDetails.getQuantite());
        product.setPrix_u(productDetails.getPrix_u());
        return produitRepo.save(product);
    }

}



