import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../types'
import Product from './../../models/products';



//! GET PRODUCTS
export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        try {
            const response = await fetch('https://rn-e-eshop-default-rtdb.firebaseio.com/products.json')

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }
            const resData = await response.json()
            // console.log(resData)
            const loadedProducts = []

            for (const key in resData) {
                loadedProducts.push(
                    new Product(
                        key,
                        resData[key].ownerId,
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price
                    )
                )
            }
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}
//!REMOVE PRODUCT
export const deleteProduct = (productId) => {

    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`https://rn-e-eshop-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error('Something went wrong!')
        }
        dispatch({
            type: DELETE_PRODUCT,
            pid: productId
        })
    }
}

//! CREATE A NEW PRODUCT 
// dispatch -отправлять fetch -получать
export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        const token = getState().auth.token;
        const response = await fetch(`https://rn-e-eshop-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            })
        })
        const resData = await response.json()
        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            }

        })
    }
}

//!UPDATE

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        // console.log(getState())
        const token = getState().auth.token;
        const response = await fetch(`https://rn-e-eshop-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
            })
        })
        if (!response.ok) {
            throw new Error('Something went wrong!')
        }

        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: { title, description, imageUrl }

        })
    }
}
