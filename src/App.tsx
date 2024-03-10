import { useState } from 'react';
import './App.css';

interface Circle {
  id: number;
  number: string;
  className: string;
}

const CircleGrid: React.FC = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [currentNumber, setCurrentNumber] = useState<Circle | undefined>()
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const isValid = /^[0-9]{1,2}$/.test(newValue);
  
    if (isValid || newValue === '') {
      setInputValue(newValue);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    if (circles.find(number => number.number === inputValue)){
        
        setErrorMessage("Number seems to have already been extracted")
        return
    } else {
      setErrorMessage(null)
    }
    if (!inputValue.trim()) return; 

    const newCircle: Circle = {
      id: circles.length, 
      number: inputValue,
      className: 'circle', 
    };
    setCurrentNumber(newCircle)
    setTimeout(() => {
      setCircles([...circles, newCircle]);
      setCurrentNumber(undefined)
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
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
      </form>
      {currentNumber && 
        <div className='extracted-number-container'>
          <div className='extracted-number'>
            <p className='extracted-number-text'>{currentNumber.number}</p>
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
