import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrls } from '../../api-urls';
import axios from 'axios';


const initialState = {
    users: [],
};

const { dataApi } = apiUrls;

export const fetchUsers = createAsyncThunk('', async () => {
    const res = await axios.get(`${dataApi}`);
    return res.data;
});

const userManagementSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        deleteUser: (state, ids) => {
            state.users = state.users?.filter(u => !ids?.payload?.includes(u.id));
        },
        upsertUser: (state, user) => {
            const filtered = state.users?.filter(u => u.id !== user?.payload?.id);
            filtered.push(user?.payload);
            state.users = filtered;
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        });
    }
});

export const { deleteUser, upsertUser } = userManagementSlice.actions

export default userManagementSlice.reducer;
