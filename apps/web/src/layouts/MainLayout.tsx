import { Header, HeaderProps } from '@components/Header';
import { PropsWithChildren } from 'react';

export const MainLayout = ({ children, headerProps }: PropsWithChildren<{ headerProps?: HeaderProps }>) => {
  return (
    <div className="grid grid-rows-[auto,1fr] h-full">
      <Header {...headerProps} />
      <main>{children}</main>
    </div>
  );
};
