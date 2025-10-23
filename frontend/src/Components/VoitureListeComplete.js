import React, { useState, useEffect } from "react";
import { Card, Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import MyToast from "./MyToast";

export default function VoitureListeComplete() {
    const [voitures, setVoitures] = useState([]);
    const [proprietaires, setProprietaires] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState({
        id: null,
        marque: "",
        modele: "",
        couleur: "",
        immatricule: "",
        annee: "",
        prix: "",
        proprietaire: { id: "" }
    });

    const API_URL = "http://localhost:8065/voitures";

    // 🔁 Charger les données au démarrage
    useEffect(() => {
        fetchVoitures();
        fetchProprietaires();
    }, []);

    const fetchVoitures = () => {
        axios.get(API_URL)
            .then((response) => {
                console.log("Voitures chargées:", response.data);
                setVoitures(response.data);
            })
            .catch((error) => console.error("Erreur chargement:", error));
    };

    const fetchProprietaires = () => {
        axios.get(`${API_URL}/proprietaires`)
            .then((response) => {
                setProprietaires(response.data);
            })
            .catch((error) => console.error("Erreur propriétaires:", error));
    };

    // ➕ Ouvrir modal pour ajouter
    const handleAddClick = () => {
        setEditMode(false);
        setFormData({
            id: null,
            marque: "",
            modele: "",
            couleur: "",
            immatricule: "",
            annee: "",
            prix: "",
            proprietaire: { id: "" }
        });
        setShowModal(true);
    };

    // ✏️ Ouvrir modal pour modifier
    const handleEditClick = (voiture) => {
        setEditMode(true);
        setFormData({
            id: voiture.id,
            marque: voiture.marque,
            modele: voiture.modele,
            couleur: voiture.couleur,
            immatricule: voiture.immatricule,
            annee: voiture.annee,
            prix: voiture.prix,
            proprietaire: { id: voiture.proprietaire?.id || "" }
        });
        setShowModal(true);
    };

    // 💾 Sauvegarder (Ajouter ou Modifier)
    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSend = {
            ...formData,
            proprietaire: formData.proprietaire.id ? { id: parseInt(formData.proprietaire.id) } : null
        };

        const request = editMode
            ? axios.put(`${API_URL}/${formData.id}`, dataToSend)
            : axios.post(API_URL, dataToSend);

        request
            .then(() => {
                fetchVoitures();
                setShowModal(false);
                showToastMessage(
                    editMode ? "Voiture modifiée avec succès!" : "Voiture ajoutée avec succès!",
                    "success"
                );
            })
            .catch((error) => {
                console.error("Erreur sauvegarde:", error);
                showToastMessage("Erreur lors de la sauvegarde", "danger");
            });
    };

    // 🗑️ Supprimer une voiture
    const handleDelete = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette voiture ?")) {
            axios.delete(`${API_URL}/${id}`)
                .then(() => {
                    fetchVoitures();
                    showToastMessage("Voiture supprimée avec succès!", "danger");
                })
                .catch((error) => {
                    console.error("Erreur suppression:", error);
                    showToastMessage("Erreur lors de la suppression", "danger");
                });
        }
    };

    const showToastMessage = (message, type) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "proprietaire_id") {
            setFormData({ ...formData, proprietaire: { id: value } });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div>
            <MyToast show={showToast} message={toastMessage} type={toastType} />

            <Card className="border border-dark bg-dark text-white">
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <span>Liste des Voitures ({voitures.length})</span>
                    <Button variant="success" size="sm" onClick={handleAddClick}>
                        ➕ Ajouter une voiture
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                        <tr>
                            <th>ID</th>
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
                            <tr>
                                <td colSpan="9" className="text-center">Aucune voiture trouvée</td>
                            </tr>
                        ) : (
                            voitures.map((v) => (
                                <tr key={v.id}>
                                    <td>{v.id}</td>
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
                                            variant="outline-warning"
                                            className="me-2"
                                            onClick={() => handleEditClick(v)}
                                        >
                                            ✏️ Modifier
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline-danger"
                                            onClick={() => handleDelete(v.id)}
                                        >
                                            🗑️ Supprimer
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Modal Ajouter/Modifier */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title>{editMode ? "✏️ Modifier" : "➕ Ajouter"} une voiture</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body className="bg-dark text-white">
                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Marque</Form.Label>
                                <Form.Control
                                    required
                                    name="marque"
                                    value={formData.marque}
                                    onChange={handleInputChange}
                                    className="bg-dark text-white"
                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Modèle</Form.Label>
                                <Form.Control
                                    required
                                    name="modele"
                                    value={formData.modele}
                                    onChange={handleInputChange}
                                    className="bg-dark text-white"
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Couleur</Form.Label>
                                <Form.Control
                                    required
                                    name="couleur"
                                    value={formData.couleur}
                                    onChange={handleInputChange}
                                    className="bg-dark text-white"
                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Immatricule</Form.Label>
                                <Form.Control
                                    required
                                    name="immatricule"
                                    value={formData.immatricule}
                                    onChange={handleInputChange}
                                    className="bg-dark text-white"
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Année</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    name="annee"
                                    value={formData.annee}
                                    onChange={handleInputChange}
                                    className="bg-dark text-white"
                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Prix (€)</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    name="prix"
                                    value={formData.prix}
                                    onChange={handleInputChange}
                                    className="bg-dark text-white"
                                />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Propriétaire</Form.Label>
                            <Form.Select
                                name="proprietaire_id"
                                value={formData.proprietaire.id}
                                onChange={handleInputChange}
                                className="bg-dark text-white"
                            >
                                <option value="">-- Sélectionner un propriétaire --</option>
                                {proprietaires.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.prenom} {p.nom}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="bg-dark">
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Annuler
                        </Button>
                        <Button variant="success" type="submit">
                            {editMode ? "💾 Enregistrer" : "➕ Ajouter"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}