import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './Home'
import ViewTask from './ViewTask'
import UpdateTask from './UpdateTask'

export default function RouterContainer() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/viewtask' element={<ViewTask />}></Route>
                    <Route path="/updatetask/:id" element={<UpdateTask />} />
                </Routes>
            </BrowserRouter>

        </>
    )
}
