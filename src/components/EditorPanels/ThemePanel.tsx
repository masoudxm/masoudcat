import {
  CatalogSizeKey,
  CatalogState,
  DecorationStyle,
  FontKey,
  FontWeightKey,
} from '../../types/catalog';
import {
  ACCENT_COLORS,
  CATALOG_SIZES,
  FONT_CONFIG,
  FONT_WEIGHTS,
  THEME_PALETTES,
} from '../../constants/presets';
import { Palette, Sparkles, Sliders, Type, Layout, Check, Upload, FileText } from 'lucide-react';

interface ThemePanelProps {
  state: CatalogState;
  onUpdateState: (updater: (prev: CatalogState) => CatalogState) => void;
}

export const ThemePanel: React.FC<ThemePanelProps> = ({
  state,
  onUpdateState,
}) => {
  const currentPaletteIndex = state.tp;

  const handleSelectPalette = (idx: number) => {
    const selected = THEME_PALETTES[idx];
    onUpdateState((prev) => ({
      ...prev,
      tp: idx,
      c: { ...selected },
    }));
  };

  const handleColorChange = (key: 'bg' | 'fg' | 'ac' | 'sf', val: string) => {
    onUpdateState((prev) => ({
      ...prev,
      tp: -1, // custom
      c: {
        ...prev.c,
        [key]: val,
      },
    }));
  };

  const handleRadiusChange = (r: number) => {
    onUpdateState((prev) => ({
      ...prev,
      c: {
        ...prev.c,
        r,
      },
    }));
  };

  const handleSizeChange = (sz: CatalogSizeKey) => {
    onUpdateState((prev) => ({
      ...prev,
      sz,
    }));
  };

  const handleFontChange = (f: FontKey) => {
    onUpdateState((prev) => ({
      ...prev,
      f,
    }));
  };

  const handleDecorationChange = (dc: DecorationStyle) => {
    onUpdateState((prev) => ({
      ...prev,
      dc,
    }));
  };

  return (
    <div className="flex flex-col gap-6 p-4 text-right">
      {/* 1. Catalog Dimensions & Display Size */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-xs font-bold opacity-75">
          <Layout className="w-4 h-4 text-orange-500" />
          <span>اندازه و نسبت صفحه کاتالوگ</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(CATALOG_SIZES) as CatalogSizeKey[]).map((key) => {
            const dim = CATALOG_SIZES[key];
            const isSelected = state.sz === key;
            return (
              <button
                key={key}
                onClick={() => handleSizeChange(key)}
                className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer flex flex-col gap-1 ${
                  isSelected
                    ? 'border-orange-500 bg-orange-500/10 shadow-sm'
                    : 'border-current/15 hover:border-orange-500/50 bg-black/5 dark:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <b className="text-xs font-bold">{dim.label}</b>
                  {isSelected && <Check className="w-3.5 h-3.5 text-orange-500" />}
                </div>
                <span className="text-[10px] opacity-60 font-mono">
                  {dim.width} × {dim.height}px
                </span>
                <span className="text-[10px] opacity-75 line-clamp-1">
                  {dim.desc}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Color Palettes Presets */}
      <section className="flex flex-col gap-2.5 pt-4 border-t border-current/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold opacity-75">
            <Palette className="w-4 h-4 text-orange-500" />
            <span>پالت‌های رنگی حرفه‌ای کاتالوگ</span>
          </div>
          {currentPaletteIndex === -1 && (
            <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-bold">
              سفارشی
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {THEME_PALETTES.map((pal, idx) => {
            const isSelected = currentPaletteIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectPalette(idx)}
                className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer flex flex-col gap-2 ${
                  isSelected
                    ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-sm'
                    : 'border-current/15 hover:border-current/30'
                }`}
                style={{ backgroundColor: pal.bg, color: pal.fg }}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold truncate">{pal.name}</span>
                  {isSelected && (
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: pal.ac }}
                    />
                  )}
                </div>
                <div className="flex items-center gap-1.5 w-full">
                  <div
                    className="h-2.5 flex-1 rounded-sm"
                    style={{ backgroundColor: pal.ac }}
                  />
                  <div
                    className="h-2.5 flex-1 rounded-sm"
                    style={{ backgroundColor: pal.sf }}
                  />
                  <div
                    className="h-2.5 flex-1 rounded-sm border border-current/20"
                    style={{ backgroundColor: pal.bg }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Detailed Custom Colors & Corner Radius */}
      <section className="flex flex-col gap-3 pt-4 border-t border-current/10">
        <div className="flex items-center gap-2 text-xs font-bold opacity-75">
          <Sliders className="w-4 h-4 text-orange-500" />
          <span>تنظیم دقیق رنگ‌ها و گوشه‌ها</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <label className="flex items-center justify-between p-2.5 rounded-xl border border-current/15 bg-black/5 dark:bg-white/5 cursor-pointer">
            <span className="font-medium">پس‌زمینه اصلی</span>
            <input
              type="color"
              value={state.c.bg}
              onChange={(e) => handleColorChange('bg', e.target.value)}
              className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
            />
          </label>
          <label className="flex items-center justify-between p-2.5 rounded-xl border border-current/15 bg-black/5 dark:bg-white/5 cursor-pointer">
            <span className="font-medium">رنگ متن</span>
            <input
              type="color"
              value={state.c.fg}
              onChange={(e) => handleColorChange('fg', e.target.value)}
              className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
            />
          </label>
          <label className="flex items-center justify-between p-2.5 rounded-xl border border-current/15 bg-black/5 dark:bg-white/5 cursor-pointer">
            <span className="font-medium">رنگ شاخص و برند</span>
            <input
              type="color"
              value={state.c.ac}
              onChange={(e) => handleColorChange('ac', e.target.value)}
              className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
            />
          </label>
          <label className="flex items-center justify-between p-2.5 rounded-xl border border-current/15 bg-black/5 dark:bg-white/5 cursor-pointer">
            <span className="font-medium">رنگ کارت‌ها</span>
            <input
              type="color"
              value={state.c.sf}
              onChange={(e) => handleColorChange('sf', e.target.value)}
              className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
            />
          </label>
        </div>

        {/* Quick Accent Swatches */}
        <div className="flex flex-col gap-1.5 mt-1">
          <span className="text-[11px] opacity-70">انتخاب سریع رنگ شاخص:</span>
          <div className="flex flex-wrap gap-2">
            {ACCENT_COLORS.map((clr) => (
              <button
                key={clr}
                onClick={() => handleColorChange('ac', clr)}
                className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                  state.c.ac.toLowerCase() === clr.toLowerCase()
                    ? 'border-white scale-110 shadow-md ring-2 ring-orange-500'
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: clr }}
                title={clr}
              />
            ))}
          </div>
        </div>

        {/* Radius Slider */}
        <div className="flex flex-col gap-1.5 mt-2">
          <div className="flex justify-between text-xs">
            <span className="font-medium">گردی گوشه‌ها (Border Radius)</span>
            <span className="font-mono text-orange-500">{state.c.r}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="28"
            value={state.c.r}
            onChange={(e) => handleRadiusChange(parseInt(e.target.value, 10))}
            className="w-full accent-orange-500 cursor-pointer"
          />
        </div>
      </section>

      {/* 4. Page Decoration Style */}
      <section className="flex flex-col gap-2.5 pt-4 border-t border-current/10">
        <div className="flex items-center gap-2 text-xs font-bold opacity-75">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span>تزئینات گرافیکی و حاشیه صفحه</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'cn', label: 'مثلث گوشه RCG' },
            { id: 'bar', label: 'نوار بالای صفحه' },
            { id: 'side', label: 'نوار پهلوی صفحه' },
            { id: 'frm', label: 'قاب داخلی' },
            { id: 'gradient', label: 'هاله نور مدرن' },
            { id: 'no', label: 'ساده بدون تزئین' },
          ].map((item) => {
            const isSelected = state.dc === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleDecorationChange(item.id as DecorationStyle)}
                className={`p-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-orange-500 bg-orange-500/10 font-bold'
                    : 'border-current/15 hover:border-orange-500/40 bg-black/5 dark:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. Typography / Fonts & Weights */}
      <section className="flex flex-col gap-3 pt-4 border-t border-current/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold opacity-75">
            <Type className="w-4 h-4 text-orange-500" />
            <span>قلم و تایپوگرافی کاتالوگ</span>
          </div>
          <span className="text-[10px] text-orange-400 font-bold">
            ایران‌یکان / ایران‌سنس / وزیر
          </span>
        </div>

        {/* Font Weight Selector (Regular, Medium, Bold, Black) */}
        <div className="flex flex-col gap-1.5 p-3 rounded-2xl border border-current/15 bg-black/5 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold">وزن و ضخامت فونت (Font Weight):</span>
            <span className="text-[11px] font-mono text-orange-400 font-bold">
              {FONT_WEIGHTS[state.fw || 'medium'].weight}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 mt-1">
            {(Object.keys(FONT_WEIGHTS) as FontWeightKey[]).map((wKey) => {
              const wItem = FONT_WEIGHTS[wKey];
              const isSelected = (state.fw || 'medium') === wKey;
              return (
                <button
                  key={wKey}
                  onClick={() =>
                    onUpdateState((prev) => ({
                      ...prev,
                      fw: wKey,
                    }))
                  }
                  className={`p-2 rounded-xl border text-right transition-all cursor-pointer flex flex-col gap-0.5 ${
                    isSelected
                      ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold shadow-sm'
                      : 'border-current/15 hover:border-orange-500/30'
                  }`}
                >
                  <span
                    className="text-xs"
                    style={{ fontWeight: wItem.weight }}
                  >
                    {wItem.label}
                  </span>
                  <span className="text-[9px] opacity-65 line-clamp-1">
                    {wItem.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Font Family List */}
        <div className="flex flex-col gap-1.5">
          {(Object.keys(FONT_CONFIG) as FontKey[]).map((fKey) => {
            const fItem = FONT_CONFIG[fKey];
            const isSelected = state.f === fKey;
            return (
              <button
                key={fKey}
                onClick={() => handleFontChange(fKey)}
                className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-current/15 hover:border-orange-500/40 bg-black/5 dark:bg-white/5'
                }`}
                style={{
                  fontFamily: fItem.bodyFont,
                  fontWeight: FONT_WEIGHTS[state.fw || 'medium'].weight,
                }}
              >
                <div className="flex flex-col gap-0.5">
                  <b className="text-sm">{fItem.name}</b>
                  <span className="text-[11px] opacity-65 font-sans font-normal">
                    {fKey === 'custom' && state.customFontName
                      ? `فایل بارگذاری شده: ${state.customFontName}`
                      : fItem.desc}
                  </span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-orange-500" />}
              </button>
            );
          })}
        </div>

        {/* Custom Font File Upload (.woff2 / .ttf) */}
        <label className="p-3 rounded-2xl border-2 border-dashed border-orange-500/40 bg-orange-500/5 hover:bg-orange-500/15 transition-colors cursor-pointer flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <b className="text-orange-400">آپلود فایل فونت دلخواه (ایران‌یکان / ایران‌سنس)</b>
              <span className="text-[10px] opacity-70">
                پشتیبانی از فرمت‌های WOFF2, WOFF, TTF
              </span>
            </div>
          </div>
          <input
            type="file"
            accept=".woff2,.woff,.ttf,.otf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                const dataUrl = reader.result as string;
                try {
                  const fontFace = new FontFace('CustomUploadedFont', `url(${dataUrl})`);
                  fontFace.load().then((loadedFont) => {
                    document.fonts.add(loadedFont);
                  });
                } catch (err) {}

                onUpdateState((prev) => ({
                  ...prev,
                  f: 'custom',
                  customFontName: file.name,
                  customFontUrl: dataUrl,
                }));
              };
              reader.readAsDataURL(file);
              e.target.value = '';
            }}
          />
        </label>
      </section>
    </div>
  );
};
