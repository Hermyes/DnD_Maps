import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import { User, CharacterToRequest, Character, Characters, RequestDetail } from "../api/Api"; 


export const fetchCharacters = createAsyncThunk<Characters, string>(
    'data/fetchCharacters',
    async (CharacterName) => {
            const response = await api.characters.charactersList({ CharacterName });
            return response.data;
    }
);

export const fetchCharacter = createAsyncThunk<Character, string>(
    'data/fetchCharacter',
    async (character_id) => {
            const response = await api.characters.charactersRead(character_id);
            return response.data;
    }
);

export const addCharacterToRequestThunk = createAsyncThunk<RequestDetail, string>(
    'data/addCharacterToRequest',
    async (characterID) => {
            const response = await api.characters.addCharacterToRequest(characterID);
            return response.data; // Возвращаем данные из ответа API
    }
);

export const loginCreateThunk = createAsyncThunk<User, {email: string, password: string}>(
    'data/loginCreate',
    async ({email, password}) => {
            console.log(email, password)
            const response = await api.login.loginCreate({email, password});
            return response.data;
    }
);

export const requestsReadThunk = createAsyncThunk<RequestDetail, string>(
    'data/requestsRead',
    async (request_id) => {
            const response = await api.requests.requestsRead(request_id);
            return response.data;
    }
);

export const deleteFromMapThunk = createAsyncThunk<CharacterToRequest[], {request_id: string, character_id: string}>(
    'data/deleteFromMap',
    async (characterOnMap) => {
            const response = await api.characterOnMap.characterOnMapDelete(characterOnMap.request_id, characterOnMap.character_id);
            return response.data;
    }
);

export const requestDeleteThunk = createAsyncThunk<void, string>(
    'data/requestDelete',
    async (request_id) => {
            await api.requests.requestsDelete(request_id);
    }
);

export const miniSaveThunk = createAsyncThunk<void, {mapID: string, mapName: string}>(
    'data/miniSave',
    async ({mapID, mapName}) => {
            await api.requests.requestsFormUpdate(mapID, { map_name: mapName });
    }
);

export const saveCharacterChangesThunk = 
createAsyncThunk<void, { activeAppeal: string, character_id: string, coordinate_x: number | undefined, coordinate_y: number | undefined, friendorenemy: boolean | undefined }>(
    'data/saveCharacterChanges',
    async ({ activeAppeal, character_id, coordinate_x, coordinate_y, friendorenemy }) => {
        await api.characterOnMap.characterOnMapUpdate(activeAppeal, character_id, {
            coordinate_x,
            coordinate_y,
            friendorenemy
        });
    }
)

export const logOutAction = createAsyncThunk(
    'data/logOutAction',
    async () => {
        const response = await api.api.apiUserLogoutCreate()
        return response
    }
)


interface DataState{
    CharacterName: string,
    userInfo: User | null,
    mapID: string,
    CharacterOnMapCount: number,
    mapName: string
    status: string,
    error: string
    
}


const initialState: DataState = {
    CharacterName: '',
    userInfo: null,
    mapID: '',
    CharacterOnMapCount: 0,
    mapName: '',
    status: '',
    error: ''
}




const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setCharacterName(state, {payload}) {
            state.CharacterName = payload
        },
        setUserInfo(state, {payload}) {
            state.userInfo = payload
        },
        setMapID(state, {payload}) {
            state.mapID = payload
        },
        setCharacterOnMapCount(state, {payload}) {
            state.CharacterOnMapCount = payload
        },
        addCharacterOnMapCount(state) {
            state.CharacterOnMapCount += 1
        },
        subCharacterOnMapCount(state) {
            state.CharacterOnMapCount -= 1
        },
        setMapName(state, {payload}) {
            state.mapName = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
                state.mapID = action.payload.CharacterOnMapID
                state.CharacterOnMapCount = action.payload.CharacterOnMapCount
            });

        builder.addCase(addCharacterToRequestThunk.fulfilled, (state, action) => {
            state.CharacterOnMapCount += 1
            if (action.payload.request_id)
                state.mapID = action.payload.request_id.toString()
            });
        builder.addCase(loginCreateThunk.fulfilled, (state, action) => {
            state.userInfo = action.payload
        });
        builder.addCase(fetchCharacter.fulfilled, (state, action) => {
            state.CharacterName = action.payload.name
        });

        builder.addCase(requestsReadThunk.fulfilled, (state, action) => {
            state.mapName = action.payload.map_name ?? ''
        });

        builder.addCase(deleteFromMapThunk.fulfilled, (state) => {
            state.CharacterOnMapCount -= 1
        });

        builder.addCase(requestDeleteThunk.fulfilled, (state) => {
            state.mapID = ''
            state.mapName = ''
            state.CharacterOnMapCount = 0
        });

        builder.addCase(miniSaveThunk.fulfilled, (state) => {
            state.mapID = ''
            state.mapName = ''
            state.CharacterOnMapCount = 0
        });

        builder.addCase(saveCharacterChangesThunk.fulfilled, (state) => {
            state.status = 'success'
        });

        builder.addCase(logOutAction.fulfilled, (state) => {
            state.userInfo = null
            state.CharacterName = ''
            state.mapID = ''
            state.CharacterOnMapCount = 0
            state.mapName = ''
        });
        
      }
})

export const useCharacterName = () => 
    useSelector((state: RootState) => state.ourData.CharacterName)

export const useUserInfo = () =>
    useSelector((state: RootState) => state.ourData.userInfo)

export const useMapID = () =>
    useSelector((state: RootState) => state.ourData.mapID)

export const useCharacterOnMapCount = () =>
    useSelector((state: RootState) => state.ourData.CharacterOnMapCount)

export const useMapName = () =>
    useSelector((state: RootState) => state.ourData.mapName)

export const {
    setCharacterName: setCharacterNameAction,
    setUserInfo: setUserInfoAction,
    setMapID: setMapIDAction,
    setCharacterOnMapCount: setCharacterOnMapCountAction,
    addCharacterOnMapCount: addCharacterOnMapCountAction,
    subCharacterOnMapCount: subCharacterOnMapCountAction,
    setMapName: setMapNameAction
} = dataSlice.actions


export const useAppDispatch = () => useDispatch<AppDispatch>();
export default dataSlice.reducer
