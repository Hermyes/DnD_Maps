import { FC } from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import './CharacterCard.css';
import defaultImage from './default.png';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../Routes';

interface CharacterCardProps {
    character_id: number,
    name: string,
    race: string,
    class_field: string,
    description: string,
    features: string,
    hit_points: number,
    armor_class: number,
    photo_url: string,
    mockImg?: string,
    addToMap: () => void,
}

const CharacterCard: FC<CharacterCardProps> = ({ character_id, name, race, features, addToMap, photo_url, mockImg}) => {


    return (
        
        <Card className="characterCard"> 
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
            <Card.Text className="CharacterFeaturesOnCardHeader">Особенности:</Card.Text>
            <Card.Text className="CharacterFeaturesOnCard">{features}</Card.Text>
            </div>
        </Link>
        <Button  className='addButton' variant='primary' onClick={() => addToMap()}>
            <Image src="/RIP_Frontend/plusIcon.png" width={30} />
        </Button>
        </Card>
       
    );
}; 

export default CharacterCard;
