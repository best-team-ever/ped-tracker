import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "../../components/Card/Card.jsx";

class Help extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Help"
                category="List of informations to help you"
                content={
                  <div>
                    <div className="typo-line">
                      <p>
                        <span className="category">Model VX 820</span>Le PIN pad VX 820 de Verifone procure aux consommateurs un moyen de paiement d’une simplicité et d’une efficacité inégalées.
                        Facile à utiliser quel que soit l’environnement, cette nouvelle référence de la monétique intégrée offre un accès illimité aux fonctionnalités étendues du serveur
                        PAYware Wynid, tout en vous garantissant sécurité et fiabilité.
                      </p>
                      <img src="./images/vx820.jpg" width="172" height="172" alt="sign in"/>
                    </div>
                    <div className="typo-line">
                      <p className="category">How to get the <br/>serial number</p>
                      <blockquote>
                        <p>
                          La façade arrière du terminal contient des étiquettes de
                          l'information générale, le numéro de série, le PTID et l'Adresse Mac.
                          La façade arrière abrite également le panneau arrière amovible où le
                          câble de données est connecté. Il y a aussi des connecteurs pour
                          un montage de pôle de l’espace.<br/>
                          <br/>
                          1. Produit Général : Contient le numéro
                          de produit du terminal, le modèle et les
                          exigences d'alimentation<br/>
                          2. S/N : Numéro de série du terminal
                          unique<br/>
                          3. PTID : Identificateur unique de terminal
                          physique<br/>
                          4. Adresse Mac : Identificateur unique de
                          réseau<br/>
                          5. Connecteur de Pôle de l’Espace
                        </p>
                        <img src="./images/vx820back.jpg" width="172" height="172" alt="sign in"/>
                        <small>-</small>
                      </blockquote>
                    </div>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Help;
