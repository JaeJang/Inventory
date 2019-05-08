const BASE_URL = process.env.MODE && process.env.MODE === "dev" ? "http://localhost:8080/api" : "http://api.inventory.ga/api";

export const endpoint = {
    allcategories : BASE_URL + "/category",
    inventory: BASE_URL + "/inventory",
    item: BASE_URL +  "/item"
    
};