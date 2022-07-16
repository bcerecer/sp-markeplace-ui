import type { ComponentProps, FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

export interface LabelProps
  extends PropsWithChildren<Omit<ComponentProps<'label'>, 'className' | 'color'>> {
  className?: string;
  disabled?: boolean;
}

export const Label: FC<LabelProps> = ({ children, className = '' }): JSX.Element => {
  return <label className={classNames('dark:text-white', className)}>{children ?? ''}</label>;
};

export default Label;
