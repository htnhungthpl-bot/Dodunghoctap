import React from 'react';
import { playSound } from '../utils/audio';
import { X, BookOpen, CheckCircle, Lightbulb, Sparkles } from 'lucide-react';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-7 shadow-2xl relative border-2 border-emerald-300">
        <button
          onClick={() => { playSound('click'); onClose(); }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-emerald-100 pb-4 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-bold">
            📖
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-emerald-950 font-['Baloo_2',sans-serif]">
              HƯỚNG DẪN GIÁO VIÊN & GIÁO ÁN
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Thiết kế bám sát 4 trọng tâm của tiết học Tiếng Việt / Đạo đức Tiểu học
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* 4 Trọng tâm */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
            <h3 className="font-extrabold text-emerald-950 flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>4 Trọng tâm xuyên suốt tiết học:</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>1. Nhận biết:</strong> Phân biệt đồ dùng học tập với đồ vật trang trí (lọ hoa, bức tranh).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>2. Công dụng:</strong> Nêu rõ chức năng của từng đồ dùng (viết, vẽ, kẻ, xóa, cắt, dán).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>3. Dấu câu:</strong> Bí kíp KỂ dùng dấu chấm [.], HỎI dùng dấu chấm hỏi [?].</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>4. Giữ gìn:</strong> Ý thức cất gọn gàng, bọc sách vở cẩn thận sau giờ học.</span>
              </li>
            </ul>
          </div>

          {/* Gợi ý tiến trình tổ chức 35 phút */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Gợi ý tiến trình tổ chức tiết dạy (35 phút):</span>
            </h3>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-amber-700">1. Khởi động (5 phút):</span> Chiếu <strong>Trò chơi 1: &quot;Ai về đúng nhà?&quot;</strong> để học sinh hào hứng bước vào bài, chốt kiến thức: đồ dùng học tập phục vụ trực tiếp việc học.
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-amber-700">2. Khám phá & Luyện tập (12 phút):</span> Dùng <strong>Trò chơi 2 & 3: &quot;Đồ dùng này làm gì?&quot;</strong> và <strong>&quot;Truyền điện&quot;</strong>. Thầy cô bấm nút truyền điện để kích hoạt sự chú ý của cả lớp, gọi ngẫu nhiên học sinh luyện nói to rõ ràng trước lớp.
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-amber-700">3. Thực hành dấu câu (8 phút):</span> Dùng <strong>Trò chơi 4: &quot;Thám tử dấu câu&quot;</strong>. Nhấn mạnh thần chú &quot;KỂ dùng chấm, HỎI dùng chấm hỏi&quot; và tìm các từ dấu hiệu (ai, gì, nào, có... không).
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-amber-700">4. Vận dụng & Củng cố (10 phút):</span> Tổ chức thi đấu với <strong>Trò chơi 5 & 6</strong>. Khi giải cứu thành công Cậu bé Bút Chì, giáo viên mở Bằng khen danh dự để trao cho lớp hoặc học sinh xuất sắc!
              </div>
            </div>
          </div>

          {/* Mẹo kỹ thuật */}
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Mẹo trình chiếu:</strong> Bấm vào biểu tượng <strong>Toàn màn hình [ ⛶ ]</strong> ở thanh trên cùng để giao diện tràn viền sắc nét khi chiếu lên TV hoặc bảng tương tác thông minh của lớp học.
            </span>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={() => { playSound('click'); onClose(); }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
          >
            Đã hiểu, quay lại trò chơi
          </button>
        </div>
      </div>
    </div>
  );
};
