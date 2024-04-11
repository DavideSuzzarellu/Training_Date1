import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import Carousel from 'react-bootstrap/Carousel';
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Loading from './Loading.jsx';
import FilterAlert from './FilterAlert.jsx';
import ClassModal from './ClassModal.jsx';

const HomeUserClasses = () => {
    const { store, actions } = useContext(Context);
    const { currentUser, allClasses, userClasses } = store
    const { postUserClass, deleteUserClass } = actions
    const [showAlert, setShowAlert] = useState(false);
    const [interested, setInterested] = useState(interested)


    const chunkSize = 3;
    const chunkedClasses = [];
    for (let i = 0; i < userClasses.length; i += chunkSize) {
        chunkedClasses.push(userClasses.slice(i, i + chunkSize));
    }

    if (!currentUser || !currentUser.user) {
        return <Loading />;
    }

    if (!userClasses) {
        return <Loading />;
    }

    const handleInterested = async (value, classId, price) => {
        if (value) {
            setInterested(true)
            await deleteUserClass(currentUser.user.id, classId)
        } else {
            setInterested(false)
            await postUserClass(price, classId)
        }
    }

    return (
        <>
            {chunkedClasses.length > 1 ? (
                <Carousel prevIcon={<BsChevronCompactLeft />} nextIcon={<BsChevronCompactRight />}>
                    {chunkedClasses.map((chunk, index) => (
                        <Carousel.Item key={index}>
                            <div className="row">
                                {chunk.map(oneClass => (
                                    <div className='col-4' key={oneClass.id}>
                                        <Card className='my-3'>
                                            <Card.Header>Detalles de la Clase</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Clase de entrenamiento'}</Card.Title>
                                                <Card.Text>
                                                    {oneClass.class_details ? oneClass.class_details : 'Clase de entrenamiento'}
                                                </Card.Text>
                                                <div className='d-flex justify-content-center'>
                                                    <ClassModal userClass={oneClass} />
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <div className="row">
                    {allClasses.map(oneClass => (
                        <div className='col-4' key={oneClass.id}>
                            <Card className='my-3'>
                                <Card.Header>Detalles de la Clase</Card.Header>
                                <Card.Body>
                                    <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Clase de entrenamiento'}</Card.Title>
                                    <Card.Text>
                                        {oneClass.class_details ? oneClass.class_details : 'Clase de entrenamiento'}
                                    </Card.Text>
                                    <div className='d-flex justify-content-center gap-2'>
                                        <ClassModal userClass={oneClass} />
                                        <Button variant={interested ? "primary" : "danger"} onClick={() => handleInterested(!interested, oneClass.id, oneClass.price)}>
                                            {interested ? "Estoy interesado" : "No estoy interesado"}
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div >
            )}
            {
                allClasses.length === 0 && (
                    <FilterAlert location='userClasses' showAlert={setShowAlert} />
                )
            }
        </>
    )
}

export default HomeUserClasses;
