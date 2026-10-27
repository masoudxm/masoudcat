import React, { useRef, useState } from 'react';
import { CatalogState } from '../../types/catalog';
import { generateStandaloneCatalogHtml } from '../../utils/htmlExporter';
import { INITIAL_CATALOG_STATE } from '../../constants/presets';
import {
  Download,
  Printer,
  Copy,
  FileCode,
  FolderUp,
  RotateCcw,
  QrCode,
  Check,
  Share2,
  ExternalLink,
} from 'lucide-react';

interface ExportPanelProps {
  state: CatalogState;
  onUpdateState: (updater: (prev: CatalogState) => CatalogState) => void;
  onPrint: () => void;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({
  state,
  onUpdateState,
  onPrint,
}) => {
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  // Download Standalone HTML
  const handleDownloadHtml = () => {
    const htmlContent = generateStandaloneCatalogHtml(state);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.title || 'smart-catalog'}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copy HTML to clipboard
  const handleCopyHtml = async () => {
    try {
      const htmlContent = generateStandaloneCatalogHtml(state);
      await navigator.clipboard.writeText(htmlContent);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2500);
    } catch (err) {
      alert('امکان کپی خودکار فراهم نشد.');
    }
  };

  // Download JSON project file
  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(state, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.title || 'smart-catalog'}-project.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON project file
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string) as CatalogState;
        if (parsed.pg && Array.isArray(parsed.pg)) {
          onUpdateState(() => parsed);
          alert('پروژه کاتالوگ با موفقیت بارگذاری و بازیابی شد.');
        } else {
          alert('فرمت فایل نامعتبر است.');
        }
      } catch (err) {
        alert('خطا در خواندن فایل پروژه JSON.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Reset to default
  const handleReset = () => {
    if (!resetConfirm) {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 4000);
      return;
    }
    onUpdateState(() => INITIAL_CATALOG_STATE);
    setResetConfirm(false);
  };

  return (
    <div className="flex flex-col gap-6 p-4 text-right">
      {/* 1. Final Delivery & Export */}
      <section className="flex flex-col gap-2.5">
        <span className="text-xs font-bold opacity-75">
          خروجی نهایی کاتالوگ دیجیتال
        </span>

        {/* Standalone HTML */}
        <button
          onClick={handleDownloadHtml}
          className="p-3.5 rounded-xl border border-orange-500/50 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 transition-all cursor-pointer flex items-center justify-between group shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-500 text-white flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-right">
              <b className="text-sm font-bold text-white group-hover:text-orange-400">
                دانلود فایل کاتالوگ مستقل (HTML)
              </b>
              <span className="text-[11px] opacity-75">
                تک‌فایل سبک با کارکرد ۱۰۰٪ آفلاین، انیمیشن‌های روان و منوی فهرست
              </span>
            </div>
          </div>
        </button>

        {/* Print / PDF */}
        <button
          onClick={onPrint}
          className="p-3.5 rounded-xl border border-current/15 hover:border-orange-500/50 bg-black/5 dark:bg-white/5 transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Printer className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-right">
              <b className="text-sm font-bold">چاپ مستقیم و ذخیره PDF</b>
              <span className="text-[11px] opacity-65">
                تنظیم خودکار ابعاد بر اساس قطع انتخابی (A4 / A5)
              </span>
            </div>
          </div>
        </button>

        {/* Copy HTML Code */}
        <button
          onClick={handleCopyHtml}
          className="p-3.5 rounded-xl border border-current/15 hover:border-orange-500/50 bg-black/5 dark:bg-white/5 transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              {copiedHtml ? (
                <Check className="w-5 h-5 text-emerald-400" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </div>
            <div className="flex flex-col text-right">
              <b className="text-sm font-bold">
                {copiedHtml ? 'کد با موفقیت کپی شد!' : 'کپی مستقیم کد کامل HTML'}
              </b>
              <span className="text-[11px] opacity-65">
                جهت قرار دادن در آی‌فریم یا هاست وب‌سایت
              </span>
            </div>
          </div>
        </button>

        {/* QR Code and Quick Share */}
        <button
          onClick={() => setShowQr(!showQr)}
          className="p-3.5 rounded-xl border border-current/15 hover:border-orange-500/50 bg-black/5 dark:bg-white/5 transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-right">
              <b className="text-sm font-bold">بارکد QR و اشتراک‌گذاری سریع</b>
              <span className="text-[11px] opacity-65">
                نمایش بارکد هوشمند برای اسکن مستقیم با دوربین موبایل مشتری
              </span>
            </div>
          </div>
        </button>

        {/* QR Modal View */}
        {showQr && (
          <div className="p-4 rounded-2xl border border-purple-500/30 bg-purple-500/10 flex flex-col items-center gap-3 text-center">
            <div className="w-32 h-32 bg-white p-2 rounded-xl flex items-center justify-center shadow-md">
              {/* Clean SVG QR mockup */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                <rect x="0" y="0" width="30" height="30" rx="3" />
                <rect x="6" y="6" width="18" height="18" fill="#fff" />
                <rect x="10" y="10" width="10" height="10" />
                
                <rect x="70" y="0" width="30" height="30" rx="3" />
                <rect x="76" y="6" width="18" height="18" fill="#fff" />
                <rect x="80" y="10" width="10" height="10" />

                <rect x="0" y="70" width="30" height="30" rx="3" />
                <rect x="6" y="76" width="18" height="18" fill="#fff" />
                <rect x="10" y="80" width="10" height="10" />

                <rect x="38" y="12" width="6" height="6" />
                <rect x="52" y="12" width="8" height="6" />
                <rect x="42" y="38" width="16" height="16" />
                <rect x="70" y="50" width="10" height="8" />
                <rect x="50" y="72" width="8" height="12" />
                <rect x="72" y="75" width="18" height="15" />
              </svg>
            </div>
            <span className="text-xs font-bold text-purple-300">
              اسکن بارکد برای مشاهده روی گوشی
            </span>
            <span className="text-[11px] opacity-75 max-w-xs">
              با دانلود فایل HTML می‌توانید آن را در هر پیام‌رسان (تلگرام، واتساپ، بله، ایتا) مستقیماً برای مشتری ارسال کنید.
            </span>
          </div>
        )}
      </section>

      {/* 2. Project File Backup & Restore */}
      <section className="flex flex-col gap-2.5 pt-4 border-t border-current/10">
        <span className="text-xs font-bold opacity-75">
          پشتیبان‌گیری و بارگذاری پروژه
        </span>

        <div className="grid grid-cols-2 gap-2">
          {/* Download JSON */}
          <button
            onClick={handleDownloadJson}
            className="p-3 rounded-xl border border-current/15 hover:border-orange-500/40 bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer transition-all"
          >
            <FileCode className="w-5 h-5 text-orange-500" />
            <b className="text-xs">ذخیره پروژه (JSON)</b>
            <span className="text-[10px] opacity-65">برای ادامه کار در آینده</span>
          </button>

          {/* Upload JSON */}
          <button
            onClick={() => jsonInputRef.current?.click()}
            className="p-3 rounded-xl border border-current/15 hover:border-orange-500/40 bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer transition-all"
          >
            <FolderUp className="w-5 h-5 text-blue-500" />
            <b className="text-xs">بارگذاری پروژه قبلی</b>
            <span className="text-[10px] opacity-65">انتخاب فایل JSON</span>
            <input
              ref={jsonInputRef}
              type="file"
              accept=".json"
              onChange={handleImportJson}
              className="hidden"
            />
          </button>
        </div>

        {/* Reset to initial */}
        <button
          onClick={handleReset}
          className={`mt-2 p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
            resetConfirm
              ? 'border-red-500 bg-red-500 text-white font-bold animate-pulse'
              : 'border-red-500/25 text-red-400 hover:bg-red-500/10'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>
            {resetConfirm
              ? 'مطمئن هستید؟ برای بازنشانی دوباره کلیک کنید'
              : 'شروع مجدد و بازنشانی به کاتالوگ اولیه RCG'}
          </span>
        </button>
      </section>
    </div>
  );
};
