import {
  CatalogDimension,
  CatalogSizeKey,
  CatalogThemePalette,
  FontKey,
  FontWeightKey,
  BlockType,
  CatalogBlock,
  CatalogState,
  EditorUiTheme,
} from '../types/catalog';

export const CATALOG_SIZES: Record<CatalogSizeKey, CatalogDimension> = {
  a4: { width: 595, height: 842, label: 'A4 عمودی', desc: 'استاندارد کاتالوگ و بروشور چاپی' },
  a4l: { width: 842, height: 595, label: 'A4 افقی', desc: 'مناسب آلبوم محصولات و ژورنال' },
  a5: { width: 420, height: 595, label: 'A5 رقعی', desc: 'اندازه جمع و جور و کتابچه‌ای' },
  sq: { width: 700, height: 700, label: 'مربع (۱:۱)', desc: 'ایده‌آل شبکه‌های اجتماعی و وب' },
  st: { width: 450, height: 800, label: 'موبایل / استوری', desc: 'بهترین نمایش در گوشی و استوری' },
  sl: { width: 960, height: 540, label: 'اسلاید عریض (۱۶:۹)', desc: 'مناسب پرزنتیشن و نمایشگرها' },
};

export const THEME_PALETTES: CatalogThemePalette[] = [
  { name: 'RCG نورانی و مدرن', bg: '#FFFFFF', fg: '#0A1A44', ac: '#FF5500', sf: '#F2F4F9', r: 8 },
  { name: 'RCG شب و متالیک', bg: '#0A1A44', fg: '#FFFFFF', ac: '#FF5500', sf: '#14295F', r: 8 },
  { name: 'چوب گرم و کارگاه', bg: '#F5ECE1', fg: '#3A271C', ac: '#C06622', sf: '#EBDCCE', r: 14 },
  { name: 'مینیمال سوئیسی', bg: '#F8F9FA', fg: '#1A1D20', ac: '#2563EB', sf: '#FFFFFF', r: 0 },
  { name: 'جنگلی و ارگانیک', bg: '#EEF4EF', fg: '#1B3728', ac: '#2E7D4F', sf: '#DDE9DF', r: 18 },
  { name: 'شب طلایی لاکچری', bg: '#141318', fg: '#FAF6F0', ac: '#E4B454', sf: '#22202A', r: 10 },
  { name: 'اقیانوس و لاجوردی', bg: '#EBF4FA', fg: '#0C3550', ac: '#0284C7', sf: '#D5E9F5', r: 14 },
  { name: 'گرانیت و متال', bg: '#252930', fg: '#F3F4F6', ac: '#FF5500', sf: '#343A44', r: 6 },
  { name: 'رز لطیف و پاستلی', bg: '#FFF1F3', fg: '#4F1D2C', ac: '#E11D48', sf: '#FFE2E7', r: 20 },
  { name: 'کرافت قدیمی', bg: '#E9DEC9', fg: '#2F2A23', ac: '#875122', sf: '#DECDB1', r: 4 },
  { name: 'بنفش مدرن تک', bg: '#F6F3FF', fg: '#2C1060', ac: '#7C3AED', sf: '#EBE2FF', r: 12 },
  { name: 'مونوکروم خالص', bg: '#FFFFFF', fg: '#0A0A0A', ac: '#0A0A0A', sf: '#F2F2F2', r: 0 },
];

export const ACCENT_COLORS = [
  '#FF5500', // RCG Orange
  '#2563EB', // Blue
  '#2E7D4F', // Forest Green
  '#C06622', // Warm Wood
  '#E4B454', // Gold
  '#7C3AED', // Violet
  '#0284C7', // Cyan
  '#E11D48', // Rose Red
  '#0F766E', // Teal
  '#EA580C', // Amber
  '#4F46E5', // Indigo
  '#09090B', // Pitch Black
];

export const FONT_WEIGHTS: Record<FontWeightKey, { label: string; weight: number; desc: string }> = {
  regular: { label: 'معمولی (Regular)', weight: 400, desc: 'خوانایی روان برای متن و توضیحات' },
  medium: { label: 'متوسط (Medium)', weight: 500, desc: 'وزن شکیل و مدرن برای تیتر و متن' },
  bold: { label: 'پررنگ (Bold)', weight: 700, desc: 'برجستگی بالا برای تیترها و قیمت‌ها' },
  black: { label: 'مشکی و ضخیم (Black)', weight: 900, desc: 'فوق‌العاده درشت، پرانرژی و تبلیغاتی' },
};

export const FONT_CONFIG: Record<FontKey, { name: string; bodyFont: string; headingFont: string; desc: string }> = {
  iy: {
    name: 'ایران‌یکان (IRANYekan)',
    bodyFont: "'IRANYekan', 'IranYekan', 'iranyekan', 'Vazirmatn', Tahoma, sans-serif",
    headingFont: "'IRANYekan', 'IranYekan', 'iranyekan', 'Vazirmatn', Tahoma, sans-serif",
    desc: 'محبوب‌ترین فونت تبلیغاتی، کاتالوگ‌ها و اپلیکیشن‌های ایران',
  },
  is: {
    name: 'ایران‌سنس (IRANSans)',
    bodyFont: "'IRANSans', 'IranSans', 'iransans', 'IRANSansX', 'Vazirmatn', Tahoma, sans-serif",
    headingFont: "'IRANSans', 'IranSans', 'iransans', 'IRANSansX', 'Vazirmatn', Tahoma, sans-serif",
    desc: 'فونت استاندارد سازمانی، برندینگ حرفه‌ای و رسمی',
  },
  v: {
    name: 'وزیرمتن (Vazirmatn)',
    bodyFont: "'Vazirmatn', Tahoma, sans-serif",
    headingFont: "'Vazirmatn', Tahoma, sans-serif",
    desc: 'مدرن، استاندارد بین‌المللی با پشتیبانی تمام وزن‌ها',
  },
  sh: {
    name: 'شبنم (Shabnam)',
    bodyFont: "'Shabnam', 'Vazirmatn', Tahoma, sans-serif",
    headingFont: "'Shabnam', 'Vazirmatn', Tahoma, sans-serif",
    desc: 'نرم، صمیمی، چشم‌نواز و مناسب کاتالوگ‌های لوکس',
  },
  c: {
    name: 'کایرو (Cairo)',
    bodyFont: "'Cairo', Tahoma, sans-serif",
    headingFont: "'Cairo', Tahoma, sans-serif",
    desc: 'هندسی، پویا و مناسب تیترهای صنعتی و ماشین‌آلات',
  },
  n: {
    name: 'نسخ عربی (Noto Naskh)',
    bodyFont: "'Noto Naskh Arabic', Georgia, serif",
    headingFont: "'Noto Naskh Arabic', Georgia, serif",
    desc: 'کلاسیک، رسمی، لوکس و معتبر برای اسناد شرکتی',
  },
  l: {
    name: 'لاله‌زار (Lalezar)',
    bodyFont: "'Vazirmatn', Tahoma, sans-serif",
    headingFont: "'Lalezar', 'Vazirmatn', cursive",
    desc: 'تیترهای درشت، پرانرژی، نوستالژیک و تبلیغاتی',
  },
  custom: {
    name: 'فونت اختصاصی (بارگذاری فایل کاربر)',
    bodyFont: "'CustomUploadedFont', 'IRANYekan', 'Vazirmatn', sans-serif",
    headingFont: "'CustomUploadedFont', 'IRANYekan', 'Vazirmatn', sans-serif",
    desc: 'استفاده از فایل فونت شخصی شما (فرمت WOFF2 یا TTF)',
  },
};

export const SAMPLE_IMAGES = [
  {
    title: 'دستگاه و ابزار نجاری مدرن',
    category: 'صنعت و چوب',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'مبلمان چوبی دست‌ساز مینیمال',
    category: 'صنعت و چوب',
    url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'دکوراسیون داخلی و معماری مدرن',
    category: 'معماری',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'ابزارآلات و یراق‌آلات باکیفیت',
    category: 'صنعت و چوب',
    url: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'گجت و تکنولوژی هوشمند',
    category: 'تکنولوژی',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'قهوه و کیک دست‌ساز کافه',
    category: 'رستوران',
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
  },
];

export const EDITOR_UI_THEMES_INFO: Record<
  EditorUiTheme,
  {
    id: EditorUiTheme;
    title: string;
    subtitle: string;
    desc: string;
    previewBg: string;
    previewAccent: string;
    headerBg: string;
    sidebarBg: string;
    stageBg: string;
    badge: string;
  }
> = {
  'dark-obsidian': {
    id: 'dark-obsidian',
    title: 'استودیو آبسیدین تاریک',
    subtitle: 'Dark Obsidian Pro',
    desc: 'محیط کاری تاریک و حرفه‌ای، تمرکز بالا با کنتراست عالی و نورهای نئونی ملایم',
    previewBg: '#090d16',
    previewAccent: '#ff5500',
    headerBg: 'bg-slate-950/95 border-b border-slate-800 text-slate-100',
    sidebarBg: 'bg-slate-900/95 border-l border-slate-800 text-slate-200',
    stageBg: 'bg-slate-950/90',
    badge: 'پیش‌فرض حرفه‌ای',
  },
  'clean-ivory': {
    id: 'clean-ivory',
    title: 'استودیو عاجی و کریستال روشن',
    subtitle: 'Clean Ivory Studio',
    desc: 'محیط اداری شیک و آرامش‌بخش، سایه‌های نرم، پس‌زمینه لطیف و بدون خستگی چشم',
    previewBg: '#f4f5f8',
    previewAccent: '#2563eb',
    headerBg: 'bg-white border-b border-slate-200 text-slate-800 shadow-sm',
    sidebarBg: 'bg-slate-50 border-l border-slate-200 text-slate-700',
    stageBg: 'bg-slate-200/70',
    badge: 'طراحی سوئیسی',
  },
  'glass-modern': {
    id: 'glass-modern',
    title: 'استودیو گلس‌مورفیک نیو',
    subtitle: 'Glassmorphic Neo',
    desc: 'پنل‌های شیشه‌ای مات و شفاف بر روی گرادیانت عمیق با لایه‌بندی سه‌بعدی و مدرن',
    previewBg: '#0e172a',
    previewAccent: '#8b5cf6',
    headerBg: 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10 text-white',
    sidebarBg: 'bg-slate-900/70 backdrop-blur-xl border-l border-white/10 text-slate-200',
    stageBg: 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950',
    badge: 'مدرن و ترند',
  },
  'vivid-creative': {
    id: 'vivid-creative',
    title: 'استودیو پرانرژی و خلاق',
    subtitle: 'Vivid Creative Studio',
    desc: 'کنتراست زنده، حاشیه‌های مشخص و آیکون‌های بولد برای سرعت بالا و دسترسی بصری سریع',
    previewBg: '#18181b',
    previewAccent: '#10b981',
    headerBg: 'bg-zinc-900 border-b-2 border-emerald-500 text-zinc-100',
    sidebarBg: 'bg-zinc-900 border-l border-zinc-800 text-zinc-200',
    stageBg: 'bg-zinc-950',
    badge: 'خلاق و پویا',
  },
};

export function createBlock(type: BlockType): CatalogBlock {
  const id = 'b_' + Math.random().toString(36).substring(2, 9);
  switch (type) {
    case 'h':
      return { id, t: 'h', x: 'عنوان بخش جدید', sz: 28, al: 'right', hs: 'b' };
    case 'p':
      return {
        id,
        t: 'p',
        x: 'توضیحات و متن معرفی محصول، ویژگی‌ها یا شرایط همکاری را اینجا وارد کنید.',
        sz: 14,
        al: 'right',
      };
    case 'img':
      return {
        id,
        t: 'img',
        src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
        ht: 220,
        fit: 'cover',
        caption: 'تصویر اختصاصی محصول',
      };
    case 'logo':
      return { id, t: 'logo', w: 50, al: 'center' };
    case 'btn':
      return {
        id,
        t: 'btn',
        x: 'مشاهده مشخصات فنی و خرید',
        u: 'https://',
        al: 'right',
        sh: 'f',
      };
    case 'prod':
      return {
        id,
        t: 'prod',
        x: 'اره میزی صنعتی RCG مدل Pro-X',
        d: 'موتور پرقدرت ۳ اسب بخار، تیغ الماسه آلمانی و بدنه چدنی ضد لرزش',
        pr: 'قیمت: استعلام تلفنی',
        src: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=600&q=80',
        u: 'https://',
        badge: 'پرفروش‌ترین',
        layout: 'horizontal',
      };
    case 'list':
      return {
        id,
        t: 'list',
        x: 'بدنه تقویت‌شده از جنس فولاد ضد زنگ\nدارای ۲ سال ضمانت کتبی تعویض بی قید و شرط\nخدمات پس از فروش و تامین قطعات در سراسر کشور\nارسال اکسپرس و نصب رایگان در تهران و مراکز استان',
        sz: 14,
        st: 'k',
      };
    case 'box':
      return {
        id,
        t: 'box',
        title: 'نکته طلایی برای سفارش‌دهندگان',
        x: 'برای سفارش‌های عمده بالای ۱۰ عدد، ارسال و آموزش پرسنل به صورت کاملاً رایگان انجام می‌پذیرد.',
        sz: 14,
        al: 'right',
        st: 'accent-right',
      };
    case 'toc':
      return { id, t: 'toc', title: 'فهرست عناوین کاتالوگ' };
    case 'hr':
      return { id, t: 'hr', st: 'solid' };
    case 'sp':
      return { id, t: 'sp', ht: 24 };
    case 'features':
      return {
        id,
        t: 'features',
        items: [
          { icon: 'shield', title: 'کیفیت تضمین‌شده', desc: 'استاندارد ملی و ایزو ۹۰۰۱' },
          { icon: 'truck', title: 'تحویل سریع', desc: 'ارسال فوری سراسر کشور' },
          { icon: 'clock', title: 'پشتیبانی ۲۴ ساعته', desc: 'پاسخگویی سریع کارشناسان' },
        ],
      };
    case 'contact':
      return {
        id,
        t: 'contact',
        phone: '۰۲۱-۸۸۸۸۹۹۹۹',
        website: 'www.rcg-industry.ir',
        email: 'info@rcg-industry.ir',
        address: 'تهران، خیابان آزادی، برج فناوری، واحد ۳۰۴',
        instagram: '@rcg_industry',
      };
    case 'icon':
      return {
        id,
        t: 'icon',
        iconName: 'shield-check',
        sz: 48,
        colorType: 'accent',
        bgShape: 'circle',
        caption: 'گارانتی و تضمین کیفیت RCG',
        captionPos: 'bottom',
        al: 'center',
      };
  }
}

export const INITIAL_CATALOG_STATE: CatalogState = {
  title: 'کاتالوگ هوشمند صنایع چوب و ماشین‌آلات RCG',
  subtitle: 'راهکارهای نوین نجاری، یراق‌آلات پیشرفته و دکوراسیون ۱۴۰۵',
  tp: 0,
  c: { ...THEME_PALETTES[0] },
  sz: 'a4',
  f: 'v',
  dc: 'cn',
  nav: {
    st: 'arrows',
    ps: 'bottom',
    sh: 'round',
    tr: 'fade',
    mn: 'side',
  },
  pg: [
    {
      id: 'p_cover',
      t: 'جلد کاتالوگ',
      toc: false,
      bl: [
        { id: 'b_sp1', t: 'sp', ht: 40 },
        { id: 'b_lg', t: 'logo', w: 60, al: 'center' },
        { id: 'b_sp2', t: 'sp', ht: 24 },
        {
          id: 'b_h1',
          t: 'h',
          x: 'کاتالوگ جامع تجهیزات و صنایع چوب RCG',
          sz: 32,
          al: 'center',
          hs: 'c',
        },
        {
          id: 'b_p1',
          t: 'p',
          x: 'ارائه‌دهنده پیشرفته‌ترین ماشین‌آلات نجاری، یراق‌آلات تخصصی و ابزارآلات برشی در خاورمیانه',
          sz: 15,
          al: 'center',
        },
        {
          id: 'b_im1',
          t: 'img',
          src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
          ht: 220,
          fit: 'cover',
          caption: 'کارگاه تمام اتوماتیک تولید مبلمان و صفحات فشرده',
        },
        { id: 'b_sp3', t: 'sp', ht: 16 },
        {
          id: 'b_btn1',
          t: 'btn',
          x: 'مشاهده فهرست و صفحات بعد ›',
          u: '#2',
          al: 'center',
          sh: 'p',
        },
      ],
    },
    {
      id: 'p_toc',
      t: 'فهرست مطالب',
      toc: false,
      bl: [
        { id: 'b_h2', t: 'h', x: 'فهرست عناوین و راهنمای کاتالوگ', sz: 28, al: 'right', hs: 'b' },
        { id: 'b_hr1', t: 'hr', st: 'solid' },
        {
          id: 'b_p_toc',
          t: 'p',
          x: 'برای مراجعه مستقیم به هر بخش می‌توانید روی عنوان صفحه کلیک کنید.',
          sz: 14,
          al: 'right',
        },
        { id: 'b_toc', t: 'toc', title: 'فهرست صفحات' },
        {
          id: 'b_box1',
          t: 'box',
          title: 'دسترسی سریع در گوشی و تبلت',
          x: 'این کاتالوگ به صورت دیجیتال و تعاملی طراحی شده و دکمه منو (☰) در تمام صفحات برای پرش سریع در دسترس است.',
          sz: 13,
          al: 'right',
          st: 'glass',
        },
      ],
    },
    {
      id: 'p_prods',
      t: 'ماشین‌آلات و تجهیزات برتر',
      toc: true,
      cols: 2,
      bl: [
        { id: 'b_h3', t: 'h', x: 'محصولات پرفروش و منتخب RCG', sz: 26, al: 'right', hs: 'b' },
        { id: 'b_hr2', t: 'hr', st: 'solid' },
        {
          id: 'b_pr1',
          t: 'prod',
          x: 'دستگاه لبه‌چسبان ۶ ایستگاه RCG',
          d: 'سیستم پیش‌گرمایش، فرز بالا و پایین، پیش‌فرز الماسه و پولیش تمام هوشمند',
          pr: 'ضمانت ۲۴ ماهه طلایی',
          src: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=600&q=80',
          u: 'https://',
          badge: 'ویژه صنعتی',
          layout: 'vertical',
        },
        {
          id: 'b_pr2',
          t: 'prod',
          x: 'سی‌ان‌سی چوب ۳ محوره صنعتی',
          d: 'اسپیندل ۹ کیلووات آب‌خنک HSD ایتالیا با میز وکیوم ۸ تکه پرقدرت',
          pr: 'تحویل فوری با آموزش اپراتور',
          src: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
          u: 'https://',
          badge: 'جدید ۱۴۰۵',
          layout: 'vertical',
        },
        {
          id: 'b_pr3',
          t: 'prod',
          x: 'اره دورکن واگنی ۳۸۰ سانتیمتر',
          d: 'ریل واگنی ساچمه‌ای روان، خط‌زن مستقل و چرخش زاویه زاویه‌سنج دیجیتال',
          pr: 'تخفیف نقدی ۱۰٪',
          src: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
          u: 'https://',
          badge: 'پیشنهاد کارشناسان',
          layout: 'vertical',
        },
        {
          id: 'b_pr4',
          t: 'prod',
          x: 'مکنده مرکزی دو قلو توربوفن',
          d: 'موتور ۴ کیلووات زیمنس با فیلتراسیون نانو ضد گردوغبار ریز',
          pr: 'موجود در انبار مرکزی',
          src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
          u: 'https://',
          layout: 'vertical',
        },
      ],
    },
    {
      id: 'p_advantages',
      t: 'مزایای رقابتی و گارانتی',
      toc: true,
      bg: 1,
      bl: [
        { id: 'b_h4', t: 'h', x: 'چرا برند صنعتی RCG؟', sz: 28, al: 'right', hs: 'b' },
        { id: 'b_hr3', t: 'hr', st: 'solid' },
        {
          id: 'b_p4',
          t: 'p',
          x: 'بیش از دو دهه فعالیت مستمر و تامین ماشین‌آلات برای بزرگترین کارخانجات صنایع چوب و مبلمان کشور با استانداردهای بین‌المللی CE اروپا.',
          sz: 14,
          al: 'right',
        },
        {
          id: 'b_feat1',
          t: 'features',
          items: [
            { icon: 'shield', title: 'گارانتی بی‌قید و شرط', desc: '۲۴ ماه گارانتی کلیه قطعات و موتورها' },
            { icon: 'truck', title: 'تحویل و نصب رایگان', desc: 'راه‌اندازی توسط تکنسین مجرب در کارگاه شما' },
            { icon: 'clock', title: 'پشتیبانی فنی مداوم', desc: 'تامین سریع قطعات یدکی تا ۱۰ سال' },
          ],
        },
        {
          id: 'b_lst1',
          t: 'list',
          x: 'دارای تاییدیه رسمی بازرسی فنی و کیفیت صادراتی\nطراحی بهینه‌شده برای مصرف برق کمتر تا ۳۵ درصد\nآموزش تخصصی رایگان به اپراتورها و پرسنل کارگاه\nامکان خرید اقساطی با همکاری شبکه بانکی کشور',
          sz: 14,
          st: 'k',
        },
        {
          id: 'b_box2',
          t: 'box',
          title: 'مشاوره اختصاصی تجهیز خط تولید',
          x: 'کارشناسان فنی ما آمادگی دارند قبل از هرگونه خرید، از محل کارگاه شما بازدید و بهترین چیدمان دستگاه‌ها را به رایگان طراحی کنند.',
          sz: 13,
          al: 'right',
          st: 'quote',
        },
      ],
    },
    {
      id: 'p_contact',
      t: 'تماس و ثبت سفارش',
      toc: true,
      bl: [
        { id: 'b_h5', t: 'h', x: 'تماس با ما و دریافت پیش‌فاکتور', sz: 28, al: 'right', hs: 'b' },
        { id: 'b_hr4', t: 'hr', st: 'solid' },
        {
          id: 'b_p5',
          t: 'p',
          x: 'جهت استعلام قیمت روز، دریافت کاتالوگ‌های تخصصی هر دستگاه و هماهنگی بازدید حضوری از شوروم مرکزی:',
          sz: 14,
          al: 'right',
        },
        {
          id: 'b_cnt1',
          t: 'contact',
          phone: '۰۲۱-۶۶۵۵۴۴۳۳',
          website: 'www.rcg-wood.ir',
          email: 'sales@rcg-wood.ir',
          address: 'تهران، بزرگراه فتح، شهرک صنعتی چیتگر، بلوار کاوشگران، پلاک ۷۲',
          instagram: '@rcg_woodworking',
        },
        { id: 'b_sp4', t: 'sp', ht: 20 },
        {
          id: 'b_btn2',
          t: 'btn',
          x: 'ارتباط مستقیم در واتساپ / بله / ایتا',
          u: 'https://',
          al: 'center',
          sh: 'p',
        },
        {
          id: 'b_btn3',
          t: 'btn',
          x: 'بازگشت به صفحه اول (جلد)',
          u: '#1',
          al: 'center',
          sh: 'o',
        },
      ],
    },
  ],
};
