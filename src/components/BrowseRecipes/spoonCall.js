import { keys } from './config';
import { store } from '../../app/store';
import { cacheSearch } from '../../features/apiCalls/cachedSearchSlice';


const key = keys.spoonKey;

const endpoints = {
    searchRecipes: "https://api.spoonacular.com/recipes/complexSearch",
    getRecipeInformation: "https://api.spoonacular.com/recipes/{id}/information"
}

const listToString = (list, string) => {
    console.log(list);
    if (list.length === 0) return "";
    return `&${string}=${list.toString()}`;
}

export const searchRecipes = async (obj) => {

    console.log('Attempting api request...')
    const searchUrl = `${endpoints.searchRecipes}?apiKey=${key}&query=${obj.query}`;
    const dietUrl = listToString(obj.diet, 'diet');
    const intolerancesUrl = listToString(obj.intolerances, 'intolerances');
    const timeUrl = obj.maxReadyTime ? `&maxReadyTime=${obj.maxReadyTime}` : '';
    const advancedSearchUrl = `${searchUrl}${dietUrl}${intolerancesUrl}${timeUrl}`;
    console.log(advancedSearchUrl);
    try {
        const response = await fetch(advancedSearchUrl);
        if (response.ok) {
            console.log('Request successful. Converting data before printing...')
            const result = await response.json();
            console.log('Result: ', result);
            const toCache = {searchParams: obj, result: result}
            store.dispatch(cacheSearch(toCache));
            console.log(store);
            return;
        }
        throw new Error(response.statusText);
        } catch (error) {
        console.log(error);
    } 
}

export const getRecipeInformation = async (id) => {
    const getInfoUrl = `${endpoints.getRecipeInformation}${id}/information?apiKey=${key}&includeNutrition=false`;
    try {
        const response = await fetch(getInfoUrl);
        if (response.ok) {
            const result = await response.json();
            return result;
        }
        throw new Error(response.statusText);
    } catch (error) {
        console.log(error);
    }
    
}