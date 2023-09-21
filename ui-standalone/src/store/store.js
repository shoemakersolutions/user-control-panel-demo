import { configureStore } from '@reduxjs/toolkit';
import userManagementReducer from '../reducers/user-management/user-management-slice';

export default configureStore({
    reducer: {
        userManagement: userManagementReducer
    }
});

