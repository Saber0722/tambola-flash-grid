import { useState } from 'react';
import TambolaTicketGenerator from '@/components/TambolaTicket';
import NumberPicker from '@/components/NumberPicker';
import GameStats from '@/components/GameStats';

const Index = () => {
  const [totalTickets, setTotalTickets] = useState(0);
  const [calledNumbers, setCalledNumbers] = useState<number[]>([]);
  const [gameStatus, setGameStatus] = useState<'idle' | 'active' | 'complete'>('idle');

  return (
    <div className="min-h-screen bg-gradient-main">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse-glow"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-secondary/10 rounded-full animate-bounce-in"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-accent/10 rounded-full animate-pulse-glow"></div>
        <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-success/10 rounded-full animate-bounce-in"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            🎯 TAMBOLA MASTER GAME
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate authentic Tambola tickets and enjoy the classic Indian Bingo experience!
          </p>
        </div>

        {/* Game Stats */}
        <div className="mb-8 animate-slide-up">
          <GameStats 
            totalTickets={totalTickets} 
            calledNumbers={calledNumbers} 
            gameStatus={gameStatus} 
          />
        </div>

        {/* Main Game Layout - Two Column Layout for Desktop */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-fade-in">
          {/* Left Column - Number Picker */}
          <div className="order-2 xl:order-1">
            <div className="sticky top-4">
              <NumberPicker />
            </div>
          </div>

          {/* Right Column - Ticket Generator */}
          <div className="order-1 xl:order-2">
            <TambolaTicketGenerator />
          </div>
        </div>

        {/* How to Play Instructions */}
        <div className="mt-16 max-w-4xl mx-auto animate-fade-in">
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/20 shadow-card">
            <h3 className="text-xl font-bold text-center mb-4 text-foreground">
              🎮 How to Play Tambola
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div className="text-center space-y-2">
                <div className="text-2xl">📋</div>
                <div className="font-semibold text-foreground">Step 1: Generate Tickets</div>
                <div>Create 1-6 authentic Tambola tickets with proper number distribution</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl">🎲</div>
                <div className="font-semibold text-foreground">Step 2: Start Calling</div>
                <div>Use the number picker to randomly call numbers from 1-90</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl">🏆</div>
                <div className="font-semibold text-foreground">Step 3: Mark & Win</div>
                <div>Mark called numbers on your tickets and claim wins (Early 5, Lines, Full House)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-muted-foreground animate-fade-in">
          <p className="text-sm">
            🎮 Built with React & Tailwind CSS • Featuring authentic Tambola rules and beautiful animations
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
