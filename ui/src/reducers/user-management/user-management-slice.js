import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrls } from '../../api-urls';
import axios from 'axios';


const initialState = {
    users: [],
    companies: [],
};

const { backendBaseUrl, dataApi } = apiUrls;

export const fetchExternalUsers = createAsyncThunk(dataApi, async () => {
    const res = await axios.get(`${dataApi}`);
    await axios.post(`${backendBaseUrl}/usermanagement/add`, res.data?.map(d => {
        const { id, ...rest } = d;
        return {
            externalId: id,
            ...rest,
        }
    }));
});

export const fetchUsers = createAsyncThunk('/usermanagement/find', async () => {
    const res = await axios.get(`${backendBaseUrl}/usermanagement/find`);
    return res.data;
});

export const postUsers = createAsyncThunk('/usermanagement/add', async (data) => {
    const res = await axios.post(`${backendBaseUrl}/usermanagement/add`, data);
    return res.data;
});

export const deleteUsers = createAsyncThunk('/usermanagement/delete', async (data) => {
    await axios.post(`${backendBaseUrl}/usermanagement/delete`, data);
});

export const fetchCompanies = createAsyncThunk('/usermanagement/company', async () => {
    const res = await axios.get(`${backendBaseUrl}/usermanagement/company`);
    return res.data;
});

const userManagementSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        });
        builder.addCase(fetchCompanies.fulfilled, (state, action) => {
            state.companies = action.payload;
        });
    }
});

export default userManagementSlice.reducer;
