import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, BaseQueryApi, DefinitionType } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Login_User, Logout_User } from "../features/authSlice";


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5022/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', token);
        }
        return headers;
    }
})

const customBaseQuery: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error?.status === 401) {
        const res = await fetch('http://localhost:5022/api/v1/auth/refresh-token', {
            method: "POST",
            credentials: 'include'
        });
        const data = await res.json();
        if (data?.data?.accessToken) {
            const user = (api.getState() as RootState).auth.user;
            api.dispatch(Login_User({ user: user, token: data.data.accessToken }));
            // recall the baseQuery 
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(Logout_User());
        }
    }
    return result;
}



export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery:customBaseQuery,
    endpoints: () => ({})
})



