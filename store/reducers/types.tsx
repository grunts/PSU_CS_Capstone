import { MenuItem } from '../../types'
export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'

export interface ServingTrayState {
    currentTray: MenuItem[]
  }

interface AddMenuItem {
    type: typeof ADD_ITEM
    payload: MenuItem
    comments: string
    adtlCharges: number
    mods: string[]
}

interface RemoveMenuItem {
    type: typeof REMOVE_ITEM
    payload: MenuItem
    index: number
}

export type ServingTrayActionTypes = AddMenuItem | RemoveMenuItem