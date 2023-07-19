package com.Produit.Produit.Model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "Produit")
@Getter
@Setter
@RequiredArgsConstructor


public class Produit {

    @Id


    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String nom;

    private Integer Quantite;

    private BigDecimal prix_u;


}
