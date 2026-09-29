import React, { useState } from 'react';
import { GAME2_QUESTIONS } from '../../data/lessonData';
import { GameId } from '../../types';
import { playSound, speakVietnamese } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Volume2, ArrowRight, RotateCcw, Check, X, Award, Sparkles } from 'lucide-react';

interface Game2FunctionsProps {
  onComplete: (starsEarned: number) => void;
  onNextGame: (nextGameId: GameId) => void;
}

export const Game2Functions: React.FC<Game2FunctionsProps> = ({ onComplete, onNextGame }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = GAME2_QUESTIONS[currentIdx];

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (selectedOptionId !== null) return; // Prevent re-click

    setSelectedOptionId(optionId);
    setShowExplanation(true);

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

  const handleNextQuestion = () => {
    playSound('click');
    if (currentIdx + 1 < GAME2_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOptionId(null);
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
    setSelectedOptionId(null);
    setShowExplanation(false);
    setCorrectCount(0);
    setIsFinished(false);
  };

  const handleReadQuestion = () => {
    const speech = `${currentQ.itemName}. ${currentQ.question}. Các đáp án: ${currentQ.options.map(o => o.text).join(', ')}`;
    speakVietnamese(speech);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-100 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-['Baloo_2',sans-serif]">
                TRÒ CHƠI 2: “ĐỒ DÙNG NÀY LÀM GÌ?”
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-medium mt-1">
              <strong className="text-amber-700">Mục tiêu:</strong> Nhận biết công dụng của đồ dùng học tập quen thuộc.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
              Câu {currentIdx + 1} / {GAME2_QUESTIONS.length}
            </span>
            <button
              onClick={handleReplay}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Làm lại từ đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full mt-4 overflow-hidden border border-slate-200">
          <div
            className="bg-amber-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIdx + (isFinished ? 1 : 0)) / GAME2_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {!isFinished ? (
        /* QUIZ CARD */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-md space-y-6 animate-fadeIn">
          {/* Item Spotlight */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-linear-to-r from-amber-50 to-orange-50 p-4 sm:p-5 rounded-2xl border border-amber-200">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border-2 border-amber-300 flex items-center justify-center text-4xl sm:text-5xl shadow-xs shrink-0 animate-pulse">
              {currentQ.itemIcon}
            </div>
            <div className="text-center sm:text-left flex-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Câu hỏi {currentIdx + 1}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-1 font-['Baloo_2',sans-serif]">
                {currentQ.question}
              </h3>
            </div>
            <button
              onClick={handleReadQuestion}
              className="p-3 rounded-2xl bg-amber-500 text-white hover:bg-amber-600 shadow-sm transition-transform active:scale-95"
              title="Nghe câu hỏi"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3.5">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let btnClass = 'bg-slate-50 hover:bg-amber-50 text-slate-800 border-slate-200 hover:border-amber-400';

              if (selectedOptionId !== null) {
                if (opt.isCorrect) {
                  btnClass = 'bg-emerald-100 text-emerald-950 border-emerald-400 font-extrabold shadow-sm ring-2 ring-emerald-300';
                } else if (isSelected) {
                  btnClass = 'bg-rose-100 text-rose-950 border-rose-400 font-extrabold shadow-sm';
                } else {
                  btnClass = 'opacity-50 bg-slate-50 text-slate-500 border-slate-200';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={selectedOptionId !== null}
                  onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                  className={`w-full py-4 px-5 rounded-2xl border-2 text-left text-base sm:text-lg font-bold transition-all flex items-center justify-between group ${btnClass}`}
                >
                  <span>{opt.text}</span>
                  {selectedOptionId !== null && opt.isCorrect && (
                    <span className="flex items-center gap-1 text-emerald-700 font-extrabold text-sm">
                      <Check className="w-5 h-5 text-emerald-600" />
                      ⭐ Đúng
                    </span>
                  )}
                  {selectedOptionId !== null && isSelected && !opt.isCorrect && (
                    <span className="flex items-center gap-1 text-rose-700 font-extrabold text-sm">
                      <X className="w-5 h-5 text-rose-600" />
                      Chưa đúng
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next button */}
          {showExplanation && (
            <div className="space-y-4 pt-3 border-t border-slate-100 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm sm:text-base leading-relaxed">
                <span className="font-extrabold">💡 Giải thích: </span>
                {currentQ.explanation}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base flex items-center gap-2 shadow-md hover:shadow-lg transition-transform active:scale-95"
                >
                  <span>
                    {currentIdx + 1 < GAME2_QUESTIONS.length ? 'Câu tiếp theo' : 'Xem kết quả'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* FINISHED SUMMARY */
        <div className="bg-linear-to-r from-amber-50 via-orange-50 to-amber-50 rounded-3xl p-6 sm:p-8 border-3 border-amber-300 shadow-lg text-center space-y-5 animate-scaleIn">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-400 text-amber-900 text-3xl shadow-inner animate-bounce">
            🎉
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-amber-900 font-['Baloo_2',sans-serif]">
            HOÀN THÀNH XUẤT SẮC TRÒ CHƠI 2!
          </h3>

          <p className="text-base text-slate-700 font-medium">
            Em đã trả lời đúng <strong className="text-amber-700 font-bold text-lg">{correctCount}</strong> trên tổng số {GAME2_QUESTIONS.length} câu hỏi về công dụng của đồ dùng học tập!
          </p>

          <div className="max-w-lg mx-auto bg-white/90 p-4 rounded-2xl border border-amber-200 text-left text-xs sm:text-sm text-slate-700 space-y-1.5 shadow-xs">
            <div className="font-extrabold text-amber-900 mb-1">📝 Ghi nhớ nhanh:</div>
            <div>• ✏️ Bút chì: Viết, vẽ tranh</div>
            <div>• 📏 Thước kẻ: Kẻ đoạn thẳng, đo độ dài</div>
            <div>• 🧹 Tẩy: Xóa sạch nét chì</div>
            <div>• ✂️ Kéo: Cắt giấy thủ công</div>
            <div>• 🧴 Hồ dán: Dán giấy</div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={handleReplay}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi lại</span>
            </button>

            <button
              onClick={() => onNextGame('game3')}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <span>Tiếp tục Trò Chơi 3: Truyền Điện</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
