import React from "react";
import "./ThumbnailView.css";

function ThumbnailView({ dataArr, activeIndex, onSelect }) {
    return (
        <div className="thumbnail-box">
            {dataArr.map((item, index) => (
                <div key={item.id} onClick={() => onSelect(index)} 
                className="image-container"
                style={{ margin: '0 10px', border: index === activeIndex ? '2px solid blue' : 'none', 
                    'maxHeight': '350px',
                    'maxWidth': '300px',
                    'width': '200px',
                    'height': '185px'
                 }}
                >
                    <img 
                    className="thumbnail-img"
                    src={`https://raw.githubusercontent.com/RutvikJogdand/filmstrip-view/main/images/thumbnails/`+item.thumbnail} 
                    />
                </div>
            ))}
        </div>
    );
}

export default ThumbnailView;