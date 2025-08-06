import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TambolaTicketProps {
  ticketData: (number | null)[][];
  ticketNumber: number;
}

interface MarkedNumbers {
  [key: string]: boolean; // key format: "row-col"
}

// Generate a valid Tambola ticket with rules
const generateTambolaTicket = (): (number | null)[][] => {
  const ticket: (number | null)[][] = Array(3).fill(null).map(() => Array(9).fill(null));
  
  // For each column, define the number range
  const columnRanges = [
    [1, 10], [11, 20], [21, 30], [31, 40], [45, 50],
    [51, 60], [61, 70], [71, 80], [81, 90]
  ];
  
  // For each row, ensure exactly 5 numbers and 4 blanks
  for (let row = 0; row < 3; row++) {
    const positions = Array.from({length: 9}, (_, i) => i);
    // Shuffle positions and take first 5 for numbers
    const shuffledPositions = positions.sort(() => Math.random() - 0.5);
    const numberPositions = shuffledPositions.slice(0, 5).sort((a, b) => a - b);
    
    numberPositions.forEach(col => {
      const [min, max] = columnRanges[col];
      // Generate unique number for this column across all rows
      let number;
      do {
        number = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (
        ticket.some(row => row.some(cell => cell === number))
      );
      ticket[row][col] = number;
    });
  }
  
  // Sort numbers in each column from top to bottom
  for (let col = 0; col < 9; col++) {
    const columnNumbers = ticket.map((row, rowIndex) => ({
      value: row[col],
      rowIndex
    })).filter(item => item.value !== null);
    
    columnNumbers.sort((a, b) => (a.value || 0) - (b.value || 0));
    
    // Clear column
    for (let row = 0; row < 3; row++) {
      ticket[row][col] = null;
    }
    
    // Place sorted numbers back
    columnNumbers.forEach((item, index) => {
      ticket[item.rowIndex][col] = item.value;
    });
  }
  
  return ticket;
};

const TambolaTicket: React.FC<TambolaTicketProps> = ({ ticketData, ticketNumber }) => {
  const [markedNumbers, setMarkedNumbers] = useState<MarkedNumbers>({});

  const toggleNumber = (rowIndex: number, colIndex: number, number: number) => {
    const key = `${rowIndex}-${colIndex}`;
    setMarkedNumbers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isMarked = (rowIndex: number, colIndex: number) => {
    return markedNumbers[`${rowIndex}-${colIndex}`] || false;
  };

  return (
    <Card className="p-6 bg-card shadow-card border-2 border-primary/20 hover:shadow-glow transition-all duration-300 animate-bounce-in">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-foreground">Ticket #{ticketNumber}</h3>
        <p className="text-xs text-muted-foreground">Click numbers to mark them</p>
      </div>
      
      <div className="grid grid-cols-9 gap-1 bg-gradient-primary p-4 rounded-lg">
        {ticketData.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const marked = isMarked(rowIndex, colIndex);
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => cell !== null && toggleNumber(rowIndex, colIndex, cell)}
                className={`
                  aspect-square flex items-center justify-center rounded-md font-bold text-sm
                  transition-all duration-300 relative cursor-pointer
                  ${cell !== null 
                    ? `bg-card border border-primary/20 hover:scale-110 hover:shadow-lg
                       ${marked 
                         ? 'bg-success/20 text-success-foreground border-success' 
                         : 'text-foreground hover:bg-accent/10'
                       }` 
                    : 'bg-muted/30 cursor-default'
                  }
                `}
              >
                {cell && (
                  <>
                    <span className={`animate-fade-in ${marked ? 'opacity-60' : ''}`}>
                      {cell}
                    </span>
                    {marked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-success rotate-45 absolute"></div>
                        <div className="w-full h-0.5 bg-success -rotate-45 absolute"></div>
                        <div className="text-success text-lg font-bold animate-bounce-in">✓</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
      
      {/* Progress indicator */}
      <div className="mt-4 text-center">
        <div className="text-xs text-muted-foreground">
          {Object.values(markedNumbers).filter(Boolean).length} / 15 numbers marked
        </div>
        <div className="w-full bg-muted rounded-full h-1 mt-2">
          <div 
            className="bg-gradient-success h-1 rounded-full transition-all duration-500"
            style={{ width: `${(Object.values(markedNumbers).filter(Boolean).length / 15) * 100}%` }}
          ></div>
        </div>
      </div>
    </Card>
  );
};

const TambolaTicketGenerator = () => {
  const [tickets, setTickets] = useState<(number | null)[][][]>([]);
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTickets = async () => {
    setIsGenerating(true);
    setTickets([]);
    
    // Add slight delay for animation effect
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newTickets: (number | null)[][][] = [];
    for (let i = 0; i < numberOfTickets; i++) {
      newTickets.push(generateTambolaTicket());
    }
    
    setTickets(newTickets);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-secondary text-secondary-foreground">
        <h2 className="text-2xl font-bold mb-4 text-center">🎫 Tambola Ticket Generator</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
          <div className="flex items-center gap-2">
            <label htmlFor="tickets" className="font-medium">Number of tickets:</label>
            <select
              id="tickets"
              value={numberOfTickets}
              onChange={(e) => setNumberOfTickets(Number(e.target.value))}
              className="px-3 py-2 rounded-lg bg-card text-foreground border border-border"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <Button
            onClick={generateTickets}
            disabled={isGenerating}
            className="bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-game px-8 py-2"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </span>
            ) : (
              '🎲 Generate Tickets'
            )}
          </Button>
        </div>
        
        <div className="text-sm text-center opacity-80">
          Each ticket follows official Tambola rules:<br/>
          • 9 columns × 3 rows grid<br/>
          • Each row has exactly 5 numbers and 4 blanks<br/>
          • Column 1: 1-10, Column 2: 11-20, ... Column 9: 81-90
        </div>
      </Card>

      {tickets.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {tickets.map((ticket, index) => (
            <TambolaTicket
              key={index}
              ticketData={ticket}
              ticketNumber={index + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TambolaTicketGenerator;