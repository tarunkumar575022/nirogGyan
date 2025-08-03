import React, {useState} from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DoctorProfile.css';

const Doctorprofile = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState("");
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => {
        fetch('http://localhost:3000/doctors/')
        .then(response => response.json())
        .then(data => {const found = data.find(doc => doc.id === Number(id));
            setDoctor(found);
        })
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response= await fetch('http://localhost:3000/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patientName:e.target.elements.name,
                    appointmentDate:e.target.elements.date

                }),
            })
            const data = await response.json();
            console.log("Appointment booked successfully:", data);
            setSubmitted(true);

        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    }
        
        return (

        <div className='container'>
            <img src={`${process.env.PUBLIC_URL}/images/doc${doctor.id}.png`} alt={doctor.name} className='doctor-image' />
            <h1> {doctor.name}</h1>
            <p>Specialization: {doctor.specialization} </p>
            <p>Available: {doctor.availability ? "Yes" : "No"}  </p>
            <p>Description: {doctor.description}</p>
            <p>Experience: {doctor.experience}  </p>
            <h2>Book Slot</h2>
            {!doctor.availability ? (
                <p>Doctor is not available for booking.</p>
            ) : submitted ? (
                <p className='success-message'>Appointment booked successfully!</p>
            ) : (
                <form className='form' onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter your name" name='patientName' required onChange={(e) => setDoctor({...doctor, patientName: e.target.value})}/>
                    <input type="date" placeholder="Select date" name='appointmentDate' required onChange={(e) => setDoctor({...doctor, appointmentDate: e.target.value})} />

                    <button type="submit">Book Appointment</button>
                </form>
            )}
    </div>
  )
}


export default Doctorprofile