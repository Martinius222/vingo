import { useState } from 'react';
import './App.css';

interface Circle {
  id: number;
  number: string;
  className: string;
}

const CircleGrid: React.FC = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [extractedNumber, setExtractedNumber] = useState<Circle | null>()
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const isValid = /^[0-9]{1,2}$/.test(newValue);
  
    if (isValid || newValue === '') {
      setInputValue(newValue);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    if (!inputValue.trim()) return; 

    const newCircle: Circle = {
      id: circles.length, 
      number: inputValue,
      className: 'circle', 
    };
    setExtractedNumber(newCircle)
    setTimeout(() => {
      setCircles([...circles, newCircle]);
      setExtractedNumber(null)
    }, 5200)
    
    setInputValue(''); 
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='input-container'>
        <input
          className='input-field'
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          
        />
        <button className='submit-button' type='submit'>Add</button>
      </form>
      {extractedNumber && 
        <div className='extracted-number-container'>
          <div className='extracted-number'>
            <p className='extracted-number-text'>{extractedNumber.number}</p>
          </div>
        </div>
      }
      <div className='main-grid'>
        {circles.map((circle) => (
          <div className='circle-container'>
            <div key={circle.id} className={circle.className}>
              <p className='number'>{circle.number}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CircleGrid;
