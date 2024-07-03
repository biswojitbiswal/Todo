import React, { useEffect, useState } from 'react'
import { FaCalendarDay } from 'react-icons/fa6'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../Store/Auth';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';



// Define a function to format date as 'dd/mm/yyyy'
function formatDateToDdMmYyyy(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1.
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function Todos() {
  const [calVisible, setCalVisible] = useState(false)
  const [genDate, setGenDate] = useState(new Date())
  const [date, setDate] = useState(formatDateToDdMmYyyy(genDate))
  const [note, setNote] = useState("")
  const [data, setData] = useState([])
  const [editNote, setEditNote] = useState("")
  const [isEditable, setIsEditable] = useState(false)
  const [findIdx, setFindIdx] = useState(-1);


  const { user, authoriztionToken, isLoggedIn } = useAuth()
  const navigate = useNavigate(); // Initialize history


  const handleInputNote = (e) => {
    setNote(e.target.value)
  }

  const toggleCalendar = () => {
    setCalVisible(!calVisible)
  }

  // Function to handle date selection in the calendar
  const handleCalendar = (newdate) => {
    setGenDate(newdate); // Update selected date
    setDate(formatDateToDdMmYyyy(newdate)); // Update URL date with formatted new date
    setCalVisible(false); // Close the calendar
  }

  const handleNote = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      // If user is not logged in, display a message and navigate to login page
      toast.error("Please login to add a todo");
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`https://todo-api-xi-six.vercel.app/api/todo/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authoriztionToken,
        },
        body: JSON.stringify({ note, date })
      });

      const data = await response.json()
      // console.log(data);

      if (response.ok) {
        toast.success("Todo added")
        setNote("")
        getCurrNote();
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getCurrNote = async () => {
    try {
      const response = await fetch(`https://todo-api-xi-six.vercel.app/api/todo/notes/gettodo/${date}/${user._id}`, {
        method: "GET",
        headers: {
          Authorization: authoriztionToken,
        }
      })
      const res_data = await response.json()
      // console.log(res_data.todos)

      if (response.ok) {
        // toast.success("Todo fetched Successfully")
        setData(res_data.todos)
      } else {
        setData([])
        // toast.error("Failed to fetch data!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteNoteById = async (id) => {
    try {
      const response = await fetch(`https://todo-api-xi-six.vercel.app/api/todo/notes/delete/${id}`, {
        method: "POST",
        headers: {
          Authorization: authoriztionToken
        }
      })

      const data = await response.json()
      // console.log(data)

      if (response.ok) {
        getCurrNote()
        toast.error("Todo deleted")
      } else{
        toast.error("Todo not deleted")
      }
    } catch (error) {
      
      console.log(error)
    }
  }


  const handleEditNoteById = async (id) => {
    // setIsEditable(!isEditable)
    // console.log(!isEditable)
    if (!isEditable) {
      setIsEditable(true);
      const dataIndex = data.findIndex(note => note._id === id)
      setFindIdx(dataIndex)

      // const findNote = data.find(note => note._id === id)
      // setEditNote(findNote)

      if (dataIndex !== -1) {
        const findNote = data[dataIndex];
        setEditNote(findNote);
      } else {
        setEditNote({});
      }
    } else {
      try {
        const response = await fetch(`https://todo-api-xi-six.vercel.app/api/todo/notes/update/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type" : "application/json",
            Authorization: authoriztionToken,
          },
          body: JSON.stringify({note: editNote.note, date})
        })

        const data = await response.json()
        console.log(data)
        if(response.ok){
          toast.success("Todo updated")
          setIsEditable(false);
          getCurrNote()
        } else {
          toast.error("Todo not updated");
        }

      } catch (error) {
        console.log(error)
        toast.error("Error updating Todo")
      }
    }
  }

  const handleNoteCompleted = async(id) => {
    try {
      const response = await fetch(`https://todo-api-xi-six.vercel.app/api/todo/notes/complete/${id}`, {
        method: "POST",
        headers: {
          Authorization: authoriztionToken
        },
      })

      const data = await response.json()
      // console.log(data)
      if(response.ok){
        getCurrNote()
        // toast.success("Todo completed")
      }
    } catch (error) {
      toast.error("Error!!")
      console.log(error)
    }
  }


  useEffect(() => {
    if (user && user._id) {
      getCurrNote()
    }
  }, [user, date])



  return (
    <>
      <div className="todo-container">
        
        <div className="input-date">
          <button onClick={toggleCalendar} className='calendar-icon'><FaCalendarDay /></button>
          <p>{date}</p>
        </div>
        {/* Conditional rendering of calendar based on 'calVisible' state */}
        {calVisible && (
          <Calendar className="Calendar" onChange={handleCalendar} value={genDate} />
        )}

        <form onSubmit={handleNote} className='input-todo'>
          <input type="text" name='note' id='note' onChange={handleInputNote} value={note} placeholder='Add note' />
          <button className='add-btn'>ADD</button>
        </form>

        <h1 className='heading'>TO-DO</h1>

        <div className="notes-container">
        {
          data && data.length > 0 ? (
            data.map((curr, index) => {
              return <div className='note-containers' key={index}>
                
                <input type="checkbox" name="compeleted" checked={curr.completed} onChange={() => handleNoteCompleted(curr._id)} />

                <input type="text" className={isEditable && findIdx === index ? "show-edit" : "note-input"} 
                style={{ textDecoration: curr.completed ? 'line-through' : 'none' }} name="note" 
                onChange={(e) => setEditNote({ ...editNote, [e.target.name]: e.target.value })} 
                value={isEditable && findIdx === index ? editNote.note.charAt(0).toUpperCase() + editNote.note.slice(1) : curr.note.charAt(0).toUpperCase() + curr.note.slice(1)} readOnly={!isEditable || (findIdx !== index)} />

                <button onClick={() => handleEditNoteById(curr._id)} className='edit-button' 
                disabled={isEditable && findIdx !== index || curr.completed} >{isEditable && findIdx === index ? "📁" : "✏️"}</button>

                <button onClick={() => handleDeleteNoteById(curr._id)}
                  className='delete-button'><FaTrash /></button>

              </div>
            })
          ) : (
            <p>Todos Not Found</p>
          )
        }
        </div>
      </div>


    </>
  )
}

export default Todos
