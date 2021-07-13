import {Pagination} from "carbon-components-react";

const PagePagination = (props) => {

  return (
    <Pagination
      backwardText="Previous page"
      forwardText="Next page"
      itemsPerPageText="Items per page:"
      pageNumberText="Page Number"
      pageSize={props.currentPageSize}
      pageSizes={[5, 10, 15, 20, 25]}
      totalItems={props.totalItems}
      onChange={({ page, pageSize }) => {
        if (pageSize !== props.currentPageSize) {
          props.setCurrentPageSize(pageSize);
        }
        props.setFirstRowIndex(pageSize * (page - 1));
      }}
    />
  );
};

export default PagePagination;