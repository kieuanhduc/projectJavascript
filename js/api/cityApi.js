import axiosClient from "./axiosClient";

// import : default import , named import
// export : default export , named import

export function getAllCities(params) {

    const url = '/cities'

    return axiosClient.get(url, params)

}

//name export
export function getCityById(id) {
    const url = `/cities/${id}`

    return axiosClient.get(url)
}

export function addByCity(data) {
    const url = '/cities'

    return axiosClient.post(url, data)
}


export function removeCityById(id) {
    const url = `/cities/${id}`

    return axiosClient.delete(url)
}