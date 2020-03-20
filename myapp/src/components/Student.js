import React, {useState, useEffect}  from 'react'
import axios from 'axios'

export default () => {

    const [students, setStudents] = useState({}) 
    const [name, setName] = useState('') 
    const [surname, setSurName] = useState('') 
    const [Major, setMajor] = useState('') 
    const [GPA, setGPA] = useState(0) 

    useEffect( () => {
        getStudents()
    } , [] )

    const getStudents = async () => {
       const result = await axios.get(`http://localhost/api/students`)
       console.log(result.data)
       setStudents(result.data)
    }

    const addStudents = async () => {
        const result = await axios.post(`http://localhost/api/students`, {
            name,
            surname,
            Major,
            GPA
        })
        console.log(result.data)
        getStudents()
    }

    const getStudent = async (id) => {
        const result = await axios.get(`http://localhost/api/students/${id}`)
        console.log(result.data)
        setName(result.data.name)
        setSurName(result.data.surname)
        setMajor(result.data.Major)
        setGPA(result.data.GPA)
    }
    const updateStudent = async (id) => {
        const result = await axios.put(`http://localhost/api/students/${id}`,{
            name,
            surname,
            Major,
            GPA
        })

        console.log(result.data)
        setName(result.data.name)
        setSurName(result.data.surname)
        setMajor(result.data.Major)
        setGPA(result.data.GPA)  
        getStudents()      
    }

    const delStudent = async (id) => {
        const result = await axios.delete(`http://localhost/api/students/${id}`) 
        console.log(result + 'delete')      
        getStudents()
    }

    const printStudent = () => {
        if ( students && students.length )
            return students.map((student,index) => {
                return (
                    <li key={index}>
                        {student.name} : {student.surname} : {student.Major} : {student.GPA}
                        <button onClick={() => getStudent(student.id)}> Get </button>
                        <button onClick={() => delStudent(student.id)}> Del </button>
                        <button onClick={() => updateStudent(student.id)}> Update </button>
                    </li>
                )
            })
        else {
            return (<h2> No students </h2>)
        }

    }

    return (
        <div>
            STUDENT
            <ul>
                 {printStudent()}
            </ul>
            <h2>Get Student</h2>
            Get: {name} : {surname} : {Major} : {GPA}

            <h2>Add Student</h2>
            Name: 
            <input 
                placeholder="name"
                type="text"
                name="name"
                onChange={ (e)=> setName(e.target.value) }
                /> <br/>
            Surname:
            <input  
                placeholder="surname"               
                type="text"
                name="surname"
                onChange={ (e)=> setSurName(e.target.value) }
                /><br/>
            Major:
            <input     
                placeholder="major"            
                type="text"
                name="Major"
                onChange={ (e)=> setMajor(e.target.value) }
                /><br/>    
            GPA:
            <input          
                placeholder="gpa"       
                type="number"
                name="gpa"
                onChange={ (e)=> setGPA(e.target.value) }
                /><br/>
            <button onClick={addStudents}>Add </button>
      </div>
    )
}