import {format} from "date-fns";
import s from './style.module.scss'
import {IEpisodes} from "@shared/types/episodes";
import {locationId, residentId} from "@shared/utils";

interface IEpisodesCard {
  episodes: IEpisodes
}

const CardEpisodes = ({episodes}: IEpisodesCard) => {


  return (
    <li className={s.card}>

      <h4 className={`${s.cardInsideTitle} text-left`}>{episodes.name}</h4>
      <ul className={`${s.cardInsideList} flex flex-col items-start text-left gap-1.5 mt-2.5`}>
        <li className={s.cardInsideListItem}>
          <span>Id:</span> {episodes.id}
        </li>
        <li className={s.cardInsideListItem}>
          <span>Air date:</span> {episodes.air_date}
        </li>
        <li className={s.cardInsideListItem}>
          <span>Episode:</span> {episodes.episode}
        </li>
        <li className={`${s.cardInsideListItem} ${s.cardInsideListItemResident}`}>
          <span>Characters count:</span> {episodes.characters.length}

          <ul className={s.residentList}>
            {episodes.characters.map((character) =>
              <li key={character}>
                Character id {residentId(character)}
              </li>)}
          </ul>
        </li>
        <li className={s.cardInsideListItem}>
          <span>Url:</span> <a href={episodes.url}>{`Location ${locationId(episodes.url)}`}</a>
        </li>
        <li className={s.cardInsideListItem}>
          <span>Created:</span> {format(episodes.created, 'dd.MM.yyyy HH:mm')}
        </li>
      </ul>

    </li>
  )
};

export default CardEpisodes;