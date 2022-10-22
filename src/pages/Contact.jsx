import { contactWatch} from '../assets/images/contactWatch.webp'

const Contact = () => {
    return (
        <main id='contact'>
            <div className='contact-container'>
                <div className='contact-container_left'></div>
                <div className='contact-container_right'>
                    <h1>Notre adresse</h1>
                    <span>E-Watch France</span>
                    <span>1 quai Branly</span>
                    <span>75017 Paris</span>
                    <span>01.20.23.12.54</span>
                </div>
                <div className='contact-container_middle'>
                    <h2>Service client</h2>
                    <a href="mailto:contact@ewatch.com">contact@ewatch.com</a>
                    <h2>Serice après-ventes</h2>
                    <a href="mailto:sav@ewatch.com">sav@ewatch.com</a>
                </div>
            </div>
        </main>
    );
}

export default Contact;
