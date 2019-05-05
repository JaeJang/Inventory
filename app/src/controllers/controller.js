import axios from 'axios';

import {endpoint} from '../values/endpoints';

export const getAllCategories = async (func = ()=>{}) => {
    const res = await axios.get(endpoint.allcategories);
    func(res.data);
}