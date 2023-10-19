import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageBtnContainer = () => {
  const {
    data: { numOfPage, currentPage },
  } = useAllJobsContext();
  const pages = Array.from({ length: numOfPage }, (_, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButtons = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderButton = () => {
    const pageButton = [];
    //first page
    pageButton.push(
      addPageButtons({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    // active page not first or last
    if (currentPage > 3) {
      pageButton.push(
        <span className="page-btn dots" key="dot-1">
          ...
        </span>
      );
    }
    if (currentPage !== 1 && currentPage !== 2) {
      pageButton.push(
        addPageButtons({ pageNumber: currentPage - 1, activeClass: false })
      );
    }

    if (currentPage !== 1 && currentPage !== numOfPage) {
      pageButton.push(
        addPageButtons({ pageNumber: currentPage, activeClass: true })
      );
    }

    if (currentPage !== numOfPage && currentPage !== numOfPage - 1) {
      pageButton.push(
        addPageButtons({ pageNumber: currentPage + 1, activeClass: false })
      );
    }
    if (currentPage < numOfPage - 2) {
      pageButton.push(
        <span className="page-btn dots" key="dot-1">
          ...
        </span>
      );
    }

    // last page
    pageButton.push(
      addPageButtons({
        pageNumber: numOfPage,
        activeClass: currentPage === numOfPage,
      })
    );
    return pageButton;
  };
  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prev = currentPage - 1;
          if (prev < 1) prev = 1;
          handlePageChange(prev);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderButton()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let next = currentPage + 1;
          if (next > numOfPage) next = numOfPage;
          handlePageChange(next);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
