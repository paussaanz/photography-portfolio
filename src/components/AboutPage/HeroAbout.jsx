const HeroAbout = () => {
    return (
        <div className="container-bem hero-about">
            <div className="hero-about__content text-color--primary text-align--center flex--display flex--justify-center flex--align-center flex--column dimension--vh-100">
                <img className="hero-about__image" src="/images/lifestyle-1.jpg" />
                <h1 className="hero-about__title text-transform--uppercase text-color--primary">
                    ABOUT SYP!
                </h1>
            </div>
        </div>
    );
};

export default HeroAbout;

