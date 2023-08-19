import React from 'react'
import { Routes, Route } from 'react-router-dom';
// 
import { Sidebar } from '../components/Sidebar';
import { Contacts } from '../components/Contacts';
import { Dashboard } from '../components/Dashboard';
// 
export const ContactPage = () => {
    return <>
        <Routes>
            <Sidebar />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </>
}
