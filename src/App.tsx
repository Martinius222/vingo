import { useState, useEffect } from 'react';
import './App.css';

interface Circle {
  id: string;
  number: string;
  className: string;
  animated: boolean;
}

const CircleGrid: React.FC = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [currentNumber, setCurrentNumber] = useState<Circle | undefined>()
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>('')

  useEffect(() => {
    const savedCircles = localStorage.getItem('circles');
    if (savedCircles) {
      setCircles(JSON.parse(savedCircles));
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const isValid = /^[0-9]{1,2}$/.test(newValue);
  
    if (isValid || newValue === '') {
      setInputValue(newValue);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  if (circles.find(number => number.number === inputValue)) {
    setErrorMessage("Number seems to have already been extracted!");
    return;
  } else {
    setErrorMessage(null);
  }
  if (!inputValue.trim()) return;

  const newCircle: Circle = {
    id: inputValue, 
    number: inputValue,
    className: 'circle',
    animated: false
    
  };

  setCurrentNumber(newCircle);
  
  setTimeout(() => {
    const updatedCircles = [...circles, newCircle];
    updatedCircles.sort((a, b) => parseInt(a.number) - parseInt(b.number));
    setCircles(updatedCircles);
    localStorage.setItem('circles', JSON.stringify(updatedCircles));
    setCurrentNumber(undefined);
  }, 5200);

  setInputValue('');
  };

  return (
    <>
      <h3 className='middle-logo'>VINgo</h3>
      <form onSubmit={handleSubmit} className='nav-container'>
        <div className='input-container'>
          <input
            className='input-field'
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            
          />
          <button className='submit-button' type='submit'>Add</button>
        </div>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        <h3 className='logo'>VINgo</h3>
        
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
          <div key={circle.id} className='circle-container'>
            <div  className={circle.className}>
              <p className='number'>{circle.number}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CircleGrid;
