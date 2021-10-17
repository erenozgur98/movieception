import React, { useRef } from "react";
import { useHistory } from 'react-router-dom';

function SearchForm({ isOpen }) {
  const search = useRef();
  const history = useHistory();

  const handleSearchEnter = (e) => {
    if (e.charCode === 13) {
      const searchedMovie = search.current.value
      history.push(`/search?query=${searchedMovie}`);
    }
  };

  return (
    <div>
      <div>
        <div className="form-outline">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            onKeyPress={handleSearchEnter}
            ref={search}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
