import axios from 'axios';

import {endpoint} from '../values/endpoints';

export const getAllCategories = async (callback = ()=>{}) => {
    const res = await axios.get(endpoint.allcategories);
    callback(res.data);
}

export const getInventory = async (callback = () => {}, cateId = "") => {
    const path = cateId ? cateId : "";
    const res = await axios.get(endpoint.inventory + "/" + path);
    //console.log(res.data);
    callback(res.data);

}

export const deleteItem = async (callback = () => {}, itemId) => {
    const res = await axios.delete(endpoint.item + "/" + itemId);
    callback(res.data);
}