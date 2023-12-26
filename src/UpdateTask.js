import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MyHeader from './MyHeader';
import Card from 'react-bootstrap/Card';

export default function UpdateTask() {
    const [Data, setData] = useState([]);
    const [CurrentTaskData, setCurrentTaskData] = useState();

    useEffect(() => {
        let Taskdata = JSON.parse(localStorage.getItem('TaskMate'));
        setData(Taskdata);
    }, []);

    useEffect(() => {
        MyTaskData();
    }, [Data]);

    const MyTaskData = () => {
        let url = window.location.href;
        let id = url.substring(url.lastIndexOf('/') + 1);
        console.log(id);
        if (id) {
            for (let i = 0; i < Data.length; i++) {
                if (Data[i].id == id) {
                    console.log(Data[i]);
                    let MyData = Data[i];
                    setCurrentTaskData(MyData);
                }
            }
        }
    };

    useEffect(() => {
        MyTaskData();
    }, [Data]);

    const formatLastUpdatedTime = () => {
        const currentDateFromData = CurrentTaskData?.currentDate;

        if (currentDateFromData) {
            const currentDate = new Date();
            const taskDate = new Date(currentDateFromData);
            const timeDifferenceInSeconds = Math.floor((currentDate - taskDate) / 1000);

            if (timeDifferenceInSeconds < 60) {
                return `${timeDifferenceInSeconds} seconds ago`;
            } else if (timeDifferenceInSeconds < 3600) {
                const minutes = Math.floor(timeDifferenceInSeconds / 60);
                return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
            } else {
                const hours = Math.floor(timeDifferenceInSeconds / 3600);
                return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
            }
        }

        return '';
    };

    return (
        <>
            <MyHeader />
            <Container>
                <Row className='text-center mt-3'>
                    <Col>
                        <div className='create_title mb-4'>
                            <h3>Task Details</h3>
                        </div>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <Card>
                            <Card.Header>Details</Card.Header>
                            <Card.Body>
                                <Card.Title>Task Name :-</Card.Title>
                                <Card.Text>{CurrentTaskData && CurrentTaskData.taskName}</Card.Text>
                                <Card.Title>Task Note :-</Card.Title>
                                <Card.Text>{CurrentTaskData && CurrentTaskData.taskTip}</Card.Text>
                                <Card.Title>Task Description :-</Card.Title>
                                <Card.Text>{CurrentTaskData && CurrentTaskData.taskDescription}</Card.Text>
                            </Card.Body>
                            <Card.Footer className='text-muted'>Last updated {formatLastUpdatedTime()}</Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
