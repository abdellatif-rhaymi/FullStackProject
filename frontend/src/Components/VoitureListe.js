import React, { useState, useEffect } from "react";
import { Card, Table, Button } from "react-bootstrap";
import axios from "axios";
import MyToast from "./MyToast";

export default function VoitureListe() {
    const [voitures, setVoitures] = useState([]);
    const [showToast, setShowToast] = useState(false);

    // 🔁 Charger les voitures au démarrage
    useEffect(() => {
        fetchVoitures();
    }, []);

    const fetchVoitures = () => {
        axios
            .get("http://localhost:8065/voitures")
            .then((response) => {
                // ✅ Nouveau format : les données sont directement dans response.data (array)
                setVoitures(response.data);
            })
            .catch((error) => console.error("Erreur lors du chargement :", error));
    };

    // 🗑️ Supprimer une voiture
    const deleteVoiture = (id) => {
        axios
            .delete(`http://localhost:8065/voitures/${id}`) // ✅ Correction : ajouter l'ID dans l'URL
            .then(() => {
                // ✅ Filtrer par ID directement
                setVoitures(voitures.filter((v) => v.id !== id));
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            })
            .catch((error) => console.error("Erreur de suppression :", error));
    };

    return (
        <div>
            <MyToast show={showToast} message="Voiture supprimée avec succès !" type="danger" />

            <Card className="border border-dark bg-dark text-white">
                <Card.Header>Liste des Voitures</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                        <tr>
                            <th>Marque</th>
                            <th>Modèle</th>
                            <th>Couleur</th>
                            <th>Immatricule</th>
                            <th>Année</th>
                            <th>Prix</th>
                            <th>Propriétaire</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {voitures.length === 0 ? (
                            <tr align="center">
                                <td colSpan="8">Aucune voiture trouvée</td>
                            </tr>
                        ) : (
                            voitures.map((v) => (
                                <tr key={v.id}>
                                    <td>{v.marque}</td>
                                    <td>{v.modele}</td>
                                    <td>{v.couleur}</td>
                                    <td>{v.immatricule}</td>
                                    <td>{v.annee}</td>
                                    <td>{v.prix.toLocaleString()} €</td>
                                    <td>
                                        {v.proprietaire
                                            ? `${v.proprietaire.prenom} ${v.proprietaire.nom}`
                                            : "N/A"
                                        }
                                    </td>
                                    <td>
                                        <Button
                                            size="sm"
                                            variant="outline-danger"
                                            onClick={() => deleteVoiture(v.id)}
                                        >
                                            Supprimer
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
}