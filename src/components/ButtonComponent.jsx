import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonComponent = ({title, color, disabled, link, width, height , icon, class1, borderRadius}) => {

    const navigate = useNavigate()
    const handleLink = () => {
        if(link === undefined){
            return 
        }
         else {
            navigate(`${link}`)
        }
    }

    const addIcon = () => {
        if (icon !== undefined ){
        const iconElement = React.createElement('i', {className :`${icon}`})
        return iconElement
        }
    }

    return <button 
    className= { 
        class1? `${class1}` : "btn"
    }
    style= {{
        backgroundColor: `${color}`,
        width : `${width}`,
        height : `${height}`,
        borderRadius : `${borderRadius}`
    }}
    disabled = {disabled}
    onClick = {() => handleLink()}
    >{title} {addIcon()}</button>
}

export default ButtonComponent;