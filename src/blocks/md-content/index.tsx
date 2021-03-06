import { Global } from '@emotion/core';
import { graphql } from 'gatsby';
import React, { CSSProperties } from 'react';

import { MdWrapper } from './styled';

interface MdContentProps {
  content: string;
  style: string;
  wrapperStyle?: CSSProperties;
}

const MdContent: React.FC<MdContentProps> = ({ content, style, wrapperStyle }) => (
  <>
    <Global styles={style} />
    <MdWrapper style={wrapperStyle} dangerouslySetInnerHTML={{ __html: content }} />
  </>
);

export default MdContent;

export const ContentBlock = {
  label: 'Markdown content',
  fields: [
    {
      label: 'markdown Content',
      name: 'content',
      component: 'markdown',
    },
    {
      label: 'Custom Css',
      name: 'style',
      component: 'css',
    },
  ],
  defaultItem: {
    content: '',
    style: '',
  },
};

export const MarkdownFragment = graphql`
  fragment MarkdownContentBlock on PagesJsonSections {
    content
    style
  }
`;
