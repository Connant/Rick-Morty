import ArrowPic from './arrow.svg';

type ViewControlsProps = {
  currentView: 'grid view' | 'table view';
  showScrollTop: boolean;
  onChangeView: () => void;
  onScrollTop: () => void;
};

const ViewControls = ({currentView, showScrollTop, onChangeView, onScrollTop}: ViewControlsProps) => {
  return (
    <div className='buttons'>
      <button className='viewToggle' onClick={onChangeView}>
        {currentView === 'table view' ? 'grid view' : 'table view'}
      </button>
      {showScrollTop && (
        <button className='scroll' onClick={onScrollTop}>
          <img src={ArrowPic} alt='scroll top'/>
        </button>
      )}
    </div>
  );
};

export default ViewControls;