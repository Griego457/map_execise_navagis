import axios from "axios";

const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";
const GetPlaceInfoURL = "https://travel-advisor.p.rapidapi.com/restaurants/get-details";
const backEndAPI = "https://navagismapexercise.herokuapp.com/post";

export const fecthPosts = () => axios.get(backEndAPI);
export const createPost = (newPost) => axios.post(backEndAPI, newPost);
export const updatePost = (id, updatePost) => axios.patch(`${backEndAPI}/${id}`, updatePost);

export const getPlacesInfo = async (type) => {
    try {
        const { data: {data} } = await axios.get(URL, {
          params: {
          bl_latitude: 10.249791235350315,
          tr_latitude: 10.36632582573391,
          bl_longitude: 123.81445330474241,
          tr_longitude: 124.02748507354124,
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