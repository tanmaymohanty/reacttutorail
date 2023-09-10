import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addSkills = createAsyncThunk('skills/addSkills', async (skillsData) => {
    const response = await axios.post('http://localhost:3001/skills', skillsData);
    return response.data;
});

export const deleteSkill = createAsyncThunk(
    'skills/deleteSkill',
    async (id, thunkAPI) => {
        try {
            await axios.delete(`http://localhost:3001/skills/${id}`);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const updateSkill = createAsyncThunk(
    'skills/updateSkill',
    async (updatedSkill) => {
        const response = await axios.put(`http://localhost:3001/skills/${updatedSkill.id}`, updatedSkill);
        return response.data;
    }
);

const skillsSlice = createSlice({
    name: 'skills',
    initialState: {
        skills: [],
        status: 'idle',
    },
    extraReducers: (builder) => {
        builder
            .addCase(addSkills.fulfilled, (state, action) => {
                state.skills.push(action.payload);
                state.status = 'succeeded';
            })
            .addCase(deleteSkill.fulfilled, (state, action) => {
                state.skills = state.skills.filter((skill) => skill.id !== action.payload);
            })
            .addCase(updateSkill.fulfilled, (state, action) => {
                const index = state.skills.findIndex((skill) => skill.id === action.payload.id);
                if (index >= 0) {
                    state.skills[index] = action.payload;
                }
            });
    },
});

export default skillsSlice.reducer;