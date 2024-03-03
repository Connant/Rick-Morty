import s from "./style.module.scss";
import {Info} from "@shared/types/characters/types.ts";


interface IPagination {
  pageInfo: Info
  currentPage: number
  loading: string
  setCurrentPage: (value: (((prevState: number) => number) | number)) => void
}

const Pagination = ({pageInfo, currentPage, loading, setCurrentPage}: IPagination) => {

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageInfo.pages && loading === 'succeeded') {
      setCurrentPage(newPage);
      localStorage.setItem('currentPage', newPage.toString());
    }
  };

  return (
    <>
      {loading === 'pending' ? (
        <p className='mx-auto'>Loading...</p>
      ) : (
        <div className={s.pagination}>
          <button className={s.paginationButton} onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1545_9685)">
                <path
                  d="M7.53999 0.5L1.39999 6.65C1.35216 6.69489 1.31404 6.74911 1.28798 6.80931C1.26192 6.8695 1.24847 6.9344 1.24847 7C1.24847 7.0656 1.26192 7.1305 1.28798 7.19069C1.31404 7.25089 1.35216 7.30511 1.39999 7.35L7.53999 13.5"
                  stroke="#000001" strokeLinecap="round" strokeLinejoin="round"/>
                <path
                  d="M12.75 0.5L6.60002 6.65C6.50841 6.74346 6.45709 6.86912 6.45709 7C6.45709 7.13088 6.50841 7.25654 6.60002 7.35L12.75 13.5"
                  stroke="#000001" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_1545_9685">
                  <rect width="14" height="14" fill="white"/>
                </clipPath>
              </defs>
            </svg>

          </button>
          <button className={s.paginationButton} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.15 0.5L4 6.65C3.95217 6.69489 3.91405 6.74911 3.88799 6.80931C3.86193 6.8695 3.84848 6.9344 3.84848 7C3.84848 7.0656 3.86193 7.1305 3.88799 7.19069C3.91405 7.25089 3.95217 7.30511 4 7.35L10.15 13.5"
                stroke="#000001" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

          </button>
          <span>{currentPage} of {pageInfo.pages}</span>
          <button className={s.paginationButton} onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pageInfo.pages}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.84998 0.5L9.99998 6.65C10.0478 6.69489 10.0859 6.74911 10.112 6.80931C10.138 6.8695 10.1515 6.9344 10.1515 7C10.1515 7.0656 10.138 7.1305 10.112 7.19069C10.0859 7.25089 10.0478 7.30511 9.99998 7.35L3.84998 13.5"
                stroke="#000001" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

          </button>
          <button className={s.paginationButton} onClick={() => handlePageChange(pageInfo.pages)}
                  disabled={currentPage === pageInfo.pages}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1545_9691)">
                <path
                  d="M6.46002 0.5L12.6 6.65C12.6479 6.69489 12.686 6.74911 12.712 6.80931C12.7381 6.8695 12.7515 6.9344 12.7515 7C12.7515 7.0656 12.7381 7.1305 12.712 7.19069C12.686 7.25089 12.6479 7.30511 12.6 7.35L6.46002 13.5"
                  stroke="#000001" strokeLinecap="round" strokeLinejoin="round"/>
                <path
                  d="M1.25 0.5L7.4 6.65C7.49161 6.74346 7.54293 6.86912 7.54293 7C7.54293 7.13088 7.49161 7.25654 7.4 7.35L1.25 13.5"
                  stroke="#000001" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_1545_9691">
                  <rect width="14" height="14" fill="white"/>
                </clipPath>
              </defs>
            </svg>

          </button>
        </div>
      )}
    </>
  )
};

export default Pagination;