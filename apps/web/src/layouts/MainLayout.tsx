import { Header } from '@components/Header';
import { PropsWithChildren } from 'react';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grid-rows-[auto,1fr] h-full">
      <Header />
      <main>{children}</main>
    </div>
  );
};
