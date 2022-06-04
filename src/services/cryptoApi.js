import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
  'X-RapidAPI-Key': 'ddd55aabe4msh4bbd832a9c24ac9p1d2c36jsn4b912ba14c6a'
}
const baseUrl = 'https://coinranking1.p.rapidapi.com'
const createRequest = (url) => ({url, headers:cryptoApiHeaders })
export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest('/coins')
    })
  })
});
export const {
  useGetCryptosQuery
} = cryptoApi