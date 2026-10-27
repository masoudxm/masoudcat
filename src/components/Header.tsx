import React from 'react';
import { CatalogState, EditorUiTheme } from '../types/catalog';
import { EDITOR_UI_THEMES_INFO } from '../constants/presets';
import {
  Download,
  Printer,
  Smartphone,
  Eye,
  Palette,
  Sparkles,
  Layers,
} from 'lucide-react';

interface HeaderProps {
  state: CatalogState;
  editorTheme: EditorUiTheme;
  onOpenThemeModal: () => void;
  onOpenIconModal: () => void;
  onOpenUploadModal: () => void;
  onOpenDualPreview: () => void;
  onOpenFullscreen: () => void;
  onDownloadHtml: () => void;
  onPrint: () => void;
  onUpdateTitle: (title: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  editorTheme,
  onOpenThemeModal,
  onOpenIconModal,
  onOpenUploadModal,
  onOpenDualPreview,
  onOpenFullscreen,
  onDownloadHtml,
  onPrint,
  onUpdateTitle,
}) => {
  const currentThemeInfo = EDITOR_UI_THEMES_INFO[editorTheme];

  return (
    <header className="flex-none px-4 py-2.5 flex items-center justify-between gap-3 border-b border-inherit bg-inherit text-inherit z-20">
      {/* Brand & Editable Title */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-none">
          <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-orange-500/20">
            RCG
          </div>
          <span className="hidden sm:inline font-extrabold text-sm tracking-tight text-orange-500">
            کاتالوگ هوشمند
          </span>
        </div>

        <div className="h-5 w-px bg-current/20 hidden sm:block flex-none" />

        {/* Editable Catalog Title input */}
        <input
          type="text"
          value={state.title}
          onChange={(e) => onUpdateTitle(e.target.value)}
          placeholder="عنوان کاتالوگ..."
          className="flex-1 max-w-md px-3 py-1.5 rounded-xl border border-current/15 bg-black/5 dark:bg-white/5 font-bold text-xs md:text-sm focus:outline-none focus:border-orange-500 transition-all truncate"
        />
      </div>

      {/* Right Controls: View Modes, UI Theme Selector, Quick Export */}
      <div className="flex items-center gap-2 flex-none">
        {/* Upload Existing Catalog Button */}
        <button
          onClick={onOpenUploadModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold transition-all cursor-pointer shadow-sm group"
          title="آپلود عکس‌های صفحات کاتالوگ و هوشمندسازی آن"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>آپلود کاتالوگ</span>
        </button>

        {/* Open Vector Icons Modal Button */}
        <button
          onClick={onOpenIconModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-orange-500/40 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-xs font-bold transition-all cursor-pointer shadow-sm group"
          title="کتابخانه جامع آیکون‌های برداری SVG"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-400 group-hover:scale-110 transition-transform" />
          <span>آیکون‌های برداری</span>
        </button>

        {/* Switch Editor UI Theme Modal trigger */}
        <button
          onClick={onOpenThemeModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 hover:border-orange-500 hover:text-orange-400 text-xs font-bold transition-all cursor-pointer shadow-sm group"
          title="تغییر تم و محیط کاربری وب‌اپ"
        >
          <Palette className="w-3.5 h-3.5 text-orange-500 group-hover:rotate-12 transition-transform" />
          <span className="hidden md:inline">محیط وب‌اپ:</span>
          <span className="text-orange-500 font-semibold truncate max-w-[90px]">
            {currentThemeInfo.title.split(' ')[1] || 'تم'}
          </span>
        </button>

        {/* Dual Device Preview (Mobile & Desktop) */}
        <button
          onClick={onOpenDualPreview}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 hover:border-blue-500 hover:text-blue-400 text-xs font-semibold transition-all cursor-pointer"
          title="دید همزمان در موبایل و دسکتاپ"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">دید دوقلو</span>
        </button>

        {/* Fullscreen Presentation */}
        <button
          onClick={onOpenFullscreen}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 hover:border-emerald-500 hover:text-emerald-400 text-xs font-semibold transition-all cursor-pointer"
          title="نمایش تمام‌صفحه مشتری (پرزنتیشن)"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">پرزنتیشن</span>
        </button>

        {/* Print / PDF */}
        <button
          onClick={onPrint}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 hover:border-purple-500 hover:text-purple-400 text-xs font-semibold transition-all cursor-pointer"
          title="چاپ و PDF"
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">چاپ</span>
        </button>

        {/* Download Standalone HTML Button */}
        <button
          onClick={onDownloadHtml}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-all cursor-pointer shadow-md shadow-orange-500/20 active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          <span>خروجی کاتالوگ</span>
        </button>
      </div>
    </header>
  );
};
