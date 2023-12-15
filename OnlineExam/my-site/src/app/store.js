import {configureStore} from '@reduxjs/toolkit';
import { onlineExamApi } from './services/onlineExamApi';

const store = configureStore({
    reducer:{
        [onlineExamApi.reducerPath]:onlineExamApi.reducer,
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(onlineExamApi.middleware),
})

export default store;


