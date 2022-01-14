import axios from "axios";

const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";
const GetPlaceInfoURL = "https://travel-advisor.p.rapidapi.com/restaurants/get-details";
const backEndAPI = "http://localhost:5000/post";

export const fecthPosts = () => axios.get(backEndAPI);
export const createPost = (newPost) => axios.post(backEndAPI, newPost);
export const updatePost = (id, updatePost) => axios.patch(`${backEndAPI}/${id}`, updatePost);

export const getPlacesInfo = async (type, sw, ne) => {
    try {
        const { data: {data} } = await axios.get(URL, {
          params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          restaurant_tagcategory_standalone: type,
        },
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }});
        return data;
    } catch(er) {
        console.log(er);
    }
}

export const getPlaceDetailApi = async (loc_id) => {
  try {
      const data = await axios.get(GetPlaceInfoURL, {
        params: {
          location_id: loc_id, 
          currency: 'USD', 
          lang: 'en_US'
        },
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
      });
      return data;
  } catch(er) {
      console.log(er);
  }
}