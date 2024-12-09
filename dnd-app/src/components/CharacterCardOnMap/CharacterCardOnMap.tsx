import { FC, useEffect, useState } from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import defaultImage from './default.png';
import './CharacterCardOnMap.css'; 
import { useMapID } from '../../slices/dataSlice';
import {saveCharacterChangesThunk} from '../../slices/dataSlice'
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../slices/dataSlice';

interface CharacterCardProps {
    activeMapID: number,
    character_id: number,
    name: string,
    race: string,
    coordinate_x?: number,
    coordinate_y?: number,
    friendorenemy?: boolean,
    photo_url: string,
    mockImg?: string,
    deleteFromWish: () => void,
}

const CharacterCardOnMap: FC<CharacterCardProps> = ({ character_id, name, race, photo_url, mockImg, coordinate_x, coordinate_y, friendorenemy, deleteFromWish, activeMapID}) => {
    const [activeButton, setActiveButton] = useState<'green' | 'red' | null>(null);


    const [_coordinate_x, setCoordinate_X] = useState(coordinate_x)
    const [_coordinate_y, setCoordinate_Y] = useState(coordinate_y)
    const [_friendorenemy, setFriendOrEnemy] = useState(friendorenemy)

    const activeAppeal = useMapID()

    const dispatch = useAppDispatch()

    const saveChangesHandler = async () => {
        if (character_id === undefined) {
            console.error('character_id is undefined');
            return;
        }
        // await api.characterOnMap.characterOnMapUpdate(activeAppeal, character_id.toString(), {coordinate_x: _coordinate_x, coordinate_y: _coordinate_y, friendorenemy: _friendorenemy})
        dispatch(saveCharacterChangesThunk({activeAppeal: activeAppeal, character_id: character_id.toString(), coordinate_x: _coordinate_x, coordinate_y: _coordinate_y, friendorenemy: _friendorenemy})).then(unwrapResult)
        .then((data) => {
            console.log('Ответ сервера:', data);
            // setCoordinate_X(data.coordinate_x)
            // setCoordinate_Y(data.coordinate_y ?? undefined)
            // setFriendOrEnemy(data.friendorenemy ?? undefined)
            console.log('Успешно обновлено')
        }).catch(() => {
            console.log('Ошибка обновления')
        })
    }

    
    useEffect(() => {
        setCoordinate_X(coordinate_x)
        setCoordinate_Y(coordinate_y)
        setFriendOrEnemy(friendorenemy)
        activeBtnHndl()
    },[coordinate_x, coordinate_y, friendorenemy])


    const handleGreenButtonClick = () => {
        setActiveButton('green');
        setFriendOrEnemy(true);
    };

    const handleRedButtonClick = () => {
        setActiveButton('red');
        setFriendOrEnemy(false);
    };
    
    const activeBtnHndl = () => {
        if (friendorenemy === true) {
            setActiveButton('green')
        }
        else if (friendorenemy === false) 
            setActiveButton('red')
        
    }

    return (
        <>
            <div className='cardHorWrapper'>
                <Button className='btnDelete' variant='primary' onClick={() => deleteFromWish()} disabled={activeAppeal != activeMapID.toString()}>
                    <div className='btnDelText'>
                        Удалить
                    </div>
                </Button>

                <div className='informationWrapper'>
                    <Image className="characterPhotoMap" src={photo_url || mockImg || defaultImage} />

                    <div className='verticalInformationWrapper'>
                        <Card.Title className="CharacterNameOnCardMap">
                            {name}
                        </Card.Title>

                        <div className ='lineCharacter'></div>

                        <Card.Text className="CharacterRaceOnCardMap">
                            {race}
                        </Card.Text>
                        <div className='coordinatesHeader'>Координаты на карте:</div>
                        <div className='d-flex gap-4'>
                            <div className='d-flex'>
                                <span className='coordinatesHeader2'>X:</span>
                                <input 
                                type="text" 
                                className='inputFieldCoordinates' 
                                value={_coordinate_x} 
                                onChange={(event) => {
                                    setCoordinate_X(Number.parseInt(event.target.value))}} 
                                    disabled={activeAppeal != activeMapID.toString()} ></input>
                            </div>
                            <div className='d-flex'>
                                <span className='coordinatesHeader2'>Y:</span>
                                <input 
                                type="text" 
                                className='inputFieldCoordinates' 
                                value={_coordinate_y} 
                                onChange={(event) => {
                                    setCoordinate_Y(Number.parseInt(event.target.value))}} 
                                    disabled={activeAppeal != activeMapID.toString()}></input>
                            </div>

                            <div className='d-flex'>
                                <Button className={`btnGreen ${activeButton === 'green' ? 'active' : ''}`} 
                                    onClick={handleGreenButtonClick} disabled={activeAppeal != activeMapID.toString()}>Д</Button>
                                <Button className={`btnRed ${activeButton === 'red' ? 'active' : ''}`} 
                                    onClick={handleRedButtonClick} disabled={activeAppeal != activeMapID.toString()}>В</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Button className='btnSave' variant='primary' onClick={saveChangesHandler} disabled={activeAppeal != activeMapID.toString()}>
                    <div className='btnSaveText'>
                        Сохранить 
                    </div>
                </Button>

            </div>
        </>
    );
        
         {/* <Card className="characterCard"> 
         <Link to={`${ROUTES.CHARACTERS}/${character_id}`} className="characterCardLink" style={{ textDecoration: 'none' }}>
             <div className="characterDescriptionCard">
                 <Card.Title className="CharacterNameOnCard">
                     {name}
                 </Card.Title>
                 <div className ='lineCharacter'></div>
                 <Card.Text className="CharacterRaceOnCard">{race}</Card.Text>
             </div>
             <Image className="characterPhoto" src={photo_url || mockImg || defaultImage} />            
             <div className="characterDescriptionCardLow">
             </div>
         </Link>
         <Button className='addButton' variant='primary' onClick={() => addToMap()}>
             <Image src="/RIP_Frontend/plusIcon.png" width={30} />
         </Button>
         </Card> */}
}; 

export default CharacterCardOnMap;
