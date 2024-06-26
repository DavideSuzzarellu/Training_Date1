import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Button, Modal, Form } from 'react-bootstrap/';


function EditTrainerProfile({ trainer, onChangeSubmit }) {
    const { store, actions } = useContext(Context);
    const { updateTrainer } = actions;
    const [show, setShow] = useState(false);
    const [inputs, setInputs] = useState({
        city: trainer.city,
        postal_code: trainer.postal_code,
        phone_number: trainer.phone_number,
        website_url: trainer.website_url,
        instagram_url: trainer.instagram_url,
        facebook_url: trainer.facebook_url,
        x_url: trainer.x_url,
        bank_iban: trainer.bank_iban
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(inputs);
        await updateTrainer(trainer.id, inputs);
        handleClose();
        onChangeSubmit();
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    const changeInputs = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    return (
        <>
            <Button className='w-auto' variant="primary" onClick={handleShow}>
                Editar perfil del entrenador
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="bg-primary text-white" closeButton>
                    <Modal.Title>Actualizar Entrenador</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="phone-number">
                            <Form.Label>Número de teléfono</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder={trainer.phone_number}
                                name='phone_number'
                                value={inputs.phone_number || ""}
                                onChange={changeInputs}
                                isInvalid={!/^([0-9]{9,})?$/.test(inputs.phone_number)} />
                            <Form.Control.Feedback type="invalid">
                                Por favor, proporciona un número de teléfono válido.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="city">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control type="text" placeholder={trainer.city} name='city' value={inputs.city || ""} onChange={changeInputs} />
                        </Form.Group>
                        <Form.Group controlId="postal-code">
                            <Form.Label>Código postal</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder={trainer.postal_code}
                                name='postal_code'
                                value={inputs.postal_code || ""}
                                onChange={changeInputs}
                                isInvalid={!/^([0-9]{5})?$/.test(inputs.postal_code)} />
                            <Form.Control.Feedback type="invalid">
                                Por favor, proporciona un código postal.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="bank_iban">
                            <Form.Label>IBAN</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={trainer.iban}
                                name='bank_iban'
                                value={inputs.bank_iban || ""}
                                onChange={changeInputs}
                                isInvalid={inputs.bank_iban && !/^[A-Z]{2}[0-9]{22}$/.test(inputs.bank_iban)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, proporciona un IBAN válido.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="website_url">
                            <Form.Label>URL del sitio web</Form.Label>
                            <Form.Control type="url" placeholder={trainer.website_url} name='website_url' value={inputs.website_url || ""} onChange={changeInputs} />
                        </Form.Group>
                        <Form.Group controlId="instagram_url">
                            <Form.Label>URL de Instagram</Form.Label>
                            <Form.Control type="url" placeholder={trainer.instagram_url} name='instagram_url' value={inputs.instagram_url || ""} onChange={changeInputs} />
                        </Form.Group>
                        <Form.Group controlId="facebook_url">
                            <Form.Label>URL de Facebook</Form.Label>
                            <Form.Control type="url" placeholder={trainer.facebook_url} name='facebook_url' value={inputs.facebook_url || ""} onChange={changeInputs} />
                        </Form.Group>
                        <Form.Group controlId="x_url">
                            <Form.Label>URL de Twitter</Form.Label>
                            <Form.Control type="url" placeholder={trainer.x_url} name='x_url' value={inputs.x_url || ""} onChange={changeInputs} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="success" type="submit" className='my-3' onClick={handleSubmit}>
                        Actualizar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditTrainerProfile;
