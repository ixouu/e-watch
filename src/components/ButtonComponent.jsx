import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonComponent = ({title, color, disabled, link, width, height , icon, class1}) => {

    const navigate = useNavigate()

    return <button 
    className= { 
        class1? `${class1}` : "btn"
    }
    style= {{
        backgroundColor: `${color}`,
        width : `${width}`,
        height : `${height}`,

    }}
    disabled = {disabled}
    onClick = {() => navigate(`${link}`)}
    >{title} {icon&& `${icon}`}</button>
}

export default ButtonComponent;