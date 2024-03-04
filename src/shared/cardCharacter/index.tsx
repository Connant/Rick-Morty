import {format} from "date-fns";
import s from './style.module.scss'
import {ICharacter} from "@shared/types/characters/types.ts";

interface ICard {
  character: ICharacter
}

const CardCharacter = ({character}: ICard) => {

  return (
    <li className={s.card}>

      <div className={s.cardCover}>
        <img className={`${s.cardCoverImage} ${s.avatar}`} src={character.image} alt={`${character.name} photo`}/>
        <h3 className={`${s.cardCoverTitile} ${s.cardTitle} mt-3 pl-2 text-left`}>{character.name}</h3>
      </div>

      <div className={s.cardInside}>

        <h4 className={`${s.cardInsideTitle} text-left mt-5`}>{character.name} <sup>{character.gender}</sup></h4>
        <ul className={`${s.cardInsideList} flex flex-col items-start text-left gap-1.5 mt-2.5`}>
          <li className={s.cardInsideListItem}>
            <span>Status:</span> {character.status}
          </li>
          <li className={s.cardInsideListItem}>
            <span>Species:</span> {character.species}
          </li>
          <li className={s.cardInsideListItem}>
            <span>Type:</span> {character.type || "---"}
          </li>
          <li className={s.cardInsideListItem}>
            <span>Origin:</span> <a href={character.origin.url}> {character.origin.name} </a>
          </li>
          <li className={s.cardInsideListItem}>
            <span>Location:</span> <a href={character.location.url}>{character.location.name}</a>
          </li>
          <li className={s.cardInsideListItem}>
            <span>Created:</span> {format(character.created, 'dd.MM.yyyy HH:mm')}
          </li>
        </ul>
      </div>

    </li>
  )
};

export default CardCharacter;