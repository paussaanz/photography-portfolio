import React from "react";

const ContactFormInput = ({ id, name, type, label, placeholder, value, onChange, required, onFocus, onBlur }) => {
    return (
        <div className="input-data">
            <input
                id={id}
                name={name} // Added name attribute
                type={type}
                value={value}
                placeholder={placeholder}
                required={required}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default ContactFormInput;
