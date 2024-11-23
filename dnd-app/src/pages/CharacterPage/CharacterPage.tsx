import "./CharacterPage.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { useParams } from "react-router-dom";
import { CharacterInfo, getCharacterById } from "../../modules/CharacterAPI";
import { Image } from "react-bootstrap";
import { CHARACTERS_MOCK } from "../../modules/mock";
import defaultImage from "./default.png";
import NavbarComponent from "../../components/NavigationBar/NavigationBar";

export const CharacterPage: FC = () => {
    const [characters, setCharacters] = useState<CharacterInfo>();
  
    const { character_id } = useParams();

    useEffect(() => {
        if (!character_id) return;
        getCharacterById(character_id)
          .then((response) => setCharacters(response))
          .catch(() => {
            setCharacters(CHARACTERS_MOCK.characters.find((characters) => String(characters.character_id) == character_id))
          })
      }, [character_id]);


    return (
        <>
        <NavbarComponent />
        <div className="characterPageBackground">
            <BreadCrumbs
                crumbs={[
                { label: ROUTE_LABELS.CHARACTERS, path: ROUTES.CHARACTERS },
                { label: characters?.name || "Персонаж" },
                ]}
            />

            <div className="d-flex container-fluid w-100 gap-3 justify-content-center characterPageWrapper">
                <div className="flex-column d-flex gap-3 characterPageWrapper2">
                    <div className="characterCardPage">
                        <div className="characterPagePhoto" >
                            <Image className="characterPagePhoto" src={characters?.photo_url || characters?.mockImg || defaultImage} />
                        </div>
                        <div className="characterPageDescriptionCard">
                            <div className="CharacterPageNameOnCard">
                                {characters?.name}
                            </div>
                            <div className="linePageCharacter"></div>
                        </div>
                    </div>

                    <div className="characterPageAndClassCard">
                        <div className="d-flex mx-3">
                        <div className="DetailCharacterRaceAndClassCardRaceAndClassHeader">Класс:</div>
                        <div className="DetailCharacterClassValue">{ characters?.class_field}</div>
                        
                        </div>
                        <div className="d-flex mx-3">
                        
                        <div className="DetailCharacterRaceAndClassCardRaceAndClassHeader">Раса:</div>
                        <div className="DetailCharacterRaceValue">{ characters?.race}</div>
                        </div>
                    </div>
                </div>

                <div className="flex-column d-flex gap-3">
                    <div className="d-flex characterPageWrapper3">
                        <div className="DetailCharacterArmorCard d-flex justify-content-center align-items-center">
                            <span style={{ fontSize: '3rem', fontFamily: 'OpenSans Bold' }}>
                                {characters?.armor_class}
                            </span>
                        </div>

                        <div className="DetailCharacterHitsCard d-flex justify-content-center align-items-center">
                            <span style={{ fontSize: '3rem', fontFamily: 'OpenSans Bold' }}>
                                {characters?.hit_points}
                            </span>
                        </div>
                    </div>

                    <div className="characterPageDescription">
                        <div className="d-flex flex-column justify-content-left">
                            <h1 style={{fontFamily:'OpenSans Bold', fontSize:'25px'}}>Описание</h1>
                            <p style={{fontFamily:'OpenSans Reg'}}>{characters?.description}</p>
                            <h1 style={{fontFamily:'OpenSans Bold', fontSize:'25px'}}>Особенности</h1>
                            <p style={{fontFamily:'OpenSans Reg'}}>{characters?.features}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
        // <div className="characterPageBackground">
            // <NavbarComponent />
        //         <BreadCrumbs
        //     crumbs={[
        //     { label: ROUTE_LABELS.CHARACTERS, path: ROUTES.CHARACTERS },
        //     { label: characters?.name || "Персонаж" },
        //     ]}
        // />
        //     {characters ? (


            // <div className=""> 
            //     <div className="container text-center">
            //     <div className="row">
            //         <div className="col-6 col-sm-4">
            //         <Card className="characterCardPage" style={{ borderRadius: '30px', backgroundColor: '#ECE4D9' }}> 
            //         <div className="characterPageDescriptionCard">
            //             <Card.Title className="CharacterPageNameOnCard">
            //                 {characters.name}
            //             </Card.Title>
            //             <div className ='lineCharacter'></div>
            //         </div>
            //         <Image className="characterPagePhoto" src={characters.photo_url || defaultImage} />            
            //     </Card>
            //         </div>
            //         <div className="col-6 col-sm-4">
            //         <div className="DetailCharacterArmorCard">
            //             <div className="DetailCharacterArmorClassCardArmorClassIcon" style={{ position: 'relative', display: 'inline-block' }}>
            //                 <Image src='/RIP_Frontend/shieldIcon.png' width={150}/>
            //                 <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, fontSize: '50px', color: 'black' }}>
            //                     {characters.armor_class}
            //                 </p>
            //             </div>
            //         </div>
            //         </div>
            //         <div className="col-6 col-sm-4">
            //         <div className="DetailCharacterHitsCard">
            //             <div className="DetailCharacterArmorClassCardArmorClassIcon" style={{ position: 'relative', display: 'inline-block' }}>
            //                 <Image src='/RIP_Frontend/heartIcon.png' width={150}/>
            //                 <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, fontSize: '50px', color: 'black' }}>
            //                     {characters.hit_points}
            //                 </p>
            //             </div>
            //         </div>
            //         </div>

                    
            //         <div className="w-100 d-none d-md-block"></div>

            //         <div className="col-6 col-sm-4">
            //         <Card className="characterPageAndClassCard">
            //         <h2 className="DetailCharacterRaceAndClassCardRaceAndClassHeader">Класс:
            //         Раса:</h2>
            //         <p className="DetailCharacterRaceAndClassCardClassValue">{ characters.class_field}</p>
            //         <p className="DetailCharacterRaceAndClassCardRaceValue">{ characters.race }</p>
            //     </Card>
            //         </div>
            //         <div className="col-6 col-sm-4">
            //         <Card
            //         className="characterPageDescription">
            //         <p style={{fontFamily:'OpenSans Reg', textAlign: 'left'}}>{characters.description}</p>
            //         <h1 style={{fontFamily:'OpenSans Bold', fontSize:'25px', textAlign: 'left'}}>Особенности</h1>
            //         <p style={{fontFamily:'OpenSans Reg', textAlign: 'left'}}>{characters.features}</p>
            //     </Card>
            //         </div>
            //     </div>
            //     </div>
            // </div>
        
        //     ) : (
        //         <div className="album_page_loader_block">{/* загрузка */}
        //           <Spinner animation="border" />
        //         </div>
        //       )}
        // </div>
    );
};

