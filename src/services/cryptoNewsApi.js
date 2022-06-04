import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoNewsHeaders = {
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
  'X-RapidAPI-Key': 'ddd55aabe4msh4bbd832a9c24ac9p1d2c36jsn4b912ba14c6a'
}
const baseUrl = 'https://bing-news-search1.p.rapidapi.com'
const createRequest = (url) => ({url, headers:cryptoNewsHeaders })

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
    }),
  })
});

export const {
  useGetCryptoNewsQuery
} = cryptoNewsApi