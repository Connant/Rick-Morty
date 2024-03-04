import {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import s from './style.module.scss';
import {format} from "date-fns";
import ClosePic from '@shared/assets/close.svg'
import {ICharacter} from "@shared/types/characters/types.ts";

interface CharacterModalProps {
  character: ICharacter;
  isOpen: boolean;
  onClose: () => void;
}

const CharacterModal = ({character, isOpen, onClose}: CharacterModalProps) => {
  const [showAll, setShowAll] = useState<boolean>(false);
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
      setShowAll(false)
    }

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
      document.body.classList.remove(s.bodyNoScroll);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const toggleEpisodes = () => {
    setShowAll(!showAll);
  };


  const episodeNumber = (url: string) => url.split('/').pop();

  const modalContent = (
    <div data-testid="character-modal" className={s.modalOverlay} onClick={onClose}>
      <div className={s.modalContent} onClick={e => e.stopPropagation()}>
        <div className={s.modalHeader}>
          <button data-testid="close-modal" className={s.modalClose} onClick={onClose}>
            <img src={ClosePic} alt='Close modal'/>
          </button>
        </div>
        <div className={s.modalBody}>
          <img className={s.modalAvatar} src={character.image} alt={`${character.name} photo`}/>
          <h4 className={s.modalTitle}>{character.name} <sup>{character.gender}</sup></h4>
          <ul className={s.modalList}>
            <li className={s.modalListItem}>
              <span>Id:</span> {character.id}
            </li>
            <li className={s.modalListItem}>
              <span>Status:</span> {character.status}
            </li>
            <li className={s.modalListItem}>
              <span>Species:</span> {character.species}
            </li>
            <li className={s.modalListItem}>
              <span>Type:</span> {character.type || "---"}
            </li>
            <li className={s.modalListItem}>
              <span>Origin:</span> <a href={character.origin.url}>{character.origin.name}</a>
            </li>
            <li className={s.modalListItem}>
              <span>Location:</span> <a href={character.location.url}>{character.location.name}</a>
            </li>
            <li className={s.modalListItem}>
              <span>Created:</span> {format(character.created, 'dd.MM.yyyy HH:mm')}
            </li>
            <li className={`${s.modalListItem} ${s.modalListItemEpisodes}`}>
              <span>Episode:</span>
              <ul className={s.modalEpisodeList}>
                {character.episode.slice(0, showAll ? character.episode.length : 2).map((item, index) => (
                  <li key={index} className={s.modalEpisodeListItem}>
                    <a href={item}>{`Episode ${episodeNumber(item)}`}</a>
                  </li>
                ))}
                {!showAll && character.episode.length > 3 && (
                  <li className={s.modalEpisodeListItem}>
                    <button className={s.toggleEpisodesButton} onClick={toggleEpisodes}>
                      {`and ${character.episode.length - 3}+ more`}
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

export default CharacterModal;