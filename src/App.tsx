import React, { useState } from 'react';
import { GameId } from './types';
import { GAMES_INFO } from './data/lessonData';
import { Header } from './components/Header';
import { Game1Sorting } from './components/games/Game1Sorting';
import { Game2Functions } from './components/games/Game2Functions';
import { Game3Relay } from './components/games/Game3Relay';
import { Game4Punctuation } from './components/games/Game4Punctuation';
import { Game5TargetBall } from './components/games/Game5TargetBall';
import { Game6RescueBoy } from './components/games/Game6RescueBoy';
import { CertificateModal } from './components/CertificateModal';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { playSound } from './utils/audio';
import { Award, BookOpen, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [currentGameId, setCurrentGameId] = useState<GameId>('game1');
  const [totalStars, setTotalStars] = useState<number>(0);
  const [completedGames, setCompletedGames] = useState<Record<GameId, boolean>>({
    game1: false,
    game2: false,
    game3: false,
    game4: false,
    game5: false,
    game6: false
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState<boolean>(false);

  const handleGameComplete = (gameId: GameId, starsEarned: number) => {
    if (!completedGames[gameId]) {
      setTotalStars(prev => prev + starsEarned);
      setCompletedGames(prev => ({ ...prev, [gameId]: true }));
    }
  };

  const handleSwitchGame = (nextGameId: GameId) => {
    playSound('click');
    setCurrentGameId(nextGameId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-orange-50/30 to-amber-50 flex flex-col font-['Nunito',sans-serif] text-slate-800">
      {/* Top Navigation Bar */}
      <Header
        currentGameId={currentGameId}
        onSelectGame={handleSwitchGame}
        totalStars={totalStars}
        completedGames={completedGames}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
      />

      {/* Main Game Stage */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 py-6 sm:py-8">
        {currentGameId === 'game1' && (
          <Game1Sorting
            onComplete={(stars) => handleGameComplete('game1', stars)}
            onNextGame={handleSwitchGame}
          />
        )}

        {currentGameId === 'game2' && (
          <Game2Functions
            onComplete={(stars) => handleGameComplete('game2', stars)}
            onNextGame={handleSwitchGame}
          />
        )}

        {currentGameId === 'game3' && (
          <Game3Relay
            onComplete={(stars) => handleGameComplete('game3', stars)}
            onNextGame={handleSwitchGame}
          />
        )}

        {currentGameId === 'game4' && (
          <Game4Punctuation
            onComplete={(stars) => handleGameComplete('game4', stars)}
            onNextGame={handleSwitchGame}
          />
        )}

        {currentGameId === 'game5' && (
          <Game5TargetBall
            onComplete={(stars) => handleGameComplete('game5', stars)}
            onNextGame={handleSwitchGame}
          />
        )}

        {currentGameId === 'game6' && (
          <Game6RescueBoy
            onComplete={(stars) => handleGameComplete('game6', stars)}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-amber-200 bg-white/80 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-bold text-amber-900">
            <span>🎒 Giáo án Đồ dùng học tập Tiểu học</span>
            <span>•</span>
            <span className="text-slate-600 font-normal">Trực quan - Tương tác - Sôi nổi</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTeacherGuideOpen(true)}
              className="text-emerald-700 hover:underline font-bold"
            >
              Xem mục tiêu tiết dạy
            </button>
            <span>•</span>
            <button
              onClick={() => setIsCertificateOpen(true)}
              className="text-purple-700 hover:underline font-bold"
            >
              Mẫu Giấy khen học sinh
            </button>
          </div>
        </div>
      </footer>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        totalStars={totalStars}
      />

      {/* Teacher Guide Modal */}
      <TeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
      />
    </div>
  );
}
