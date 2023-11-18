import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//read action 

export const showUser = createAsyncThunk(
    "showUser", 
     async(_, {rejectWithValue}) =>{
    try{
        const response = await fetch("https://65455ddb5a0b4b04436dfac9.mockapi.io/users");
        if(!response.ok){
            throw new Error("Network Problem ");
        }
        const result = await response.json();
        return result;
    }
    catch (error){
  return rejectWithValue(error.message)
    }
    }

)


//delete user
export const deletUser = createAsyncThunk(
    "deletUser", 
     async(id, {rejectWithValue}) =>{
    try{
        const response = await fetch(`https://65455ddb5a0b4b04436dfac9.mockapi.io/users/${id}`, 
        {method: "DELETE"}
             );
        if(!response.ok){
            throw new Error("Network Problem ");
        }
        const result = await response.json();
        return result;
    }
    catch (error){
  return rejectWithValue(error.message)
    }
    }

)












//create 
export const createUser = createAsyncThunk(
    "createUser", 
    async(data,{rejectWithValue}) =>{
        const response = await fetch("https://65455ddb5a0b4b04436dfac9.mockapi.io/users",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        try{
            const result = await response.json();
            return result;
        }
        catch(error){
            return rejectWithValue(error);
        }
    }
)



//edit action 
export const updateUser = createAsyncThunk("updateUser", async(data, {rejectWithValue}) =>{
    const response = await fetch(`https://65455ddb5a0b4b04436dfac9.mockapi.io/users/${data.id}`,{
        method: "PUT",
        headers: {
            "Content-Type":  "application/json",
        },
        body: JSON.stringify(data),
    });
    try{
        const result = await response.json();
        return result;
    }
    catch(error){
        return rejectWithValue(error);
    }
})












//Get data 

export const userDataslice = createSlice({
    name: "User",
    initialState: {
        users: [],
        loading: false,
        error:null,
        searchData: []
    },
     
    reducers:{
      searchUsers: (state, action) => {
        state.searchData = action.payload;
      },
     
    },
    extraReducers: {
         [createUser.pending]: (state, action ) => {
            state.loading = true;
         },
         [createUser.fulfilled]: (state,action) => {
            state.loading = false;
            state.users.push(action.payload);
         },
         [createUser.rejected]: (state, action) =>{
            state.loading = false;
            state.error = action.payload.message
         },
         [showUser.pending]: (state) => {
            state.loading = true;
         },
         [showUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload;
         },
         [showUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
         },   
         [deletUser.pending]: (state) => {
            state.loading = true;
         },
         [deletUser.fulfilled]: (state, action) => {
            state.loading = false;
            const {id} = action.payload;
            if(id){
               state.users = state.users.filter((user) => user.id !== id);
            }
         },
         [deletUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
         },




         [updateUser.pending]: (state ) => {
            state.loading = true;
         },
         [updateUser.fulfilled]: (state,action) => {
            state.loading = false;
            state.users = state.users.map((user) => user.id === action.payload.id ? action.payload : user)
         },
         [updateUser.rejected]: (state, action) =>{
            state.loading = false;
            state.error = action.payload.message
         },
    }
})


export const  {searchUsers} = userDataslice.actions;
export default userDataslice.reducer;