import { FC } from 'react';
import { Card, Image } from 'react-bootstrap';
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
}

const CharacterCard: FC<CharacterCardProps> = ({ character_id, name, race, features, photo_url, mockImg }) => {
    return (
        <Link to={`${ROUTES.CHARACTERS}/${character_id}`} className="characterCardLink" style={{ textDecoration: 'none' }}>
        <Card className="characterCard"> 
            <Image className="characterPhoto" src={photo_url || mockImg || defaultImage} />            
            <div className="characterDescriptionCard">
            <Card.Title className="CharacterNameOnCard">
                {name}
            </Card.Title>
            <div className ='lineCharacter'></div>
            <Card.Text className="CharacterRaceOnCard">{race}</Card.Text>
            </div>
            
            <div className="characterDescriptionCardLow">
            <Card.Text className="CharacterFeaturesOnCardHeader">Особенности:</Card.Text>
            <Card.Text className="CharacterFeaturesOnCard">{features}</Card.Text>
            </div>
            {/* <Button className="addButton">
            <span className="addIcon">+</span>
            </Button> */}
        </Card>
        </Link>
    );
}; 

export default CharacterCard;
