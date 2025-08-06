import { Card } from '@/components/ui/card';

interface GameStatsProps {
  totalTickets: number;
  calledNumbers: number[];
  gameStatus: 'idle' | 'active' | 'complete';
}

const GameStats: React.FC<GameStatsProps> = ({ totalTickets, calledNumbers, gameStatus }) => {
  const progress = (calledNumbers.length / 90) * 100;
  
  const getGameStatusIcon = () => {
    switch (gameStatus) {
      case 'idle': return '⏸️';
      case 'active': return '🎮';
      case 'complete': return '🏆';
      default: return '🎯';
    }
  };

  const getGameStatusText = () => {
    switch (gameStatus) {
      case 'idle': return 'Ready to Start';
      case 'active': return 'Game in Progress';
      case 'complete': return 'Game Complete';
      default: return 'Game Status';
    }
  };

  return (
    <Card className="p-6 bg-gradient-main border-2 border-primary/20">
      <h3 className="text-xl font-bold text-center mb-6 text-foreground">
        📊 Game Statistics
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-primary animate-pulse-glow">
            {totalTickets}
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            Tickets Generated
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-accent animate-pulse-glow">
            {calledNumbers.length}
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            Numbers Called
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <div className="text-2xl animate-bounce-in">
            {getGameStatusIcon()}
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            {getGameStatusText()}
          </div>
        </div>
      </div>
      
      {calledNumbers.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Game Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-success h-full rounded-full transition-all duration-700 animate-slide-up"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default GameStats;