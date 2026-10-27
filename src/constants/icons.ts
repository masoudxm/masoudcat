export interface SvgIconDef {
  id: string;
  name: string;
  category: 'industry' | 'commerce' | 'badges' | 'contact' | 'tech' | 'lifestyle';
  tags: string[];
  svg: string; // inner svg paths and elements for a 24x24 viewBox
}

export const ICON_CATEGORIES = [
  { id: 'all', label: 'همه آیکون‌ها' },
  { id: 'industry', label: 'صنعت، ابزار و ساخت' },
  { id: 'commerce', label: 'تجارت، خرید و تخفیف' },
  { id: 'badges', label: 'کیفیت، مدال و گارانتی' },
  { id: 'contact', label: 'تماس، ارسال و آدرس' },
  { id: 'tech', label: 'فناوری، دقت و انرژی' },
  { id: 'lifestyle', label: 'دیزاین و عمومی' },
];

export const SVG_ICONS: SvgIconDef[] = [
  // --- Industry & Tools ---
  {
    id: 'wrench',
    name: 'آچار و تعمیرات',
    category: 'industry',
    tags: ['ابزار', 'تعمیر', 'سرویس', 'کارگاه', 'tool', 'wrench'],
    svg: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  },
  {
    id: 'hammer',
    name: 'چکش و نجاری',
    category: 'industry',
    tags: ['چکش', 'ابزار', 'ساخت', 'کارگاه', 'نجاری'],
    svg: '<path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 3.26-6.36 6.36a2 2 0 0 0 0 2.83l.88.88a2 2 0 0 0 2.83 0l6.36-6.36c.6-.6.7-1.53.24-2.24l-1.71-1.71c-.71-.46-1.64-.36-2.24.24z"/>',
  },
  {
    id: 'axe',
    name: 'تبر و برش چوب',
    category: 'industry',
    tags: ['تبر', 'چوب', 'برش', 'درخت'],
    svg: '<path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"/><path d="M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 7z"/>',
  },
  {
    id: 'cog',
    name: 'چرخ‌دنده صنعتی',
    category: 'industry',
    tags: ['چرخدنده', 'موتور', 'ماشین', 'تنظیمات', 'مکانیزم'],
    svg: '<path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  },
  {
    id: 'factory',
    name: 'کارخانه و تولیدی',
    category: 'industry',
    tags: ['کارخانه', 'تولید', 'صنعت', 'سوله', 'ساختمان'],
    svg: '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>',
  },
  {
    id: 'ruler',
    name: 'خط‌کش و اندازه‌گیری دقیق',
    category: 'industry',
    tags: ['خطکش', 'متر', 'اندازه', 'دقت', 'مهندسی'],
    svg: '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/>',
  },
  {
    id: 'box',
    name: 'بسته‌بندی و پکیج',
    category: 'industry',
    tags: ['بسته', 'کارتن', 'انبار', 'جعبه', 'ارسال'],
    svg: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  },
  {
    id: 'drill',
    name: 'دریل و سوراخ‌کاری',
    category: 'industry',
    tags: ['دریل', 'سوراخ', 'ابزار برقی', 'پیچ'],
    svg: '<path d="M14 9a2 2 0 0 1-2 2H6l-4 4v4h4l4-4h2a2 2 0 0 1 2-2"/><path d="M18 4h4v4h-4z"/><path d="M14 6h4v4h-4z"/>',
  },

  // --- Commerce, Shopping & Discounts ---
  {
    id: 'tag',
    name: 'برچسب قیمت و آفر',
    category: 'commerce',
    tags: ['قیمت', 'تخفیف', 'آفر', 'فروش', 'پیشنهاد'],
    svg: '<path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><circle cx="7" cy="7" r="1.5"/>',
  },
  {
    id: 'percent',
    name: 'تخفیف درصدی',
    category: 'commerce',
    tags: ['تخفیف', 'درصد', 'آفر', 'ویژه', 'حراج'],
    svg: '<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  },
  {
    id: 'shopping-cart',
    name: 'سبد خرید',
    category: 'commerce',
    tags: ['سبد', 'خرید', 'فروشگاه', 'سفارش'],
    svg: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  },
  {
    id: 'shopping-bag',
    name: 'ساک و بسته خرید',
    category: 'commerce',
    tags: ['خرید', 'پاکت', 'بگ', 'فروشگاه'],
    svg: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  },
  {
    id: 'badge-percent',
    name: 'مدال تخفیف ویژه',
    category: 'commerce',
    tags: ['تخفیف', 'مدال', 'آفر', 'جشنواره'],
    svg: '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="15" x2="9" y1="9" y2="15"/><circle cx="9" cy="9" r="0.5"/><circle cx="15" cy="15" r="0.5"/>',
  },
  {
    id: 'credit-card',
    name: 'کارت بانکی و پرداخت اقساط',
    category: 'commerce',
    tags: ['کارت', 'بانک', 'اقساط', 'پرداخت', 'پول'],
    svg: '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
  },
  {
    id: 'receipt',
    name: 'فاکتور و پیش‌فاکتور',
    category: 'commerce',
    tags: ['فاکتور', 'حسابداری', 'قیمت', 'رسید'],
    svg: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h6"/>',
  },

  // --- Quality, Badges & Guarantees ---
  {
    id: 'shield-check',
    name: 'گارانتی و تضمین کیفیت',
    category: 'badges',
    tags: ['گارانتی', 'ضمانت', 'امنیت', 'کیفیت', 'بیمه'],
    svg: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  },
  {
    id: 'award',
    name: 'نشان افتخار و مدال طلایی',
    category: 'badges',
    tags: ['مدال', 'افتخار', 'رتبه', 'برتر', 'لوح'],
    svg: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  },
  {
    id: 'star',
    name: 'ستاره برتر ۵ ستاره',
    category: 'badges',
    tags: ['ستاره', 'ممتاز', 'عالی', 'برگزیده', 'محبوب'],
    svg: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  },
  {
    id: 'check-circle-2',
    name: 'تاییدیه رسمی و استاندارد',
    category: 'badges',
    tags: ['تایید', 'استاندارد', 'صحت', 'ایزو', 'قبول'],
    svg: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  },
  {
    id: 'sparkles',
    name: 'محصول درخشان و جدید',
    category: 'badges',
    tags: ['ستاره', 'جدید', 'لوکس', 'درخشان', 'ویژه'],
    svg: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>',
  },
  {
    id: 'crown',
    name: 'تاج سلطنتی و کالکشن VIP',
    category: 'badges',
    tags: ['تاج', 'لوکس', 'لاکچری', 'سلطنتی', 'vip'],
    svg: '<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.735H5.81a1 1 0 0 1-.957-.735L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>',
  },
  {
    id: 'flame',
    name: 'محصول داغ و پرفروش',
    category: 'badges',
    tags: ['آتش', 'داغ', 'پرفروش', 'ترند', 'محبوب'],
    svg: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  },
  {
    id: 'thumbs-up',
    name: 'رضایت ۱۰۰٪ مشتریان',
    category: 'badges',
    tags: ['پسندیده', 'عالی', 'توصیه', 'لایک', 'رضایت'],
    svg: '<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3"/>',
  },

  // --- Contact, Shipping & Services ---
  {
    id: 'truck',
    name: 'حمل و نقل و ارسال فوری',
    category: 'contact',
    tags: ['کامیون', 'ارسال', 'پیک', 'پست', 'تحویل'],
    svg: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18.5" r="2.5"/><circle cx="7" cy="18.5" r="2.5"/>',
  },
  {
    id: 'clock',
    name: 'پشتیبانی ۲۴ ساعته',
    category: 'contact',
    tags: ['ساعت', 'زمان', 'سرعت', 'پشتیبانی', 'شبانه روزی'],
    svg: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  },
  {
    id: 'phone',
    name: 'تلفن تماس و مشاوره',
    category: 'contact',
    tags: ['تلفن', 'تماس', 'پشتیبانی', 'ارتباط'],
    svg: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  },
  {
    id: 'headphones',
    name: 'مرکز تماس و هدست اپراتور',
    category: 'contact',
    tags: ['هدست', 'پشتیبان', 'مشاور', 'پاسخگویی'],
    svg: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
  },
  {
    id: 'map-pin',
    name: 'آدرس کارخانه و لوکیشن',
    category: 'contact',
    tags: ['مکان', 'لوکیشن', 'آدرس', 'نقشه', 'کارخانه'],
    svg: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  },
  {
    id: 'mail',
    name: 'ایمیل و پیام',
    category: 'contact',
    tags: ['ایمیل', 'نامه', 'پیام', 'مکاتبه'],
    svg: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  },
  {
    id: 'globe',
    name: 'وب‌سایت و صادرات بین‌المللی',
    category: 'contact',
    tags: ['جهان', 'وبسایت', 'اینترنت', 'صادرات'],
    svg: '<circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  },
  {
    id: 'message-circle',
    name: 'چت آنلاین و پیام‌رسان',
    category: 'contact',
    tags: ['چت', 'گفتگو', 'واتساپ', 'تلگرام', 'ایتا'],
    svg: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  },

  // --- Tech, Precision & Energy ---
  {
    id: 'zap',
    name: 'برق پرقدرت و سرعت رعدآسا',
    category: 'tech',
    tags: ['برق', 'رعد', 'سرعت', 'توان', 'انرژی', 'قدرت'],
    svg: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  },
  {
    id: 'cpu',
    name: 'پردازنده و سیستم هوشمند CNC',
    category: 'tech',
    tags: ['پردازنده', 'میکرو', 'سی ان سی', 'هوشمند', 'مغز'],
    svg: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
  },
  {
    id: 'sliders',
    name: 'تنظیمات دقیق و کالیبراسیون',
    category: 'tech',
    tags: ['تنظیم', 'اسلایدر', 'دقت', 'کالیبره'],
    svg: '<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/>',
  },
  {
    id: 'activity',
    name: 'مانیتورینگ و عملکرد بی‌وقفه',
    category: 'tech',
    tags: ['عملکرد', 'پالس', 'نمودار', 'تست'],
    svg: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  },
  {
    id: 'lock',
    name: 'ایمنی اپراتور و قفل محافظ',
    category: 'tech',
    tags: ['قفل', 'امنیت', 'ایمنی', 'محافظ'],
    svg: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  },
  {
    id: 'wifi',
    name: 'اتصال بی‌سیم و اینترنت اشیا',
    category: 'tech',
    tags: ['وای فای', 'شبکه', 'اتصال', 'بیسیم'],
    svg: '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>',
  },

  // --- Lifestyle, Design & Generic ---
  {
    id: 'heart',
    name: 'محبوب مشتریان و رضایت',
    category: 'lifestyle',
    tags: ['قلب', 'علاقه', 'دوست داشتنی', 'محبوب'],
    svg: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  },
  {
    id: 'leaf',
    name: 'سازگار با محیط زیست و چوب طبیعی',
    category: 'lifestyle',
    tags: ['برگ', 'سبز', 'طبیعت', 'چوب طبیعی', 'ارگانیک'],
    svg: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  },
  {
    id: 'coffee',
    name: 'کافه و پذیرایی',
    category: 'lifestyle',
    tags: ['قهوه', 'فنجان', 'پذیرایی', 'کافه', 'رستوران'],
    svg: '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h12Zm0 0h1a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3h-1"/><path d="M6 2v2"/>',
  },
  {
    id: 'compass',
    name: 'قطب‌نما و نقشه راه',
    category: 'lifestyle',
    tags: ['قطب نما', 'جهت', 'راهبرد', 'هدف'],
    svg: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  },
  {
    id: 'gift',
    name: 'هدیه و اشانتیون سفارش',
    category: 'lifestyle',
    tags: ['کادو', 'هدیه', 'جایزه', 'اشانتیون'],
    svg: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  },
  {
    id: 'palette',
    name: 'پالت رنگ و طراحی سفارشی',
    category: 'lifestyle',
    tags: ['رنگ', 'هنر', 'طراحی', 'دکوراسیون', 'سفارشی'],
    svg: '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  },
];

export function getSvgIcon(id: string): SvgIconDef {
  const found = SVG_ICONS.find((i) => i.id === id);
  return found || SVG_ICONS[0];
}

export function generateSvgTag(
  iconId: string,
  size = 24,
  color = 'currentColor',
  customPath?: string
): string {
  const icon = getSvgIcon(iconId);
  const content = customPath || icon.svg;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${content}</svg>`;
}
