import { FC, useEffect, useState } from "react";
import NavbarComponent from "../../components/NavigationBar/NavigationBar";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { RequestDetail } from "../../api/Api";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import "../MapsPage/MapsPage.css"


  
  // Функция для получения класса статуса
  const getStatusClass = (status?: string): string => {
    switch (status) {
      case "Черновик":
        return "status-draft";
      case "Удалён":
      case "Отклонён":
        return "status-rejected";
      case "Сформирован":
        return "status-formed";
      case "Завершён":
        return "status-completed";
      default:
        return "status-default";
    }
  };


const MapsPage: FC = () => {
    const [mapResult, setMapsResult] = useState<RequestDetail[]>([])

    

    const getMapsHandler = () => {
        api.requests.getRequests().then((response) => {
            setMapsResult(response.data)
        }).catch(() => console.log('Не удалось получить карты'))
    }

    useEffect(() => {
        getMapsHandler()
    }, [])

    return(
        <div className="background">  
            <NavbarComponent />
            <BreadCrumbs 
                crumbs={[{label: ROUTE_LABELS.MAPS, path: ROUTES.MAPS}]}
            />
            <div className="MapsCards flexColumner">
                    {mapResult.map((map) => (
                    <div key={map.request_id} className="MapsCard">
                        <Link to={`${ROUTES.MAP}/${map.request_id}`} className="mapLink">
                            <div className="d-flex gapper">
                                <div className="mapName">{map.map_name || "Не указано"} </div>
                                <div className={`mapStatus ${getStatusClass(map.status)}`}>{map.status}</div>
                            </div>
                            <div className="mapCreator">{map.creator}</div>
                            <div className="d-flex gap-1 mt-5 flexColumner">
                                <div className="dateCreatedBox">{map.creation_date || "Дата создания"}</div> 
                                <div className="dateFormatedBox">{map.formation_date || "Дата формирования"}</div> 
                                <div className="dateCompletedBox">{map.completion_date || "Дата завершения"}</div> 
                            </div>
                            <div className="mapModerator">Мастер подземелья:</div>
                            <div className="mapModeratorValue">{map.moderator || "Не модерировано"}</div>

                            <div className="mapRatingWrapper">
                                <img src={'http://localhost:9000/dungeonsanddragonsphotos/ratingIcon.png'} alt="Рейтинг карты" className="mapRatingImage" />
                                <div className="mapRating">{map.rating || "-"}</div>
                            </div>
                        </Link>
                    </div>
                    ))}
            </div>
        </div>
    )
}

export default MapsPage