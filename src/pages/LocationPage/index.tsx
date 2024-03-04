import LocTableView from "@widget/LocTableView";
import ViewControls from "@shared/viewControls";
import LocGridView from "@widget/LocGridView";
import useViewControls from "@shared/hooks/useViewControls.tsx";


const LocationPage = () => {
  const { view, showScrollTop, handleChangeView, scrollToTop } = useViewControls();


  return (
  <div>
    <ViewControls
      currentView={view}
      showScrollTop={showScrollTop}
      onChangeView={handleChangeView}
      onScrollTop={scrollToTop}
    />


    {view === 'table view'
      ? <LocTableView/>
      : <LocGridView/>
    }
  </div>
  )
};

export default LocationPage;