import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams,useNavigate } from 'react-router-dom';
import { updateUser } from '../features/userDataslice';


const Update = () => {

 const {id} = useParams();

 const {users, loading} = useSelector((state)=> state.app);

console.log(users);

 const [update, setUpdate] = useState();

const dispatch = useDispatch()
  const navigate = useNavigate();


 useEffect(() => {
    if(id){
      const singleuser = users.filter((ele) => ele.id === id);
      setUpdate(singleuser[0]);
    }
  }, [id, users])

 const handleUpdate = (e) => {
  e.preventDefault();
  dispatch(updateUser(update));
  navigate('/') 
 }

 const newData = (e)=> {
   setUpdate({...update, [e.target.name] : e.target.value});

 }

  return (
    <section className="bg-gradient-to-r from-emerald-500 to-emerald-900 flex items-center justify-center min-h-screen">
    <div className="bg-white p-8 rounded-md shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
      <h1 className="text-2xl font-semibold mb-4">Edit Note</h1>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600">
            ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            className="w-full p-2 border rounded-md focus:ring focus:ring-purple-300"
            value={id}
            disabled
          />
  
          <label htmlFor="title" className="block text-gray-600 mt-4">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-2 border rounded-md focus:ring focus:ring-purple-300"
            placeholder="Enter Title"
            required
            value={update && update.title}
            onChange={newData}
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
            value={update && update.description}
            onChange={newData}
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

export default Update