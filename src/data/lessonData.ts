import { GameInfo, SortItem, QuizQuestion, RelayItem, PunctuationQuestion, BallQuestion, RescueDoor } from '../types';

export const GAMES_INFO: GameInfo[] = [
  {
    id: 'game1',
    title: 'Trò chơi 1: Ai Về Đúng Nhà?',
    shortTitle: 'Ai Về Đúng Nhà',
    badge: 'Kéo thả',
    icon: '🏠',
    description: 'Phân loại đồ dùng học tập và đồ vật khác về 2 ngôi nhà tương ứng.',
    color: 'emerald'
  },
  {
    id: 'game2',
    title: 'Trò chơi 2: Đồ Dùng Này Làm Gì?',
    shortTitle: 'Đồ Dùng Này Làm Gì',
    badge: 'Chọn đáp án',
    icon: '⚡',
    description: 'Nhận biết công dụng tuyệt vời của từng đồ dùng học tập quen thuộc.',
    color: 'amber'
  },
  {
    id: 'game3',
    title: 'Trò chơi 3: Truyền Điện',
    shortTitle: 'Truyền Điện Phản Xạ',
    badge: 'Phản xạ nhanh',
    icon: '🎤',
    description: 'Nói ngay câu: Tên đồ dùng + Công dụng thật nhanh và chính xác!',
    color: 'indigo'
  },
  {
    id: 'game4',
    title: 'Trò chơi 4: Thám Tử Dấu Câu',
    shortTitle: 'Thám Tử Dấu Câu',
    badge: 'Dấu . hay ?',
    icon: '❓',
    description: 'Bí kíp thần chú: KỂ dùng dấu chấm (.) - HỎI dùng dấu chấm hỏi (?)',
    color: 'rose'
  },
  {
    id: 'game5',
    title: 'Trò chơi 5: Bắn Bóng Vào Đích',
    shortTitle: 'Bắn Bóng Vào Đích',
    badge: '4 Chiếc giỏ',
    icon: '🎯',
    description: 'Bắn bóng vào 4 giỏ: Tên đồ dùng, Công dụng, Dấu câu, Giữ gìn.',
    color: 'cyan'
  },
  {
    id: 'game6',
    title: 'Trò chơi 6: Giải Cứu Cậu Bé Bút Chì',
    shortTitle: 'Giải Cứu Bút Chì',
    badge: '5 Cánh cửa bí mật',
    icon: '🏆',
    description: 'Vượt qua 5 ải thử thách để giải cứu Cậu bé Bút Chì và nhận Bằng Khen!',
    color: 'purple'
  }
];

// Game 1: Ai Về Đúng Nhà?
export const GAME1_ITEMS: SortItem[] = [
  {
    id: 'item-pencil',
    name: 'Bút chì',
    icon: '✏️',
    category: 'school_tool',
    hint: 'Dùng để viết, vẽ hình trong giờ học',
    illustrationColor: 'bg-amber-100 border-amber-300 text-amber-900'
  },
  {
    id: 'item-ruler',
    name: 'Thước kẻ',
    icon: '📏',
    category: 'school_tool',
    hint: 'Dùng để đo và kẻ những đoạn thẳng đẹp',
    illustrationColor: 'bg-blue-100 border-blue-300 text-blue-900'
  },
  {
    id: 'item-eraser',
    name: 'Tẩy (Gôm)',
    icon: '🧹',
    category: 'school_tool',
    hint: 'Dùng để xóa nét bút chì khi viết nhầm',
    illustrationColor: 'bg-pink-100 border-pink-300 text-pink-900'
  },
  {
    id: 'item-scissors',
    name: 'Kéo thủ công',
    icon: '✂️',
    category: 'school_tool',
    hint: 'Dùng để cắt giấy trong môn thủ công',
    illustrationColor: 'bg-purple-100 border-purple-300 text-purple-900'
  },
  {
    id: 'item-glue',
    name: 'Hồ dán (Keo)',
    icon: '🧴',
    category: 'school_tool',
    hint: 'Dùng để dán hình, dán giấy thủ công',
    illustrationColor: 'bg-emerald-100 border-emerald-300 text-emerald-900'
  },
  {
    id: 'item-flower-vase',
    name: 'Lọ hoa',
    icon: '🌷',
    category: 'not_school_tool',
    hint: 'Dùng để cắm hoa trang trí phòng khách, không phải để học',
    illustrationColor: 'bg-rose-100 border-rose-300 text-rose-900'
  },
  {
    id: 'item-picture',
    name: 'Bức tranh',
    icon: '🖼️',
    category: 'not_school_tool',
    hint: 'Dùng để treo tường trang trí nhà cửa',
    illustrationColor: 'bg-teal-100 border-teal-300 text-teal-900'
  }
];

// Game 2: Đồ Dùng Này Làm Gì?
export const GAME2_QUESTIONS: QuizQuestion[] = [
  {
    id: 'g2-q1',
    itemIcon: '✏️',
    itemName: 'Bút chì',
    question: 'Bút chì dùng để…',
    options: [
      { id: 'opt-a', text: 'A. Cắm hoa', isCorrect: false },
      { id: 'opt-b', text: 'B. Viết, vẽ', isCorrect: true },
      { id: 'opt-c', text: 'C. Trang trí', isCorrect: false }
    ],
    explanation: 'Chính xác! Bút chì là người bạn thân thiết giúp em viết chữ và vẽ những bức tranh sinh động.'
  },
  {
    id: 'g2-q2',
    itemIcon: '📏',
    itemName: 'Thước kẻ',
    question: 'Thước dùng để…',
    options: [
      { id: 'opt-a', text: 'A. Kẻ', isCorrect: true },
      { id: 'opt-b', text: 'B. Xóa', isCorrect: false },
      { id: 'opt-c', text: 'C. Dán', isCorrect: false }
    ],
    explanation: 'Giỏi lắm! Thước kẻ có các vạch xăng-ti-mét giúp em kẻ đường thẳng tắp và đo độ dài.'
  },
  {
    id: 'g2-q3',
    itemIcon: '🧹',
    itemName: 'Tẩy',
    question: 'Tẩy dùng để…',
    options: [
      { id: 'opt-a', text: 'A. Cắt', isCorrect: false },
      { id: 'opt-b', text: 'B. Xóa', isCorrect: true },
      { id: 'opt-c', text: 'C. Kẻ', isCorrect: false }
    ],
    explanation: 'Đúng rồi! Khi viết hoặc vẽ chì bị sai, cục tẩy mềm mại sẽ giúp em xóa sạch vết chì.'
  },
  {
    id: 'g2-q4',
    itemIcon: '✂️',
    itemName: 'Kéo',
    question: 'Kéo dùng để…',
    options: [
      { id: 'opt-a', text: 'A. Cắt', isCorrect: true },
      { id: 'opt-b', text: 'B. Viết', isCorrect: false },
      { id: 'opt-c', text: 'C. Xóa', isCorrect: false }
    ],
    explanation: 'Rất chuẩn! Kéo thủ công sắc bén giúp chúng mình cắt giấy màu, làm thủ công khéo léo.'
  },
  {
    id: 'g2-q5',
    itemIcon: '🧴',
    itemName: 'Hồ dán',
    question: 'Hồ dán (keo) dùng để…',
    options: [
      { id: 'opt-a', text: 'A. Dán giấy', isCorrect: true },
      { id: 'opt-b', text: 'B. Kẻ nét', isCorrect: false },
      { id: 'opt-c', text: 'C. Lau bảng', isCorrect: false }
    ],
    explanation: 'Tuyệt vời! Hồ dán giúp em dán các mảnh giấy màu lại với nhau thật chắc chắn.'
  }
];

// Game 3: Truyền điện
export const GAME3_ITEMS: RelayItem[] = [
  {
    id: 'relay-1',
    name: 'THƯỚC',
    icon: '📏',
    sampleAnswer: 'Thước dùng để kẻ.',
    hint: 'Gợi ý: Thước dùng để kẻ (hoặc đo).'
  },
  {
    id: 'relay-2',
    name: 'BÚT CHÌ',
    icon: '✏️',
    sampleAnswer: 'Bút chì dùng để viết (hoặc vẽ).',
    hint: 'Gợi ý: Bút chì dùng để viết / Bút chì dùng để vẽ.'
  },
  {
    id: 'relay-3',
    name: 'TẨY',
    icon: '🧹',
    sampleAnswer: 'Tẩy dùng để xóa.',
    hint: 'Gợi ý: Tẩy dùng để xóa nét bút chì.'
  },
  {
    id: 'relay-4',
    name: 'KÉO',
    icon: '✂️',
    sampleAnswer: 'Kéo dùng để cắt.',
    hint: 'Gợi ý: Kéo dùng để cắt giấy thủ công.'
  },
  {
    id: 'relay-5',
    name: 'HỒ DÁN',
    icon: '🧴',
    sampleAnswer: 'Hồ dùng để dán.',
    hint: 'Gợi ý: Hồ dùng để dán giấy.'
  },
  {
    id: 'relay-6',
    name: 'HỘP BÚT',
    icon: '👝',
    sampleAnswer: 'Hộp bút dùng để đựng bút và thước.',
    hint: 'Gợi ý: Hộp bút dùng để đựng đồ dùng gọn gàng.'
  },
  {
    id: 'relay-7',
    name: 'CẶP SÁCH',
    icon: '🎒',
    sampleAnswer: 'Cặp sách dùng để đựng sách vở.',
    hint: 'Gợi ý: Cặp sách dùng để đựng sách vở đến trường.'
  },
  {
    id: 'relay-8',
    name: 'BÚT MỰC',
    icon: '✒️',
    sampleAnswer: 'Bút mực dùng để viết chữ.',
    hint: 'Gợi ý: Bút mực dùng để rèn chữ đẹp.'
  }
];

// Game 4: Thám Tử Dấu Câu
export const GAME4_QUESTIONS: PunctuationQuestion[] = [
  {
    id: 'g4-q1',
    sentenceBefore: 'Bút chì dùng để vẽ',
    correctMark: '.',
    type: 'statement',
    explanation: 'Đây là câu kể (giới thiệu công dụng của bút chì), kết thúc bằng dấu chấm (.)'
  },
  {
    id: 'g4-q2',
    sentenceBefore: 'Bạn có chiếc thước nào',
    correctMark: '?',
    type: 'question',
    clueWord: 'nào',
    explanation: 'Câu có từ hỏi "nào" để hỏi bạn, nên cuối câu phải đặt dấu chấm hỏi (?)'
  },
  {
    id: 'g4-q3',
    sentenceBefore: 'Tớ rất yêu chiếc cặp của mình',
    correctMark: '.',
    type: 'statement',
    explanation: 'Đây là câu kể bộc lộ tình cảm với chiếc cặp, kết thúc bằng dấu chấm (.)'
  },
  {
    id: 'g4-q4',
    sentenceBefore: 'Bạn có giữ gìn đồ dùng học tập không',
    correctMark: '?',
    type: 'question',
    clueWord: 'có... không',
    explanation: 'Câu có cặp từ hỏi "có... không?" dùng để hỏi bạn, cuối câu đặt dấu chấm hỏi (?)'
  },
  {
    id: 'g4-q5',
    sentenceBefore: 'Ai tặng bạn chiếc compa này',
    correctMark: '?',
    type: 'question',
    clueWord: 'Ai',
    explanation: 'Câu có từ để hỏi "Ai", cuối câu phải đặt dấu chấm hỏi (?)'
  },
  {
    id: 'g4-q6',
    sentenceBefore: 'Sau giờ học, em cất thước và bút cẩn thận',
    correctMark: '.',
    type: 'statement',
    explanation: 'Đây là câu kể lại hành động giữ gìn đồ dùng, cuối câu đặt dấu chấm (.)'
  }
];

// Game 5: Bắn Bóng Vào Đích
export const BASKET_DEFS = {
  item_name: {
    id: 'item_name',
    label: 'TÊN ĐỒ DÙNG',
    icon: '🧺',
    color: 'from-blue-500 to-indigo-600',
    border: 'border-blue-400',
    desc: 'Liệt kê tên gọi các đồ vật'
  },
  purpose: {
    id: 'purpose',
    label: 'CÔNG DỤNG',
    icon: '🧺',
    color: 'from-amber-500 to-orange-600',
    border: 'border-amber-400',
    desc: 'Nói về việc đồ dùng làm được gì'
  },
  punctuation: {
    id: 'punctuation',
    label: 'DẤU CÂU',
    icon: '🧺',
    color: 'from-rose-500 to-pink-600',
    border: 'border-rose-400',
    desc: 'Câu hỏi hoặc câu gắn với dấu chấm/hỏi'
  },
  preservation: {
    id: 'preservation',
    label: 'GIỮ GÌN',
    icon: '🧺',
    color: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-400',
    desc: 'Ý thức bảo quản, chăm sóc đồ dùng'
  }
};

export const GAME5_QUESTIONS: BallQuestion[] = [
  {
    id: 'b-1',
    text: '“Thước dùng để kẻ.”',
    targetBasket: 'purpose',
    hint: 'Câu này nói về chức năng, tác dụng của chiếc thước kẻ.'
  },
  {
    id: 'b-2',
    text: '“Bạn có chiếc bút chì không?”',
    targetBasket: 'punctuation',
    hint: 'Đây là một câu hỏi có từ "không" và kết thúc bằng dấu chấm hỏi.'
  },
  {
    id: 'b-3',
    text: '“Bút chì, thước, tẩy...”',
    targetBasket: 'item_name',
    hint: 'Đây là danh sách kể tên các đồ dùng học tập quen thuộc.'
  },
  {
    id: 'b-4',
    text: '“Cất sách vở đúng chỗ.”',
    targetBasket: 'preservation',
    hint: 'Đây là hành động ngoan giúp bảo quản, giữ gìn đồ dùng ngăn nắp.'
  },
  {
    id: 'b-5',
    text: '“Bọc bìa và dán nhãn vở cẩn thận.”',
    targetBasket: 'preservation',
    hint: 'Hành động bảo vệ sách vở không bị rách, quăn mép.'
  },
  {
    id: 'b-6',
    text: '“Hồ dùng để dán giấy thủ công.”',
    targetBasket: 'purpose',
    hint: 'Nêu công dụng dán của lọ hồ.'
  },
  {
    id: 'b-7',
    text: '“Hộp bút, compa, kéo, bảng con.”',
    targetBasket: 'item_name',
    hint: 'Liệt kê tên gọi các đồ dùng trong cặp sách.'
  },
  {
    id: 'b-8',
    text: '“Ai làm rơi cục tẩy ở góc bàn?”',
    targetBasket: 'punctuation',
    hint: 'Một câu hỏi cần đặt dấu chấm hỏi ở cuối câu.'
  }
];

// Game 6: Giải Cứu Cậu Bé Bút Chì (5 Doors)
export const GAME6_DOORS: RescueDoor[] = [
  {
    id: 1,
    title: '🔐 Cánh cửa 1: Nhận diện đồ dùng học tập',
    question: 'Đâu là đồ dùng học tập trong các món dưới đây?',
    options: [
      { id: 'd1-a', text: 'Chiếc gối ngủ', icon: '🛏️', isCorrect: false },
      { id: 'd1-b', text: 'Thước kẻ học sinh', icon: '📏', isCorrect: true },
      { id: 'd1-c', text: 'Nồi cơm điện', icon: '🍲', isCorrect: false },
      { id: 'd1-d', text: 'Bức tranh phong cảnh', icon: '🖼️', isCorrect: false }
    ],
    rewardTip: 'Chúc mừng em! Thước kẻ là đồ dùng học tập phục vụ em đo và kẻ bài!'
  },
  {
    id: 2,
    title: '🔐 Cánh cửa 2: Công dụng của Bút chì',
    question: 'Bút chì dùng để làm gì trong học tập?',
    options: [
      { id: 'd2-a', text: 'Dùng để viết chữ và vẽ tranh', icon: '✏️', isCorrect: true },
      { id: 'd2-b', text: 'Dùng để cắt dán giấy màu', icon: '✂️', isCorrect: false },
      { id: 'd2-c', text: 'Dùng để cắm hoa trang trí', icon: '🌷', isCorrect: false },
      { id: 'd2-d', text: 'Dùng để gõ trống', icon: '🥁', isCorrect: false }
    ],
    rewardTip: 'Rất chính xác! Cậu bé Bút Chì cảm ơn em đã nhớ đúng công dụng viết và vẽ!'
  },
  {
    id: 3,
    title: '🔐 Cánh cửa 3: Thử thách điền dấu câu',
    question: 'Em hãy chọn dấu câu thích hợp cho ô trống: "Hộp bút của bạn màu gì □"',
    options: [
      { id: 'd3-a', text: 'Dấu chấm hỏi (?)', icon: '❓', isCorrect: true },
      { id: 'd3-b', text: 'Dấu chấm (.)', icon: '⚪', isCorrect: false },
      { id: 'd3-c', text: 'Dấu chấm than (!)', icon: '❗', isCorrect: false }
    ],
    rewardTip: 'Đúng rồi! Vì câu có từ hỏi "màu gì" nên bắt buộc dùng dấu chấm hỏi (?)'
  },
  {
    id: 4,
    title: '🔐 Cánh cửa 4: Tìm câu hỏi chuẩn xác',
    question: 'Trong các câu sau, câu nào là câu hỏi?',
    options: [
      { id: 'd4-a', text: 'Tớ có một chiếc cặp màu xanh rất đẹp.', icon: '🎒', isCorrect: false },
      { id: 'd4-b', text: 'Bạn có mang theo thước kẻ không?', icon: '📏', isCorrect: true },
      { id: 'd4-c', text: 'Em cất sách vở ngay ngắn sau khi học.', icon: '📚', isCorrect: false }
    ],
    rewardTip: 'Tuyệt đỉnh! Câu hỏi là câu có ý hỏi và kết thúc bằng dấu chấm hỏi!'
  },
  {
    id: 5,
    title: '🔐 Cánh cửa 5: Bí quyết giữ gìn đồ dùng',
    question: 'Hành động nào giúp em giữ gìn đồ dùng học tập luôn bền đẹp?',
    options: [
      { id: 'd5-a', text: 'Dùng xong cất gọn gàng vào hộp bút và cặp sách', icon: '✨', isCorrect: true },
      { id: 'd5-b', text: 'Dùng bút chì gạch vẽ bậy lên mặt bàn', icon: '❌', isCorrect: false },
      { id: 'd5-c', text: 'Vứt cặp sách và thước xuống đất cát', icon: '⚠️', isCorrect: false }
    ],
    rewardTip: 'Xuất sắc! Cánh cửa cuối cùng đã mở ra! Cậu bé Bút Chì được tự do!'
  }
];
