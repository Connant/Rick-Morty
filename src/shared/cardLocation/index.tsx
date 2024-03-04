import {format} from "date-fns";
import s from './style.module.scss'
import {ILocation} from "@shared/types/location/types.ts";
import {locationId, residentId} from "@shared/utils";

interface ILocationCard {
  location: ILocation
}

const CardLocation = ({location}: ILocationCard) => {

  return (
    <li className={s.card}>

      <h4 className={`${s.cardInsideTitle} text-left`}>{location.name}</h4>
      <ul className={`${s.cardInsideList} flex flex-col items-start text-left gap-1.5 mt-2.5`}>
        <li className={s.cardInsideListItem}>
          <span>Id:</span> {location.id}
        </li>
        <li className={s.cardInsideListItem}>
          <span>Type:</span> {location.type}
        </li>
        <li className={`${s.cardInsideListItem} ${s.cardInsideListItemResident}`}>
          <span>Residents count:</span> {location.residents.length}

          <ul className={s.residentList}>
            {location.residents.map((resident) =>
              <li>
                Character id {residentId(resident)}
              </li>)}
          </ul>
        </li>
        <li className={s.cardInsideListItem}>
          <span>Url:</span> <a href={location.url}>{`Location ${locationId(location.url)}`}</a>
        </li>
        <li className={s.cardInsideListItem}>
          <span>Created:</span> {format(location.created, 'dd.MM.yyyy HH:mm')}
        </li>
      </ul>

    </li>
  )
};

export default CardLocation;