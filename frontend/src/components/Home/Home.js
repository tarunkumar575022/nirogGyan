import React, { useEffect } from 'react'
import {Link} from 'react-router-dom';
import { useState } from 'react';
import './Home.css';

const Home = () => {
    const [doctors, setDoctors] = useState([])   
    const [search, setSearch] =useState([]);
    useEffect(() => {
        fetch('https://niroggyan-backend-egi8.onrender.com/doctors')
        .then(response => response.json())
        .then(data => setDoctors(data))
        .catch(error => console.error('Error fetching doctors:', error));
    }, [])
    return (
    <div className="container">
      <h1>Doctor</h1>
      <input type="text" className="search-input" placeholder="Search by name or specialization" value={search} onChange={e => setSearch(e.target.value)} />
    <div className="doctor-list">
        {doctors.filter(doc => doc.name.includes(search) || doc.specialization.includes(search))
      .map(doctor => (

        <Link  to={`/doctors/${doctor.id}`} className="doctors-list" key={doctor.id}>
            <img src={`${process.env.PUBLIC_URL}/images/doc${doctor.id}.png`} alt={doctor.name} className='doctor-image' />
          <h2>{doctor.name}</h2>
          <p>Specialization: {doctor.specialization}</p>
          <p>Experience: {doctor.experience}</p>
          <p>Availability: {doctor.availability ? "Yes" : "No"}</p>
        </Link>
      ))}</div>
    </div>
  )
}

export default Home
