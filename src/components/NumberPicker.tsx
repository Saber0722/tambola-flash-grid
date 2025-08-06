import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const NumberPicker = () => {
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [calledNumbers, setCalledNumbers] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>(
    Array.from({ length: 90 }, (_, i) => i + 1)
  );

  const pickRandomNumber = useCallback(async () => {
    if (availableNumbers.length === 0) {
      return;
    }

    setIsAnimating(true);
    
    // Show random animation for 1 second
    const animationInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      setCurrentNumber(availableNumbers[randomIndex]);
    }, 100);

    setTimeout(() => {
      clearInterval(animationInterval);
      
      // Pick the final number
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const pickedNumber = availableNumbers[randomIndex];
      
      setCurrentNumber(pickedNumber);
      setCalledNumbers(prev => [...prev, pickedNumber]);
      setAvailableNumbers(prev => prev.filter(num => num !== pickedNumber));
      setIsAnimating(false);
    }, 1000);
  }, [availableNumbers]);

  const resetGame = () => {
    setCurrentNumber(null);
    setCalledNumbers([]);
    setAvailableNumbers(Array.from({ length: 90 }, (_, i) => i + 1));
    setIsAnimating(false);
  };

  const getNumberColumn = (number: number) => {
    return Math.ceil(number / 10);
  };

  const getColumnRange = (column: number) => {
    const start = (column - 1) * 10 + 1;
    const end = column * 10;
    return `${start}-${end}`;
  };

  return (
    <div className="space-y-6">
      {/* Current Number Display */}
      <Card className="p-8 bg-gradient-accent text-center">
        <h2 className="text-2xl font-bold mb-6 text-accent-foreground">🎱 Number Picker</h2>
        
        <div className="mb-6">
          {currentNumber ? (
            <div className="relative">
              <div 
                className={`
                  text-8xl font-bold text-accent-foreground mb-4
                  transition-all duration-300
                  ${isAnimating ? 'animate-number-flip' : 'animate-pulse-glow'}
                `}
              >
                {currentNumber}
              </div>
              {!isAnimating && (
                <div className="text-lg text-accent-foreground/80 animate-fade-in">
                  Column {getNumberColumn(currentNumber)} ({getColumnRange(getNumberColumn(currentNumber))})
                </div>
              )}
            </div>
          ) : (
            <div className="text-4xl text-accent-foreground/60 py-16">
              Press "Pick Number" to start!
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={pickRandomNumber}
            disabled={isAnimating || availableNumbers.length === 0}
            className="bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-game px-8 py-3 text-lg"
          >
            {isAnimating ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                Picking...
              </span>
            ) : availableNumbers.length === 0 ? (
              '🎉 Game Complete!'
            ) : (
              `🎲 Pick Number (${availableNumbers.length} left)`
            )}
          </Button>
          
          <Button
            onClick={resetGame}
            variant="outline"
            className="px-6 py-3 hover:scale-105 transition-all duration-300"
          >
            🔄 Reset Game
          </Button>
        </div>
      </Card>

      {/* Called Numbers History */}
      {calledNumbers.length > 0 && (
        <Card className="p-6 bg-card">
          <h3 className="text-xl font-bold mb-4 text-center text-foreground">
            📋 Called Numbers ({calledNumbers.length}/90)
          </h3>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-success h-2 rounded-full transition-all duration-500"
              style={{ width: `${(calledNumbers.length / 90) * 100}%` }}
            ></div>
          </div>

          {/* Numbers Grid by Columns */}
          <div className="grid grid-cols-9 gap-4">
            {Array.from({ length: 9 }, (_, colIndex) => {
              const columnStart = colIndex * 10 + 1;
              const columnEnd = (colIndex + 1) * 10;
              const columnNumbers = calledNumbers.filter(
                num => num >= columnStart && num <= columnEnd
              ).sort((a, b) => a - b);

              return (
                <div key={colIndex} className="space-y-2">
                  <div className="text-xs font-bold text-center text-muted-foreground">
                    {columnStart}-{columnEnd}
                  </div>
                  <div className="space-y-1">
                    {columnNumbers.map(number => (
                      <div
                        key={number}
                        className={`
                          w-full aspect-square rounded-md flex items-center justify-center
                          text-xs font-bold transition-all duration-300 animate-bounce-in
                          ${number === currentNumber 
                            ? 'bg-gradient-success text-success-foreground shadow-glow' 
                            : 'bg-gradient-secondary text-secondary-foreground'
                          }
                        `}
                      >
                        {number}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Latest Numbers Display */}
          {calledNumbers.length > 0 && (
            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="font-medium text-center mb-3 text-foreground">Recent Numbers:</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {calledNumbers.slice(-10).reverse().map((number, index) => (
                  <span
                    key={`${number}-${index}`}
                    className={`
                      px-3 py-1 rounded-full text-sm font-bold
                      transition-all duration-300 animate-slide-up
                      ${index === 0 
                        ? 'bg-gradient-success text-success-foreground shadow-glow' 
                        : 'bg-muted text-muted-foreground'
                      }
                    `}
                  >
                    {number}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default NumberPicker;