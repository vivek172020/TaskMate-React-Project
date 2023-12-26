import React, { useContext, useEffect, useState } from "react"
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Container, Row } from "react-bootstrap";
import MyHeader from "./MyHeader";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { cartContext } from "./ContextProvider";

export default function ViewTask() {
    const { CartLength, setCartLength } = useContext(cartContext)
    const [Data, setData] = useState()
    const [TaskEditID, setTaskEditID] = useState('')
    const [Right, setRight] = useState('Complite')
    const [Wrong, setWrong] = useState('Not Complite')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const Navigate = useNavigate()

    useEffect(() => {
        let Taskdata = JSON.parse(localStorage.getItem('TaskMate'))
        setData(Taskdata)

    }, [])

    const handleDelete2 = (id) => {
        if (id) {
            console.log(id)
            let Taskdelete = Data.filter((i) => i.id !== id)
            console.log(Taskdelete)
            setData(Taskdelete)
            setCartLength(Taskdelete.length)
            localStorage.setItem('TaskMate', JSON.stringify(Taskdelete))
            alert('Task Delete Successfully')

        }
    }
    const handleDelete = (id) => {
        if (id) {

            const updatedData = Data.filter((_, index) => !id.includes(index));

            setData(updatedData);
            setCartLength(updatedData.length);
            localStorage.setItem('TaskMate', JSON.stringify(updatedData));

            alert('Selected tasks deleted successfully');
        }
    }

    const handleEdit = (id) => {
        console.log(id)
        setTaskEditID(id)

        setShow(true);
        for (let i = 0; i < Data.length; i++) {
            if (Data[i].id == id) {
                console.log(Data[i].id, 'gug')
                formik.setFieldValue('taskNameEdit', Data[i].taskName)
                formik.setFieldValue('taskDescriptionEdit', Data[i].taskDescription)
                formik.setFieldValue('taskNoteEdit', Data[i].taskTip)
                formik.setFieldValue('isImportantEdit', Data[i].isImportant)
            }
        }
    }

    const handleView = ((id) => {
        Navigate('/updatetask/' + id)
    })

    const handleSave = () => {
        document.getElementById('addr-btn').click()
    }

    const formik = useFormik({
        initialValues: {
            taskNameEdit: '',
            taskDescriptionEdit: '',
            taskNoteEdit: '',
            isImportantEdit: false,
        },
        validationSchema: Yup.object({
            taskNameEdit: Yup.string()
                .min(2, 'Minimum 2 characters')
                .required('Required!'),
            taskDescriptionEdit: Yup.string()
                .min(2, 'Minimum 2 characters')
                .required('Required!'),
            taskNoteEdit: Yup.string()
                .min(2, 'Minimum 2 characters'),
        }),
        onSubmit: (values) => {
            if (TaskEditID) {
                let findEditRow = Data.findIndex((item) => item.id == TaskEditID)
                let updateData = Data
                updateData[findEditRow].taskName = values.taskNameEdit
                updateData[findEditRow].taskDescription = values.taskDescriptionEdit
                updateData[findEditRow].taskTip = values.taskNoteEdit
                updateData[findEditRow].isImportant = values.isImportantEdit
                updateData[findEditRow].currentDate = new Date()

                setData(updateData)
                localStorage.setItem('TaskMate', JSON.stringify(updateData))
                setTaskEditID('')
                formik.resetForm()
                setShow(false)
                alert('Task Update Successfully')
            }
        },
    });

    const columns = [
        {
            name: "",
            label: "No",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <span>{tableMeta.rowIndex + 1}</span>
                )
            },
        },
        {
            name: "taskName",
            label: "Task Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "taskDescription",
            label: "Task Description",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "taskTip",
            label: "Task Note",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "isImportant",
            label: "Task Status",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <p>{Data[tableMeta.rowIndex].isImportant === true ? Right : Wrong}</p>
                )
            },
        },
        {
            name: "view",
            label: "Task View",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button className="btn btn-info" onClick={() => handleView(Data[tableMeta.rowIndex].id)}>View</button>
                )
            },
        },
        {
            name: "edit",
            label: "Task Edit",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button className="btn btn-secondary" onClick={() => handleEdit(Data[tableMeta.rowIndex].id)}>Edit</button>
                )
            },
        },
        {
            name: "delete",
            label: "Task Delete",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button className="btn btn-danger" onClick={() => handleDelete2(Data[tableMeta.rowIndex].id)}>Delete</button>
                )
            },
        },
    ];

    const options = {
        filterType: 'checkbox',
        responsive: 'standard',
        selectableRows: 'multiple',
        onRowsDelete: (rowsDeleted) => handleDelete(rowsDeleted.data.map((row) => row.dataIndex)),
    };

    return (
        <>
            {/* ALL TASK LIST */}

            <MyHeader />
            <Container>
                <Row className='text-center mt-3'>
                    <Col>
                        <div className='create_title mb-4'>
                            <h3>Task List</h3>
                        </div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <div>
                            <MUIDataTable
                                data={Data}
                                columns={columns}
                                options={options}
                            />
                        </div>
                    </Col>
                </Row>

                {/* EDIT TASK */}

                <Row>
                    <Col>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Task</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='text-start mb-4'>
                                        <label className='fw-medium mb-1'>Task Name:-</label>
                                        <br />
                                        <input
                                            type='text'
                                            name='taskNameEdit'
                                            value={formik.values.taskNameEdit}
                                            onChange={formik.handleChange}
                                            className='w-100 p-2 rounded'
                                        />
                                        {formik.errors.taskNameEdit && formik.touched.taskNameEdit && (
                                            <p>{formik.errors.taskNameEdit}</p>
                                        )}
                                    </div>
                                    <div className='text-start mb-4'>
                                        <label className='fw-medium mb-1'>Task Note:-</label>
                                        <br />
                                        <input
                                            type='text'
                                            name='taskNoteEdit'
                                            value={formik.values.taskNoteEdit}
                                            onChange={formik.handleChange}
                                            className='w-100 p-2 rounded'
                                        />
                                        {formik.errors.taskNoteEdit &&
                                            formik.touched.taskNoteEdit && (
                                                <p>{formik.errors.taskNoteEdit}</p>
                                            )}
                                    </div>
                                    <div className='text-start mb-4'>
                                        <label className='fw-medium mb-1'>Task Description:-</label>
                                        <br />
                                        <textarea
                                            name='taskDescriptionEdit'
                                            value={formik.values.taskDescriptionEdit}
                                            onChange={formik.handleChange}
                                            className='w-100 p-2 rounded'
                                        />
                                        {formik.errors.taskDescriptionEdit &&
                                            formik.touched.taskDescriptionEdit && (
                                                <p>{formik.errors.taskDescriptionEdit}</p>
                                            )}
                                    </div>
                                    <div className='text-start mb-4'>
                                        <label className='fw-medium mb-1'>
                                            <input
                                                type='checkbox'
                                                name='isImportantEdit'
                                                checked={formik.values.isImportantEdit === true}
                                                onChange={formik.handleChange}
                                                className="form-check-input mystyle me-2"
                                            />{' '}
                                            Important
                                        </label>
                                    </div>
                                    <div className='text-center mb-4 d-none'>
                                        <button id="addr-btn" className='btn btn-dark' type='submit'>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleSave}>
                                    Update
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
