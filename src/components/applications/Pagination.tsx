import { PAGE_ACTION } from '@/types/ApplicationsType';

interface IProps {
  handlePageChange: (pageAction: PAGE_ACTION) => void;
  page: number;
  totalPage: number;
}

const Pagination = ({ handlePageChange, page, totalPage }: IProps) => {
  return (
    <div className="my-1 mt-4 flex justify-center whitespace-pre-wrap text-lg">
      {/* 먼저 볼 회원 정보 렌더링 */}
      <button
        onClick={() => handlePageChange(PAGE_ACTION.decrement)}
        disabled={page === 1}
      >
        {`<  `}
      </button>
      {page}/{totalPage}
      <button
        onClick={() => handlePageChange(PAGE_ACTION.increment)}
        disabled={page === totalPage}
      >
        {`  >`}
      </button>
    </div>
  );
};

export default Pagination;
