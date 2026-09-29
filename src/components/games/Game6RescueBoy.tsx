import React, { useState } from 'react';
import { GAME6_DOORS } from '../../data/lessonData';
import { RescueDoor, GameId } from '../../types';
import { playSound, speakVietnamese } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Volume2, ArrowRight, RotateCcw, Lock, Unlock, Sparkles, Award, CheckCircle2, XCircle } from 'lucide-react';

interface Game6RescueBoyProps {
  onComplete: (starsEarned: number) => void;
  onOpenCertificate: () => void;
}

export const Game6RescueBoy: React.FC<Game6RescueBoyProps> = ({ onComplete, onOpenCertificate }) => {
  const [currentDoorIdx, setCurrentDoorIdx] = useState(0);
  const [unlockedDoors, setUnlockedDoors] = useState<number[]>([]);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isRescued, setIsRescued] = useState(false);

  const currentDoor: RescueDoor = GAME6_DOORS[currentDoorIdx];

  const handleSelectOption = (optId: string, isCorrect: boolean) => {
    if (selectedOptId !== null) return;
    setSelectedOptId(optId);

    if (isCorrect) {
      playSound('door_unlock');
      const newUnlocked = [...unlockedDoors, currentDoor.id];
      setUnlockedDoors(newUnlocked);
      setFeedback({
        isCorrect: true,
        text: `🔓 MỞ KHÓA THÀNH CÔNG! ${currentDoor.rewardTip}`
      });

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });

      if (newUnlocked.length === GAME6_DOORS.length) {
        setTimeout(() => {
          setIsRescued(true);
          playSound('fanfare');
          confetti({
            particleCount: 120,
            spread: 100,
            origin: { y: 0.5 }
          });
          onComplete(5);
        }, 1200);
      }
    } else {
      playSound('wrong');
      setFeedback({
        isCorrect: false,
        text: 'Ổ khóa chưa mở được! Em hãy đọc kĩ câu hỏi và thử lại nhé!'
      });
    }
  };

  const handleNextDoor = () => {
    playSound('click');
    if (currentDoorIdx + 1 < GAME6_DOORS.length) {
      setCurrentDoorIdx(prev => prev + 1);
      setSelectedOptId(null);
      setFeedback(null);
    }
  };

  const handleReplay = () => {
    playSound('click');
    setCurrentDoorIdx(0);
    setUnlockedDoors([]);
    setSelectedOptId(null);
    setFeedback(null);
    setIsRescued(false);
  };

  const handleSpeak = () => {
    const text = `${currentDoor.title}. ${currentDoor.question}. Các lựa chọn: ${currentDoor.options.map(o => o.text).join(', ')}`;
    speakVietnamese(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-purple-100 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-['Baloo_2',sans-serif]">
                TRÒ CHƠI 6: “GIẢI CỨU CẬU BÉ BÚT CHÌ”
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-medium mt-1">
              <strong className="text-purple-700">Mục tiêu:</strong> Vượt qua 5 cánh cửa mật mã để giải cứu Cậu bé Bút Chì và vinh danh danh hiệu cao quý!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReplay}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Chơi lại từ đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Doors Progress Tracker */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-5 gap-2">
          {GAME6_DOORS.map((door, idx) => {
            const isUnlocked = unlockedDoors.includes(door.id);
            const isCurrent = currentDoorIdx === idx && !isRescued;

            return (
              <div
                key={door.id}
                className={`py-2 px-1.5 sm:px-2.5 rounded-2xl border-2 text-center transition-all ${
                  isUnlocked
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold'
                    : isCurrent
                    ? 'bg-purple-100 border-purple-500 text-purple-950 font-extrabold ring-2 ring-purple-300 animate-pulse'
                    : 'bg-slate-100 border-slate-200 text-slate-400'
                }`}
              >
                <div className="text-lg sm:text-xl">
                  {isUnlocked ? '🔓' : '🔒'}
                </div>
                <div className="text-[10px] sm:text-xs truncate font-extrabold mt-0.5">
                  Cửa {door.id}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!isRescued ? (
        /* ADVENTURE DOOR CARD */
        <div className="bg-linear-to-b from-purple-900 via-indigo-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border-4 border-purple-400">
          <div className="relative z-10 space-y-6">
            {/* Mascot in cage illustration */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-purple-300/30">
              <div className="flex items-center gap-4">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-amber-400 border-4 border-amber-300 text-slate-900 flex items-center justify-center text-4xl shadow-md transform -rotate-3 animate-pulse">
                  ✏️
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-purple-200 font-extrabold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-300" />
                    <span>Cậu bé Bút Chì đang chờ giải cứu!</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-amber-300 font-['Baloo_2',sans-serif] mt-0.5">
                    {currentDoor.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={handleSpeak}
                className="px-3.5 py-1.5 rounded-xl bg-purple-700/70 hover:bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5 border border-purple-400/30 transition-colors"
              >
                <Volume2 className="w-4 h-4 text-amber-300" />
                <span>Đọc mật mã</span>
              </button>
            </div>

            {/* Question Box */}
            <div className="bg-white/15 backdrop-blur-md p-5 sm:p-6 rounded-2xl border-2 border-purple-300/40 text-center">
              <span className="text-xs text-purple-200 font-semibold block mb-1">
                Câu hỏi mở khóa:
              </span>
              <p className="text-lg sm:text-2xl font-black text-white font-['Baloo_2',sans-serif] leading-relaxed">
                {currentDoor.question}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentDoor.options.map((opt) => {
                const isSelected = selectedOptId === opt.id;
                let optStyle = 'bg-white/10 hover:bg-white/20 text-white border-purple-400/40 hover:border-amber-400';

                if (selectedOptId !== null) {
                  if (opt.isCorrect) {
                    optStyle = 'bg-emerald-500 text-white border-emerald-300 font-black shadow-lg ring-2 ring-emerald-200';
                  } else if (isSelected) {
                    optStyle = 'bg-rose-600 text-white border-rose-400 font-bold';
                  } else {
                    optStyle = 'opacity-40 bg-white/5 border-purple-500/20';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={selectedOptId !== null}
                    onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                    className={`p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base flex items-center justify-between transition-all transform active:scale-95 cursor-pointer ${optStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      {opt.icon && <span className="text-2xl">{opt.icon}</span>}
                      <span>{opt.text}</span>
                    </div>

                    {selectedOptId !== null && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
                    )}
                    {selectedOptId !== null && isSelected && !opt.isCorrect && (
                      <XCircle className="w-5 h-5 text-white shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Advance */}
            {feedback && (
              <div className="space-y-4 pt-3 border-t border-purple-500/40 animate-fadeIn">
                <div
                  className={`p-4 rounded-2xl text-sm sm:text-base font-bold ${
                    feedback.isCorrect
                      ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-200'
                      : 'bg-rose-500/20 border border-rose-400 text-rose-200'
                  }`}
                >
                  {feedback.text}
                </div>

                {feedback.isCorrect && currentDoorIdx + 1 < GAME6_DOORS.length && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleNextDoor}
                      className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm sm:text-base flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
                    >
                      <span>Tiến vào Cánh Cửa {currentDoorIdx + 2}</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {!feedback.isCorrect && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        setSelectedOptId(null);
                        setFeedback(null);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>Thử chọn lại</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* VICTORY FINALE: RESCUE COMPLETE */
        <div className="bg-linear-to-b from-amber-50 via-purple-50 to-amber-50 rounded-3xl p-6 sm:p-10 border-4 border-amber-400 shadow-2xl text-center space-y-6 animate-scaleIn">
          {/* Celebrating Pencil Boy */}
          <div className="relative inline-block">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-linear-to-tr from-amber-400 to-yellow-300 text-slate-900 flex items-center justify-center text-5xl sm:text-6xl shadow-xl border-4 border-white animate-bounce">
              ✏️
            </div>
            <span className="absolute -top-2 -right-2 text-3xl animate-spin">
              ✨
            </span>
          </div>

          <div className="space-y-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
              🎉 5 CÁNH CỬA ĐÃ ĐƯỢC MỞ TOANG!
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-purple-950 font-['Baloo_2',sans-serif] tracking-tight">
              GIẢI CỨU THÀNH CÔNG!
            </h3>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-['Baloo_2',sans-serif]">
              🌟 “EM LÀ CAO THỦ ĐỒ DÙNG HỌC TẬP!” 🌟
            </p>
          </div>

          {/* 4 Pillars Recap */}
          <div className="max-w-2xl mx-auto p-5 bg-white/90 rounded-2xl border-2 border-purple-200 text-left text-xs sm:text-sm text-slate-700 space-y-2 shadow-xs">
            <div className="font-black text-purple-900 text-sm sm:text-base border-b border-purple-100 pb-2">
              👏 Em đã xuất sắc nắm vững 4 trọng tâm của bài học:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>1. Nhận biết:</strong> Đồ dùng học tập phục vụ việc học</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>2. Công dụng:</strong> Viết, kẻ, xóa, cắt, dán</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>3. Dấu câu:</strong> Kể dùng [.], Hỏi dùng [?]</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>4. Giữ gìn:</strong> Cất gọn gàng, nâng niu đồ dùng</span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                playSound('fanfare');
                onOpenCertificate();
              }}
              className="px-7 py-3.5 rounded-2xl bg-linear-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-sm sm:text-base flex items-center gap-2.5 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Award className="w-5 h-5 text-slate-950" />
              <span>Xem & In Bằng Khen Danh Dự 🎖️</span>
            </button>

            <button
              onClick={handleReplay}
              className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi lại chuyến phiêu lưu</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
