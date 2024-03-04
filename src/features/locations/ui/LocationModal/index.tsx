import {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import s from './style.module.scss';
import {format} from "date-fns";
import ClosePic from '@shared/assets/close.svg'
import {ILocation} from "@shared/types/location/types.ts";
import {ICharacter} from "@shared/types/characters/types.ts";
import {fetchCharacterById} from "@features/characters/lib/charactersAPI.ts";

interface ILocationModalProps {
  location: ILocation
  isOpen: boolean;
  onClose: () => void;
}

const LocationModal = ({location, isOpen, onClose}: ILocationModalProps) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const modalRoot = document.getElementById('modal-root') as HTMLElement;
  if (!modalRoot) {
    const el = document.createElement('div');
    el.id = 'modal-root';
    document.body.appendChild(el);
  }

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keyup', handleKeyUp);

    if (isOpen) {
      document.body.classList.add(s.bodyNoScroll);
    } else {
      document.body.classList.remove(s.bodyNoScroll);
    }

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
      document.body.classList.remove(s.bodyNoScroll);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setCharacters([]);
      return;
    }


    const characterIds = location.residents.map(url => url.split('/').pop());
    const characterPromises = characterIds.map(id => fetchCharacterById(id));

    Promise.all(characterPromises)
      .then(characterData => {
        setCharacters(characterData);
      })
      .catch(error => {
        console.error('Failed to fetch characters:', error);
      });

  }, [isOpen, location.residents]);

  if (!isOpen) {
    return null;
  }

  const toggleEpisodes = () => {
    setShowAll(!showAll);
  };

  const locationId = (location: string) => location.split('/').pop();

  const modalContent = (
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modalContent} onClick={e => e.stopPropagation()}>
        <div className={s.modalHeader}>
          <button className={s.modalClose} onClick={onClose}>
            <img src={ClosePic} alt='Close modal'/>
          </button>
        </div>
        <div className={s.modalBody}>
          <h4 className={s.modalTitle}>{location.name}</h4>
          <ul className={s.modalList}>
            <li className={s.modalListItem}>
              <span>Id:</span> {location.id}
            </li>
            <li className={s.modalListItem}>
              <span>Type:</span> {location.type || "---"}
            </li>
            <li className={s.modalListItem}>
              <span>Dimension:</span> {location.dimension}
            </li>
            <li className={s.modalListItem}>
              <span>Created:</span> {format(location.created, 'dd.MM.yyyy HH:mm')}
            </li>
            <li className={s.modalListItem}>
              <span>Url:</span> <a href={location.url}>{`Location ${locationId(location.url)}`}</a>
            </li>
            <li className={`${s.modalListItem} ${s.modalListItemResidents}`}>
              <span>Residents:</span>
              <ul className={s.modalResidentsList}>
                {characters.slice(0, showAll ? characters.length : 2).map((character, index) => (
                  <li key={index} className={s.modalResidentsListItem}>
                    {character.name}
                  </li>
                ))}
                {!showAll && characters.length > 2 && (
                  <li className={s.modalResidentsListItem}>
                    <button className={s.toggleResidentsButton} onClick={toggleEpisodes}>
                      {`and ${characters.length - 2} more`}
                    </button>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, modalRoot);
};

export default LocationModal;
