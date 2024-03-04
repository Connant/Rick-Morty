
// https://rickandmortyapi.com/api
// http://192.168.1.61:4000

export const BASE_URL = 'https://rickandmortyapi.com/api'

export const locationId = (location: string) => location.split('/').pop();

export const residentId = (resident: string) => resident.split('/').pop();