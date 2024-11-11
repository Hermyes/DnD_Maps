export interface CharacterInfo {
    character_id: number,
    name: string,
    race: string,
    class_field: string,
    description: string,
    features: string,
    hit_points: number,
    armor_class: number,
    photo_url: string, 
}

export interface characterResult {
    characters: CharacterInfo[],
    CharacterOnMapID: string,
    CharacterOnMapCount: number
}

export const getCharactersByName = async (name = ''): Promise<characterResult> => {
    const response = await fetch(`/api/characters/?CharacterName=${name}`);
    const text = await response.text();
    if (!response.ok) {
        console.error("Error fetching characters:", response.status, response.statusText);
        console.error("Response text:", text);
        throw new Error(`Error fetching characters: ${response.statusText}`);
    }
    try {
        const data = JSON.parse(text);
        return {
            characters: data.characters,
            CharacterOnMapID: data.CharacterOnMapID,
            CharacterOnMapCount: data.CharacterOnMapCount
        };
    } catch (error) {
        console.error("Error parsing JSON:", error);
        console.error("Response text:", text);
        throw error;
    }
};

export const getCharacterById = async (
    character_id: number | string
): Promise<CharacterInfo> => {
    try {
        const response = await fetch(`/characters/${character_id}/`);
        if (!response.ok) {
            const text = await response.text();
            console.error("Error fetching character:", response.status, response.statusText);
            console.error("Response text:", text);
            throw new Error(`Error fetching character: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching character by ID:", error);
        throw error;
    }
};
