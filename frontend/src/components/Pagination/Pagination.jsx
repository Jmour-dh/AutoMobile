// Pagination.jsx
import React from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className={styles.pagination}>
      <span
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        }}
        className={currentPage === 1 ? styles.disabled : ""}
      >
        <MdNavigateBefore size={30} />
      </span>
      <span>{currentPage} / {totalPages}</span>
      <span
        onClick={() => {
          if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
        className={currentPage === totalPages || totalPages === 0 ? styles.disabled : ""}
      >
        <MdNavigateNext size={30} />
      </span>
    </div>
  );
};

export default Pagination;
