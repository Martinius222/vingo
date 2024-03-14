// SettingsModal.js or SettingsModal.tsx if using TypeScript
import React, { ReactNode, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import './settings.css'

interface IModalProps {
  isOpen: boolean,
  onClose: () => void,
  onReset?: () => void;
  children?: ReactNode; 
}


export const SettingsModal: React.FC<IModalProps> = ({ isOpen, onClose, onReset, children }) => {
  const { numberRange, setNumberRange } = useSettings();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const maxNumber = Math.min(100, Math.max(0, parseInt(inputValue))); 
    if (!isNaN(maxNumber)) {
      setNumberRange(maxNumber); 
    }
  };

  const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };
  if (!isOpen) return null;

  return (
    <div className='settings-overlay' onClick={onClose}>
      <div className='settings-modal'onClick={handleModalContentClick}>
        <h3>Settings</h3>
        
        <form onSubmit={handleSubmit}>
          <div className='setting-container' >
            <p style={{fontSize: '14px'}}>Enter max range of extracted numbers. Current: {numberRange}</p>
            <input value={inputValue} onChange={handleInputChange} max="100" className="settings-input-field" />
          </div>
        </form>
        <div className='setting-container' >
          <p style={{fontSize: '14px'}}>Resets the board and clears local storage</p>
          <button className='setting-button' onClick={() => {if (onReset) {onReset();} onClose();}}>Clear board</button>
        </div>
        {children}
        <button className='setting-button close-button' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};


