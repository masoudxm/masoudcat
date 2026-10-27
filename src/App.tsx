/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CatalogPage, CatalogState, EditorUiTheme, IconBlock } from './types/catalog';
import {
  INITIAL_CATALOG_STATE,
  EDITOR_UI_THEMES_INFO,
} from './constants/presets';
import { Header } from './components/Header';
import { CatalogStage } from './components/CatalogPreview/CatalogStage';
import { ThemePanel } from './components/EditorPanels/ThemePanel';
import { PagesPanel } from './components/EditorPanels/PagesPanel';
import { ContentPanel } from './components/EditorPanels/ContentPanel';
import { IconLibraryPanel } from './components/EditorPanels/IconLibraryPanel';
import { NavigationPanel } from './components/EditorPanels/NavigationPanel';
import { ExportPanel } from './components/EditorPanels/ExportPanel';
import { UiStyleModal } from './components/UiStyleModal';
import { DualDevicePreview } from './components/DualDevicePreview';
import { FullscreenViewer } from './components/FullscreenViewer';
import { IconPickerModal } from './components/IconPickerModal';
import { UploadCatalogModal } from './components/UploadCatalogModal';
import { generateStandaloneCatalogHtml } from './utils/htmlExporter';
import {
  Palette,
  Layers,
  Edit3,
  Compass,
  Download,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

export default function App() {
  // Load state from localStorage or initial
  const [state, setState] = useState<CatalogState>(() => {
    try {
      const saved = localStorage.getItem('smart-catalog-rcg-v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved state, using default');
    }
    return INITIAL_CATALOG_STATE;
  });

  // Editor UI Environment Theme
  const [editorTheme, setEditorTheme] = useState<EditorUiTheme>(() => {
    try {
      const saved = localStorage.getItem('rcg-editor-theme');
      if (
        saved &&
        ['dark-obsidian', 'clean-ivory', 'glass-modern', 'vivid-creative'].includes(saved)
      ) {
        return saved as EditorUiTheme;
      }
    } catch (e) {}
    return 'dark-obsidian';
  });

  const [activeTab, setActiveTab] = useState<'theme' | 'pages' | 'content' | 'icons' | 'nav' | 'export'>('theme');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedBlockId, setSelectedBlockId] = useState<string | undefined>(undefined);

  // Modals & View Modes
  const [showUiThemeModal, setShowUiThemeModal] = useState(false);
  const [showDualPreview, setShowDualPreview] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleImportCatalogPages = (newPages: CatalogPage[], mode: 'replace' | 'append') => {
    setState((prev) => {
      if (mode === 'replace') {
        return {
          ...prev,
          pg: newPages,
        };
      } else {
        return {
          ...prev,
          pg: [...prev.pg, ...newPages],
        };
      }
    });
    setCurrentPageIndex(mode === 'replace' ? 0 : state.pg.length);
    showToast(`کاتالوگ با موفقیت بارگذاری شد (${newPages.length} صفحه). اکنون می‌توانید دکمه‌ها و امکانات دلخواه را اضافه کنید.`);
  };

  const handleUpdateBlockPosition = (blockId: string, posX: number, posY: number) => {
    setState((prev) => {
      const nextPages = [...prev.pg];
      const curBl = nextPages[currentPageIndex].bl.map((b) =>
        b.id === blockId ? { ...b, posX, posY, isFree: true } : b
      );
      nextPages[currentPageIndex] = {
        ...nextPages[currentPageIndex],
        bl: curBl,
      };
      return { ...prev, pg: nextPages };
    });
  };

  const handleTogglePageLayoutMode = () => {
    const curMode = state.pg[currentPageIndex]?.layoutMode || 'flow';
    const nextMode = curMode === 'flow' ? 'free' : 'flow';
    setState((prev) => {
      const nextPages = [...prev.pg];
      nextPages[currentPageIndex] = {
        ...nextPages[currentPageIndex],
        layoutMode: nextMode,
      };
      return { ...prev, pg: nextPages };
    });
    showToast(
      nextMode === 'free'
        ? 'حالت چیدمان آزاد فعال شد؛ المان‌ها را با ماوس یا لمس به هر نقطه از صفحه بکشید.'
        : 'چیدمان ردیفی استاندارد فعال شد.'
    );
  };

  // Auto-save to localStorage with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('smart-catalog-rcg-v1', JSON.stringify(state));
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [state]);

  // Save UI Theme
  const handleSelectTheme = (th: EditorUiTheme) => {
    setEditorTheme(th);
    try {
      localStorage.setItem('rcg-editor-theme', th);
    } catch (e) {}
    showToast(`محیط کاربری به "${EDITOR_UI_THEMES_INFO[th].title}" تغییر یافت.`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddPage = () => {
    const newIdx = state.pg.length;
    setState((prev) => ({
      ...prev,
      pg: [
        ...prev.pg,
        {
          id: 'p_' + Math.random().toString(36).substring(2, 9),
          t: `صفحه جدید ${newIdx + 1}`,
          toc: true,
          bl: [
            {
              id: 'b_' + Math.random().toString(36).substring(2, 9),
              t: 'h',
              x: `عنوان صفحه ${newIdx + 1}`,
              sz: 28,
              al: 'right',
              hs: 'b',
            },
            {
              id: 'b_' + Math.random().toString(36).substring(2, 9),
              t: 'hr',
              st: 'solid',
            },
          ],
        },
      ],
    }));
    setCurrentPageIndex(newIdx);
    setActiveTab('content');
    showToast('صفحه جدید اضافه شد.');
  };

  const handleAddTocPage = () => {
    setState((prev) => {
      const newPages = [...prev.pg];
      newPages.splice(1, 0, {
        id: 'p_' + Math.random().toString(36).substring(2, 9),
        t: 'فهرست مطالب',
        toc: false,
        bl: [
          {
            id: 'b_' + Math.random().toString(36).substring(2, 9),
            t: 'h',
            x: 'فهرست عناوین کاتالوگ',
            sz: 28,
            al: 'right',
            hs: 'b',
          },
          {
            id: 'b_' + Math.random().toString(36).substring(2, 9),
            t: 'hr',
            st: 'solid',
          },
          {
            id: 'b_' + Math.random().toString(36).substring(2, 9),
            t: 'toc',
            title: 'راهنمای صفحات',
          },
        ],
      });
      return { ...prev, pg: newPages };
    });
    setCurrentPageIndex(1);
    showToast('صفحه فهرست خودکار به کاتالوگ افزوده شد.');
  };

  const handleAddIconBlock = (iconBlock: IconBlock) => {
    setState((prev) => {
      const nextPages = [...prev.pg];
      nextPages[currentPageIndex] = {
        ...nextPages[currentPageIndex],
        bl: [...nextPages[currentPageIndex].bl, iconBlock],
      };
      return { ...prev, pg: nextPages };
    });
    setSelectedBlockId(iconBlock.id);
    showToast('آیکون برداری با موفقیت به صفحه اضافه شد.');
  };

  const handleDownloadHtml = () => {
    const html = generateStandaloneCatalogHtml(state);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.title || 'smart-catalog'}.html`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('فایل کاتالوگ مستقل HTML با موفقیت دانلود شد.');
  };

  const handlePrint = () => {
    window.print();
  };

  const themeClasses = EDITOR_UI_THEMES_INFO[editorTheme];

  const TABS = [
    { id: 'theme', label: 'قالب و رنگ', icon: <Palette className="w-4 h-4" /> },
    { id: 'pages', label: 'صفحات', icon: <Layers className="w-4 h-4" /> },
    { id: 'content', label: 'محتوا', icon: <Edit3 className="w-4 h-4" /> },
    { id: 'icons', label: 'آیکون‌ها (SVG)', icon: <Sparkles className="w-4 h-4 text-orange-400" /> },
    { id: 'nav', label: 'ناوبری و انیمیشن', icon: <Compass className="w-4 h-4" /> },
    { id: 'export', label: 'خروجی نهایی', icon: <Download className="w-4 h-4" /> },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${themeClasses.stageBg}`}
    >
      {/* App Header */}
      <div className={themeClasses.headerBg}>
        <Header
          state={state}
          editorTheme={editorTheme}
          onOpenThemeModal={() => setShowUiThemeModal(true)}
          onOpenIconModal={() => setShowIconModal(true)}
          onOpenUploadModal={() => setShowUploadModal(true)}
          onOpenDualPreview={() => setShowDualPreview(true)}
          onOpenFullscreen={() => setShowFullscreen(true)}
          onDownloadHtml={handleDownloadHtml}
          onPrint={handlePrint}
          onUpdateTitle={(title) => setState((p) => ({ ...p, title }))}
        />
      </div>

      {/* Main Studio Workspace: Sidebar (Controls) + Center Viewport (Catalog Stage) */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 relative">
        {/* Editor Settings Sidebar */}
        <aside
          className={`w-full md:w-88 lg:w-96 flex flex-col flex-none z-10 transition-all duration-300 ${
            themeClasses.sidebarBg
          } ${
            mobileDrawerOpen ? 'max-h-[60vh] md:max-h-none' : 'max-h-12 md:max-h-none'
          }`}
        >
          {/* Mobile drawer toggle */}
          <div
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="md:hidden flex items-center justify-between p-2.5 bg-black/10 dark:bg-white/5 border-b border-inherit cursor-pointer"
          >
            <span className="text-xs font-bold text-orange-400">
              {mobileDrawerOpen ? 'کوچک کردن پنل تنظیمات' : 'باز کردن پنل تنظیمات'}
            </span>
            {mobileDrawerOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </div>

          {/* Navigation Tabs Header */}
          <div className="flex items-center border-b border-inherit bg-black/5 dark:bg-white/5 overflow-x-auto no-scrollbar flex-none">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setMobileDrawerOpen(true);
                  }}
                  className={`flex-1 py-3 px-1.5 flex flex-col items-center justify-center gap-1 text-[11px] font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'border-orange-500 text-orange-500 bg-orange-500/10'
                      : 'border-transparent opacity-70 hover:opacity-100 hover:text-orange-400'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Panel Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {activeTab === 'theme' && (
              <ThemePanel state={state} onUpdateState={setState} />
            )}
            {activeTab === 'pages' && (
              <PagesPanel
                state={state}
                currentPageIndex={currentPageIndex}
                onPageChange={setCurrentPageIndex}
                onUpdateState={setState}
              />
            )}
            {activeTab === 'content' && (
              <ContentPanel
                state={state}
                currentPageIndex={currentPageIndex}
                selectedBlockId={selectedBlockId}
                onSelectBlock={setSelectedBlockId}
                onUpdateState={setState}
                onOpenIconModal={() => setShowIconModal(true)}
                onPageChange={setCurrentPageIndex}
              />
            )}
            {activeTab === 'icons' && (
              <IconLibraryPanel
                state={state}
                currentPageIndex={currentPageIndex}
                onAddIconBlock={handleAddIconBlock}
                onOpenModal={() => setShowIconModal(true)}
              />
            )}
            {activeTab === 'nav' && (
              <NavigationPanel
                state={state}
                onUpdateState={setState}
                onAddTocPage={handleAddTocPage}
              />
            )}
            {activeTab === 'export' && (
              <ExportPanel
                state={state}
                onUpdateState={setState}
                onPrint={handlePrint}
              />
            )}
          </div>
        </aside>

        {/* Center Live Interactive Canvas / Stage */}
        <main className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
          <CatalogStage
            state={state}
            currentPageIndex={currentPageIndex}
            selectedBlockId={selectedBlockId}
            onSelectBlock={(bId) => {
              setSelectedBlockId(bId);
              setActiveTab('content');
            }}
            onPageChange={setCurrentPageIndex}
            onAddPage={handleAddPage}
            onToggleFullscreen={() => setShowFullscreen(true)}
            onUpdateBlockPosition={handleUpdateBlockPosition}
            onTogglePageLayoutMode={handleTogglePageLayoutMode}
          />
        </main>
      </div>

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900/90 text-white border border-slate-700 shadow-2xl backdrop-blur-md text-xs font-bold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-none" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Vector SVG Icon Picker Modal Popup */}
      <IconPickerModal
        isOpen={showIconModal}
        onClose={() => setShowIconModal(false)}
        state={state}
        onAddIconBlock={handleAddIconBlock}
      />

      {/* Upload Existing Catalog & Enhance Modal */}
      <UploadCatalogModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onImportPages={handleImportCatalogPages}
        currentPagesCount={state.pg.length}
      />

      {/* Editor UI Theme Comparison & Selection Modal */}
      <UiStyleModal
        isOpen={showUiThemeModal}
        onClose={() => setShowUiThemeModal(false)}
        currentTheme={editorTheme}
        onSelectTheme={handleSelectTheme}
      />

      {/* Dual Device Preview (Side-by-side Mobile & Desktop) */}
      {showDualPreview && (
        <DualDevicePreview
          state={state}
          onClose={() => setShowDualPreview(false)}
        />
      )}

      {/* Fullscreen Client Presentation Mode */}
      {showFullscreen && (
        <FullscreenViewer
          state={state}
          initialPage={currentPageIndex}
          onClose={() => setShowFullscreen(false)}
        />
      )}
    </div>
  );
}
