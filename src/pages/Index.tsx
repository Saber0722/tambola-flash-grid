import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            🎯 TAMBOLA MASTER
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate authentic Tambola tickets and enjoy the classic Indian Bingo experience with stunning animations!
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

        {/* Main Game Area */}
        <Tabs defaultValue="generator" className="w-full animate-fade-in">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-card shadow-card border border-border">
            <TabsTrigger 
              value="generator" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              🎫 Ticket Generator
            </TabsTrigger>
            <TabsTrigger 
              value="picker" 
              className="data-[state=active]:bg-gradient-accent data-[state=active]:text-accent-foreground transition-all duration-300"
            >
              🎱 Number Picker
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-6">
            <TambolaTicketGenerator />
          </TabsContent>

          <TabsContent value="picker" className="space-y-6">
            <NumberPicker />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-16 text-muted-foreground animate-fade-in">
          <p className="text-sm">
            🎮 Built with React & Tailwind CSS • Featuring authentic Tambola rules and beautiful animations
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
