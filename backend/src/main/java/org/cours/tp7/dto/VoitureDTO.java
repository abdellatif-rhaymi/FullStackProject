package org.cours.tp7.dto;
import lombok.Data;

@Data
public class VoitureDTO {
    private long id;
    private String marque;
    private String modele;
    private String couleur;
    private String immatricule;
    private int annee;
    private int prix;
    private ProprietaireSimpleDTO proprietaire;

    @Data
    public static class ProprietaireSimpleDTO {
        private long id;
        private String nom;
        private String prenom;
    }
}