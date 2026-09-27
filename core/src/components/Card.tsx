import type { ReactNode } from 'react';
import { injectCoreStyles } from '../styles/injectStyles';

export interface CardProps {
  title?: string;
  children: ReactNode;
}

export function Card({ title, children }: CardProps) {
  injectCoreStyles();
  return (
    <div className="core-card">
      {title && <h3 className="core-card__title">{title}</h3>}
      <div className="core-card__body">{children}</div>
    </div>
  );
}

export default Card;
