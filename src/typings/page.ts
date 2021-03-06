import { CSSProperties } from 'react';

import { TitleTag, Field } from './form';
import { ImageSharp } from './image';
import { Site } from './site';

export interface CellProps extends Section {
  container: Container;
  _template: string;
  markdown: any;
  site: Site;
  path: string;
}

export interface Container {
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;

  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;

  backgroundColor: string;
  flex: number;
  flexJustify: 'flext-start' | 'center' | 'flex-end';
}

export interface Hero {
  image: ImageSharp;
  headline: string;
  textline: string;
  date?: string;
  formattedDate?: string;
  large: boolean;
  display: boolean;
  overlay: boolean;
  opacity: number;
  parallax: number;
}

export interface Col {
  hpadding: number;
  vpadding: number;
  hmargin: number;
  vmargin: number;
  width: number;
  height: number;
  opacity: number;
  parallax: number;
  lat: number;
  lng: number;
  zoom: number;
  limit: number;
  errorMessage: string;
  successMessage: string;
  fieldErrorMessage: string;
  image: ImageSharp;
  title: string;
  color: string;
  align: CSSProperties['textAlign'];
  margin: number;
  tag: TitleTag;
  flex: number;
  flexMap: boolean;
  content: string;
  style: string;
  submitLabel: string;
  apiUrl: string;
  fields: Field[];
  facebook: boolean;
  twitter: boolean;
  email: boolean;
  whatsapp: boolean;
  facebookUrl: string;
  twitterUrl: string;
  rss: boolean;
  url: string;
  backgroundColor: string;
  flexAlign: string;
  _template: string;
}

export interface Section {
  _template: string;
  container: Container;
  flexAlign: string;
  title: string;
  align: CSSProperties['textAlign'];
  color: string;
  margin: number;
  tag: TitleTag;
  image: ImageSharp;
  limit: number;
  hasLine: boolean;
  lineColor: string;
  apiUrl: string;
  parallax: number;
  height: number;
  width: number;
  lat: number;
  lng: number;
  zoom: number;
  flexMap: boolean;
  flexReverse: boolean;
  titleColor: string;
  opacity: number;
  style: string;
  content: string;
  fieldErrorMessage: string;
  errorMessage: string;
  submitLabel: string;
  successMessage: string;
  fields: Field[];
  cols: CellProps[];
  xlCol: number;
  lgCol: number;
  mdCol: number;
  smCol: number;
  gutter: number;
  facebook: boolean;
  twitter: boolean;
  email: boolean;
  whatsapp: boolean;
  rss: boolean;
  url: string;
  facebookUrl: string;
  twitterUrl: string;
  backgroundColor: string;
}

export interface Aside {
  _template: string;
  title: string;
  align: CSSProperties['textAlign'];
  color: string;
  margin: number;
  width: number;
  hasLine: boolean;
  lineColor: string;
  tag: TitleTag;
  lat: number;
  lng: number;
  zoom: number;
  limit: number;
  flexMap: boolean;
  image: ImageSharp;
  parallax: number;
  height: number;
  titleColor: string;
  opacity: number;
  style: string;
  content: string;
  apiUrl: string;
  fieldErrorMessage: string;
  errorMessage: string;
  submitLabel: string;
  successMessage: string;
  fields: Field[];
  facebook: boolean;
  twitter: boolean;
  email: boolean;
  whatsapp: boolean;
  rss: boolean;
  url: string;
  flexAlign: string;
  facebookUrl: string;
  twitterUrl: string;
  backgroundColor: string;
}

export interface Keyword {
  label: string;
}

export interface Social {
  description: string;
  image: ImageSharp;
  title: string;
}

export interface Seo {
  description: string;
  keywords: Keyword[];
  title: string;
  social: Social;
}

export interface Page {
  path: string;
  label: string;
  layout: string;
  hasFooter: boolean;
  hero: Hero;
  sections: Section[];
  aside: Aside[];
  seo: Seo;
}
