import AnimatedButton from "../AnimatedButton/AnimatedButton";

const HeroAbout = () => {
    return (
        <div className="container-bem hero-about">


            <div style={{ flexDirection: "column", gap: '5px' }} className="body text-color--primary text-align--center flex--display flex--justify-center flex--align-center dimension--vh-100">
                <AnimatedButton width={250} height={100} />
                <AnimatedButton width={250} height={100} />
                <AnimatedButton width={250} height={50} />
                <AnimatedButton width={250} height={50} />

                <br></br>
                {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <AnimatedButton />

                    <AnimatedButton />
                </div> */}
                {/* <h1 className="margin--bottom-5 text-transform--uppercase text-color--primary">
                    ABOUT SYP!
                </h1> */}
            </div>


        </div>
    );
};

export default HeroAbout;
