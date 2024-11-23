import { combineReducers, configureStore } from "@reduxjs/toolkit"
import dataReducer from "./slices/dataSlice"

export const store = configureStore({
    reducer: combineReducers({
        ourData: dataReducer
    })
})

export type RootState = ReturnType<typeof store.getState>