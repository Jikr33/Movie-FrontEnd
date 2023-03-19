import React, { useState, useEffect } from "react";

const ResultsPageSwitcher = ({ search, setMovies }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 69; // Change this to modify the number of results displayed per page

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            search(currentPage + 1);
            console.log(currentPage + 1, currentPage);
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            search(currentPage - 1);
            console.log(currentPage - 1, currentPage);
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="result-pager">
            <div className="arrow-container" onClick={handlePreviousPage}>
                <span className="arrow-l"></span>
            </div>
            <div className="result-count">
                {currentPage} / {totalPages}
            </div>
            <div className="arrow-container" onClick={handleNextPage}>
                <span className="arrow-r"></span>
            </div>
        </div>
    );
};

export default ResultsPageSwitcher;
