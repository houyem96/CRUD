package com.Produit.Produit.Repository;

import com.Produit.Produit.Model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProduitRepo extends JpaRepository<Produit, Long> {
}
