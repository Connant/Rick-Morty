import {format} from "date-fns";
import s from './style.module.scss'
import {useState} from "react";
import {IEpisodes} from "@shared/types/episodes";
import EpisodesModal from "@features/episodes/ui/EpisodesModal";

interface ILocationTable {
  episodes: IEpisodes[]
}

const EpisodesTable = ({episodes}: ILocationTable) => {

  const [selectedEpisode, setSelectedEpisode] = useState<IEpisodes | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (location: IEpisodes) => {
    setSelectedEpisode(location);
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
          <th className={s.tableHeader}>Air date</th>
          <th className={s.tableHeader}>Created</th>
        </tr>
        </thead>
        <tbody className={s.tableBody}>
        {episodes.map((episode) => (
          <tr className={`${s.tableRow}`} key={episode.id}>
            <td className={s.tableData}>{episode.id}</td>
            <td className={`${s.tableData} ${s.tableDataName}`}
                onClick={() => handleRowClick(episode)}>{episode.name}</td>
            <td className={s.tableData}>{episode.air_date}</td>
            <td className={s.tableData}>{format(episode.created, 'dd.MM.yyyy HH:mm')}</td>
          </tr>
        ))}
        </tbody>
      </table>

      {selectedEpisode && (
        <EpisodesModal
          isOpen={isModalOpen}
          episodes={selectedEpisode}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
};

export default EpisodesTable;
