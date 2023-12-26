import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { cartContext } from './ContextProvider';

export default function Task() {

    const { CartLength, setCartLength } = useContext(cartContext)
    const [Data, setData] = useState([])

    useEffect(() => {
        if (localStorage.getItem('TaskMate')) {
            let Taskdata = JSON.parse(localStorage.getItem('TaskMate'))
            setData(Taskdata)
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            taskName: '',
            taskDescription: '',
            taskTip: '',
            isImportant: false,
        },
        validationSchema: Yup.object({
            taskName: Yup.string()
                .min(2, 'Minimum 2 characters')
                .required('Required!'),
            taskDescription: Yup.string()
                .min(2, 'Minimum 2 characters')
                .required('Required!'),
            taskTip: Yup.string()
                .min(2, 'Minimum 2 characters'),
        }),
        onSubmit: (values) => {
            values['id'] = Date.now();
            values['currentDate'] = new Date();
            setData([...Data, values]);
            console.log([...Data, values]);
            setCartLength([...Data, values].length)
            localStorage.setItem('TaskMate', JSON.stringify([...Data, values]));
            formik.resetForm()
            alert('Task Add Successfully')
        },
    });

    return (
        <>
            <section>
                <Container>
                    <Row className='text-center mt-3'>
                        <Col>
                            <div className='create_title mb-4'>
                                <h3>Create Task</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{ span: 6, offset: 3 }}>
                            <div className='contact_form'>
                                <div className='App'>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className='text-start mb-4'>
                                            <label className='fw-medium mb-1'>Task Name :-</label>
                                            <br />
                                            <input
                                                type='text'
                                                name='taskName'
                                                value={formik.values.taskName}
                                                onChange={formik.handleChange}
                                                className='w-100 p-2 rounded'
                                                placeholder='Name'
                                            />
                                            {formik.errors.taskName && formik.touched.taskName && (
                                                <p>{formik.errors.taskName}</p>
                                            )}
                                        </div>
                                        <div className='text-start mb-4'>
                                            <label className='fw-medium mb-1'>Task Note :-</label>
                                            <br />
                                            <input
                                                type='text'
                                                name='taskTip'
                                                value={formik.values.taskTip}
                                                onChange={formik.handleChange}
                                                className='w-100 p-2 rounded'
                                                placeholder='Note'
                                            />
                                            {formik.errors.taskTip &&
                                                formik.touched.taskTip && (
                                                    <p>{formik.errors.taskTip}</p>
                                                )}
                                        </div>
                                        <div className='text-start mb-4'>
                                            <label className='fw-medium mb-1'>Task Description :-</label>
                                            <br />
                                            <textarea
                                                name='taskDescription'
                                                value={formik.values.taskDescription}
                                                onChange={formik.handleChange}
                                                className='w-100 p-2 rounded'
                                                placeholder='Description'
                                            />
                                            {formik.errors.taskDescription &&
                                                formik.touched.taskDescription && (
                                                    <p>{formik.errors.taskDescription}</p>
                                                )}
                                        </div>

                                        <div className='text-start mb-4'>
                                            <label className='fw-medium'>
                                                <input
                                                    type='checkbox'
                                                    name='isImportant'
                                                    checked={formik.values.isImportant === true}
                                                    onChange={formik.handleChange}
                                                    className="form-check-input mystyle me-2"
                                                />{' '}
                                                Important
                                            </label>
                                        </div>
                                        <div className='text-center mb-4'>
                                            <button className='btn btn-dark' type='submit'>
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}
