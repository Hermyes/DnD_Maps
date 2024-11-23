import { FC, useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';

import { CharacterInfo, getCharactersByName } from '../../modules/CharacterAPI';
import InputField from '../../components/InputField/InputField';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { ROUTE_LABELS } from '../../Routes';
import { CHARACTERS_MOCK } from '../../modules/mock';
import './CharacterList.css';
import NavbarComponent from '../../components/NavigationBar/NavigationBar';

const CharacterListPage: FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [characters, setCharacters] = useState<CharacterInfo[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        getCharactersByName(searchValue).then((response) => {
            setCharacters(response.characters)
            setLoading(false)
        }).catch(() => {
            const resultCharacters = []
                for (let i = 0; i < CHARACTERS_MOCK.characters.length; i++)
                    if (CHARACTERS_MOCK.characters[i].name.toLowerCase().includes(searchValue.toLowerCase()))
                        resultCharacters.push(CHARACTERS_MOCK.characters[i])
            setCharacters(resultCharacters)
            setLoading(false)
        })
}

    useEffect(() => {
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
                {characters.map((character) => (
                    <CharacterCard {...character} />
                ))}
            </Container>
        </div>  
    );
};

export default CharacterListPage;
