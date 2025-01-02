const InfiniteTicker = () => {
    const footerItems = Array.from({ length: 10 }, () => ({
        text:"SYP! EDITORIALS",
    }));

    return (
        <div className="editorials-detail__ticker-container">
            <div className={`editorials-detail__ticker-wrapper editorials-detail__ticker-wrapper--top h1 text-decoration--none`}>
                {footerItems.map((item, index) => (
                    <div className="editorials-detail__ticker-item" key={index}>
                        <div className="editorials-detail__ticker-item--text">{item.text}</div>
                    </div>
                ))}
            </div>
            <div className={`editorials-detail__ticker-wrapper editorials-detail__ticker-wrapper--bottom h1 text-decoration--none`}>
                {footerItems.map((item, index) => (
                    <div className="editorials-detail__ticker-item" key={index}>
                        <div className="editorials-detail__ticker-item--text">{item.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfiniteTicker;
