import { logDOM } from "@testing-library/react"
import { itemService } from "../../services/item.service"
import { REMOVE_ITEM, SET_FILTER_BY, SET_ITEMS, SET_CATEGORIES } from "../reducers/item.reducer"

export function loadItems() {
  return async (dispatch, getState) => {
    try {
      const items = await itemService.getItems(getState().itemModule.filterBy)
      const action = {
        type: SET_ITEMS,
        items
      }
      dispatch(action)
    } catch (error) {
      console.log('Error:', error)
    }
  }
}

export function addOrder(formData) {
  console.log(formData);
  return async (dispatch, getState) => {
    try {
      // console.log(formData.inSale);
      const items = await itemService.saveItem(formData)
      const action = {
        type: SET_ITEMS,
        items
      }
      dispatch(action)
    } catch (error) {
      console.log('Error:', error)
    }
  }
}

export function removeItem(itemId) {
  return async (dispatch) => {
    try {
      await itemService.removeItem(itemId)
      dispatch({ type: REMOVE_ITEM, itemId })
      return 'Removed!'
    } catch (error) {
      console.log('Error:', error)
    }
  }
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: SET_FILTER_BY, filterBy })
  }
}

export function loadCategories() {
  return async (dispatch) => {
    try {
      const categories = await itemService.getCategories();
      const action = {
        type: SET_CATEGORIES,
        categories
      };
      dispatch(action);
    } catch (error) {
      console.log('Error:', error);
    }
  };
}
