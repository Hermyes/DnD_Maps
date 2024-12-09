import { FC, useState, useEffect } from 'react';
import { Button, Container, Spinner, Image } from 'react-bootstrap';
import InputField from '../../components/InputField/InputField';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { ROUTE_LABELS, ROUTES } from '../../Routes';
import { CHARACTERS_MOCK } from '../../modules/mock';
import './CharacterList.css';
import NavbarComponent from '../../components/NavigationBar/NavigationBar';
import {  setCharacterNameAction, useCharacterName, useCharacterOnMapCount, useMapID } from '../../slices/dataSlice';
import { Link } from 'react-router-dom';
import {Character} from '../../api/Api'
import {fetchCharacters, addCharacterToRequestThunk} from '../../slices/dataSlice'
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../slices/dataSlice';



const CharacterListPage: FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(false);

    const mapID = useMapID()
    const CharacterOnMapCount = useCharacterOnMapCount()

    const CharacterName = useCharacterName()

    const dispatch = useAppDispatch()

    const handleSearch = async () => {
        setLoading(true)
        dispatch(fetchCharacters(searchValue)).then(unwrapResult)
        .then((data) => {
            setCharacters(data.characters)
        }).catch(() => {
            const resultCharacters = []
                for (let i = 0; i < CHARACTERS_MOCK.characters.length; i++)
                    if (CHARACTERS_MOCK.characters[i].name.toLowerCase().includes(searchValue.toLowerCase()))
                        resultCharacters.push(CHARACTERS_MOCK.characters[i])
            setCharacters(resultCharacters)
        }).finally(() => {
            setLoading(false)
            dispatch(setCharacterNameAction(CharacterName))
        }
        )    
    }

    const countCharactersOnMap = () => {
        return (CharacterOnMapCount === 0 ? '' : `${ROUTES.MAP}/${mapID}`)
    }

    // Добавление персонажа на карту
    const handleAddToWish = (characterID: string) => {
        dispatch(addCharacterToRequestThunk(characterID)).then(unwrapResult)
        .catch(()=>{
            console.log('уже добавлено')
        })
    }

    useEffect(() => {
        setSearchValue(CharacterName)
        handleSearch(); // По умолчанию загружаем персонажей при первой загрузке страницы
    }, []);

    
    return (
        <div className='background'>
        <NavbarComponent />
        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.CHARACTERS }]} />
            <InputField 
            value={searchValue}
            setValue={(value: string) => setSearchValue(value)}
            loading={loading}
            onSubmit={handleSearch}
            placeholder="Найти персонажа"
            />

            {loading && <div className="loadingBg"><Spinner animation="border" /></div>}

            {/* Контейнер с карточками персонажей */}
            <Container className="d-flex flex-wrap container-fluid g-4 justify-content-center w-100 gap-4 mt-5">
                {characters.map((character) => {
                    return (
                        <CharacterCard {...character} addToMap={() => handleAddToWish(character.character_id.toString())} />
                    )
                })} 
            </Container>

            <Link to={countCharactersOnMap()}>
                <Button className="btnMap" variant="outline-warning">
                        <Image className='btnImage' src='/RIP_Frontend/mapIcon.png' width={100} />
                        <div className='CharacterCount' hidden={CharacterOnMapCount == 0}>{CharacterOnMapCount}</div>
                </Button>
            </Link>
        </div>  
    );
};

export default CharacterListPage;