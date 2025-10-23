package org.cours.tp7.modele;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Voiture {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NonNull
    private String marque;
    @NonNull
    private String modele;
    @NonNull
    private String couleur;
    @NonNull
    private String immatricule;
    @NonNull
    private int annee;
    @NonNull
    private int prix;

    @ManyToOne(fetch = FetchType.EAGER) // ← Changé en EAGER pour charger le propriétaire
    @JoinColumn(name = "proprietaire_id")
    @JsonBackReference // ← Empêche la sérialisation récursive
    private Proprietaire proprietaire;

    public Voiture(@NonNull String marque, @NonNull String modele, @NonNull String couleur,
                   @NonNull String immatricule, @NonNull int annee, @NonNull int prix, Proprietaire proprietaire) {
        this.marque = marque;
        this.modele = modele;
        this.couleur = couleur;
        this.immatricule = immatricule;
        this.annee = annee;
        this.prix = prix;
        this.proprietaire = proprietaire;
    }
}