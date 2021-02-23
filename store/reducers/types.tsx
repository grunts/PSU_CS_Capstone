import { MenuItem } from '../../types'
export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const TRAY_CONFIRMED = 'TRAY_CONFIRMED'
export const CLOSE_TAB = 'CLOSE_TAB'

export interface ServingTrayState {
    currentTray: MenuItem[]
    currentRestaurant: string | null,
    orderHistory: MenuItem[]
  }

interface AddMenuItem {
    type: typeof ADD_ITEM
    payload: MenuItem
    comments: string
    adtlCharges: number
    mods: string[],
    currentRestaurant: string
}

interface RemoveMenuItem {
    type: typeof REMOVE_ITEM
    payload: MenuItem
    index: number
}

interface TrayConfirmed{
    type: typeof TRAY_CONFIRMED
}

interface CloseTab{
    type: typeof CLOSE_TAB
}

export type ServingTrayActionTypes = AddMenuItem | RemoveMenuItem | TrayConfirmed | CloseTab