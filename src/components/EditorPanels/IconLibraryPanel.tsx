import React, { useState, useMemo } from 'react';
import {
  SVG_ICONS,
  ICON_CATEGORIES,
  generateSvgTag,
} from '../../constants/icons';
import { CatalogState, IconBlock } from '../../types/catalog';
import {
  Search,
  Sparkles,
  Sliders,
  Plus,
  Compass,
  X,
  Code2,
  Check,
} from 'lucide-react';

interface IconLibraryPanelProps {
  state: CatalogState;
  currentPageIndex: number;
  onAddIconBlock: (block: IconBlock) => void;
  onOpenModal?: () => void;
}

export const IconLibraryPanel: React.FC<IconLibraryPanelProps> = ({
  state,
  currentPageIndex,
  onAddIconBlock,
  onOpenModal,
}) => {
  const [selectedIconId, setSelectedIconId] = useState('shield-check');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Icon options
  const [iconSize, setIconSize] = useState(48);
  const [colorType, setColorType] = useState<'accent' | 'text' | 'custom'>('accent');
  const [customColor, setCustomColor] = useState(state.c.ac);
  const [bgShape, setBgShape] = useState<'none' | 'circle' | 'rounded' | 'soft' | 'border'>('circle');
  const [caption, setCaption] = useState('');
  const [captionPos, setCaptionPos] = useState<'bottom' | 'side'>('bottom');
  const [align, setAlign] = useState<'right' | 'center' | 'left'>('center');

  const currentPage = state.pg[currentPageIndex] || state.pg[0];

  const filteredIcons = useMemo(() => {
    return SVG_ICONS.filter((item) => {
      const matchCat =
        activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchCat;
      const matchSearch =
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const effectiveColor =
    colorType === 'accent'
      ? state.c.ac
      : colorType === 'text'
      ? state.c.fg
      : customColor;

  const handleAdd = () => {
    const newBlock: IconBlock = {
      id: 'b_' + Math.random().toString(36).substring(2, 9),
      t: 'icon',
      iconName: selectedIconId,
      sz: iconSize,
      colorType,
      customColor,
      bgShape,
      caption: caption.trim() || undefined,
      captionPos,
      al: align,
    };
    onAddIconBlock(newBlock);
  };

  return (
    <div className="flex flex-col gap-5 p-4 text-right">
      {/* Top Banner & Quick Modal Trigger */}
      <div className="p-3.5 rounded-2xl border border-orange-500/30 bg-orange-500/10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <b className="text-xs font-bold text-orange-400 block">
              کتابخانه نشان‌های برداری (SVG)
            </b>
            <span className="text-[10px] opacity-70">
              جایگزینی متون طولانی با آیکون‌های جذاب و مدرن
            </span>
          </div>
        </div>

        {onOpenModal && (
          <button
            onClick={onOpenModal}
            className="px-2.5 py-1.5 rounded-xl bg-orange-500 text-white text-[11px] font-bold hover:bg-orange-600 transition-colors cursor-pointer flex-none"
          >
            پنجره بزرگ
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-50" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="جستجوی آیکون (گارانتی، ابزار، تخفیف، ارسال...)"
          className="w-full pr-9 pl-8 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 text-xs font-semibold focus:outline-none focus:border-orange-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1 opacity-50 hover:opacity-100"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {ICON_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-orange-500 text-white shadow-sm font-bold'
                : 'border border-current/15 bg-black/5 dark:bg-white/5 opacity-70 hover:opacity-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Icon Grid (Compact for sidebar) */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold opacity-75">
          انتخاب آیکون ({filteredIcons.length} مورد):
        </span>
        <div className="grid grid-cols-4 gap-2 max-h-56 overflow-y-auto no-scrollbar p-1 border border-current/10 rounded-2xl bg-black/5 dark:bg-white/5">
          {filteredIcons.map((item) => {
            const isSelected = selectedIconId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedIconId(item.id)}
                className={`p-2 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-orange-500 bg-orange-500/20 shadow-sm ring-1 ring-orange-500'
                    : 'border-transparent hover:border-current/20 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                title={item.name}
              >
                <div
                  className="w-7 h-7 flex items-center justify-center"
                  style={{ color: isSelected ? state.c.ac : 'currentColor' }}
                  dangerouslySetInnerHTML={{
                    __html: generateSvgTag(item.id, 20, isSelected ? state.c.ac : 'currentColor'),
                  }}
                />
                <span className="text-[9px] font-semibold truncate max-w-full opacity-80">
                  {item.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="flex flex-col gap-2 p-3.5 rounded-2xl border border-current/15 bg-black/5 dark:bg-white/5">
        <span className="text-[11px] font-bold opacity-75">پیش‌نمایش زنده در کاتالوگ:</span>
        <div
          className="h-28 rounded-xl flex items-center justify-center p-2 relative shadow-inner"
          style={{ backgroundColor: state.c.bg }}
        >
          <div
            className={`inline-flex items-center transition-all ${
              captionPos === 'side' ? 'flex-row gap-2.5' : 'flex-col gap-1'
            } ${
              bgShape === 'circle'
                ? 'rounded-full'
                : bgShape === 'rounded'
                ? 'rounded-2xl'
                : bgShape === 'border'
                ? 'rounded-2xl border-2'
                : bgShape === 'soft'
                ? 'rounded-2xl backdrop-blur-sm'
                : ''
            }`}
            style={{
              padding: bgShape !== 'none' ? `${Math.max(6, iconSize * 0.25)}px` : '0',
              backgroundColor:
                bgShape === 'circle' || bgShape === 'rounded'
                  ? `color-mix(in srgb, ${effectiveColor} 18%, transparent)`
                  : bgShape === 'soft'
                  ? 'rgba(128,128,128,0.12)'
                  : 'transparent',
              borderColor: bgShape === 'border' ? effectiveColor : 'transparent',
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: generateSvgTag(selectedIconId, iconSize, effectiveColor),
              }}
            />
            {caption && (
              <span
                className="font-bold text-xs"
                style={{ color: state.c.fg }}
              >
                {caption}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Customization Sliders & Controls */}
      <div className="flex flex-col gap-3 text-xs">
        {/* Size Slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="opacity-75">اندازه آیکون:</span>
            <span className="font-mono text-orange-500 font-bold">{iconSize}px</span>
          </div>
          <input
            type="range"
            min="24"
            max="80"
            value={iconSize}
            onChange={(e) => setIconSize(parseInt(e.target.value, 10))}
            className="w-full accent-orange-500 cursor-pointer"
          />
        </div>

        {/* Color Type */}
        <div className="flex flex-col gap-1">
          <span className="opacity-75">رنگ آیکون:</span>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'accent', label: 'رنگ برند' },
              { id: 'text', label: 'رنگ متن' },
              { id: 'custom', label: 'دلخواه' },
            ].map((cOpt) => (
              <button
                key={cOpt.id}
                onClick={() => setColorType(cOpt.id as any)}
                className={`py-1.5 rounded-lg border text-[11px] font-semibold text-center cursor-pointer ${
                  colorType === cOpt.id
                    ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold'
                    : 'border-current/15'
                }`}
              >
                {cOpt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Frame Shape */}
        <div className="flex flex-col gap-1">
          <span className="opacity-75">کادر و پس‌زمینه:</span>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'circle', label: 'دایره' },
              { id: 'rounded', label: 'مربع گرد' },
              { id: 'border', label: 'قاب خطی' },
              { id: 'soft', label: 'شیشه‌ای' },
              { id: 'none', label: 'ساده' },
            ].map((sh) => (
              <button
                key={sh.id}
                onClick={() => setBgShape(sh.id as any)}
                className={`py-1 rounded-lg border text-[10px] font-semibold text-center cursor-pointer ${
                  bgShape === sh.id
                    ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold'
                    : 'border-current/15'
                }`}
              >
                {sh.label}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Caption */}
        <label className="flex flex-col gap-1">
          <span className="opacity-75">عنوان یا متن کوتاه (اختیاری):</span>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="مثال: ۲ سال گارانتی کتبی تعویض"
            className="w-full px-3 py-1.5 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 font-semibold text-xs"
          />
        </label>
      </div>

      {/* Add Button */}
      <button
        onClick={handleAdd}
        className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs transition-all shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer mt-1 active:scale-98"
      >
        <Plus className="w-4 h-4" />
        <span>افزودن این آیکون به صفحه «{currentPage.t}»</span>
      </button>
    </div>
  );
};
