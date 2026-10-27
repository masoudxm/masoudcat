import React, { useRef } from 'react';
import {
  BlockType,
  CatalogBlock,
  CatalogState,
  HeadingBlock,
  TextBlock,
  ImageBlock,
  LogoBlock,
  ButtonBlock,
  ProductCardBlock,
  ListBlock,
  BoxBlock,
  FeaturesBlock,
  ContactBlock,
  IconBlock,
} from '../../types/catalog';
import { createBlock, SAMPLE_IMAGES } from '../../constants/presets';
import { generateSvgTag } from '../../constants/icons';
import {
  Type,
  AlignRight,
  AlignCenter,
  AlignLeft,
  Image as ImageIcon,
  Link,
  Package,
  ListOrdered,
  MessageSquare,
  Bookmark,
  Minus,
  MoveVertical,
  Layers,
  Phone,
  Upload,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Move,
  Sliders,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Palette,
  MousePointer,
} from 'lucide-react';

interface ContentPanelProps {
  state: CatalogState;
  currentPageIndex: number;
  selectedBlockId?: string;
  onSelectBlock: (blockId: string) => void;
  onUpdateState: (updater: (prev: CatalogState) => CatalogState) => void;
  onOpenIconModal?: () => void;
  onPageChange?: (index: number) => void;
}

export const ContentPanel: React.FC<ContentPanelProps> = ({
  state,
  currentPageIndex,
  selectedBlockId,
  onSelectBlock,
  onUpdateState,
  onOpenIconModal,
  onPageChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentPage = state.pg[currentPageIndex] || state.pg[0];
  const selectedBlock = currentPage.bl.find((b) => b.id === selectedBlockId);

  const handleAddBlock = (type: BlockType) => {
    const newBlock = createBlock(type);
    onUpdateState((prev) => {
      const nextPages = [...prev.pg];
      nextPages[currentPageIndex] = {
        ...nextPages[currentPageIndex],
        bl: [...nextPages[currentPageIndex].bl, newBlock],
      };
      return { ...prev, pg: nextPages };
    });
    onSelectBlock(newBlock.id);
  };

  const handleUpdateBlock = (blockId: string, updates: Partial<CatalogBlock>) => {
    onUpdateState((prev) => {
      const nextPages = [...prev.pg];
      const curBl = nextPages[currentPageIndex].bl.map((b) =>
        b.id === blockId ? ({ ...b, ...updates } as CatalogBlock) : b
      );
      nextPages[currentPageIndex] = {
        ...nextPages[currentPageIndex],
        bl: curBl,
      };
      return { ...prev, pg: nextPages };
    });
  };

  const handleDeleteBlock = (blockId: string) => {
    onUpdateState((prev) => {
      const nextPages = [...prev.pg];
      nextPages[currentPageIndex] = {
        ...nextPages[currentPageIndex],
        bl: nextPages[currentPageIndex].bl.filter((b) => b.id !== blockId),
      };
      return { ...prev, pg: nextPages };
    });
  };

  const handleDuplicateBlock = (blockId: string) => {
    const idx = currentPage.bl.findIndex((b) => b.id === blockId);
    if (idx === -1) return;
    const blockToDup = currentPage.bl[idx];
    const duplicated: CatalogBlock = {
      ...JSON.parse(JSON.stringify(blockToDup)),
      id: 'b_' + Math.random().toString(36).substring(2, 9),
    };

    onUpdateState((prev) => {
      const nextPages = [...prev.pg];
      const nextBl = [...nextPages[currentPageIndex].bl];
      nextBl.splice(idx + 1, 0, duplicated);
      nextPages[currentPageIndex] = {
        ...nextPages[currentPageIndex],
        bl: nextBl,
      };
      return { ...prev, pg: nextPages };
    });
    onSelectBlock(duplicated.id);
  };

  const handleMoveBlock = (blockId: string, delta: number) => {
    const idx = currentPage.bl.findIndex((b) => b.id === blockId);
    if (idx === -1) return;
    const targetIdx = idx + delta;
    if (targetIdx < 0 || targetIdx >= currentPage.bl.length) return;

    onUpdateState((prev) => {
      const nextPages = [...prev.pg];
      const nextBl = [...nextPages[currentPageIndex].bl];
      const temp = nextBl[idx];
      nextBl[idx] = nextBl[targetIdx];
      nextBl[targetIdx] = temp;
      nextPages[currentPageIndex] = {
        ...nextPages[currentPageIndex],
        bl: nextBl,
      };
      return { ...prev, pg: nextPages };
    });
  };

  // Device file upload with canvas resizing
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetField: 'src') => {
    const file = e.target.files?.[0];
    if (!file || !selectedBlock) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 900;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          handleUpdateBlock(selectedBlock.id, { [targetField]: dataUrl });
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Block definitions for quick addition
  const ADD_BLOCKS: { type: BlockType; label: string; icon: React.ReactNode }[] = [
    { type: 'h', label: 'تیتر / عنوان', icon: <Type className="w-4 h-4" /> },
    { type: 'p', label: 'متن و پاراگراف', icon: <AlignRight className="w-4 h-4" /> },
    { type: 'img', label: 'عکس و گالری', icon: <ImageIcon className="w-4 h-4" /> },
    { type: 'prod', label: 'کارت محصول', icon: <Package className="w-4 h-4" /> },
    { type: 'btn', label: 'دکمه و لینک', icon: <Link className="w-4 h-4" /> },
    { type: 'list', label: 'لیست ویژگی‌ها', icon: <ListOrdered className="w-4 h-4" /> },
    { type: 'box', label: 'کادر نکته و پیام', icon: <MessageSquare className="w-4 h-4" /> },
    { type: 'icon', label: 'آیکون برداری SVG', icon: <Sparkles className="w-4 h-4 text-orange-400" /> },
    { type: 'features', label: '۳ ستون مزیت', icon: <Sparkles className="w-4 h-4" /> },
    { type: 'contact', label: 'اطلاعات تماس', icon: <Phone className="w-4 h-4" /> },
    { type: 'toc', label: 'فهرست خودکار', icon: <Bookmark className="w-4 h-4" /> },
    { type: 'logo', label: 'لوگو برند', icon: <Layers className="w-4 h-4" /> },
    { type: 'hr', label: 'خط جداکننده', icon: <Minus className="w-4 h-4" /> },
    { type: 'sp', label: 'فاصله عمودی', icon: <MoveVertical className="w-4 h-4" /> },
  ];

  const getBlockName = (type: BlockType) => {
    const item = ADD_BLOCKS.find((b) => b.type === type);
    return item ? item.label : type;
  };

  return (
    <div className="flex flex-col gap-6 p-4 text-right">
      {/* Page Layout Mode Switcher */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-current/15 text-xs shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center">
            <Move className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-right">
            <span className="font-bold text-xs">حالت چیدمان این صفحه:</span>
            <span className="text-[10px] opacity-65">
              {currentPage.layoutMode === 'free'
                ? 'جابجایی آزاد (المان‌ها با کشیدن ماوس حرکت می‌کنند)'
                : 'ردیفی خودکار (مرتب در ستون‌ها)'}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            const cur = currentPage.layoutMode || 'flow';
            const next = cur === 'flow' ? 'free' : 'flow';
            onUpdateState((prev) => {
              const nextP = [...prev.pg];
              nextP[currentPageIndex] = { ...nextP[currentPageIndex], layoutMode: next };
              return { ...prev, pg: nextP };
            });
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            currentPage.layoutMode === 'free'
              ? 'border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/20'
              : 'border-current/20 bg-black/5 dark:bg-white/5 hover:border-orange-400'
          }`}
        >
          {currentPage.layoutMode === 'free' ? 'چیدمان دستی (فعال)' : 'تغییر به جابجایی دستی'}
        </button>
      </div>

      {/* 1. Add New Blocks Grid */}
      <section className="flex flex-col gap-2.5">
        {onOpenIconModal && (
          <button
            onClick={onOpenIconModal}
            className="w-full p-3 rounded-2xl border border-orange-500/40 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-bold text-xs flex items-center justify-between transition-all cursor-pointer shadow-sm group"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4" />
              </span>
              <div className="flex flex-col text-right">
                <span className="text-white font-bold text-xs group-hover:text-orange-300">
                  کتابخانه جامع آیکون‌های برداری (SVG)
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  جستجو و افزودن آیکون‌های باکیفیت و جذاب به کاتالوگ
                </span>
              </div>
            </div>
            <span className="text-[11px] bg-orange-500 text-white px-2.5 py-1 rounded-lg font-bold">
              باز کردن گالری
            </span>
          </button>
        )}

        <span className="text-xs font-bold opacity-75 mt-1">
          افزودن جزء جدید به صفحه جاری ({currentPage.t})
        </span>
        <div className="grid grid-cols-3 gap-2">
          {ADD_BLOCKS.map((item) => (
            <button
              key={item.type}
              onClick={() => handleAddBlock(item.type)}
              className="p-2.5 rounded-xl border border-current/15 hover:border-orange-500 hover:bg-orange-500/10 transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 text-center bg-black/5 dark:bg-white/5 group"
            >
              <div className="text-orange-500 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="text-[11px] font-semibold leading-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 2. Selected Block Live Editor Form */}
      {selectedBlock ? (
        <section className="flex flex-col gap-3 p-3.5 rounded-2xl border-2 border-orange-500/40 bg-orange-500/5">
          <div className="flex items-center justify-between border-b border-current/10 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <b className="text-xs font-bold text-orange-500">
                ویرایش: {getBlockName(selectedBlock.t)}
              </b>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleDuplicateBlock(selectedBlock.id)}
                className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 text-xs"
                title="تکثیر این بلوک"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDeleteBlock(selectedBlock.id)}
                className="p-1 rounded text-red-500 hover:bg-red-500/10 text-xs"
                title="حذف این بلوک"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Form fields based on block type */}
          {selectedBlock.t === 'h' && (
            <div className="flex flex-col gap-3 text-xs">
              <label className="flex flex-col gap-1">
                <span className="opacity-75">متن تیتر:</span>
                <input
                  type="text"
                  value={(selectedBlock as HeadingBlock).x}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, { x: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 font-bold"
                />
              </label>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="opacity-75">اندازه فونت:</span>
                  <span className="font-mono text-orange-500">
                    {(selectedBlock as HeadingBlock).sz}px
                  </span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="48"
                  value={(selectedBlock as HeadingBlock).sz}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, {
                      sz: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              {/* Alignment */}
              <div className="flex flex-col gap-1">
                <span className="opacity-75">چینش متن:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'right', label: 'راست‌چین' },
                    { id: 'center', label: 'وسط‌چین' },
                    { id: 'left', label: 'چپ‌چین' },
                  ].map((al) => (
                    <button
                      key={al.id}
                      onClick={() =>
                        handleUpdateBlock(selectedBlock.id, { al: al.id as any })
                      }
                      className={`py-1.5 rounded-lg border text-[11px] font-semibold text-center cursor-pointer ${
                        (selectedBlock as HeadingBlock).al === al.id
                          ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold'
                          : 'border-current/15'
                      }`}
                    >
                      {al.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Heading Style */}
              <div className="flex flex-col gap-1">
                <span className="opacity-75">استایل گرافیکی تیتر:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'b', label: 'نوار عمودی رنگی (راست)' },
                    { id: 'c', label: 'خط افقی زیرین' },
                    { id: 'd', label: 'کپسول و برچسب رنگی' },
                    { id: 'a', label: 'ساده بدون خط' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      onClick={() =>
                        handleUpdateBlock(selectedBlock.id, { hs: st.id as any })
                      }
                      className={`p-2 rounded-lg border text-[11px] font-semibold text-center cursor-pointer ${
                        (selectedBlock as HeadingBlock).hs === st.id
                          ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold'
                          : 'border-current/15'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedBlock.t === 'p' && (
            <div className="flex flex-col gap-3 text-xs">
              <label className="flex flex-col gap-1">
                <span className="opacity-75">متن پاراگراف:</span>
                <textarea
                  rows={4}
                  value={(selectedBlock as TextBlock).x}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, { x: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 leading-relaxed"
                />
              </label>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="opacity-75">اندازه قلم:</span>
                  <span className="font-mono text-orange-500">
                    {(selectedBlock as TextBlock).sz}px
                  </span>
                </div>
                <input
                  type="range"
                  min="11"
                  max="24"
                  value={(selectedBlock as TextBlock).sz}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, {
                      sz: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'right', label: 'راست' },
                  { id: 'center', label: 'وسط' },
                  { id: 'left', label: 'چپ' },
                ].map((al) => (
                  <button
                    key={al.id}
                    onClick={() =>
                      handleUpdateBlock(selectedBlock.id, { al: al.id as any })
                    }
                    className={`py-1.5 rounded-lg border text-[11px] font-semibold text-center cursor-pointer ${
                      (selectedBlock as TextBlock).al === al.id
                        ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold'
                        : 'border-current/15'
                    }`}
                  >
                    {al.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedBlock.t === 'img' && (
            <div className="flex flex-col gap-3 text-xs">
              {/* File Upload Button */}
              <div className="flex flex-col gap-1.5">
                <span className="opacity-75">بارگذاری مستقیم عکس از حافظه دستگاه:</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'src')}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-orange-500/60 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 font-bold transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>انتخاب عکس از گالری / کامپیوتر</span>
                </button>
              </div>

              {/* URL input */}
              <label className="flex flex-col gap-1">
                <span className="opacity-75">یا وارد کردن لینک تصویر (URL):</span>
                <input
                  type="text"
                  value={
                    (selectedBlock as ImageBlock).src.startsWith('data:')
                      ? ''
                      : (selectedBlock as ImageBlock).src
                  }
                  placeholder="https://images.unsplash.com/..."
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, { src: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 font-mono text-[11px]"
                />
              </label>

              {/* Quick sample pick */}
              <div className="flex flex-col gap-1">
                <span className="opacity-75">عکس‌های آماده و باکیفیت:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {SAMPLE_IMAGES.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        handleUpdateBlock(selectedBlock.id, { src: s.url })
                      }
                      className="relative h-14 rounded-lg overflow-hidden border border-current/20 group cursor-pointer"
                    >
                      <img
                        src={s.url}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                      <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-[9px] text-white font-bold p-1 text-center">
                        {s.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Height slider */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="opacity-75">ارتفاع تصویر:</span>
                  <span className="font-mono text-orange-500">
                    {(selectedBlock as ImageBlock).ht}px
                  </span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="450"
                  value={(selectedBlock as ImageBlock).ht}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, {
                      ht: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              {/* Caption */}
              <label className="flex flex-col gap-1">
                <span className="opacity-75">توضیح زیر عکس (اختیاری):</span>
                <input
                  type="text"
                  value={(selectedBlock as ImageBlock).caption || ''}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, { caption: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5"
                />
              </label>
            </div>
          )}

          {selectedBlock.t === 'prod' && (
            <div className="flex flex-col gap-3 text-xs">
              <label className="flex flex-col gap-1">
                <span className="opacity-75">نام محصول / دستگاه:</span>
                <input
                  type="text"
                  value={(selectedBlock as ProductCardBlock).x}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, { x: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 font-bold"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="opacity-75">توضیح کوتاه و مشخصات:</span>
                <textarea
                  rows={2}
                  value={(selectedBlock as ProductCardBlock).d}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, { d: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 leading-relaxed"
                />
              </label>

              <div className="grid grid-cols-2 gap-2">
                <label className="flex flex-col gap-1">
                  <span className="opacity-75">برچسب قیمت / گارانتی:</span>
                  <input
                    type="text"
                    value={(selectedBlock as ProductCardBlock).pr}
                    onChange={(e) =>
                      handleUpdateBlock(selectedBlock.id, { pr: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 font-bold text-orange-500"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="opacity-75">نشان ویژه (Badge):</span>
                  <input
                    type="text"
                    value={(selectedBlock as ProductCardBlock).badge || ''}
                    placeholder="مثال: پرفروش، ویژه"
                    onChange={(e) =>
                      handleUpdateBlock(selectedBlock.id, { badge: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5"
                  />
                </label>
              </div>

              {/* Product Photo Upload */}
              <div className="flex flex-col gap-1">
                <span className="opacity-75">عکس محصول:</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={
                      (selectedBlock as ProductCardBlock).src.startsWith('data:')
                        ? ''
                        : (selectedBlock as ProductCardBlock).src
                    }
                    placeholder="آدرس عکس اینترنتی"
                    onChange={(e) =>
                      handleUpdateBlock(selectedBlock.id, { src: e.target.value })
                    }
                    className="flex-1 px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 font-mono text-[10px]"
                  />
                  <label className="px-3 py-2 rounded-xl bg-orange-500 text-white font-bold cursor-pointer text-center flex items-center justify-center">
                    <Upload className="w-3.5 h-3.5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'src')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Layout horizontal / vertical */}
              <div className="flex flex-col gap-1">
                <span className="opacity-75">چیدمان کارت محصول:</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'horizontal', label: 'افقی (ردیفی)' },
                    { id: 'vertical', label: 'عمودی (ستونی)' },
                  ].map((ly) => (
                    <button
                      key={ly.id}
                      onClick={() =>
                        handleUpdateBlock(selectedBlock.id, {
                          layout: ly.id as any,
                        })
                      }
                      className={`p-2 rounded-lg border text-[11px] font-semibold text-center cursor-pointer ${
                        (selectedBlock as ProductCardBlock).layout === ly.id
                          ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold'
                          : 'border-current/15'
                      }`}
                    >
                      {ly.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedBlock.t === 'btn' && (
            <div className="flex flex-col gap-3 text-xs">
              <label className="flex flex-col gap-1">
                <span className="opacity-75">متن روی دکمه:</span>
                <input
                  type="text"
                  value={(selectedBlock as ButtonBlock).x}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, { x: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 font-bold"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="opacity-75">لینک مقصد:</span>
                <input
                  type="text"
                  value={(selectedBlock as ButtonBlock).u}
                  placeholder="https://... یا برای پرش به صفحه ۳ بنویسید #3"
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, { u: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 font-mono text-left"
                  dir="ltr"
                />
                <span className="text-[10px] opacity-60">
                  راهنما: برای لینک به صفحه کاتالوگ از <code className="text-orange-400">#شماره_صفحه</code> مثل <code className="text-orange-400">#2</code> استفاده کنید.
                </span>
              </label>

              {/* Button Shape */}
              <div className="flex flex-col gap-1">
                <span className="opacity-75">شکل و ظاهر دکمه:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'f', label: 'توپُر و شاخص' },
                    { id: 'o', label: 'خطی و شفاف' },
                    { id: 'p', label: 'کپسولی کاملاً گرد' },
                    { id: 'd', label: 'رنگ محو و ملایم' },
                    { id: 's', label: 'مربعی و گوشه تیز' },
                  ].map((sh) => (
                    <button
                      key={sh.id}
                      onClick={() =>
                        handleUpdateBlock(selectedBlock.id, { sh: sh.id as any })
                      }
                      className={`p-2 rounded-lg border text-[11px] font-semibold text-center cursor-pointer ${
                        (selectedBlock as ButtonBlock).sh === sh.id
                          ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold'
                          : 'border-current/15'
                      }`}
                    >
                      {sh.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Align */}
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'right', label: 'راست' },
                  { id: 'center', label: 'وسط' },
                  { id: 'left', label: 'چپ' },
                ].map((al) => (
                  <button
                    key={al.id}
                    onClick={() =>
                      handleUpdateBlock(selectedBlock.id, { al: al.id as any })
                    }
                    className={`py-1.5 rounded-lg border text-[11px] font-semibold text-center cursor-pointer ${
                      (selectedBlock as ButtonBlock).al === al.id
                        ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold'
                        : 'border-current/15'
                    }`}
                  >
                    {al.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedBlock.t === 'list' && (
            <div className="flex flex-col gap-3 text-xs">
              <label className="flex flex-col gap-1">
                <span className="opacity-75">آیتم‌های لیست (هر سطر یک مورد):</span>
                <textarea
                  rows={4}
                  value={(selectedBlock as ListBlock).x}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, { x: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 leading-relaxed"
                />
              </label>

              {/* List bullet style */}
              <div className="flex flex-col gap-1">
                <span className="opacity-75">آیکون نشانگر لیست:</span>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'k', label: 'تیک ✓' },
                    { id: 'b', label: 'نقطه •' },
                    { id: 'n', label: 'شماره ۱.' },
                    { id: 'star', label: 'ستاره ★' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      onClick={() =>
                        handleUpdateBlock(selectedBlock.id, { st: st.id as any })
                      }
                      className={`p-2 rounded-lg border text-[11px] font-semibold text-center cursor-pointer ${
                        (selectedBlock as ListBlock).st === st.id
                          ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold'
                          : 'border-current/15'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedBlock.t === 'box' && (
            <div className="flex flex-col gap-3 text-xs">
              <label className="flex flex-col gap-1">
                <span className="opacity-75">تیتر کادر نکته (اختیاری):</span>
                <input
                  type="text"
                  value={(selectedBlock as BoxBlock).title || ''}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, { title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 font-bold"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="opacity-75">متن نکته یا پیام ویژه:</span>
                <textarea
                  rows={3}
                  value={(selectedBlock as BoxBlock).x}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, { x: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 leading-relaxed"
                />
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'accent-right', label: 'نوار عمودی' },
                  { id: 'glass', label: 'شیشه‌ای مات' },
                  { id: 'quote', label: 'نقل قول ❝' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() =>
                      handleUpdateBlock(selectedBlock.id, { st: st.id as any })
                    }
                    className={`p-2 rounded-lg border text-[11px] font-semibold text-center cursor-pointer ${
                      (selectedBlock as BoxBlock).st === st.id
                        ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold'
                        : 'border-current/15'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedBlock.t === 'contact' && (
            <div className="flex flex-col gap-2.5 text-xs">
              <label className="flex flex-col gap-1">
                <span className="opacity-75">شماره تماس:</span>
                <input
                  type="text"
                  value={(selectedBlock as ContactBlock).phone}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, { phone: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="opacity-75">آدرس وب‌سایت:</span>
                <input
                  type="text"
                  value={(selectedBlock as ContactBlock).website}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, { website: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 font-mono"
                  dir="ltr"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="opacity-75">ایمیل سازمانی:</span>
                <input
                  type="text"
                  value={(selectedBlock as ContactBlock).email}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, { email: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 font-mono"
                  dir="ltr"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="opacity-75">پیج اینستاگرام / تلگرام:</span>
                <input
                  type="text"
                  value={(selectedBlock as ContactBlock).instagram}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, {
                      instagram: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 font-mono"
                  dir="ltr"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="opacity-75">آدرس کارخانه یا دفتر مرکزی:</span>
                <input
                  type="text"
                  value={(selectedBlock as ContactBlock).address}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, { address: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5"
                />
              </label>
            </div>
          )}

          {selectedBlock.t === 'icon' && (
            <div className="flex flex-col gap-3 text-xs">
              {/* Quick Change Icon in Modal */}
              {onOpenIconModal && (
                <button
                  type="button"
                  onClick={onOpenIconModal}
                  className="w-full py-2.5 rounded-xl border border-orange-500/40 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>تغییر آیکون (انتخاب از بین ۸۰+ نشان SVG)</span>
                </button>
              )}

              {/* Size Slider */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="opacity-75">اندازه آیکون:</span>
                  <span className="font-mono text-orange-500 font-bold">
                    {(selectedBlock as IconBlock).sz}px
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="96"
                  value={(selectedBlock as IconBlock).sz}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, {
                      sz: parseInt(e.target.value, 10),
                    })
                  }
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
                      onClick={() =>
                        handleUpdateBlock(selectedBlock.id, {
                          colorType: cOpt.id as any,
                        })
                      }
                      className={`py-1.5 rounded-lg border text-[11px] font-semibold text-center cursor-pointer ${
                        (selectedBlock as IconBlock).colorType === cOpt.id
                          ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold'
                          : 'border-current/15'
                      }`}
                    >
                      {cOpt.label}
                    </button>
                  ))}
                </div>

                {(selectedBlock as IconBlock).colorType === 'custom' && (
                  <label className="flex items-center justify-between p-2 rounded-xl border border-current/15 bg-black/5 dark:bg-white/5 mt-1 cursor-pointer">
                    <span className="text-[11px] opacity-80">انتخاب رنگ:</span>
                    <input
                      type="color"
                      value={(selectedBlock as IconBlock).customColor || state.c.ac}
                      onChange={(e) =>
                        handleUpdateBlock(selectedBlock.id, {
                          customColor: e.target.value,
                        })
                      }
                      className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                    />
                  </label>
                )}
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
                    { id: 'none', label: 'بدون کادر' },
                  ].map((sh) => (
                    <button
                      key={sh.id}
                      onClick={() =>
                        handleUpdateBlock(selectedBlock.id, {
                          bgShape: sh.id as any,
                        })
                      }
                      className={`py-1.5 rounded-lg border text-[10px] font-semibold text-center cursor-pointer ${
                        (selectedBlock as IconBlock).bgShape === sh.id
                          ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold'
                          : 'border-current/15'
                      }`}
                    >
                      {sh.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Caption */}
              <label className="flex flex-col gap-1">
                <span className="opacity-75">عنوان یا متن کوتاه همراه آیکون:</span>
                <input
                  type="text"
                  value={(selectedBlock as IconBlock).caption || ''}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, {
                      caption: e.target.value,
                    })
                  }
                  placeholder="مثال: ۲ سال گارانتی تعویض"
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 font-semibold"
                />
              </label>

              {/* Caption Position & Align */}
              {(selectedBlock as IconBlock).caption && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="opacity-75 text-[10px]">موقعیت متن:</span>
                    <div className="grid grid-cols-2 gap-1">
                      <button
                        onClick={() =>
                          handleUpdateBlock(selectedBlock.id, {
                            captionPos: 'bottom',
                          })
                        }
                        className={`py-1 rounded-lg border text-[10px] ${
                          (selectedBlock as IconBlock).captionPos === 'bottom'
                            ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold'
                            : 'border-current/15'
                        }`}
                      >
                        زیر آیکون
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateBlock(selectedBlock.id, {
                            captionPos: 'side',
                          })
                        }
                        className={`py-1 rounded-lg border text-[10px] ${
                          (selectedBlock as IconBlock).captionPos === 'side'
                            ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold'
                            : 'border-current/15'
                        }`}
                      >
                        کنار آیکون
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="opacity-75 text-[10px]">چینش:</span>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: 'right', label: 'راست' },
                        { id: 'center', label: 'وسط' },
                        { id: 'left', label: 'چپ' },
                      ].map((al) => (
                        <button
                          key={al.id}
                          onClick={() =>
                            handleUpdateBlock(selectedBlock.id, {
                              al: al.id as any,
                            })
                          }
                          className={`py-1 rounded-lg border text-[10px] ${
                            (selectedBlock as IconBlock).al === al.id
                              ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold'
                              : 'border-current/15'
                          }`}
                        >
                          {al.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedBlock.t === 'sp' && (
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex justify-between">
                <span className="opacity-75">میزان فاصله خالی:</span>
                <span className="font-mono text-orange-500">
                  {(selectedBlock as any).ht}px
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="120"
                value={(selectedBlock as any).ht}
                onChange={(e) =>
                  handleUpdateBlock(selectedBlock.id, {
                    ht: parseInt(e.target.value, 10),
                  })
                }
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>
          )}

          {/* Universal Section A: Manual Free Positioning & Coordinates */}
          <div className="flex flex-col gap-3 pt-3 mt-2 border-t border-current/15 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-orange-400">
                <Move className="w-3.5 h-3.5" />
                <span>موقعیت و جابجایی دستی در صفحه:</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleUpdateBlock(selectedBlock.id, {
                    isFree: !selectedBlock.isFree,
                    posX: selectedBlock.posX ?? 50,
                    posY: selectedBlock.posY ?? 50,
                  })
                }
                className={`px-2.5 py-1 rounded-lg font-bold border text-[11px] transition-all cursor-pointer ${
                  selectedBlock.isFree || currentPage.layoutMode === 'free'
                    ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                    : 'border-current/20 bg-black/5 dark:bg-white/5 opacity-80'
                }`}
              >
                {selectedBlock.isFree || currentPage.layoutMode === 'free'
                  ? 'المان آزاد (شناور)'
                  : 'چیدمان ردیفی'}
              </button>
            </div>

            {(selectedBlock.isFree || currentPage.layoutMode === 'free') && (
              <div className="flex flex-col gap-2.5 p-2.5 rounded-xl bg-black/10 dark:bg-white/5 border border-current/10">
                {/* Horizontal Coordinate X */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="opacity-75">موقعیت افقی (مختصات X):</span>
                    <span className="font-mono font-bold text-orange-400">
                      {selectedBlock.posX ?? 50}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="97"
                    value={selectedBlock.posX ?? 50}
                    onChange={(e) =>
                      handleUpdateBlock(selectedBlock.id, {
                        posX: parseInt(e.target.value, 10),
                        isFree: true,
                      })
                    }
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                </div>

                {/* Vertical Coordinate Y */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="opacity-75">موقعیت عمودی (مختصات Y):</span>
                    <span className="font-mono font-bold text-orange-400">
                      {selectedBlock.posY ?? 50}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="97"
                    value={selectedBlock.posY ?? 50}
                    onChange={(e) =>
                      handleUpdateBlock(selectedBlock.id, {
                        posY: parseInt(e.target.value, 10),
                        isFree: true,
                      })
                    }
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                </div>

                {/* Quick Preset Positions */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] opacity-70">پرش سریع به موقعیت‌های استاندارد:</span>
                  <div className="grid grid-cols-5 gap-1">
                    {[
                      { label: 'مرکز', x: 50, y: 50 },
                      { label: 'بالا-راست', x: 80, y: 15 },
                      { label: 'بالا-چپ', x: 20, y: 15 },
                      { label: 'پایین-راست', x: 80, y: 85 },
                      { label: 'پایین-چپ', x: 20, y: 85 },
                    ].map((pos, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() =>
                          handleUpdateBlock(selectedBlock.id, {
                            posX: pos.x,
                            posY: pos.y,
                            isFree: true,
                          })
                        }
                        className="py-1 rounded-md border border-current/15 text-[9px] hover:border-orange-500 hover:text-orange-400 transition-colors"
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Micro Nudge Arrows for Precision Placement */}
                <div className="flex items-center justify-between pt-1 border-t border-current/10">
                  <span className="text-[10px] opacity-70">تنظیم میلی‌متری (پیکسل):</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateBlock(selectedBlock.id, {
                          posX: Math.min(98, (selectedBlock.posX ?? 50) + 1),
                          isFree: true,
                        })
                      }
                      className="p-1 rounded bg-black/10 dark:bg-white/10 hover:bg-orange-500 hover:text-white"
                      title="حرکت به راست"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateBlock(selectedBlock.id, {
                          posY: Math.max(2, (selectedBlock.posY ?? 50) - 1),
                          isFree: true,
                        })
                      }
                      className="p-1 rounded bg-black/10 dark:bg-white/10 hover:bg-orange-500 hover:text-white"
                      title="حرکت به بالا"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateBlock(selectedBlock.id, {
                          posY: Math.min(98, (selectedBlock.posY ?? 50) + 1),
                          isFree: true,
                        })
                      }
                      className="p-1 rounded bg-black/10 dark:bg-white/10 hover:bg-orange-500 hover:text-white"
                      title="حرکت به پایین"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateBlock(selectedBlock.id, {
                          posX: Math.max(2, (selectedBlock.posX ?? 50) - 1),
                          isFree: true,
                        })
                      }
                      className="p-1 rounded bg-black/10 dark:bg-white/10 hover:bg-orange-500 hover:text-white"
                      title="حرکت به چپ"
                    >
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Width percentage */}
                <div className="flex flex-col gap-1 pt-1 border-t border-current/10">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="opacity-75">عرض المان در صفحه:</span>
                    <span className="font-mono font-bold text-orange-400">
                      {selectedBlock.posW ? `${selectedBlock.posW}%` : 'خودکار (محتوا)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={selectedBlock.posW ?? 50}
                      onChange={(e) =>
                        handleUpdateBlock(selectedBlock.id, {
                          posW: parseInt(e.target.value, 10),
                        })
                      }
                      className="flex-1 accent-orange-500 cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateBlock(selectedBlock.id, {
                          posW: undefined,
                        })
                      }
                      className="px-2 py-0.5 rounded text-[10px] border border-current/20 hover:border-orange-500"
                    >
                      خودکار
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Universal Section B: Custom Colors & Styling */}
          <div className="flex flex-col gap-3 pt-3 border-t border-current/15 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-orange-400">
              <Palette className="w-3.5 h-3.5" />
              <span>رنگ، ابعاد و کادر اختصاصی:</span>
            </div>

            {/* Scale slider */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[11px]">
                <span className="opacity-75">مقیاس و اندازه کلی (Scale):</span>
                <span className="font-mono text-orange-400 font-bold">
                  {Math.round((selectedBlock.scale ?? 1) * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                value={Math.round((selectedBlock.scale ?? 1) * 100)}
                onChange={(e) =>
                  handleUpdateBlock(selectedBlock.id, {
                    scale: parseInt(e.target.value, 10) / 100,
                  })
                }
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>

            {/* Custom Color Pickers */}
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center justify-between p-2 rounded-xl border border-current/15 bg-black/5 dark:bg-white/5 cursor-pointer">
                <span className="text-[11px] opacity-80">رنگ اختصاصی:</span>
                <input
                  type="color"
                  value={selectedBlock.customColor || state.c.ac}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, {
                      customColor: e.target.value,
                    })
                  }
                  className="w-6 h-6 rounded border-0 bg-transparent cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl border border-current/15 bg-black/5 dark:bg-white/5 cursor-pointer">
                <span className="text-[11px] opacity-80">رنگ پس‌زمینه:</span>
                <input
                  type="color"
                  value={selectedBlock.customBg || state.c.sf}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, {
                      customBg: e.target.value,
                    })
                  }
                  className="w-6 h-6 rounded border-0 bg-transparent cursor-pointer"
                />
              </label>
            </div>

            {/* Border Radius */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[11px]">
                <span className="opacity-75">گردی گوشه‌ها (Border Radius):</span>
                <span className="font-mono text-orange-400 font-bold">
                  {selectedBlock.customRadius ?? state.c.r}px
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="48"
                value={selectedBlock.customRadius ?? state.c.r}
                onChange={(e) =>
                  handleUpdateBlock(selectedBlock.id, {
                    customRadius: parseInt(e.target.value, 10),
                  })
                }
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Universal Section C: Click Action & Navigation */}
          <div className="flex flex-col gap-3 pt-3 border-t border-current/15 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-orange-400">
                <MousePointer className="w-3.5 h-3.5" />
                <span>عملیات کلیک و تعامل المان (اکشن و لینک):</span>
              </div>
              {selectedBlock.actionType && selectedBlock.actionType !== 'none' && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                  لینک‌دار
                </span>
              )}
            </div>

            {/* Action Type Selector */}
            <div className="grid grid-cols-4 gap-1">
              {[
                { id: 'none', label: 'بدون اکشن' },
                { id: 'page', label: 'پرش به صفحه' },
                { id: 'link', label: 'لینک اینترنتی' },
                { id: 'tel', label: 'تماس تلفنی' },
              ].map((act) => (
                <button
                  key={act.id}
                  type="button"
                  onClick={() =>
                    handleUpdateBlock(selectedBlock.id, {
                      actionType: act.id as any,
                    })
                  }
                  className={`py-1.5 px-1 rounded-lg border text-[10px] font-bold text-center transition-all cursor-pointer ${
                    (selectedBlock.actionType || 'none') === act.id
                      ? 'border-orange-500 bg-orange-500 text-white shadow-sm'
                      : 'border-current/15 bg-black/5 dark:bg-white/5 opacity-80 hover:opacity-100'
                  }`}
                >
                  {act.label}
                </button>
              ))}
            </div>

            {/* Page Jump Target Selector */}
            {selectedBlock.actionType === 'page' && (
              <label className="flex flex-col gap-1 p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <span className="font-bold text-[11px] text-orange-400">
                  انتخاب صفحه مقصد برای پرش هنگام کلیک:
                </span>
                <select
                  value={selectedBlock.actionPage ?? 0}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, {
                      actionPage: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-slate-900 text-white font-semibold cursor-pointer"
                >
                  {state.pg.map((p, pIdx) => (
                    <option key={p.id} value={pIdx}>
                      صفحه {pIdx + 1}: {p.t}
                    </option>
                  ))}
                </select>
                {onPageChange && (
                  <button
                    type="button"
                    onClick={() => onPageChange(selectedBlock.actionPage ?? 0)}
                    className="mt-1.5 self-start text-[11px] font-bold text-orange-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>تست پرش به این صفحه</span>
                  </button>
                )}
              </label>
            )}

            {/* External URL Input */}
            {selectedBlock.actionType === 'link' && (
              <label className="flex flex-col gap-1 p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <span className="font-bold text-[11px] text-orange-400">
                  آدرس اینترنتی مقصد (سایت یا شبکه‌های اجتماعی):
                </span>
                <input
                  type="text"
                  value={selectedBlock.actionUrl || ''}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, {
                      actionUrl: e.target.value,
                    })
                  }
                  placeholder="https://mybrand.ir یا instagram.com/page یا wa.me/..."
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/10 dark:bg-white/10 font-mono text-[11px] text-left"
                  dir="ltr"
                />
                {selectedBlock.actionUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      const u = selectedBlock.actionUrl!;
                      const formatted = u.startsWith('http') ? u : `https://${u}`;
                      window.open(formatted, '_blank');
                    }}
                    className="mt-1.5 self-start text-[11px] font-bold text-orange-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>تست باز کردن لینک</span>
                  </button>
                )}
              </label>
            )}

            {/* Telephone Dial Input */}
            {selectedBlock.actionType === 'tel' && (
              <label className="flex flex-col gap-1 p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <span className="font-bold text-[11px] text-orange-400">
                  شماره تماس مستقیم جهت تماس سریع مخاطب:
                </span>
                <input
                  type="text"
                  value={selectedBlock.actionTel || ''}
                  onChange={(e) =>
                    handleUpdateBlock(selectedBlock.id, {
                      actionTel: e.target.value,
                    })
                  }
                  placeholder="مثال: 02188888888 یا 0912..."
                  className="w-full px-3 py-2 rounded-xl border border-current/20 bg-black/10 dark:bg-white/10 font-mono text-[11px] text-left"
                  dir="ltr"
                />
              </label>
            )}
          </div>
        </section>
      ) : null}

      {/* 3. Current Page Blocks Hierarchy / List */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold opacity-75">
            ترتیب اجزای صفحه ({currentPage.bl.length} جزء)
          </span>
          <span className="text-[10px] opacity-60">
            برای ویرایش روی هر جزء کلیک کنید
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {currentPage.bl.map((b, idx) => {
            const isSelected = b.id === selectedBlockId;
            let previewText = '';
            if (b.t === 'h' || b.t === 'p' || b.t === 'btn' || b.t === 'box') {
              previewText = b.x;
            } else if (b.t === 'prod') {
              previewText = b.x;
            } else if (b.t === 'img') {
              previewText = b.caption || 'تصویر';
            }

            return (
              <div
                key={b.id}
                onClick={() => onSelectBlock(b.id)}
                className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-orange-500 bg-orange-500/15 shadow-sm'
                    : 'border-current/15 hover:border-orange-500/30 bg-black/5 dark:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-bold text-orange-500 flex-none">
                    {idx + 1}.
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold">{getBlockName(b.t)}</span>
                    {previewText && (
                      <span className="text-[10px] opacity-60 truncate">
                        {previewText}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className="flex items-center gap-1 flex-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleMoveBlock(b.id, -1)}
                    disabled={idx === 0}
                    className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-20 cursor-pointer"
                    title="حرکت به بالا"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveBlock(b.id, 1)}
                    disabled={idx === currentPage.bl.length - 1}
                    className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-20 cursor-pointer"
                    title="حرکت به پایین"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
