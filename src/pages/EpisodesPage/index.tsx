import ViewControls from "@shared/viewControls";
import useViewControls from "@shared/hooks/useViewControls.tsx";
import EpTableView from "@widget/EpTableView";
import EpGridView from "@widget/EpGridView";


const EpisodesPage = () => {
  const {view, showScrollTop, handleChangeView, scrollToTop} = useViewControls();


  return (
    <div>
      <ViewControls
        currentView={view}
        showScrollTop={showScrollTop}
        onChangeView={handleChangeView}
        onScrollTop={scrollToTop}
      />


      {view === 'table view'
        ? <EpTableView/>
        : <EpGridView/>
      }
    </div>
  );
};

export default EpisodesPage;