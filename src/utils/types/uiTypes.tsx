import type { ElementType } from 'react';

export type HeadingProps = {
    title: string;
    description?: string | null;
    as?: ElementType;
    align?: 'left' | 'center' | 'right';
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
};
export interface MetaData {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
  }
 export interface dataType {
    id: number;
    url_id: number;
    name? : string ;
    urlName: string;
    yrl: string;
    des: string;
    keyword: string;
    metadata?: string;
    route? : string; 
  }