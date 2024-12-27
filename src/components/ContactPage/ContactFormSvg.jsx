const ContactFormSvg = ({ focusedField, loading, success }) => {

    const svgs = {
        name: [
            <path
                key="1"
                d="M23.0001 44C13 44 2 32.8824 2 18.5789C2 15.5789 2.00011 2 23.0001 2C44 2 44 15.5789 44 18.5789C44 32.8824 33.0001 44 23.0001 44Z"
                stroke="var(--cor-primary)"
                fill="none"
                strokeWidth="2"
                strokeLinejoin="round"
            />,
            <path
                key="2"
                d="M29 33C29 33 27 36 23 36C19 36 17 33 17 33"
                stroke="var(--cor-secondary)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />,
            <path
                key="3"
                d="M20.5 23.4709C20.5 24.2961 19.8544 24.9687 19.0295 24.992C18.8419 24.9974 18.6509 25.0001 18.4565 25.0001C7.5 25.0001 7.5 16.4239 7.5 14.5292C7.5 13.704 8.14563 13.0314 8.97053 13.008C9.1581 13.0027 9.3491 13 9.5435 13C20.5 13 20.5 21.5761 20.5 23.4709Z"
                stroke="var(--cor-secondary)"
                fill="none"
                strokeWidth="2"
                strokeLinejoin="round"
            />,
            <path
                key="4"
                d="M25.5 23.4709C25.5 24.2961 26.1456 24.9687 26.9705 24.992C27.1581 24.9974 27.3491 25.0001 27.5436 25.0001C38.5 25.0001 38.5 16.4239 38.5 14.5292C38.5 13.704 37.8544 13.0314 37.0295 13.008C36.8419 13.0027 36.6509 13 36.4565 13C25.5001 13 25.5 21.5761 25.5 23.4709Z"
                stroke="var(--cor-secondary)"
                fill="none"
                strokeWidth="2"
                strokeLinejoin="round"
            />,
        ],
        surname: [
            <path
                key="1"
                d="M23.0001 44C13 44 2 32.8824 2 18.5789C2 15.5789 2.00011 2 23.0001 2C44 2 44 15.5789 44 18.5789C44 32.8824 33.0001 44 23.0001 44Z"
                stroke="var(--cor-primary)"
                fill="none"
                strokeWidth="2"
                strokeLinejoin="round"
            />,
            <path
                key="2"
                d="M29 33C29 33 27 36 23 36C19 36 17 33 17 33"
                stroke="var(--cor-secondary)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />,
            <path
                key="3"
                d="M20.5 23.4709C20.5 24.2961 19.8544 24.9687 19.0295 24.992C18.8419 24.9974 18.6509 25.0001 18.4565 25.0001C7.5 25.0001 7.5 16.4239 7.5 14.5292C7.5 13.704 8.14563 13.0314 8.97053 13.008C9.1581 13.0027 9.3491 13 9.5435 13C20.5 13 20.5 21.5761 20.5 23.4709Z"
                stroke="var(--cor-secondary)"
                fill="none"
                strokeWidth="2"
                strokeLinejoin="round"
            />,
            <path
                key="4"
                d="M25.5 23.4709C25.5 24.2961 26.1456 24.9687 26.9705 24.992C27.1581 24.9974 27.3491 25.0001 27.5436 25.0001C38.5 25.0001 38.5 16.4239 38.5 14.5292C38.5 13.704 37.8544 13.0314 37.0295 13.008C36.8419 13.0027 36.6509 13 36.4565 13C25.5001 13 25.5 21.5761 25.5 23.4709Z"
                stroke="var(--cor-secondary)"
                fill="none"
                strokeWidth="2"
                strokeLinejoin="round"
            />,
        ],
        email: [
            <path d="M27.3286 31.4494C25.7346 32.4245 23.819 32.7978 21.9714 32.7978C16.7884 32.7978 13.2286 29.104 13.2286 23.9438C13.2286 17.6973 17.7737 12.9326 24.0714 12.9326C26.6107 12.9326 29.0956 13.5576 31.1857 15.0449C32.4229 15.9431 33.1031 17.4406 32.8143 18.9551L31.5 27.5C35.4113 29.5508 38.5 25.5 38.5 20.3933C38.5 13.1708 32.9714 7.45714 23.9857 7.45714C15 7.45714 7.5 15.1161 7.5 23.6292C7.5 31.0788 13.2286 38.5 21.7143 38.5C23.0695 38.5 24.3915 38.3635 25.7202 38.1876C26.5144 38.0825 27.3349 38.4402 27.5794 39.2031C28.0256 40.5951 27.842 42.0942 26.4286 43C25.4571 43.6592 23.7714 44 21.2 44C10.1275 44 2 34.6597 2 23.6292C2 11.276 12.0359 2 23.9857 2C34.2988 2 44 9.26 44 20.3933C44 27.2997 40.3602 33.0225 32.9857 33.0225C31.0148 33.0225 28.9905 32.5312 27.3286 31.4494ZM20.4714 23.8989C20.4714 25.6457 21.3361 27.0449 23.2143 27.0449C24.0429 27.0449 24.7571 26.8202 25.3571 26.3708L26 19.3596C25.4386 18.9916 24.6816 18.9101 24.0286 18.9101C23.0286 18.9101 22.1857 19.3446 21.5 20.2135C20.8143 21.0524 20.4714 22.2809 20.4714 23.8989Z"
                stroke="var(--cor-secondary)"
                fill="none"
                strokeWidth="2"
                strokeLinejoin="round" />
        ],
        website: [
            <path d="M26.9986 34.0039L27.677 37.3961C27.864 38.331 28.6848 39.0039 29.6382 39.0039H30.5392C31.9692 39.0039 33.2005 40.0133 33.4809 41.4156L33.5201 41.6117C33.7676 42.8493 32.8211 44.0039 31.559 44.0039H14.4382C13.1761 44.0039 12.2295 42.8493 12.477 41.6117L12.5162 41.4156C12.7967 40.0133 14.0279 39.0039 15.458 39.0039H16.359C17.3123 39.0039 18.1332 38.331 18.3201 37.3961L18.9986 34.0039"
                stroke="var(--cor-secondary)"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />,
            <path d="M2.44433 29.0464C2.67922 31.5742 4.68395 33.4313 7.21773 33.5889C10.4434 33.7894 15.6059 34.002 23 34.002C30.394 34.002 35.5566 33.7894 38.7823 33.5889C41.316 33.4313 43.3208 31.5742 43.5557 29.0464C43.7858 26.5698 44 22.9387 44 18.002C44 13.0652 43.7858 9.4341 43.5557 6.9575C43.3208 4.42972 41.316 2.57258 38.7823 2.41504C35.5566 2.21448 30.3941 2.00195 23 2.00195C15.6059 2.00195 10.4434 2.21448 7.21773 2.41504C4.68396 2.57258 2.67922 4.42972 2.44433 6.9575C2.2142 9.4341 2 13.0652 2 18.002C2 22.9387 2.2142 26.5698 2.44433 29.0464Z"
                stroke="var(--cor-primary)"
                fill="none"
                strokeWidth="2"
                strokeLinejoin="round" />
        ],
        company: [
            <path d="M34 10C38.7714 10 43 13.9067 43 19"
                stroke="var(--cor-secondary)"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />,
            <path d="M34.1406 20C36.7116 17.2273 36.571 12.7727 34 10"
                stroke="var(--cor-secondary)"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />,
            <path d="M32.3887 1.64844C35.2267 3.28694 35.6376 7.16288 33.9991 10.0008"
                stroke="var(--cor-secondary)"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />,
            <path d="M34 10C30.9954 5.48052 25.6438 4.60437 22 8.33102"
                stroke="var(--cor-secondary)"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />,
            <path d="M18 27C18 17.6112 25.6112 10 35 10C29.9926 10 25.9333 17.6112 25.9333 27"
                stroke="var(--cor-secondary)"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />,
            <path d="M2 43.9989C3.88976 43.9989 5.77952 43.4425 7.42006 42.3298C8.35629 41.6947 9.6437 41.6947 10.5799 42.3298C12.2205 43.4425 14.1102 43.9989 16 43.9989C17.8898 43.9989 19.7795 43.4425 21.4201 42.3298C22.3563 41.6947 23.6437 41.6947 24.5799 42.3298C26.2205 43.4425 28.1102 43.9989 30 43.9989C31.8898 43.9989 33.7795 43.4425 35.4201 42.3298C36.3563 41.6947 37.6437 41.6947 38.5799 42.3298C40.2205 43.4425 42.1102 43.9989 44 43.9989"
                stroke="var(--cor-secondary)"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />,
            <path d="M6 37C7.3678 31.3246 14.4584 27 23 27C31.5416 27 38.6322 31.3246 40 37"
                stroke="var(--cor-primary)"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />
        ],
        message: [
            <path
                key="1"
                d="M15 29C18.5 34.3333 27.5 34.3333 31 29"
                stroke="var(--cor-secondary)"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />,
            <path
                key="2"
                d="M16 16V18"
                stroke="var(--cor-secondary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />,
            <path
                key="3"
                d="M30 16V18"
                stroke="var(--cor-secondary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />,
            <path
                key="4"
                d="M44 23C44 11.402 34.598 2 23 2C11.402 2 2 11.402 2 23C2 26.8016 3.01016 30.3673 4.77671 33.4432C3.86778 35.8196 3.00937 38.5804 2.44577 41.3392C2.17698 42.6549 3.3363 43.7682 4.64304 43.4588C7.28562 42.833 9.9682 41.9655 12.3244 41.0878C15.4525 42.9381 19.1023 44 23 44C34.598 44 44 34.598 44 23Z"
                stroke="var(--cor-primary)"
                fill="none"
                strokeWidth="2"
                strokeLinejoin="round"
            />,
        ],
    };

    return (
        <svg
            style={{ height: '300px', position: 'absolute', top: '50%', left: '50%', transform: ' translate(-50%, -50%)' }} xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 46 46"
            className="d--w-100 object-fit--cover"
        >
            {/* Render the focused SVG or fallback */}
            {svgs[focusedField]?.map((path) => path) || (
                <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.1074 38C20.1823 39.6016 20.2823 41.1045 20.3587 42.151C20.4221 43.0211 21.0514 43.7426 21.9164 43.8547C22.5205 43.9331 23.2548 44 24.0002 44C24.7455 44 25.4799 43.9331 26.0841 43.8547C26.9492 43.7426 27.5784 43.021 27.6419 42.151C27.7183 41.1044 27.8182 39.6016 27.8931 38" stroke="var(--cor-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 12C5.38669 12 2.12785 15.6524 2.04181 20.2649C2.01616 21.6405 2 23.2152 2 25C2 29.4804 2.10181 32.6373 2.20017 34.6416C2.28133 36.2954 3.44665 37.6314 5.09483 37.79C6.294 37.9053 7.91386 38 10 38C12.0861 38 13.706 37.9053 14.9052 37.79C16.5534 37.6314 17.7187 36.2954 17.7998 34.6416C17.8982 32.6373 18 29.4804 18 25C18 23.2152 17.9838 21.6405 17.9582 20.2649C17.8721 15.6524 14.6133 12 10 12Z" stroke="var(--cor-primary)" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M25 2C25 2 26.1667 2 28.5 2C28.8445 2 29.1599 2.00259 29.4473 2.00702C30.8818 2.02909 32 3.06542 32 4.5C32 5.93458 30.8818 6.97091 29.4473 6.99298C29.1599 6.99741 28.8445 7 28.5 7C26.1667 7 25 7 25 7" stroke="var(--cor-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13 21H7" stroke="var(--cor-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 12C10 12 30.6667 12 36 12C40.6133 12 43.8721 15.6524 43.9582 20.2649C43.9838 21.6405 44 23.2152 44 25C44 29.4804 43.8982 32.6373 43.7998 34.6416C43.7187 36.2954 42.5534 37.6314 40.9052 37.7899C39.706 37.9053 38.0861 38 36 38C30.6667 38 10 38 10 38" stroke="var(--cor-primary)" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M25 29V2" stroke="var(--cor-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            )}
            {loading && "loading"}
            {success && "success"}
        </svg>
    );
};

export default ContactFormSvg;
