package org.cours.tp7.web;

import org.cours.tp7.modele.Voiture;
import org.cours.tp7.modele.VoitureRepo;
import org.cours.tp7.modele.Proprietaire;
import org.cours.tp7.modele.ProprietaireRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/voitures")
@CrossOrigin(origins = "http://localhost:3000")
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;

    @Autowired
    private ProprietaireRepo proprietaireRepo;

    // Méthode pour convertir Voiture en Map (évite la récursion JSON)
    private Map<String, Object> voitureToMap(Voiture v) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", v.getId());
        map.put("marque", v.getMarque());
        map.put("modele", v.getModele());
        map.put("couleur", v.getCouleur());
        map.put("immatricule", v.getImmatricule());
        map.put("annee", v.getAnnee());
        map.put("prix", v.getPrix());

        if (v.getProprietaire() != null) {
            Map<String, Object> propMap = new HashMap<>();
            propMap.put("id", v.getProprietaire().getId());
            propMap.put("nom", v.getProprietaire().getNom());
            propMap.put("prenom", v.getProprietaire().getPrenom());
            map.put("proprietaire", propMap);
        }

        return map;
    }

    // GET - Récupérer toutes les voitures
    @GetMapping
    public List<Map<String, Object>> getVoitures() {
        return StreamSupport.stream(voitureRepo.findAll().spliterator(), false)
                .map(this::voitureToMap)
                .collect(Collectors.toList());
    }

    // GET - Récupérer une voiture par ID
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getVoitureById(@PathVariable Long id) {
        return voitureRepo.findById(id)
                .map(v -> ResponseEntity.ok(voitureToMap(v)))
                .orElse(ResponseEntity.notFound().build());
    }

    // POST - Ajouter une nouvelle voiture
    @PostMapping
    public ResponseEntity<Map<String, Object>> createVoiture(@RequestBody Voiture voiture) {
        // Si un proprietaire_id est fourni, on l'associe
        if (voiture.getProprietaire() != null && voiture.getProprietaire().getId() > 0) {
            Proprietaire prop = proprietaireRepo.findById(voiture.getProprietaire().getId())
                    .orElse(null);
            voiture.setProprietaire(prop);
        }

        Voiture saved = voitureRepo.save(voiture);
        return ResponseEntity.ok(voitureToMap(saved));
    }

    // PUT - Modifier une voiture existante
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateVoiture(@PathVariable Long id, @RequestBody Voiture voiture) {
        return voitureRepo.findById(id)
                .map(existingVoiture -> {
                    existingVoiture.setMarque(voiture.getMarque());
                    existingVoiture.setModele(voiture.getModele());
                    existingVoiture.setCouleur(voiture.getCouleur());
                    existingVoiture.setImmatricule(voiture.getImmatricule());
                    existingVoiture.setAnnee(voiture.getAnnee());
                    existingVoiture.setPrix(voiture.getPrix());

                    if (voiture.getProprietaire() != null && voiture.getProprietaire().getId() > 0) {
                        Proprietaire prop = proprietaireRepo.findById(voiture.getProprietaire().getId())
                                .orElse(null);
                        existingVoiture.setProprietaire(prop);
                    }

                    Voiture updated = voitureRepo.save(existingVoiture);
                    return ResponseEntity.ok(voitureToMap(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE - Supprimer une voiture
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVoiture(@PathVariable Long id) {
        if (voitureRepo.existsById(id)) {
            voitureRepo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // GET - Récupérer tous les propriétaires (pour le dropdown dans React)
    @GetMapping("/proprietaires")
    public Iterable<Proprietaire> getAllProprietaires() {
        return proprietaireRepo.findAll();
    }
}