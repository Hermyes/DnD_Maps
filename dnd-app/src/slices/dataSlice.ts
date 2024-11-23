import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        CharacterName: '',
    },
    reducers: {
        setCharacterName(state, {payload}) {
            state.CharacterName = payload
        }
    }
})

export const useCharacterName = () => useSelector((state: RootState) => state.ourData.CharacterName)
export const {
    setCharacterName: setCharacterNameAction
} = dataSlice.actions

export default dataSlice.reducer