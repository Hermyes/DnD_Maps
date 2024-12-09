import { FC, useState, useEffect } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { ROUTE_LABELS, ROUTES } from '../../Routes';
import './MapPage.css';
import NavbarComponent from '../../components/NavigationBar/NavigationBar';
import * as dataSlice from "../../slices/dataSlice"
import CharacterCardOnMap from '../../components/CharacterCardOnMap/CharacterCardOnMap';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api';
import { CharacterToRequest } from '../../api/Api';
import {requestsReadThunk, deleteFromMapThunk, requestDeleteThunk, miniSaveThunk} from '../../slices/dataSlice'
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../slices/dataSlice';


const MapPage: FC = () => {
    const { request_id } = useParams()
    const MapName = dataSlice.useMapName()
    const MapID = dataSlice.useMapID()
    const [charactersOnMap, setCharactersOnMap] = useState<CharacterToRequest[]>([])
    const [validated, setValidated] = useState(false)
    const [dataValid, setDataValid] = useState(true)


    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const getCharactersHandler = () => {
        if(request_id)
            dispatch(requestsReadThunk(request_id)).then(unwrapResult)
        .then((data) => {
                if(data.characters){
                    // const characters = response.data.characters.map((characterEntry: any) => characterEntry.character)
                    const characters = data.characters.map((characterEntry: any) => {
                        return {
                            character: characterEntry.character, // Данные о персонаже
                            coordinate_x: characterEntry.coordinate_x, // Координата X
                            coordinate_y: characterEntry.coordinate_y, // Координата Y
                            friendorenemy: characterEntry.friendorenemy, // Статус "друг или враг"
                        };
                    });
                    setCharactersOnMap(characters)
                    console.log(characters)
                }
                }).catch(() => {
                    console.log('Ошибка получения персонажей')
                })
            }

    const deleteFromMapHandler = (idrequest: string, idcharacter: string) => {
        dispatch(deleteFromMapThunk({request_id: idrequest, character_id: idcharacter})).then(unwrapResult)
        .then((data) => {
            if (data) {
                getCharactersHandler()
                // setCharactersOnMap(data.map((characterEntry: any) => characterEntry.character));
            }
            if (data && data.length === 0){
                dispatch(dataSlice.setMapIDAction(''))
                navigate(ROUTES.CHARACTERS)
            }
        }).catch(() => {
            console.log('Ошибка удаления')
        })
    }

    const deleteMapHandler = (idrequest: string) => {
        dispatch(requestDeleteThunk(idrequest)).then(() => {
            navigate(ROUTES.CHARACTERS)
        }).catch (() => {
            console.log('Ошибка удаления')
        })
    }

    const miniSaveHandler = () => {
        dispatch(miniSaveThunk({mapID: MapID, mapName: MapName})).then(() => {
            // dispatch(dataSlice.setMapNameAction(''))
            // dispatch(dataSlice.setMapIDAction(''))
            // dispatch(dataSlice.setCharacterOnMapCountAction(0))
            // dispatch(dataSlice.setCharacterNameAction(''))
            navigate(ROUTES.CHARACTERS)
        }).catch(() => {
            console.log('Ошибка обновления')
        })
    }


    const mapSaveHandler = (event: any) => {
        const form = event.currentTarget
        event.preventDefault();

        MapName === '' ? setDataValid(false) : setDataValid(true)

        if (form.checkValidity() === false) {
            setValidated(true)
            return
          }

          api.requests.requestsUpdate(MapID, {map_name: MapName}).then(() => {
                console.log('Карта успешно сохранена');
                miniSaveHandler()
          }).catch(() => {
                setDataValid(false)
                setValidated(true)
                console.log('Ошибка при сохранении карты');
          }).finally(() => 
                setValidated(true))
          }



    useEffect(() => {
        getCharactersHandler()
    }, []);

    
    return (
        <div className='background'>
            <NavbarComponent />
            {MapID == request_id ? (<BreadCrumbs crumbs={[
                    {label: ROUTE_LABELS.CHARACTERS, path: ROUTES.CHARACTERS},
                    {label: 'Черновая карта'}]}/>) : (<BreadCrumbs crumbs={[
                    {label: ROUTE_LABELS.MAPS, path:ROUTES.MAPS},
                    {label: 'Сохраненная карта'}
                    ]}/>)}
        
            <div className='d-flex'>
                <div className='d-flex flex-column '>
                    <div className='fixerNado '>         
                        <div className="d-flex flex-column justify-content-left gapper2">
                            {charactersOnMap.map((item: any, index: any) => {
                            if (!item.character) {
                                return null;
                            }
                                return (
                                    <div key={index}>
                                        <CharacterCardOnMap
                                            activeMapID={request_id}
                                            character_id={item.character.character_id}
                                            name={item.character.name}
                                            photo_url={item.character.photo_url}
                                            {...item}
                                            deleteFromWish={() => deleteFromMapHandler(MapID, item.character.character_id)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <Form className='MapSaveWrapper' noValidate validated={validated} onSubmit={mapSaveHandler}>
                    <Form.Group as={Col} className="">
                        <Form.Control 
                                required
                                type="text"
                                placeholder="Название карты"
                                value={MapName}
                                disabled={request_id != MapID}
                                onChange={(el) => dispatch(dataSlice.setMapNameAction(el.target.value))}
                                className='MapNameInput'
                            />
                    </Form.Group>
                            <Form.Control.Feedback type="invalid">{!dataValid ? "Обязательное поле!" : ""}</Form.Control.Feedback>
                            <Button type="submit" 
                            className='MapSaveButton'
                            variant="outline-success" 
                            disabled={request_id != MapID}>Сформировать карту</Button>

                            <Button type="button" 
                            className='MapDeleteButton'
                            variant="outline-danger" 
                            onClick={() => deleteMapHandler(MapID)} 
                            disabled={request_id != MapID}>Удалить карту</Button>
                </Form>
                
            </div>
        </div>
    );
};

export default MapPage;