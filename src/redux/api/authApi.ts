import { baseApi } from "./baseApi";



const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        LoginUser_Api:builder.mutation({
            query:(data)=>({
                url:'/auth/login',
                method:"POST",
                body:data
            })
        })
    })
})

export const {useLoginUser_ApiMutation} = authApi;