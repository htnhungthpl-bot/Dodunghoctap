import React, { useState } from 'react';
import { playSound } from '../utils/audio';
import { X, Printer, Award, Sparkles, Star } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalStars: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose, totalStars }) => {
  const [studentName, setStudentName] = useState('Nguyễn Văn An');
  const [studentClass, setStudentClass] = useState('Lớp 1A');
  const [schoolName, setSchoolName] = useState('Trường Tiểu Học Thân Yêu');

  if (!isOpen) return null;

  const handlePrint = () => {
    playSound('click');
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-8 shadow-2xl relative border-4 border-amber-300">
        {/* Close Button */}
        <button
          onClick={() => { playSound('click'); onClose(); }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors print:hidden"
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Input Controls for Teacher / Student */}
        <div className="mb-6 p-3.5 bg-amber-50 rounded-2xl border border-amber-200 print:hidden text-xs sm:text-sm text-slate-700 space-y-2">
          <div className="font-extrabold text-amber-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Nhập thông tin học sinh để in bằng khen:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Họ và tên em:</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 focus:outline-amber-500 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Lớp học:</label>
              <input
                type="text"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 focus:outline-amber-500 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Tên trường:</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 focus:outline-amber-500 text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* CERTIFICATE CANVAS TO PRINT */}
        <div className="bg-linear-to-b from-amber-50/60 via-white to-amber-50/60 border-8 border-double border-amber-500 rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-inner print:border-amber-600 print:shadow-none">
          {/* Corner ornaments */}
          <div className="absolute top-2 left-2 text-2xl text-amber-500 opacity-60">⚜️</div>
          <div className="absolute top-2 right-2 text-2xl text-amber-500 opacity-60">⚜️</div>
          <div className="absolute bottom-2 left-2 text-2xl text-amber-500 opacity-60">⚜️</div>
          <div className="absolute bottom-2 right-2 text-2xl text-amber-500 opacity-60">⚜️</div>

          <div className="space-y-4">
            <div className="text-xs uppercase tracking-widest font-black text-amber-800">
              {schoolName}
            </div>

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-400 text-amber-950 text-2xl shadow-md border-2 border-amber-300">
              🎖️
            </div>

            <div>
              <h2 className="text-2xl sm:text-4xl font-black text-red-600 uppercase tracking-wide font-['Baloo_2',sans-serif]">
                GIẤY KHEN DANH DỰ
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-bold uppercase tracking-wider mt-0.5">
                DANH HIỆU CAO THỦ ĐỒ DÙNG HỌC TẬP
              </p>
            </div>

            <div className="py-2 text-slate-700 text-sm sm:text-base space-y-1">
              <div>Khen tặng em:</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-900 underline decoration-amber-400 decoration-wavy font-['Baloo_2',sans-serif]">
                {studentName || 'Học sinh xuất sắc'}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-600">
                {studentClass} • {schoolName}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
              Đã hoàn thành xuất sắc <strong>6 Trò Chơi Tương Tác</strong>, giải cứu thành công Cậu Bé Bút Chì, nắm vững kiến thức nhận biết, công dụng, dấu câu và ý thức giữ gìn đồ dùng học tập.
            </p>

            {/* Seals & Signatures */}
            <div className="pt-4 flex items-center justify-between text-xs text-slate-600 px-4 sm:px-8 border-t border-amber-200">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-amber-600 font-extrabold text-sm mb-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{totalStars} Sao Đạt Được</span>
                </div>
                <div className="text-[10px] text-slate-400">Thành tích học tập</div>
              </div>

              {/* Red Stamp Seal */}
              <div className="w-20 h-20 rounded-full border-3 border-dashed border-red-600 text-red-600 flex flex-col items-center justify-center text-[10px] font-black uppercase rotate-6 shadow-xs bg-red-50/50">
                <span>TIỂU HỌC</span>
                <span className="text-xs">CHUẨN</span>
                <span>⭐ ⭐ ⭐</span>
              </div>

              <div className="text-center">
                <div className="text-[11px] text-slate-500">Ngày {currentDate}</div>
                <div className="font-extrabold text-slate-800 text-xs sm:text-sm mt-1">Giáo Viên Chủ Nhiệm</div>
                <div className="text-[11px] text-slate-400 italic mt-3">(Đã ký khen)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bottom */}
        <div className="mt-5 flex items-center justify-end gap-3 print:hidden">
          <button
            onClick={() => { playSound('click'); onClose(); }}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            Đóng lại
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-transform active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>In Bằng Khen Này</span>
          </button>
        </div>
      </div>
    </div>
  );
};
