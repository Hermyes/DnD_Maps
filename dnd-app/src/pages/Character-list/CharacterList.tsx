import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container, Spinner } from 'react-bootstrap';

import { CharacterInfo, getCharactersByName } from '../../modules/CharacterAPI';
import InputField from '../../components/InputField/InputField';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { ROUTE_LABELS } from '../../Routes';
import { CHARACTERS_MOCK } from '../../modules/mock';
import './CharacterList.css';

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
            setCharacters(CHARACTERS_MOCK.characters)
            setLoading(false)
        })
}

    useEffect(() => {
        handleSearch(); // По умолчанию загружаем персонажей при первой загрузке страницы
    }, []);

    
    return (
        <div className='background'>
        <div className="character-page">
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
            <Container className="card-container">
            <Row md={3} className="g-4 justify-content-center w-100" style={{marginTop: '10px'}}>
                {characters.map((character, index) => (
                <Col key={index}>
                    <CharacterCard {...character} />
                </Col>
                ))}
            </Row>
            </Container>
        </div>
        </div>    
    );
};

export default CharacterListPage;
