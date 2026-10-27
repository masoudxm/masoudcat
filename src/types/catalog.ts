export type CatalogSizeKey = 'a4' | 'a4l' | 'a5' | 'sq' | 'st' | 'sl';

export interface CatalogDimension {
  width: number;
  height: number;
  label: string;
  desc: string;
}

export interface CatalogThemePalette {
  name: string;
  bg: string;
  fg: string;
  ac: string; // accent color
  sf: string; // surface/card color
  r: number;  // border radius in px
}

export type FontKey = 'iy' | 'is' | 'v' | 'sh' | 'c' | 'n' | 'l' | 'custom';
export type FontWeightKey = 'regular' | 'medium' | 'bold' | 'black';

export type DecorationStyle = 'cn' | 'bar' | 'side' | 'frm' | 'gradient' | 'no';

export type NavStyle = 'arrows' | 'dots' | 'tabs' | 'line' | 'mini' | 'pill';
export type NavPosition = 'top' | 'bottom';
export type NavButtonShape = 'round' | 'square' | 'pill';
export type TransitionEffect = 'fade' | 'slide' | 'zoom' | 'rise' | 'flip' | 'soft-scale' | 'none';
export type MenuStyle = 'side' | 'bottom' | 'center' | 'fullscreen';

export type EditorUiTheme = 'dark-obsidian' | 'clean-ivory' | 'glass-modern' | 'vivid-creative';

export type BlockType =
  | 'h'
  | 'p'
  | 'img'
  | 'logo'
  | 'btn'
  | 'prod'
  | 'list'
  | 'box'
  | 'toc'
  | 'hr'
  | 'sp'
  | 'features'
  | 'contact'
  | 'icon';

export interface BaseBlock {
  id: string;
  t: BlockType;
  // Free manual positioning & Canvas coordinates
  isFree?: boolean; // If true, placed freely at (posX, posY)
  posX?: number;    // X position in percentage (0 to 100)
  posY?: number;    // Y position in percentage (0 to 100)
  posW?: number;    // Width in percentage (10 to 100) or undefined for auto
  posZ?: number;    // Layer z-index
  // Custom styling overrides
  customBg?: string;          // Background color override
  customColor?: string;       // Text / Icon / Accent color override
  customBorderColor?: string; // Border color override
  customRadius?: number;      // Border radius in px
  scale?: number;             // Scale factor (0.5 to 2.5)
  // Interactive click action & page navigation
  actionType?: 'none' | 'link' | 'page' | 'tel' | 'email';
  actionUrl?: string;         // External web link, Instagram, WhatsApp, etc.
  actionPage?: number;        // Target catalog page index (0-based) to jump to
  actionTel?: string;         // Phone number (e.g. 0912...)
  actionEmail?: string;       // Email address
}

export interface IconBlock extends BaseBlock {
  t: 'icon';
  iconName: string;
  sz: number;
  colorType: 'accent' | 'text' | 'custom';
  customColor?: string;
  bgShape: 'none' | 'circle' | 'rounded' | 'soft' | 'border';
  caption?: string;
  captionPos?: 'bottom' | 'side';
  al: 'right' | 'center' | 'left';
  link?: string;
  customSvgPath?: string;
}

export interface HeadingBlock extends BaseBlock {
  t: 'h';
  x: string;
  sz: number;
  al: 'right' | 'center' | 'left';
  hs: 'a' | 'b' | 'c' | 'd'; // a: simple, b: accent right bar, c: underline, d: badge tag
}

export interface TextBlock extends BaseBlock {
  t: 'p';
  x: string;
  sz: number;
  al: 'right' | 'center' | 'left';
}

export interface ImageBlock extends BaseBlock {
  t: 'img';
  src: string;
  ht: number;
  fit: 'cover' | 'contain';
  caption?: string;
  link?: string;
}

export interface LogoBlock extends BaseBlock {
  t: 'logo';
  w: number;
  customSrc?: string;
  al: 'right' | 'center' | 'left';
}

export interface ButtonBlock extends BaseBlock {
  t: 'btn';
  x: string;
  u: string;
  al: 'right' | 'center' | 'left';
  sh: 'f' | 'o' | 'p' | 'd' | 's'; // f: filled, o: outline, p: pill, d: soft tinted, s: sharp
}

export interface ProductCardBlock extends BaseBlock {
  t: 'prod';
  src: string;
  x: string;
  d: string;
  pr: string;
  u: string;
  badge?: string;
  layout?: 'horizontal' | 'vertical';
}

export interface ListBlock extends BaseBlock {
  t: 'list';
  x: string; // items separated by newline
  sz: number;
  st: 'b' | 'k' | 'n' | 'star'; // b: bullet, k: checkmark, n: numbered, star: star
}

export interface BoxBlock extends BaseBlock {
  t: 'box';
  x: string;
  title?: string;
  sz: number;
  al: 'right' | 'center' | 'left';
  st: 'accent-right' | 'glass' | 'quote' | 'alert';
}

export interface TocBlock extends BaseBlock {
  t: 'toc';
  title?: string;
}

export interface HrBlock extends BaseBlock {
  t: 'hr';
  st?: 'solid' | 'dashed' | 'gradient';
}

export interface SpBlock extends BaseBlock {
  t: 'sp';
  ht: number;
}

export interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

export interface FeaturesBlock extends BaseBlock {
  t: 'features';
  items: FeatureItem[];
}

export interface ContactBlock extends BaseBlock {
  t: 'contact';
  phone: string;
  website: string;
  email: string;
  address: string;
  instagram: string;
}

export type CatalogBlock =
  | HeadingBlock
  | TextBlock
  | ImageBlock
  | LogoBlock
  | ButtonBlock
  | ProductCardBlock
  | ListBlock
  | BoxBlock
  | TocBlock
  | HrBlock
  | SpBlock
  | FeaturesBlock
  | ContactBlock
  | IconBlock;

export interface CatalogPage {
  id: string;
  t: string;
  toc: boolean;
  cols?: 1 | 2;
  bg?: 0 | 1 | 2 | 3; // 0: default bg, 1: surface card, 2: inverted/contrast, 3: soft accent
  bgImage?: string; // Uploaded catalog page background design
  bgImageFit?: 'cover' | 'contain' | 'fill';
  layoutMode?: 'flow' | 'free'; // 'flow' for structured column flow, 'free' for free canvas positioning
  bl: CatalogBlock[];
}

export interface CatalogState {
  title: string;
  subtitle?: string;
  tp: number;
  c: CatalogThemePalette;
  sz: CatalogSizeKey;
  f: FontKey;
  fw?: FontWeightKey; // regular, medium, bold, black
  customFontName?: string;
  customFontUrl?: string; // base64 or url of uploaded font
  dc: DecorationStyle;
  nav: {
    st: NavStyle;
    ps: NavPosition;
    sh: NavButtonShape;
    tr: TransitionEffect;
    mn: MenuStyle;
  };
  pg: CatalogPage[];
}
