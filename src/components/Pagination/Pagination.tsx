import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import "./pagination.scss";
import { IPagination } from "../../types";

export const Pagination = ({ currentPage, totalPages, onPageChange }: IPagination) => (
  <ResponsivePagination
    current={currentPage}
    total={totalPages}
    onPageChange={(p) => onPageChange(p)}
    className='pagination'
  />
);
