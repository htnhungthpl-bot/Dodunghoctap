import React, { useState } from 'react';
import { GameId } from '../types';
import { GAMES_INFO } from '../data/lessonData';
import { playSound } from '../utils/audio';
import { Volume2, VolumeX, Maximize2, Minimize2, BookOpen, Star, Award } from 'lucide-react';

interface HeaderProps {
  currentGameId: GameId;
  onSelectGame: (id: GameId) => void;
  totalStars: number;
  completedGames: Record<GameId, boolean>;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenTeacherGuide: () => void;
  onOpenCertificate: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentGameId,
  onSelectGame,
  totalStars,
  completedGames,
  soundEnabled,
  onToggleSound,
  onOpenTeacherGuide,
  onOpenCertificate
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleGameClick = (id: GameId) => {
    playSound('click');
    onSelectGame(id);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-2">
          {/* Brand & Mascot */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-400 border-2 border-amber-500 flex items-center justify-center text-2xl sm:text-3xl shadow-sm transform -rotate-3 transition-transform hover:rotate-0">
              ✏️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-extrabold text-amber-900 tracking-tight flex items-center gap-1.5 font-['Baloo_2',sans-serif]">
                  Đồ Dùng Học Tập
                </h1>
                <span className="hidden md:inline-flex text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full">
                  Tiểu Học
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium line-clamp-1">
                Bộ 6 trò chơi tương tác theo giáo án
              </p>
            </div>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Star Counter */}
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-2.5 sm:px-3.5 py-1 text-amber-800 shadow-xs">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-400 animate-pulse" />
              <span className="text-sm sm:text-base font-extrabold font-['Baloo_2',sans-serif]">
                {totalStars}
              </span>
              <span className="text-[11px] text-amber-700 hidden sm:inline">sao</span>
            </div>

            {/* Certificate Button */}
            <button
              onClick={() => { playSound('click'); onOpenCertificate(); }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors shadow-xs"
              title="Xem Bằng khen"
            >
              <Award className="w-4 h-4 text-purple-600" />
              <span className="hidden sm:inline">Bằng Khen</span>
            </button>

            {/* Teacher Guide */}
            <button
              onClick={() => { playSound('click'); onOpenTeacherGuide(); }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-xs"
              title="Hướng dẫn giáo án dành cho Thầy Cô"
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Giáo Án</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              className={`p-2 rounded-lg border transition-colors ${
                soundEnabled
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
              title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
              aria-label="Cài đặt âm thanh"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors hidden sm:block"
              title={isFullscreen ? 'Thu nhỏ màn hình' : 'Trình chiếu toàn màn hình'}
              aria-label="Toàn màn hình"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 6 Game Tabs Navigation */}
        <nav aria-label="Danh sách trò chơi" className="mt-2.5 pt-2 border-t border-slate-100 overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-1.5 min-w-max">
            {GAMES_INFO.map((game, index) => {
              const isActive = currentGameId === game.id;
              const isDone = completedGames[game.id];

              return (
                <button
                  key={game.id}
                  onClick={() => handleGameClick(game.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all relative ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-300 ring-offset-1'
                      : 'bg-white hover:bg-amber-50 text-slate-700 border border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <span className="text-base">{game.icon}</span>
                  <div className="text-left">
                    <span className="block leading-tight">
                      {index + 1}. {game.shortTitle}
                    </span>
                  </div>
                  {isDone && (
                    <span className={`text-[10px] font-extrabold px-1 rounded-full ${isActive ? 'bg-amber-600 text-amber-100' : 'bg-emerald-100 text-emerald-700'}`}>
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};
