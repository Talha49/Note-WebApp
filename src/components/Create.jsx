import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { createUser } from '../features/userDataslice'; 
import {  useNavigate } from 'react-router-dom';



const Create = () => {



 const [user, setUser] = useState({});
 const navigate = useNavigate();
 const dispatch = useDispatch();


 const getUser =(e)=> {
  setUser({...user, [e.target.name]: e.target.value });
 }
const submit = (e) => {
  e.preventDefault();
  dispatch(createUser(user));
  navigate('/');
  console.log(user);
}



  return (
    <section className="bg-gradient-to-r from-emerald-500 to-emerald-900 flex items-center justify-center min-h-screen">
  <div className="bg-white p-8 rounded-md shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
    <h1 className="text-2xl font-semibold mb-4">Create Note</h1>
    <form onSubmit={submit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-600">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full p-2 border rounded-md focus:ring focus:ring-purple-300"
          placeholder="Enter Title"
          required
          onChange={getUser}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-600">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full p-2 border rounded-md focus:ring focus:ring-purple-300"
          rows="4"
          placeholder="Enter Description"
          required
          onChange={getUser}
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-emerald-500 to-emerald-900 text-white hover:bg-purple-700 py-2 px-4 rounded-md transition duration-300"
      >
        Submit
      </button>
    </form>
  </div>
</section>

  )
}

export default Create