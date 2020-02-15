import React from 'react';
import { Converter } from 'showdown';

import { CardImage, CardWrapper, CardTitle, CardBody } from './styled';
import { getThumbnail } from '../../@cms/helpers/thumbnail';

const converter = new Converter();

interface CardProps {
  image: string;
  title: string;
  content: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  files: any[];
}

const Card: React.FC<CardProps> = ({ image, title, content, files }) => {
  const thumbnail = getThumbnail(files, image);

  return (
    <CardWrapper>
      <CardImage url={thumbnail}>
        <CardTitle>{title}</CardTitle>
      </CardImage>
      <CardBody dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }} />
    </CardWrapper>
  );
};

export default Card;