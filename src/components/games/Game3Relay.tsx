import React, { useState, useEffect, useRef } from 'react';
import { GAME3_ITEMS } from '../../data/lessonData';
import { RelayItem, GameId } from '../../types';
import { playSound, speakVietnamese } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Volume2, ArrowRight, RotateCcw, Zap, Star, Users, User, Clock, Check, RefreshCw, Mic, Sparkles } from 'lucide-react';

interface Game3RelayProps {
  onComplete: (starsEarned: number) => void;
  onNextGame: (nextGameId: GameId) => void;
}

export const Game3Relay: React.FC<Game3RelayProps> = ({ onComplete, onNextGame }) => {
  // Mode: classroom (for teacher presenting on smartboard) vs solo (student practice)
  const [mode, setMode] = useState<'classroom' | 'solo'>('classroom');

  // Current item being displayed
  const [currentItem, setCurrentItem] = useState<RelayItem>(GAME3_ITEMS[0]);
  const [isSpinning, setIsSpinning] = useState(false);

  // Classroom mode states
  const [timerSeconds, setTimerSeconds] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [relayCount, setRelayCount] = useState(0);
  const [scoreStars, setScoreStars] = useState(0);
  const [historyItems, setHistoryItems] = useState<{ item: RelayItem; student: string; isCorrect: boolean }[]>([]);
  const [studentName, setStudentName] = useState('Bạn số 1');
  const [studentCounter, setStudentCounter] = useState(1);

  // Solo mode interactive sentence builder
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [soloFeedback, setSoloFeedback] = useState<string | null>(null);
  const [soloSuccessCount, setSoloSuccessCount] = useState(0);

  // Timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown timer effect
  useEffect(() => {
    if (isTimerRunning && timerSeconds > 0) {
      timerRef.current = setTimeout(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      playSound('wrong');
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isTimerRunning, timerSeconds]);

  // Trigger electric pulse to pick a new item
  const handleTriggerElectric = () => {
    playSound('electric');
    setIsSpinning(true);
    setIsTimerRunning(false);

    let counter = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * GAME3_ITEMS.length);
      setCurrentItem(GAME3_ITEMS[randomIdx]);
      counter++;

      if (counter > 8) {
        clearInterval(interval);
        const finalIdx = Math.floor(Math.random() * GAME3_ITEMS.length);
        const picked = GAME3_ITEMS[finalIdx];
        setCurrentItem(picked);
        setIsSpinning(false);
        setTimerSeconds(10);
        setIsTimerRunning(true);
        setSelectedWords([]);
        setSoloFeedback(null);

        // Speak item name
        speakVietnamese(`${picked.name}! Hãy nói câu nêu công dụng!`);
      }
    }, 100);
  };

  // Teacher evaluates: Correct
  const handleTeacherScore = (correct: boolean) => {
    if (correct) {
      playSound('star');
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
      setScoreStars(prev => prev + 1);
      setHistoryItems(prev => [{ item: currentItem, student: studentName, isCorrect: true }, ...prev.slice(0, 4)]);
      // Auto advance student counter
      const nextNum = studentCounter + 1;
      setStudentCounter(nextNum);
      setStudentName(`Bạn số ${nextNum}`);

      if (scoreStars + 1 >= 5) {
        onComplete(3);
      }
    } else {
      playSound('electric');
      setHistoryItems(prev => [{ item: currentItem, student: studentName, isCorrect: false }, ...prev.slice(0, 4)]);
      // Pass electric current to next friend!
      const nextNum = studentCounter + 1;
      setStudentCounter(nextNum);
      setStudentName(`Bạn số ${nextNum}`);
      setTimerSeconds(8);
      setIsTimerRunning(true);
    }
  };

  // Solo mode word bank for current item
  const wordChoices = React.useMemo(() => {
    const words = currentItem.sampleAnswer.replace(/[.,]/g, '').split(' ');
    // Add 2 distractors
    const distractors = ['để cắm hoa', 'để ăn', 'màu đỏ', 'rất to'];
    const extra = distractors[Math.floor(Math.random() * distractors.length)];
    const all = [...words, extra];
    return all.sort(() => Math.random() - 0.5);
  }, [currentItem]);

  const handleSelectWord = (w: string) => {
    playSound('click');
    setSelectedWords(prev => [...prev, w]);
  };

  const handleCheckSoloSentence = () => {
    const constructed = selectedWords.join(' ').trim().toLowerCase();
    const target = currentItem.sampleAnswer.replace(/[.,]/g, '').trim().toLowerCase();

    if (constructed.includes(target) || target.includes(constructed)) {
      playSound('correct');
      confetti({ particleCount: 30, spread: 50 });
      setSoloFeedback(`🎉 Đúng rồi! "${currentItem.sampleAnswer}" ⭐`);
      setSoloSuccessCount(prev => prev + 1);
      if (soloSuccessCount + 1 >= 4) {
        onComplete(3);
      }
    } else {
      playSound('wrong');
      setSoloFeedback(`Chưa chính xác rồi. Câu mẫu: "${currentItem.sampleAnswer}"`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-indigo-100 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎤</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-['Baloo_2',sans-serif]">
                TRÒ CHƠI 3: “TRUYỀN ĐIỆN”
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-medium mt-1">
              <strong className="text-indigo-700">Mục tiêu:</strong> Phản xạ nhanh nói câu theo mẫu: <span className="underline decoration-indigo-300">Tên đồ dùng + công dụng</span>.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => { playSound('click'); setMode('classroom'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                mode === 'classroom'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Chế độ Lớp Học</span>
            </button>
            <button
              onClick={() => { playSound('click'); setMode('solo'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                mode === 'solo'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Tự Luyện Tập</span>
            </button>
          </div>
        </div>

        {/* Rule Reminder */}
        <div className="mt-3.5 p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0 animate-bounce" />
            <span>
              <strong>Luật:</strong> Nói đúng nhận ⭐ | Nói chưa đủ ➔ Truyền quyền cho bạn tiếp theo | Không lặp lại câu trước!
            </span>
          </div>
          <div className="font-bold text-indigo-800">
            Mẫu: “Thước dùng để kẻ.” / “Bút chì dùng để vẽ.”
          </div>
        </div>
      </div>

      {/* ELECTRIC RELAY STAGE */}
      <div className="bg-linear-to-b from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border-4 border-indigo-400">
        {/* Background lightning bolt glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-5">
          {/* Header Info: Student turn & Timer */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2 bg-indigo-800/80 px-4 py-2 rounded-2xl border border-indigo-500/50">
              <span className="text-amber-400">⚡ Lượt nói:</span>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="bg-transparent border-b border-indigo-400 text-white font-extrabold text-sm focus:outline-hidden max-w-[130px]"
                title="Bấm để đổi tên học sinh"
              />
            </div>

            {/* Countdown Clock */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-extrabold ${
              timerSeconds <= 3 && isTimerRunning
                ? 'bg-rose-500/90 text-white border-rose-400 animate-pulse'
                : 'bg-indigo-800/80 text-amber-300 border-indigo-500/50'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{timerSeconds}s</span>
            </div>
          </div>

          {/* MAIN PROMPT CARD */}
          <div className={`w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-6 border-2 border-indigo-300/40 shadow-inner flex flex-col items-center transition-all ${
            isSpinning ? 'scale-95 opacity-75' : 'scale-100 opacity-100'
          }`}>
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white text-slate-800 flex items-center justify-center text-6xl sm:text-7xl shadow-lg border-4 border-amber-400 mb-3 transform hover:scale-105 transition-transform">
              {currentItem.icon}
            </div>

            <span className="text-xs uppercase tracking-widest text-indigo-300 font-extrabold">
              Đồ dùng học tập
            </span>

            <h3 className="text-3xl sm:text-4xl font-black text-amber-300 tracking-wide font-['Baloo_2',sans-serif] mt-1">
              {currentItem.name}
            </h3>

            {/* Sample sentence button for teachers & kids */}
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => speakVietnamese(`${currentItem.name}. ${currentItem.sampleAnswer}`)}
                className="px-3 py-1.5 rounded-xl bg-indigo-700/80 hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 border border-indigo-400/30 transition-colors"
                title="Nghe câu mẫu"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Nghe câu mẫu</span>
              </button>
            </div>
          </div>

          {/* ACTION BUTTON: BẤM TRUYỀN ĐIỆN ⚡ */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleTriggerElectric}
              disabled={isSpinning}
              className="py-3.5 px-8 rounded-2xl bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base sm:text-lg flex items-center gap-2 shadow-lg hover:shadow-amber-500/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <Zap className="w-6 h-6 fill-amber-900 text-amber-950 animate-bounce" />
              <span>{isSpinning ? 'ĐANG QUAY...' : '⚡ BẬT TRUYỀN ĐIỆN!'}</span>
            </button>
          </div>

          {/* CLASSROOM EVALUATION BUTTONS */}
          {mode === 'classroom' && (
            <div className="w-full pt-4 border-t border-indigo-800/80 space-y-3">
              <p className="text-xs text-indigo-300 font-semibold">
                Thầy cô đánh giá câu trả lời của em {studentName}:
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => handleTeacherScore(true)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-extrabold flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Star className="w-4 h-4 fill-amber-200 text-amber-100" />
                  <span>Nói đúng! (+1 Sao ⭐)</span>
                </button>

                <button
                  onClick={() => handleTeacherScore(false)}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-extrabold flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Zap className="w-4 h-4" />
                  <span>Nói chưa đủ ➔ Truyền bạn kế tiếp!</span>
                </button>
              </div>

              {/* Score bar */}
              <div className="flex items-center justify-center gap-3 pt-2 text-xs text-indigo-200">
                <span>Số sao lớp đạt được:</span>
                <span className="font-extrabold text-amber-300 text-base">
                  {scoreStars} ⭐
                </span>
              </div>
            </div>
          )}

          {/* SOLO MODE: SENTENCE PUZZLE */}
          {mode === 'solo' && (
            <div className="w-full pt-4 border-t border-indigo-800/80 space-y-4">
              <div className="text-xs text-indigo-200 font-semibold">
                Ghép các từ để tạo thành câu hoàn chỉnh nêu công dụng của {currentItem.name}:
              </div>

              {/* Constructed sentence */}
              <div className="min-h-[50px] p-3 rounded-2xl bg-white/10 border border-indigo-400/40 flex flex-wrap items-center justify-center gap-2">
                {selectedWords.length === 0 ? (
                  <span className="text-xs text-indigo-300 italic">Bấm các từ phía dưới để xếp câu</span>
                ) : (
                  selectedWords.map((word, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-amber-400 text-slate-900 font-bold text-sm shadow-xs"
                    >
                      {word}
                    </span>
                  ))
                )}
              </div>

              {/* Word bank */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {wordChoices.map((w, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectWord(w)}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-700/70 hover:bg-indigo-600 text-white text-xs font-bold border border-indigo-400/30 transition-transform active:scale-95"
                  >
                    {w}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-3 pt-1">
                <button
                  onClick={() => setSelectedWords([])}
                  className="px-3 py-1.5 rounded-xl bg-slate-700 text-xs font-bold text-slate-300 hover:text-white"
                >
                  Xếp lại
                </button>
                <button
                  onClick={handleCheckSoloSentence}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md"
                >
                  Kiểm tra câu
                </button>
              </div>

              {soloFeedback && (
                <div className="p-2.5 rounded-xl bg-white/20 text-xs font-bold text-amber-200">
                  {soloFeedback}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleTriggerElectric}
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Lượt chơi mới</span>
        </button>

        <button
          onClick={() => onNextGame('game4')}
          className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
        >
          <span>Sang Trò Chơi 4: Thám Tử Dấu Câu</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
