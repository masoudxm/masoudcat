import React, { useState, useEffect, useRef } from 'react';
import { CatalogState } from '../../types/catalog';
import { CATALOG_SIZES, FONT_CONFIG, FONT_WEIGHTS } from '../../constants/presets';
import { CatalogPageRenderer } from './CatalogPageRenderer';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Plus,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';

interface CatalogStageProps {
  state: CatalogState;
  currentPageIndex: number;
  selectedBlockId?: string;
  onSelectBlock?: (blockId: string) => void;
  onPageChange: (index: number) => void;
  onAddPage: () => void;
  onToggleFullscreen?: () => void;
  onUpdateBlockPosition?: (blockId: string, posX: number, posY: number) => void;
  onTogglePageLayoutMode?: () => void;
}

export const CatalogStage: React.FC<CatalogStageProps> = ({
  state,
  currentPageIndex,
  selectedBlockId,
  onSelectBlock,
  onPageChange,
  onAddPage,
  onToggleFullscreen,
  onUpdateBlockPosition,
  onTogglePageLayoutMode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.85);
  const [zoomManual, setZoomManual] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [direction, setDirection] = useState(1);

  const dim = CATALOG_SIZES[state.sz] || CATALOG_SIZES.a4;
  const c = state.c;
  const fontConf = FONT_CONFIG[state.f] || FONT_CONFIG.v;
  const totalPages = state.pg.length;
  const currentPage = state.pg[currentPageIndex] || state.pg[0];

  // Auto-calculate responsive scale
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const availWidth = rect.width - (window.innerWidth < 768 ? 24 : 48);
      const availHeight = rect.height - (window.innerWidth < 768 ? 130 : 150);

      const sX = availWidth / dim.width;
      const sY = availHeight / dim.height;
      const calculatedScale = Math.max(0.2, Math.min(1.15, Math.min(sX, sY)));
      setScale(calculatedScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dim.width, dim.height, state.sz]);

  const effectiveScale = zoomManual ?? scale;

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      setDirection(-1);
      onPageChange(currentPageIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentPageIndex < totalPages - 1) {
      setDirection(1);
      onPageChange(currentPageIndex + 1);
    }
  };

  const handleJump = (idx: number) => {
    setDirection(idx > currentPageIndex ? 1 : -1);
    onPageChange(idx);
    setIsMenuOpen(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowLeft') handleNext();
      if (e.key === 'ArrowRight') handlePrev();
      if (e.key === 'Escape' && isMenuOpen) setIsMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageIndex, totalPages, isMenuOpen]);

  // Transition variants
  const getVariants = () => {
    const tr = state.nav.tr;
    switch (tr) {
      case 'slide':
        return {
          initial: { opacity: 0, x: direction * -50 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: direction * 50 },
        };
      case 'zoom':
        return {
          initial: { opacity: 0, scale: 0.92 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.05 },
        };
      case 'rise':
        return {
          initial: { opacity: 0, y: 35 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -25 },
        };
      case 'flip':
        return {
          initial: { opacity: 0, rotateY: direction * 45, transformPerspective: 1000 },
          animate: { opacity: 1, rotateY: 0, transformPerspective: 1000 },
          exit: { opacity: 0, rotateY: direction * -45, transformPerspective: 1000 },
        };
      case 'soft-scale':
        return {
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.98 },
        };
      case 'none':
        return {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 1 },
        };
      case 'fade':
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  };

  // Render navigation bar
  const renderNavBar = () => {
    const nav = state.nav;
    const isRound = nav.sh === 'round';
    const btnShape = isRound ? 'rounded-full' : 'rounded-lg';

    return (
      <div
        className={`flex items-center gap-2.5 px-4 py-2 border shadow-xl transition-all duration-300 z-30 ${
          isRound ? 'rounded-full' : 'rounded-xl'
        }`}
        style={{
          backgroundColor: c.bg,
          color: c.fg,
          borderColor: `color-mix(in srgb, ${c.fg} 14%, transparent)`,
        }}
      >
        <button
          onClick={handlePrev}
          disabled={currentPageIndex <= 0}
          className={`w-9 h-9 flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none hover:text-white ${btnShape}`}
          style={{
            backgroundColor: `color-mix(in srgb, ${c.fg} 10%, transparent)`,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.ac)}
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${c.fg} 10%, transparent)`)
          }
          title="صفحه قبلی (کلید راست)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Center navigation component */}
        {nav.st === 'dots' ? (
          <div className="flex items-center gap-1.5 px-2">
            {state.pg.map((_, i) => (
              <button
                key={i}
                onClick={() => handleJump(i)}
                className={`transition-all duration-300 cursor-pointer ${
                  i === currentPageIndex
                    ? 'w-6 h-2.5 rounded-full'
                    : 'w-2.5 h-2.5 rounded-full opacity-40 hover:opacity-80'
                }`}
                style={{
                  backgroundColor: i === currentPageIndex ? c.ac : c.fg,
                }}
              />
            ))}
          </div>
        ) : nav.st === 'tabs' ? (
          <div className="flex items-center gap-1 px-1">
            {state.pg.map((_, i) => (
              <button
                key={i}
                onClick={() => handleJump(i)}
                className={`w-7 h-7 text-xs font-bold transition-all cursor-pointer rounded-md ${
                  i === currentPageIndex ? 'text-white' : 'opacity-60 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: i === currentPageIndex ? c.ac : 'transparent',
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        ) : nav.st === 'line' ? (
          <div className="w-28 h-2 rounded-full overflow-hidden bg-black/15 dark:bg-white/15 mx-1">
            <div
              className="h-full transition-all duration-300 rounded-full"
              style={{
                width: `${((currentPageIndex + 1) / totalPages) * 100}%`,
                backgroundColor: c.ac,
              }}
            />
          </div>
        ) : nav.st === 'mini' ? (
          <span className="text-xs font-extrabold opacity-75 px-1 font-mono">
            {currentPageIndex + 1}
          </span>
        ) : (
          <div className="flex items-center gap-1.5 px-2 text-xs font-bold font-mono">
            <span style={{ color: c.ac }}>{currentPageIndex + 1}</span>
            <span className="opacity-40">/</span>
            <span>{totalPages}</span>
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={currentPageIndex >= totalPages - 1}
          className={`w-9 h-9 flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none hover:text-white ${btnShape}`}
          style={{
            backgroundColor: `color-mix(in srgb, ${c.fg} 10%, transparent)`,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.ac)}
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${c.fg} 10%, transparent)`)
          }
          title="صفحه بعدی (کلید چپ)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="h-4 w-px bg-current/20 mx-0.5" />

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-9 h-9 flex items-center justify-center transition-all cursor-pointer hover:text-white ${btnShape}`}
          style={{
            backgroundColor: isMenuOpen ? c.ac : `color-mix(in srgb, ${c.fg} 10%, transparent)`,
            color: isMenuOpen ? '#fff' : 'inherit',
          }}
          title="منوی فهرست و صفحات"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
    );
  };

  // Render TOC modal/drawer
  const renderTocDrawer = () => {
    const mn = state.nav.mn;

    let panelClass = 'p-6 flex flex-col gap-3 shadow-2xl';
    let panelPosClass = '';

    if (mn === 'side') {
      panelPosClass = 'top-0 bottom-0 right-0 w-80 max-w-[85%]';
    } else if (mn === 'bottom') {
      panelPosClass = 'bottom-0 left-0 right-0 max-h-[75%] rounded-t-3xl';
    } else if (mn === 'center') {
      panelPosClass = 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-88 max-w-[90%] rounded-2xl';
    } else {
      // fullscreen
      panelPosClass = 'inset-0 items-center justify-center';
    }

    return (
      <AnimatePresence>
        {isMenuOpen && (
          <div className="absolute inset-0 z-50 overflow-hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Menu Panel */}
            <motion.div
              initial={
                mn === 'side'
                  ? { x: '100%' }
                  : mn === 'bottom'
                  ? { y: '100%' }
                  : mn === 'center'
                  ? { scale: 0.9, opacity: 0, x: '-50%', y: '-50%' }
                  : { opacity: 0 }
              }
              animate={
                mn === 'side'
                  ? { x: 0 }
                  : mn === 'bottom'
                  ? { y: 0 }
                  : mn === 'center'
                  ? { scale: 1, opacity: 1, x: '-50%', y: '-50%' }
                  : { opacity: 1 }
              }
              exit={
                mn === 'side'
                  ? { x: '100%' }
                  : mn === 'bottom'
                  ? { y: '100%' }
                  : mn === 'center'
                  ? { scale: 0.9, opacity: 0, x: '-50%', y: '-50%' }
                  : { opacity: 0 }
              }
              transition={{ type: 'spring', damping: 25, stiffness: 240 }}
              className={`absolute ${panelPosClass} ${panelClass} overflow-y-auto`}
              style={{
                backgroundColor: c.bg,
                color: c.fg,
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-current/15">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: c.ac }}
                  />
                  <h3 className="font-extrabold text-base" style={{ color: c.ac }}>
                    فهرست و پرش به صفحات
                  </h3>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1.5 my-2">
                {state.pg.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => handleJump(idx)}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer text-right ${
                      idx === currentPageIndex
                        ? 'font-extrabold shadow-sm'
                        : 'opacity-80 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                    style={{
                      backgroundColor:
                        idx === currentPageIndex
                          ? `color-mix(in srgb, ${c.ac} 18%, transparent)`
                          : 'transparent',
                      color: idx === currentPageIndex ? c.ac : 'inherit',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center font-mono"
                        style={{
                          backgroundColor:
                            idx === currentPageIndex ? c.ac : 'var(--card-sf, rgba(120,120,120,0.15))',
                          color: idx === currentPageIndex ? '#fff' : 'inherit',
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-sm">{p.t}</span>
                    </div>
                    {p.toc && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 opacity-70">
                        در فهرست
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  onAddPage();
                  setIsMenuOpen(false);
                }}
                className="mt-auto flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-current/25 rounded-xl text-xs font-bold hover:border-current transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>افزودن صفحه جدید به کاتالوگ</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-1 w-full h-full flex flex-col items-center justify-between overflow-hidden p-3 md:p-6"
      style={{
        fontFamily: fontConf.bodyFont,
        fontWeight: FONT_WEIGHTS[state.fw || 'medium']?.weight || 500,
      }}
    >
      {/* Top Floating Utility Controls (Zoom, Fit, Fullscreen) */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white/90 p-1 rounded-xl border border-white/10 text-xs shadow-lg">
        <button
          onClick={() => setZoomManual((prev) => Math.min(1.4, (prev ?? scale) + 0.1))}
          className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          title="بزرگنمایی"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <span className="px-1 font-mono text-[11px] font-semibold">
          {Math.round(effectiveScale * 100)}%
        </span>
        <button
          onClick={() => setZoomManual((prev) => Math.max(0.25, (prev ?? scale) - 0.1))}
          className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          title="کوچکنمایی"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        {zoomManual !== null && (
          <button
            onClick={() => setZoomManual(null)}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer text-orange-400"
            title="بازنشانی اندازه به ابعاد پنجره"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
        {onToggleFullscreen && (
          <button
            onClick={onToggleFullscreen}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer mr-0.5 border-r border-white/15"
            title="مشاهده تمام صفحه (پرزنتیشن)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Top Navigation if configured */}
      {state.nav.ps === 'top' && (
        <div className="mb-3 flex-none">{renderNavBar()}</div>
      )}

      {/* Center Scaled Viewport Container */}
      <div className="flex-1 flex items-center justify-center w-full min-h-0 relative">
        <div
          className="relative transition-all duration-300"
          style={{
            width: `${dim.width * effectiveScale}px`,
            height: `${dim.height * effectiveScale}px`,
          }}
        >
          <div
            className="absolute top-0 left-0 origin-top-left"
            style={{
              transform: `scale(${effectiveScale})`,
              width: `${dim.width}px`,
              height: `${dim.height}px`,
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage.id}
                variants={getVariants()}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: state.nav.tr === 'none' ? 0 : 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full h-full"
              >
                <CatalogPageRenderer
                  page={currentPage}
                  pageIndex={currentPageIndex}
                  totalPages={totalPages}
                  state={state}
                  selectedBlockId={selectedBlockId}
                  onSelectBlock={onSelectBlock}
                  onNavigatePage={handleJump}
                  onUpdateBlockPosition={onUpdateBlockPosition}
                  onTogglePageLayoutMode={onTogglePageLayoutMode}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Drawer / Menu Overlay within viewport */}
          {renderTocDrawer()}
        </div>
      </div>

      {/* Bottom Navigation if configured */}
      {state.nav.ps === 'bottom' && (
        <div className="mt-3 flex-none">{renderNavBar()}</div>
      )}

      {/* Bottom Page Thumbnails Carousel Strip */}
      <div className="w-full max-w-4xl mt-3 pt-2.5 border-t border-black/10 dark:border-white/10 flex items-center gap-2 overflow-x-auto py-1 px-2 no-scrollbar flex-none">
        <span className="text-[11px] font-bold opacity-50 flex-none ml-1">
          ورق‌زن سریع:
        </span>
        {state.pg.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => handleJump(idx)}
            className={`flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              idx === currentPageIndex
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 scale-105'
                : 'bg-black/5 dark:bg-white/5 opacity-70 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            <span className="font-mono text-[10px] opacity-80">{idx + 1}.</span>
            <span className="truncate max-w-[100px]">{p.t}</span>
          </button>
        ))}
        <button
          onClick={onAddPage}
          className="flex-none px-2.5 py-1.5 rounded-lg text-xs font-bold bg-black/5 dark:bg-white/5 border border-dashed border-current/30 hover:border-orange-500 hover:text-orange-500 transition-colors flex items-center gap-1 cursor-pointer"
          title="افزودن صفحه جدید"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>صفحه جدید</span>
        </button>
      </div>
    </div>
  );
};
