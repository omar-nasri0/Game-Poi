import axios from "axios";

const api_key = process.env.NEXT_PUBLIC_RAWG_KEY;
const url = 'https://api.rawg.io/api';   
interface prop {
    platform:number[]|number ;
    page_size:number;
    page?:number,
    genre?:string
}  
export async function GetGame ({platform , page_size , page , genre}:prop) {
    try {
        const response =await axios.get
    (`${url}/games` ,{
        params:{
            key:api_key,
            platforms:Array.isArray(platform)?platform.join(','):platform,
            page_size:page_size,
            page:page,
            ...(genre&&{genres:genre})
        }
    })
    if (!response) {
        console.log("failed to get game ")
    }
    return response.data;
    } catch (error) {
            console.log(error)
    }
}