import React, { useState, useImperativeHandle, useEffect } from 'react';
import './index.css'; // Import the CSS file for styles

function Index({ title, options, label, setDefaultValue }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const toggleDropdown = () => setIsOpen(!isOpen);

  useImperativeHandle(ref, () => ({
    getValue: () => selectedValue,
    setDefaultValue: (value) => setSelectedValue(value),
    setValue: (value) => setSelectedValue(value)
  }));

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  useEffect(()=>{
    if(setDefaultValue){
      setSelectedValue(setDefaultValue);
    }
  },[setDefaultValue])

  return (
    <div className="dropdown-wrapper">
      <div className="input-label">{label}</div>
      <div className="dropdown-container" ref={ref}>
        <div className="dropdown-header" onClick={toggleDropdown}>
          <span>{selectedValue || title}</span>
          <span className={`dropdown-icon ${isOpen ? 'open' : ''}`}>&#9662;</span>
        </div>
        {isOpen && (
          <ul className="dropdown-list">
            {options.map((option, index) => (
              <li
                key={index}
                className="dropdown-item"
                onClick={() => handleSelect(option.label)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default React.forwardRef(Index);
