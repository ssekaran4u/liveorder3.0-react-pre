import React from "react";

const getPath = (x, y, width, height) =>
    `M${x},${y + 5} A 5,5,0,0,1,${x + 5},${y} 
    L ${x + width - 5},${y} A 5,5,0,0,1,${x + width},${y + 5} 
    L ${x + width},${y + height + 10} L ${x},${y + height + 10} Z`;

const CustomBar = props => {
    const { fill, x, y, width, height } = props;
    return (
        <path
            className="recharts-rectangle"
            d={getPath(x, y, width, height)}
            fill={fill}
        />
    );
};

export default CustomBar;
