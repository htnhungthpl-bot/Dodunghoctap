import React, { useState } from 'react';
import { GAME4_QUESTIONS } from '../../data/lessonData';
import { GameId } from '../../types';
import { playSound, speakVietnamese } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Volume2, ArrowRight, RotateCcw, Search, Check, X, Sparkles, HelpCircle } from 'lucide-react';

interface Game4PunctuationProps {
  onComplete: (starsEarned: number) => void;
  onNextGame: (nextGameId: GameId) => void;
}

export const Game4Punctuation: React.FC<Game4PunctuationProps> = ({ onComplete, onNextGame }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedMark, setSelectedMark] = useState<'.' | '?' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = GAME4_QUESTIONS[currentIdx];

  const handleSelectMark = (mark: '.' | '?') => {
    if (selectedMark !== null) return;

    setSelectedMark(mark);
    setShowExplanation(true);

    const isCorrect = mark === currentQ.correctMark;
    if (isCorrect) {
      playSound('correct');
      setCorrectCount(prev => prev + 1);
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.7 }
      });
    } else {
      playSound('wrong');
    }
  };

  const handleNext = () => {
    playSound('click');
    if (currentIdx + 1 < GAME4_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedMark(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
      playSound('fanfare');
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
      onComplete(3);
    }
  };

  const handleReplay = () => {
    playSound('click');
    setCurrentIdx(0);
    setSelectedMark(null);
    setShowExplanation(false);
    setCorrectCount(0);
    setIsFinished(false);
  };

  const handleReadSentence = () => {
    speakVietnamese(`${currentQ.sentenceBefore}... hãy chọn dấu chấm hay dấu chấm hỏi?`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-rose-100 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">❓</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-['Baloo_2',sans-serif]">
                TRÒ CHƠI 4: “THÁM TỬ DẤU CÂU”
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-medium mt-1">
              <strong className="text-rose-700">Mục tiêu:</strong> Phân biệt câu kể (dấu .) và câu hỏi (dấu ?).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full">
              Thử thách {currentIdx + 1} / {GAME4_QUESTIONS.length}
            </span>
            <button
              onClick={handleReplay}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Làm lại"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CÂU THẦN CHÚ BANNER */}
        <div className="mt-4 p-3.5 bg-linear-to-r from-rose-50 via-amber-50 to-orange-50 rounded-2xl border-2 border-rose-300 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2 text-rose-950 font-black text-xs sm:text-sm">
            <span className="text-xl">🧠</span>
            <span>CÂU THẦN CHÚ:</span>
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm font-extrabold">
            <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-900 border border-blue-300">
              KỂ ➔ Dấu chấm (.)
            </span>
            <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
              HỎI ➔ Dấu chấm hỏi (?)
            </span>
          </div>
        </div>
      </div>

      {!isFinished ? (
        /* DETECTIVE PUZZLE CARD */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-md space-y-6 animate-fadeIn">
          {/* Sentence Display Area with Detective Magnifier */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border-2 border-dashed border-rose-300 text-center relative">
            <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-rose-500 text-white text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1">
              <Search className="w-3 h-3" />
              <span>Thám tử soi câu</span>
            </div>

            <div className="flex items-center justify-center gap-3 flex-wrap text-xl sm:text-2xl font-black text-slate-800 leading-relaxed font-['Nunito',sans-serif]">
              <span>{currentQ.sentenceBefore}</span>

              {/* The mystery box */}
              <span
                className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl border-3 text-2xl font-black transition-all ${
                  selectedMark === null
                    ? 'border-rose-400 bg-rose-100 text-rose-800 animate-pulse'
                    : selectedMark === currentQ.correctMark
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-900 ring-4 ring-emerald-200'
                    : 'border-rose-500 bg-rose-100 text-rose-900 ring-4 ring-rose-200'
                }`}
              >
                {selectedMark !== null ? selectedMark : '□'}
              </span>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                onClick={handleReadSentence}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Volume2 className="w-4 h-4 text-rose-600" />
                <span>Đọc to câu văn</span>
              </button>
            </div>
          </div>

          {/* TWO BIG CHOICES: DẤU . HOẶC DẤU ? */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
            {/* Button Dấu chấm (.) */}
            <button
              disabled={selectedMark !== null}
              onClick={() => handleSelectMark('.')}
              className={`p-5 sm:p-6 rounded-3xl border-3 flex flex-col items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer ${
                selectedMark === '.'
                  ? currentQ.correctMark === '.'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-4 ring-emerald-200 shadow-lg'
                    : 'border-rose-500 bg-rose-50 text-rose-950 ring-4 ring-rose-200'
                  : selectedMark !== null && currentQ.correctMark === '.'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-200'
                  : 'border-blue-300 bg-blue-50/70 hover:bg-blue-100 text-blue-950 hover:shadow-md'
              }`}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl sm:text-5xl font-black shadow-md">
                .
              </div>
              <span className="text-base sm:text-lg font-black font-['Baloo_2',sans-serif]">
                DẤU CHẤM (.)
              </span>
              <span className="text-xs text-blue-700 font-semibold">
                Dùng cho Câu Kể
              </span>
            </button>

            {/* Button Dấu chấm hỏi (?) */}
            <button
              disabled={selectedMark !== null}
              onClick={() => handleSelectMark('?')}
              className={`p-5 sm:p-6 rounded-3xl border-3 flex flex-col items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer ${
                selectedMark === '?'
                  ? currentQ.correctMark === '?'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-4 ring-emerald-200 shadow-lg'
                    : 'border-rose-500 bg-rose-50 text-rose-950 ring-4 ring-rose-200'
                  : selectedMark !== null && currentQ.correctMark === '?'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-200'
                  : 'border-amber-300 bg-amber-50/70 hover:bg-amber-100 text-amber-950 hover:shadow-md'
              }`}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-500 text-white flex items-center justify-center text-4xl sm:text-5xl font-black shadow-md">
                ?
              </div>
              <span className="text-base sm:text-lg font-black font-['Baloo_2',sans-serif]">
                DẤU CHẤM HỎI (?)
              </span>
              <span className="text-xs text-amber-700 font-semibold">
                Dùng cho Câu Hỏi
              </span>
            </button>
          </div>

          {/* Explanation & Next */}
          {showExplanation && (
            <div className="space-y-4 pt-4 border-t border-slate-100 animate-fadeIn">
              <div
                className={`p-4 rounded-2xl border text-sm sm:text-base leading-relaxed ${
                  selectedMark === currentQ.correctMark
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="font-extrabold flex items-center gap-1.5 mb-1">
                  {selectedMark === currentQ.correctMark ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-600" />
                      <span>Thám tử tài ba! Đáp án đúng: [{currentQ.correctMark}]</span>
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5 text-rose-600" />
                      <span>Chưa đúng rồi! Đáp án phải là: [{currentQ.correctMark}]</span>
                    </>
                  )}
                </div>
                <p>{currentQ.explanation}</p>
                {currentQ.clueWord && (
                  <p className="mt-2 text-xs font-bold text-amber-800 bg-amber-100/70 p-2 rounded-xl border border-amber-300 inline-block">
                    🔍 Dấu hiệu nhận biết câu hỏi: từ &quot;{currentQ.clueWord}&quot;
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-base flex items-center gap-2 shadow-md hover:shadow-lg transition-transform active:scale-95"
                >
                  <span>
                    {currentIdx + 1 < GAME4_QUESTIONS.length ? 'Câu tiếp theo' : 'Xem kết quả'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* FINISHED SUMMARY */
        <div className="bg-linear-to-r from-rose-50 via-amber-50 to-rose-50 rounded-3xl p-6 sm:p-8 border-3 border-rose-300 shadow-lg text-center space-y-5 animate-scaleIn">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-500 text-white text-3xl shadow-inner animate-bounce">
            🕵️‍♂️
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-rose-950 font-['Baloo_2',sans-serif]">
            HOÀN THÀNH XUẤT SẮC: THÁM TỬ DẤU CÂU!
          </h3>

          <p className="text-base text-slate-700 font-medium">
            Em đã phân biệt đúng <strong className="text-rose-700 font-bold text-lg">{correctCount}</strong> / {GAME4_QUESTIONS.length} câu kể và câu hỏi!
          </p>

          <div className="max-w-md mx-auto bg-white/90 p-4 rounded-2xl border border-rose-200 text-xs sm:text-sm text-slate-700 text-left space-y-2 shadow-xs">
            <div className="font-extrabold text-rose-900">✨ Ghi nhớ suốt đời:</div>
            <div>• <strong>Câu kể:</strong> Dùng để kể, tả, giới thiệu ➔ Kết thúc bằng dấu chấm (.)</div>
            <div>• <strong>Câu hỏi:</strong> Dùng để hỏi điều chưa biết (thường có từ: <em>ai, gì, nào, không, ở đâu</em>) ➔ Kết thúc bằng dấu chấm hỏi (?)</div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={handleReplay}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Luyện lại</span>
            </button>

            <button
              onClick={() => onNextGame('game5')}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <span>Sang Trò Chơi 5: Bắn Bóng Vào Đích</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
