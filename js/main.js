import axiosClient from "./api/axiosClient";
import postApi from "./api/postApi";

import {getAllCities,getCityById,addByCity,removeCityById} from "./api/cityApi"

async function main(){
        try{
            const params = {
                _page:1,
                _limit : 5
            }
            const response = await postApi.getAll(params)
            console.log(response)
        }catch(error){
            console.log(error)
        }
}

main();