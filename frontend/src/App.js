import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import Bienvenue from "./Components/Bienvenue";
import VoitureListeComplete from "./Components/VoitureListeComplete";
import Voiture from "./Components/Voiture";
import Footer from "./Components/Footer";

function App() {
    const marginTop = { marginTop: "20px" };

    return (
        <Router>
            <NavigationBar />
            <Container>
                <Row>
                    <Col lg={12} style={marginTop}>
                        <Routes>
                            <Route path="/" element={<Bienvenue />} />
                            <Route path="/add" element={<Voiture />} />
                            <Route path="/list" element={<VoitureListeComplete />} />
                        </Routes>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </Router>
    );
}

export default App;
