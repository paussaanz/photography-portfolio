import AnimatedButton from "../AnimatedButton/AnimatedButton";

const HeroAbout = () => {
    return (
        <div className="container-bem hero-about">


            <div style={{ flexDirection: "column" }} className="body text-color--primary text-align--center flex--display flex--justify-center flex--align-center dimension--vh-100">
                <AnimatedButton />
                {/* <h1 className="margin--bottom-5 text-transform--uppercase text-color--primary">
                    ABOUT SYP!
                </h1> */}
            </div>


        </div>
    );
};

export default HeroAbout;
