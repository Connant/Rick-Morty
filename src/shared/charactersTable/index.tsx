import {format} from "date-fns";
import s from './style.module.scss'
import {useState} from "react";
import {Character} from "@shared/types/characters/types.ts";
import CharacterModal from "@features/characters/ui/CharacterModal";

interface ICharactersTable {
  characters: Character[]
}

const CharactersTable = ({characters}: ICharactersTable) => {

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <table className={s.table}>
        <thead className={s.tableHead}>
        <tr className={s.tableHeadRow}>
          <th className={s.tableHeader}>Id</th>
          <th className={s.tableHeader}>Name</th>
          <th className={s.tableHeader}>Status</th>
          <th className={s.tableHeader}>Origin</th>
          <th className={s.tableHeader}>Location</th>
          <th className={s.tableHeader}>Created</th>
        </tr>
        </thead>
        <tbody className={s.tableBody}>
        {characters.map((character) => (
          <tr className={`${s.tableRow} cursor-pointer`} key={character.id}>
            <td className={s.tableData}>{character.id}</td>
            <td className={`${s.tableData} ${s.tableDataName}`}
                onClick={() => handleRowClick(character)}>{character.name}</td>
            <td className={s.tableData}>{character.status}</td>
            <td className={s.tableData}><a href={character.origin.url}>{character.origin.name}</a></td>
            <td className={s.tableData}><a href={character.location.url}>{character.location.name}</a></td>
            <td className={s.tableData}>{format(character.created, 'dd.MM.yyyy HH:mm')}</td>
          </tr>
        ))}
        </tbody>
      </table>

      {selectedCharacter && (
        <CharacterModal
          isOpen={isModalOpen}
          character={selectedCharacter}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
};

export default CharactersTable;
