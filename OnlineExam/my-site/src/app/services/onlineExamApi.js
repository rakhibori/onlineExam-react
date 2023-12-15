// baraye gerftane data az json servar
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const onlineExamApi = createApi({
    reducerPath: 'onlineExamApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3030'}),
    endpoints: (builder)=>({
        getOnlineExam: builder.query({
            query:(page)=> `onlineExam?_page=${page}&_limit=1`,
            providesTags: ['onlineExam']
        }),

        updateOnlineExam: builder.mutation({
            query:({id, question, choice1, choice2, choice3, choice4, rightAnswer, score, userAnswer})=>({
                url: `onlineExam/${id}`,
                method: 'PUT',
                body: {question, choice1, choice2, choice3, choice4, rightAnswer, score, userAnswer}
            }),
            invalidatesTags: ['onlineExam']
        }),
    })
})

export const {useGetOnlineExamQuery, useUpdateOnlineExamMutation} = onlineExamApi;