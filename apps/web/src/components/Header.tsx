import { GitHubIcon } from '@icons/github';
import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export interface HeaderProps {
  isWithBreadcrumbs?: boolean;
}

export const Header = ({ isWithBreadcrumbs }: HeaderProps) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <header className=" h-16 flex items-center justify-between p-4">
      {isWithBreadcrumbs && (
        <nav>
          <ul className="flex gap-1">
            {pathnames.map((value, index) => {
              const pageName = value.charAt(0).toUpperCase() + value.slice(1);
              const isLastItem = index === pathnames.length - 1;
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

              return (
                <li key={routeTo} className="flex items-center gap-1">
                  {isLastItem && <span className="font-medium">{pageName}</span>}

                  {!isLastItem && (
                    <>
                      <Link to={routeTo} className=" font-medium hover:text-blue-400">
                        {pageName}
                      </Link>
                      <ChevronRight height={16} width={16} />
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <Link
        to="https://github.com/ankormoreankor/cryptocurrency-rates-app"
        className="font-medium hover:text-blue-400 ml-auto"
        target="_blank"
      >
        <GitHubIcon />
      </Link>
    </header>
  );
};
