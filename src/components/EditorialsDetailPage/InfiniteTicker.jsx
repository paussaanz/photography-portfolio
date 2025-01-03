const InfiniteTicker = () => {
    const footerItems = Array.from({ length: 10 }, () => ({
        text: "SYP! EDITORIALS",
    }));

    return (
        <div className="editorials-detail__ticker-container">
            <div className={`editorials-detail__ticker-wrapper editorials-detail__ticker-wrapper--top h1 text-decoration--none`}>
                {footerItems.map((item, index) => (
                    <div className="editorials-detail__ticker-item" key={423424 + index}>
                        <div className="editorials-detail__ticker-item--text">{item.text}</div>
                    </div>
                ))}
            </div>

            <div style={{
                transform: 'rotate(358deg)',
                top: '0%',
            }} className={`editorials-detail__ticker-wrapper editorials-detail__ticker-wrapper--top h1 text-decoration--none`}>
                {footerItems.map((item, index) => (
                    <div className="editorials-detail__ticker-item" key={1212 + index}>
                        <div className="editorials-detail__ticker-item--text">{item.text}</div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default InfiniteTicker;
