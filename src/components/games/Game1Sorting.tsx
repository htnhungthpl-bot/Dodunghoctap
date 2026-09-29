import React, { useState } from 'react';
import { GAME1_ITEMS } from '../../data/lessonData';
import { SortItem, GameId } from '../../types';
import { playSound, speakVietnamese } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Volume2, RotateCcw, CheckCircle2, ArrowRight, Sparkles, Lightbulb } from 'lucide-react';

interface Game1SortingProps {
  onComplete: (starsEarned: number) => void;
  onNextGame: (nextGameId: GameId) => void;
}

export const Game1Sorting: React.FC<Game1SortingProps> = ({ onComplete, onNextGame }) => {
  // Items placed in School House
  const [schoolHouseItems, setSchoolHouseItems] = useState<SortItem[]>([]);
  // Items placed in Not School House
  const [notSchoolHouseItems, setNotSchoolHouseItems] = useState<SortItem[]>([]);
  // Remaining items to place
  const [remainingItems, setRemainingItems] = useState<SortItem[]>(GAME1_ITEMS);
  // Selected item for click-to-move accessibility
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  // Feedback message
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);
  // Completion status
  const [isCompleted, setIsCompleted] = useState(false);
  const [starsGiven, setStarsGiven] = useState(false);

  // Check if all placed correctly
  const handleItemPlacement = (item: SortItem, targetCategory: 'school_tool' | 'not_school_tool') => {
    if (item.category === targetCategory) {
      playSound('correct');
      setFeedback({
        text: `Đúng rồi! ${item.name} đã về đúng ngôi nhà! ⭐`,
        isCorrect: true
      });

      // Remove from remaining
      const newRemaining = remainingItems.filter(i => i.id !== item.id);
      setRemainingItems(newRemaining);

      if (targetCategory === 'school_tool') {
        const updatedSchool = [...schoolHouseItems, item];
        setSchoolHouseItems(updatedSchool);
        checkFinished(newRemaining, updatedSchool, notSchoolHouseItems);
      } else {
        const updatedNotSchool = [...notSchoolHouseItems, item];
        setNotSchoolHouseItems(updatedNotSchool);
        checkFinished(newRemaining, schoolHouseItems, updatedNotSchool);
      }
    } else {
      playSound('wrong');
      const correctPlaceName = item.category === 'school_tool' ? 'ĐỒ DÙNG HỌC TẬP' : 'KHÔNG PHẢI ĐỒ DÙNG HỌC TẬP';
      setFeedback({
        text: `Ôi chưa đúng rồi! ${item.name} ${item.hint}. Đồ vật này thuộc về nhà "${correctPlaceName}" nhé!`,
        isCorrect: false
      });
    }
    setSelectedItemId(null);
  };

  const checkFinished = (rem: SortItem[], _school: SortItem[], _notSchool: SortItem[]) => {
    if (rem.length === 0) {
      setIsCompleted(true);
      playSound('fanfare');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (!starsGiven) {
        onComplete(3);
        setStarsGiven(true);
      }
    }
  };

  const handleReset = () => {
    playSound('click');
    setSchoolHouseItems([]);
    setNotSchoolHouseItems([]);
    setRemainingItems(GAME1_ITEMS);
    setSelectedItemId(null);
    setFeedback(null);
    setIsCompleted(false);
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, item: SortItem) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  const handleDrop = (e: React.DragEvent, targetCategory: 'school_tool' | 'not_school_tool') => {
    e.preventDefault();
    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (dataStr) {
        const item: SortItem = JSON.parse(dataStr);
        handleItemPlacement(item, targetCategory);
      }
    } catch {
      // Fallback
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const selectedItem = remainingItems.find(i => i.id === selectedItemId);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title & Goal banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-100 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-['Baloo_2',sans-serif]">
                TRÒ CHƠI 1: “AI VỀ ĐÚNG NHÀ?”
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-medium mt-1">
              <strong className="text-emerald-700">Mục tiêu:</strong> Nhận biết đồ dùng học tập phục vụ cho việc học và phân biệt với đồ vật khác.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => speakVietnamese('Trò chơi 1: Ai về đúng nhà? Các em hãy kéo từng đồ vật về đúng ngôi nhà phù hợp nhé!')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold transition-colors"
              title="Nghe hướng dẫn"
            >
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span>Nghe đề bài</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-colors"
              title="Chơi lại từ đầu"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi lại</span>
            </button>
          </div>
        </div>

        {/* Tip / Instruction */}
        <div className="mt-3 py-2 px-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Cách chơi:</strong> Kéo thả hoặc bấm chọn đồ vật ở phía dưới, sau đó bấm chọn ngôi nhà tương ứng để đưa đồ vật về nhà!
          </span>
        </div>
      </div>

      {/* 2 HOUSES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* House 1: ĐỒ DÙNG HỌC TẬP */}
        <div
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'school_tool')}
          className={`relative rounded-3xl p-5 border-4 transition-all duration-300 min-h-[290px] flex flex-col justify-between ${
            selectedItem
              ? 'border-emerald-400 bg-emerald-50/70 shadow-md ring-4 ring-emerald-200/50'
              : 'border-emerald-300 bg-linear-to-b from-emerald-50 to-white shadow-sm'
          }`}
        >
          {/* House Roof Decoration */}
          <div>
            <div className="flex items-center justify-between border-b border-emerald-200 pb-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl filter drop-shadow-sm">🏠</span>
                <div>
                  <h3 className="text-lg font-black text-emerald-900 font-['Baloo_2',sans-serif]">
                    ĐỒ DÙNG HỌC TẬP
                  </h3>
                  <span className="text-xs text-emerald-700 font-semibold">
                    Phục vụ cho việc học ({schoolHouseItems.length}/5)
                  </span>
                </div>
              </div>
              {schoolHouseItems.length === 5 && (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
              )}
            </div>

            {/* Dropped items list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 min-h-[140px] p-2 bg-white/70 rounded-2xl border border-dashed border-emerald-300">
              {schoolHouseItems.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center text-slate-400 py-6 text-xs text-center font-medium">
                  <span>Kéo đồ dùng học tập vào đây</span>
                  <span className="text-[11px] text-slate-400 mt-1">(Bút chì, thước, tẩy, kéo, hồ...)</span>
                </div>
              ) : (
                schoolHouseItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-emerald-100/80 border border-emerald-300 text-center animate-scaleIn flex flex-col items-center shadow-xs"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-bold text-emerald-900 mt-1">{item.name}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Click-to-Move Button for Accessibility */}
          {selectedItem && (
            <button
              onClick={() => handleItemPlacement(selectedItem, 'school_tool')}
              className="mt-3 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md text-xs sm:text-sm flex items-center justify-center gap-2 animate-bounce transition-colors"
            >
              <span>Đưa &quot;{selectedItem.name}&quot; vào ngôi nhà này ➔</span>
            </button>
          )}
        </div>

        {/* House 2: KHÔNG PHẢI ĐỒ DÙNG HỌC TẬP */}
        <div
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'not_school_tool')}
          className={`relative rounded-3xl p-5 border-4 transition-all duration-300 min-h-[290px] flex flex-col justify-between ${
            selectedItem
              ? 'border-purple-400 bg-purple-50/70 shadow-md ring-4 ring-purple-200/50'
              : 'border-purple-300 bg-linear-to-b from-purple-50 to-white shadow-sm'
          }`}
        >
          {/* House Roof Decoration */}
          <div>
            <div className="flex items-center justify-between border-b border-purple-200 pb-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl filter drop-shadow-sm">🏡</span>
                <div>
                  <h3 className="text-lg font-black text-purple-900 font-['Baloo_2',sans-serif]">
                    KHÔNG PHẢI ĐỒ DÙNG HỌC TẬP
                  </h3>
                  <span className="text-xs text-purple-700 font-semibold">
                    Đồ trang trí / đồ khác ({notSchoolHouseItems.length}/2)
                  </span>
                </div>
              </div>
              {notSchoolHouseItems.length === 2 && (
                <CheckCircle2 className="w-6 h-6 text-purple-600 fill-purple-100" />
              )}
            </div>

            {/* Dropped items list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 min-h-[140px] p-2 bg-white/70 rounded-2xl border border-dashed border-purple-300">
              {notSchoolHouseItems.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center text-slate-400 py-6 text-xs text-center font-medium">
                  <span>Kéo đồ vật không phải học tập vào đây</span>
                  <span className="text-[11px] text-slate-400 mt-1">(Lọ hoa, bức tranh...)</span>
                </div>
              ) : (
                notSchoolHouseItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-purple-100/80 border border-purple-300 text-center animate-scaleIn flex flex-col items-center shadow-xs"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-bold text-purple-900 mt-1">{item.name}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Click-to-Move Button for Accessibility */}
          {selectedItem && (
            <button
              onClick={() => handleItemPlacement(selectedItem, 'not_school_tool')}
              className="mt-3 w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-xl shadow-md text-xs sm:text-sm flex items-center justify-center gap-2 animate-bounce transition-colors"
            >
              <span>Đưa &quot;{selectedItem.name}&quot; vào ngôi nhà này ➔</span>
            </button>
          )}
        </div>
      </div>

      {/* FEEDBACK BANNER */}
      {feedback && (
        <div
          className={`p-3.5 rounded-2xl text-center text-sm font-bold border transition-all animate-fadeIn ${
            feedback.isCorrect
              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
              : 'bg-rose-100 text-rose-900 border-rose-300'
          }`}
        >
          {feedback.text}
        </div>
      )}

      {/* REMAINING ITEMS TO DRAG/CHOOSE */}
      {!isCompleted && (
        <div className="bg-white rounded-3xl p-5 border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span>📦</span>
              <span>Các đồ vật cần phân loại ({remainingItems.length} món còn lại)</span>
            </h3>
            <span className="text-xs text-amber-700 font-medium hidden sm:inline">
              Bấm chọn hoặc kéo thả vào nhà tương ứng
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {remainingItems.map((item) => {
              const isSelected = selectedItemId === item.id;
              return (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onClick={() => {
                    playSound('click');
                    setSelectedItemId(isSelected ? null : item.id);
                  }}
                  className={`cursor-pointer p-3 rounded-2xl border-2 transition-all transform flex flex-col items-center text-center select-none active:scale-95 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-100 shadow-md -translate-y-1 ring-2 ring-amber-400'
                      : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-amber-300 hover:shadow-xs'
                  }`}
                >
                  <span className="text-3xl sm:text-4xl mb-1 filter drop-shadow-xs transition-transform hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    {isSelected ? 'Đang chọn' : 'Kéo / Chạm'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* LESSON WRAP-UP & VICTORY MODAL / CARD */}
      {isCompleted && (
        <div className="bg-linear-to-r from-amber-50 via-emerald-50 to-amber-50 rounded-3xl p-6 sm:p-8 border-3 border-amber-300 shadow-lg text-center space-y-4 animate-scaleIn">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-400 text-amber-900 text-3xl shadow-inner animate-bounce">
            🌟
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-amber-900 font-['Baloo_2',sans-serif]">
            XUẤT SẮC! CÁC ĐỒ VẬT ĐÃ VỀ ĐÚNG NHÀ!
          </h3>

          {/* Core lesson point from teacher's guide */}
          <div className="max-w-2xl mx-auto p-4 bg-white/90 rounded-2xl border-2 border-emerald-300 text-left shadow-xs">
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">🎯</span>
              <div>
                <h4 className="text-base font-extrabold text-emerald-900 mb-1">
                  CHỐT KIẾN THỨC CỐT LÕI
                </h4>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                  <strong>Đồ dùng học tập</strong> là những đồ dùng trực tiếp phục vụ cho việc học tập (như bút chì, thước, tẩy, kéo, hồ dán).
                  <br />
                  <span className="text-purple-700 font-bold">Lọ hoa</span> và <span className="text-purple-700 font-bold">bức tranh</span> là đồ trang trí phòng, không phải là đồ dùng học tập!
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => speakVietnamese('Chốt bài học: Đồ dùng học tập là những đồ dùng phục vụ cho việc học. Lọ hoa và bức tranh là đồ trang trí, không phải đồ dùng học tập.')}
              className="px-4 py-2.5 rounded-xl bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-50 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-colors"
            >
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span>Nghe đọc chốt bài</span>
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi lại vòng này</span>
            </button>

            <button
              onClick={() => onNextGame('game2')}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>Sang Trò Chơi 2: Đồ Dùng Này Làm Gì?</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
