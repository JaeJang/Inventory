import axios from 'axios';

import {endpoint} from '../values/endpoints';

// Request all category information from the backend
// PARAM    : Callback function 
export const getAllCategories = async (callback = ()=>{}) => {
    const res = await axios.get(endpoint.allcategories);
    callback(res.data);
}

// Request the inventory information for the passed category id
// PARAM    : Callback function
// PARAM    : Category id
export const getInventory = async (callback = () => {}, cateId = "") => {
    const path = cateId ? cateId : "";
    const res = await axios.get(endpoint.inventory + "/" + path);
    callback(res.data);

}

// Request deletion of the passed item
// PARAM    : Callback function
// PARAM    : Item id to be deleted
export const deleteItem = async (callback = () => {}, itemId) => {
    const res = await axios.delete(endpoint.item + "/" + itemId);
    callback(res.data);
}