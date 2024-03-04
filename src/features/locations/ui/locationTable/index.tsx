import {format} from "date-fns";
import s from './style.module.scss'
import {useState} from "react";
import {ILocation} from "@shared/types/location/types.ts";
import LocationModal from "@features/locations/ui/LocationModal";

interface ILocationTable {
  locations: ILocation[]
}

const LocationTable = ({locations}: ILocationTable) => {

  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (location: ILocation) => {
    setSelectedLocation(location);
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
          <th className={s.tableHeader}>dimension</th>
          <th className={s.tableHeader}>Created</th>
        </tr>
        </thead>
        <tbody className={s.tableBody}>
        {locations.map((location) => (
          <tr className={`${s.tableRow}`} key={location.id}>
            <td className={s.tableData}>{location.id}</td>
            <td className={`${s.tableData} ${s.tableDataName}`}
                onClick={() => handleRowClick(location)}>{location.name}</td>
            <td className={s.tableData}>{location.dimension}</td>
            <td className={s.tableData}>{format(location.created, 'dd.MM.yyyy HH:mm')}</td>
          </tr>
        ))}
        </tbody>
      </table>

      {selectedLocation && (
        <LocationModal
          isOpen={isModalOpen}
          location={selectedLocation}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
};

export default LocationTable;
