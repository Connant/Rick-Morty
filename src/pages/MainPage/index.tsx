import {Link} from "react-router-dom";
import CharactersPic from './images/characters.png'
import LocationPic from './images/location.png'
import EpisodesPic from './images/episodes.png'
import s from './style.module.scss'


const mainPage = () => {

  return (
    <ul className={`${s.mainPageList} flex flex-row gap-20 items-center justify-center mt-20 mb-40`}>
      <li className={`${s.mainItem} max-w-max`}><Link to="/characters">
        <img className={s.mainItemImg} src={CharactersPic} alt='Characters List'/>
        <h2 className={s.mainTitle}>Characters</h2>
      </Link></li>
      <li className={s.mainItem}><Link to="/locations">
        <img className={s.mainItemImg} src={LocationPic} alt='Locations List'/>
        <h2 className={s.mainTitle}>Locations</h2>
      </Link></li>
      <li className={s.mainItem}><Link to="/">
        <img className={s.mainItemImg} src={EpisodesPic} alt='Episodes List'/>
        <h2 className={s.mainTitle}>Episodes</h2>
      </Link></li>
    </ul>

  )
};

export default mainPage;