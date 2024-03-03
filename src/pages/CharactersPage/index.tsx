import ViewControls from "@shared/viewControls";
import useViewControls from "@shared/hooks/useViewControls.tsx";
import ChTableView from "@widget/ChTableView";
import ChGridView from "@widget/ChGridView";


const CharactersPage = () => {
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
        ? <ChTableView/>
        : <ChGridView/>
      }
    </div>
  );
};

export default CharactersPage;