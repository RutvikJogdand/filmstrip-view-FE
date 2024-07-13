import React, { useEffect, useState } from "react";
import NextButton from "./../../assets/next.png";
import PreviousButton from "./../../assets/previous.png";
import ThumbnailView from "../ThumbnailView/ThumbnailView";
import "./GalleryView.css"

function GalleryView() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [page, setPage] = useState(1);
    const [dataArr, setDataArr] = useState([]);
    const [itemsPerPage] = useState(4);

    const fetchData = async () => {
        const response = await fetch(`http://localhost:5000/items?page=${page}&pageSize=${itemsPerPage}`);
        const data = await response.json();
        setDataArr(data.data);
        if (data.data.length > 0) {
            setActiveIndex(0); 
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                moveNext();
            } else if (event.key === 'ArrowLeft') {
                movePrevious();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeIndex, dataArr]);

    const moveNext = () => {
        if (activeIndex < dataArr.length - 1) {
            setActiveIndex(activeIndex + 1);
        } else if (activeIndex === dataArr.length - 1 && page * itemsPerPage < 1000) {
            handleNext();
            setActiveIndex(0);
        }
    };

    const movePrevious = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        } else if (activeIndex === 0 && page > 1) {
            handlePrevious();
            setTimeout(() => setActiveIndex(itemsPerPage - 1), 100); 
        }
    };

    const handleNext = () => {
        if (page * itemsPerPage < 1000) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    const selectThumbnail = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="main-box">
            <h3>Please use arrow buttons to scroll through images</h3>
            <div>ID: {dataArr[activeIndex]?.id}</div>
            <div className="main-image-box">
                <img src={`https://raw.githubusercontent.com/RutvikJogdand/filmstrip-view/main/images/large/`+dataArr[activeIndex]?.image}
                 alt="Main Display" />
            </div>
            <div className="meta-data-container">
                <div><b> Cost: </b> {dataArr[activeIndex]?.cost}</div>
                <div><b> Description: </b>{dataArr[activeIndex]?.description}</div>
                <div><b>Thumbnail: </b>{dataArr[activeIndex]?.thumbnail}</div>
                <div><b>Image: </b>{dataArr[activeIndex]?.image}</div>
            </div> 
            <div className="buttons-container">
                {page > 1 && (
                    <img onClick={handlePrevious} src={PreviousButton} alt="previous-button" />
                )}
                {dataArr.length === itemsPerPage && (
                    <img onClick={handleNext} src={NextButton} alt="next-button" />
                )}
            </div>
            <ThumbnailView dataArr={dataArr} activeIndex={activeIndex} onSelect={selectThumbnail} />
        </div>
    );
}

export default GalleryView;


