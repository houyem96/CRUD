package com.Produit.Produit.Controller;

import com.Produit.Produit.Model.Produit;
import com.Produit.Produit.Service.ProduitService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/products")
public class ProduitAPI {

    @Autowired
    private ProduitService produitService;

    public ProduitAPI  (ProduitService produitService) {
        this.produitService = produitService;
    }

    @GetMapping
    public ResponseEntity<List<Produit>> getAllProducts() {
        List<Produit> products = produitService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Produit> getProductById(@PathVariable Long id) throws NotFoundException {
        Optional<Produit> product = Optional.ofNullable(produitService.getProductById(id));
        return product.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @PostMapping
    public ResponseEntity<String> createProduct(@RequestBody Produit product) {
        Produit createdProduct = produitService.createProduct(product);
        return new ResponseEntity<>("produit créé", HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable Long id, @RequestBody Produit productDetails) throws NotFoundException {
        Produit updatedProduct = produitService.updateProduct(id, productDetails);
        return new ResponseEntity<>("produit Modifié", HttpStatus.OK);
    }
//@PutMapping("/{id}")
//    public ResponseEntity<Produit> updateProduct(@PathVariable Long id, @RequestBody Produit productDetails) throws NotFoundException {
//        Produit updatedProduct = produitService.updateProduct(id, productDetails);
//        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        produitService.deleteProduct(id);
        return new ResponseEntity<>("produit supprimé",HttpStatus.OK);
    }











}
