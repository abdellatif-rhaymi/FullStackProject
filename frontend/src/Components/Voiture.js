import React, { useState } from "react";
import { Card, Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import MyToast from "./MyToast";

export default function Voiture() {
    const [voiture, setVoiture] = useState({
        marque: "",
        modele: "",
        couleur: "",
        annee: "",
        prix: "",
    });

    const [showToast, setShowToast] = useState(false);

    const handleChange = (e) => {
        setVoiture({ ...voiture, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8080/api/voitures", voiture)
            .then(() => {
                setShowToast(true);
                setVoiture({
                    marque: "",
                    modele: "",
                    couleur: "",
                    annee: "",
                    prix: "",
                });
                setTimeout(() => setShowToast(false), 3000);
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <MyToast show={showToast} message="Voiture ajoutée avec succès!" type="success" />

            <Card className="border border-dark bg-dark text-white">
                <Card.Header>Ajouter une Voiture</Card.Header>
                <Form onSubmit={handleSubmit}>
                    <Card.Body>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Marque</Form.Label>
                                <Form.Control
                                    required
                                    name="marque"
                                    type="text"
                                    value={voiture.marque}
                                    onChange={handleChange}
                                    className="bg-dark text-white"
                                    placeholder="Entrez la marque"
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Modèle</Form.Label>
                                <Form.Control
                                    required
                                    name="modele"
                                    type="text"
                                    value={voiture.modele}
                                    onChange={handleChange}
                                    className="bg-dark text-white"
                                    placeholder="Entrez le modèle"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mt-3">
                            <Form.Group as={Col}>
                                <Form.Label>Couleur</Form.Label>
                                <Form.Control
                                    required
                                    name="couleur"
                                    type="text"
                                    value={voiture.couleur}
                                    onChange={handleChange}
                                    className="bg-dark text-white"
                                    placeholder="Couleur"
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Année</Form.Label>
                                <Form.Control
                                    required
                                    name="annee"
                                    type="number"
                                    value={voiture.annee}
                                    onChange={handleChange}
                                    className="bg-dark text-white"
                                    placeholder="Année"
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Prix</Form.Label>
                                <Form.Control
                                    required
                                    name="prix"
                                    type="number"
                                    value={voiture.prix}
                                    onChange={handleChange}
                                    className="bg-dark text-white"
                                    placeholder="Prix"
                                />
                            </Form.Group>
                        </Row>
                    </Card.Body>

                    <Card.Footer className="text-end">
                        <Button size="sm" variant="success" type="submit">
                            Enregistrer
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </div>
    );
}