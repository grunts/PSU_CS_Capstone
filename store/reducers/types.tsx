import { MenuItem } from '../../types'
export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'


interface AddMenuItem {
    type: typeof ADD_ITEM
    payload: MenuItem
}

interface RemoveMenuItem {
    type: typeof REMOVE_ITEM
    payload: MenuItem
    index: number
}

export type ServingTrayActionTypes = AddMenuItem | RemoveMenuItem