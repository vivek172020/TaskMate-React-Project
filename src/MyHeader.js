import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import Myimg from './Images/bag.svg'
import { useContext, useEffect, useState } from 'react';
import { cartContext } from './ContextProvider';

function MyHeader() {
    const { CartLength, setCartLength } = useContext(cartContext)
    const [Data, setData] = useState([])

    useEffect(() => {
        let Taskdata = JSON.parse(localStorage.getItem('TaskMate'))
        setData(Taskdata)
    }, [])

    useEffect(() => {
        setCartLength(Data.length);
    }, [Data]);
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">TaskMate</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="ms-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/ViewTask">View</Nav.Link>
                        <Nav.Link className='Mynav'> <img src={Myimg} /><span className='Mycart'>{CartLength}</span></Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyHeader;