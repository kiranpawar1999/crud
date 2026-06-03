
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const token = localStorage.getItem('token');
// console.log(token);


//Read Data
export const readData = createAsyncThunk('readData', async (_, { rejectWithValue }) => {
    try {

        const token = localStorage.getItem('token');
        console.log(token);

        let response = await fetch('https://apijwt-glev.onrender.com/api/students/read', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        // console.log(response);
        if (!response.ok) {
            return rejectWithValue({
                status: response.status,
                message: "Not authorized",
            });
        }
        let data = await response.json();
        console.log(data);

        return data;
    }
    catch (error) {
        return rejectWithValue("ffff:", error.message);
    }

});



//Insert Data
export const insertUserData = createAsyncThunk('insertData', async (formData, { rejectWithValue }) => {
    console.log(formData);

    try {
        const token = localStorage.getItem("token"); // ✅ get token
        console.log(token);

        let response = await fetch("https://apijwt-glev.onrender.com/api/students/", {
            method: "POST",
            headers: {
                // "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}`,
            },
            // body: JSON.stringify(formData)  
            body: formData
        });

        console.log(response);
        let data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
});

//Update Data

export const updateUserData = createAsyncThunk('updateData', async (formData) => {
    console.log(formData);
    try {
        const token = localStorage.getItem('token');
        let response = await fetch(`https://apijwt-glev.onrender.com/api/students/update-student/${formData.get("_id")}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });
        console.log(response);

        let data = await response.json();
        console.log(data);

        return data;
    }
    catch (error) {
        return error.message;
    }
});


// Delete Data
export const deleteUserData = createAsyncThunk('deleteData', async (id) => {
    console.log("thunk recived id:", id);
    try {
        const token = localStorage.getItem('token');
        let response = await fetch(`https://apijwt-glev.onrender.com/api/students/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            // body: formData
        });

        let data = await response.json();
        console.log(data);

        return data;
    }
    catch (error) {
        return error.message;
    }
});

// search data
export const CurdSlice = createSlice({
    name: "CURD",
    initialState: {
        isLoading: false,
        data: [],
        searchData: [],
        error: null
    },

    reducers: {
        searchUserData: (state, action) => {
            state.searchData = action.payload;
        }
    },
    extraReducers: (bulider) => {

        //Read Data
        bulider.addCase(readData.pending, (state) => {
            state.isLoading = true;
        });

        bulider.addCase(readData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = Array.isArray(action.payload)
                ? action.payload
                : [];
        });

        bulider.addCase(readData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        //Insert Data
        bulider.addCase(insertUserData.pending, (state) => {
            state.isLoading = true;
        });
        bulider.addCase(insertUserData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload)
        });

        bulider.addCase(insertUserData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        });

        //Update Data
        bulider.addCase(updateUserData.pending, (state) => {
            state.isLoading = true;
        });

        bulider.addCase(updateUserData.fulfilled, (state, action) => {
            state.isLoading = false;
            const { _id } = action.payload;
            state.data = state.data.map((value) =>
                value._id === _id ? action.payload : value
            );

        });
        bulider.addCase(updateUserData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        //Delete Data

        bulider.addCase(deleteUserData.pending, (state) => {
            state.isLoading = true;
        });
        bulider.addCase(deleteUserData.fulfilled, (state, action) => {
            state.isLoading = false;
            const { id } = action.payload;
            state.data = state.data.filter((value) => value._id !== id);

        });

        bulider.addCase(deleteUserData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }

});


export default CurdSlice.reducer;
export const { searchUserData } = CurdSlice.actions;