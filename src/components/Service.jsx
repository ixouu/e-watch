const Service = ({ title, desc, icon }) => {

    return (
        <article className="home-service">
            <span className="service-iconContainer"><i className={`${icon}`}></i></span>
            <h3>{title}</h3>
            <p>{desc}</p>
        </article>
    );
}

export default Service;
