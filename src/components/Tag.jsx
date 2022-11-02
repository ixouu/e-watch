import React from 'react';

const Tag = ({ title, handleClick, id }) => {
    const displayTitle = (title) => {
        switch (title) {
            case 'Child':
                return "Enfant";
            case 'Female':
                return "Femme";
            case 'Male': 
                return 'Homme'
            default:
                break;
        }
    }
    return (
        <button  
            className='tag'
            onClick={() => handleClick(title)}
        >
                <span id={id}>{displayTitle(title)}</span>
        </button>
    );
}

export default Tag;
