import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from './slice/skillsSlice';
import userReducer from './slice/userSlice';
const store = configureStore({
reducer: {
skills: skillsReducer,
user: userReducer, 
},
});

export default store;