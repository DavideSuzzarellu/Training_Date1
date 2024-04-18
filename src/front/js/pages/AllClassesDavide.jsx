import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card, Pagination, Alert, Button } from 'react-bootstrap';
import MapModal from "/workspaces/sp54-final-project-g3/src/front/js/component/MapModal.jsx";



export const AllClassesDavide = () => {
    const { store, actions } = useContext(Context);
    const { currentUser, allClasses, userClasses } = store;
    const { postUserClass } = actions


    return (
        <Container>
            {allClasses ? (
                allClasses.map((oneClass) => (
                    <Row className="d-flex align-items-center justify-content-center" key={oneClass.id}>
                        <Col lg={10}>
                            <Card>
                                <Card.Header>
                                    {oneClass.start_date}
                                </Card.Header>
                                <Card.Body className="d-flex flex-row justify-content-between align-items-center">
                                    <section>
                                        <Card.Text >
                                            <strong>Ciudad: </strong>{oneClass.city}
                                        </Card.Text>
                                        <Card.Text >
                                            <strong>Capacidad: </strong>{oneClass.capacity}
                                        </Card.Text>
                                        <Card.Text >
                                            <strong>Precio: </strong>{oneClass.price / 100}<span> €</span>
                                        </Card.Text>
                                    </section>
                                    <section>
                                        <MapModal className='mx-3' addressData={[oneClass.city, oneClass.postal_code, oneClass.street_name, oneClass.street_number]} />
                                        <Button variant="danger">
                                            {userClasses.find((userClass) => userClass.class_id === oneClass.id) ? (
                                                <span>No estoy interesado</span>
                                            ) : (
                                                <span onClick={async () => await postUserClass(oneClass.price, oneClass.id)}>Estoy interesado</span>
                                            )}
                                        </Button>
                                    </section>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ))
            ) : (
                <Row className="d-flex justify-content-center align-items-center">
                    <Col className="d-flex justify-content-center align-items-center m-4">
                        <Alert variant="warning" className="d-flex flex-column justify-content-center align-items-center w-75">
                            <Alert.Heading className="d-flex flex-row align-items-center justify-content-center gap-2"><IoIosWarning />No hay clases futuras disponibles</Alert.Heading>
                            <p>
                                Parece que aún no tienes ninguna clase futura.
                            </p>
                        </Alert>
                    </Col>
                </Row>
            )}
        </Container >
    )
}