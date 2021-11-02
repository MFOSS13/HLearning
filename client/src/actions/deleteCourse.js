import axios from 'axios';

require('dotenv').config();
const {  } = process.env

export function deleteCurse(id){
    
    return async function(){
        try {
            const json = await axios.delete(`/courses` + id) //acordate que va (link, id)
            return json;
        } catch (error) {
            console.log("deleteActivity", error)
        }
    } 
}