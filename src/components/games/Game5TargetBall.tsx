import React, { useState } from 'react';
import { GAME5_QUESTIONS, BASKET_DEFS } from '../../data/lessonData';
import { BallQuestion, GameId } from '../../types';
import { playSound, speakVietnamese } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Volume2, ArrowRight, RotateCcw, Target, Sparkles, Check, X } from 'lucide-react';

interface Game5TargetBallProps {
  onComplete: (starsEarned: number) => void;
  onNextGame: (nextGameId: GameId) => void;
}

export const Game5TargetBall: React.FC<Game5TargetBallProps> = ({ onComplete, onNextGame }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedBasketId, setSelectedBasketId] = useState<string | null>(null);
  const [isShooting, setIsShooting] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ: BallQuestion = GAME5_QUESTIONS[currentIdx];

  const handleShootBall = (basketKey: keyof typeof BASKET_DEFS) => {
    if (selectedBasketId !== null || isShooting) return;

    setSelectedBasketId(basketKey);
    setIsShooting(true);
    playSound('pop');

    // After flight animation
    setTimeout(() => {
      setIsShooting(false);
      const isCorrect = basketKey === currentQ.targetBasket;

      if (isCorrect) {
        playSound('correct');
        setCorrectCount(prev => prev + 1);
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.6 }
        });
        setFeedback({
          isCorrect: true,
          text: `🎯 Chuẩn xác! Quả bóng đã vào đúng giỏ "${BASKET_DEFS[basketKey].label}"!`
        });
      } else {
        playSound('wrong');
        setFeedback({
          isCorrect: false,
          text: `Chưa đúng giỏ rồi! Câu này thuộc về giỏ "${BASKET_DEFS[currentQ.targetBasket].label}". ${currentQ.hint || ''}`
        });
      }
    }, 450);
  };

  const handleNext = () => {
    playSound('click');
    if (currentIdx + 1 < GAME5_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedBasketId(null);
      setFeedback(null);
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
    setSelectedBasketId(null);
    setFeedback(null);
    setCorrectCount(0);
    setIsFinished(false);
  };

  const handleSpeak = () => {
    speakVietnamese(`${currentQ.text}. Câu này nên đưa vào chiếc giỏ nào?`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-cyan-100 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-['Baloo_2',sans-serif]">
                TRÒ CHƠI 5: “BẮN BÓNG VÀO ĐÍCH”
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-medium mt-1">
              <strong className="text-cyan-700">Mục tiêu:</strong> Củng cố toàn diện 4 nhóm kiến thức: Tên đồ dùng, Công dụng, Dấu câu và Giữ gìn đồ dùng.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-800 bg-cyan-50 border border-cyan-200 px-3 py-1.5 rounded-full">
              Bóng {currentIdx + 1} / {GAME5_QUESTIONS.length}
            </span>
            <button
              onClick={handleReplay}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Chơi lại"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden border border-slate-200">
          <div
            className="bg-cyan-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIdx + (isFinished ? 1 : 0)) / GAME5_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          {/* BALL LAUNCHER STAGE */}
          <div className="bg-linear-to-b from-cyan-900 via-sky-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white text-center shadow-lg relative overflow-hidden border-4 border-cyan-400">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 text-xs font-bold">
                <Target className="w-3.5 h-3.5" />
                <span>Nội dung quả bóng đang bay</span>
              </div>

              {/* Glowing Flying Ball */}
              <div
                className={`transition-all duration-500 transform ${
                  isShooting ? '-translate-y-12 scale-75 opacity-75' : 'translate-y-0 scale-100'
                }`}
              >
                <div className="relative inline-block">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-tr from-amber-400 via-orange-400 to-pink-500 text-white flex items-center justify-center text-4xl sm:text-5xl shadow-2xl border-4 border-white/80 animate-bounce">
                    ⚽
                  </div>
                  <div className="absolute -bottom-2 inset-x-0 h-4 bg-black/30 rounded-full blur-xs mx-auto w-16" />
                </div>
              </div>

              {/* Sentence on the Ball */}
              <div className="max-w-xl bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border-2 border-cyan-300/40 shadow-inner">
                <p className="text-xl sm:text-2xl font-black text-amber-200 font-['Baloo_2',sans-serif] tracking-wide leading-relaxed">
                  {currentQ.text}
                </p>
              </div>

              <button
                onClick={handleSpeak}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-800/80 hover:bg-cyan-700 text-cyan-100 text-xs font-bold flex items-center gap-1.5 border border-cyan-400/30"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Nghe đọc câu hỏi</span>
              </button>
            </div>
          </div>

          {/* 4 BASKETS */}
          <div>
            <div className="text-center text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">
              Bấm chọn chiếc giỏ đúng để đưa bóng vào đích:
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {(Object.keys(BASKET_DEFS) as (keyof typeof BASKET_DEFS)[]).map((key) => {
                const b = BASKET_DEFS[key];
                const isSelected = selectedBasketId === key;
                const isCorrectBasket = currentQ.targetBasket === key;

                let cardStyle = 'bg-white hover:bg-slate-50 border-slate-200 hover:border-cyan-400 hover:shadow-md';
                if (selectedBasketId !== null) {
                  if (isCorrectBasket) {
                    cardStyle = 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-200 shadow-lg';
                  } else if (isSelected) {
                    cardStyle = 'bg-rose-50 border-rose-400 ring-4 ring-rose-200';
                  } else {
                    cardStyle = 'opacity-40 bg-slate-50 border-slate-200';
                  }
                }

                return (
                  <button
                    key={key}
                    disabled={selectedBasketId !== null}
                    onClick={() => handleShootBall(key)}
                    className={`p-4 sm:p-5 rounded-3xl border-3 text-center flex flex-col items-center justify-between transition-all transform active:scale-95 cursor-pointer min-h-[170px] ${cardStyle}`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br flex items-center justify-center text-3xl shadow-sm text-white mb-2">
                      {b.icon}
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-black text-slate-900 font-['Baloo_2',sans-serif]">
                        {b.label}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {b.desc}
                      </p>
                    </div>

                    {selectedBasketId !== null && isCorrectBasket && (
                      <span className="mt-2 text-xs font-extrabold text-emerald-700 flex items-center gap-1">
                        <Check className="w-4 h-4 text-emerald-600" />
                        Giỏ chính xác!
                      </span>
                    )}
                    {selectedBasketId !== null && isSelected && !isCorrectBasket && (
                      <span className="mt-2 text-xs font-extrabold text-rose-700 flex items-center gap-1">
                        <X className="w-4 h-4 text-rose-600" />
                        Chưa đúng
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Next Button */}
          {feedback && (
            <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm space-y-4 animate-fadeIn">
              <div
                className={`p-4 rounded-2xl text-sm sm:text-base font-bold ${
                  feedback.isCorrect
                    ? 'bg-emerald-50 text-emerald-950 border border-emerald-300'
                    : 'bg-rose-50 text-rose-950 border border-rose-300'
                }`}
              >
                {feedback.text}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-base flex items-center gap-2 shadow-md hover:shadow-lg transition-transform active:scale-95"
                >
                  <span>
                    {currentIdx + 1 < GAME5_QUESTIONS.length ? 'Quả bóng tiếp theo' : 'Xem kết quả'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* FINISHED SUMMARY */
        <div className="bg-linear-to-r from-cyan-50 via-sky-50 to-indigo-50 rounded-3xl p-6 sm:p-8 border-3 border-cyan-300 shadow-lg text-center space-y-5 animate-scaleIn">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500 text-white text-3xl shadow-inner animate-bounce">
            🎯
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-cyan-950 font-['Baloo_2',sans-serif]">
            BẮN BÓNG VÀO ĐÍCH THÀNH CÔNG!
          </h3>

          <p className="text-base text-slate-700 font-medium">
            Em đã ném trúng giỏ <strong className="text-cyan-700 font-bold text-lg">{correctCount}</strong> / {GAME5_QUESTIONS.length} quả bóng câu hỏi!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left max-w-2xl mx-auto">
            <div className="p-3 bg-white rounded-2xl border border-blue-200 text-xs">
              <span className="font-extrabold text-blue-900 block mb-1">🧺 TÊN ĐỒ DÙNG</span>
              Bút, thước, tẩy, kéo, hồ dán...
            </div>
            <div className="p-3 bg-white rounded-2xl border border-amber-200 text-xs">
              <span className="font-extrabold text-amber-900 block mb-1">🧺 CÔNG DỤNG</span>
              Viết, vẽ, kẻ, xóa, cắt, dán...
            </div>
            <div className="p-3 bg-white rounded-2xl border border-rose-200 text-xs">
              <span className="font-extrabold text-rose-900 block mb-1">🧺 DẤU CÂU</span>
              Kể kết thúc [.], Hỏi kết thúc [?]
            </div>
            <div className="p-3 bg-white rounded-2xl border border-emerald-200 text-xs">
              <span className="font-extrabold text-emerald-900 block mb-1">🧺 GIỮ GÌN</span>
              Cất gọn gàng, bọc bìa, không vẽ bậy
            </div>
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
              onClick={() => onNextGame('game6')}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <span>Vào Đại Trận 6: Giải Cứu Cậu Bé Bút Chì!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
