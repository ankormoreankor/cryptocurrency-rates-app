import { Link, useLocation } from 'react-router';

export const Header = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <header className=" h-16 flex items-center justify-between p-4">
      <nav>
        <ul className="flex gap-2">
          {pathnames.map((value, index) => {
            const isLastItem = index === pathnames.length - 1;
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

            return (
              <li key={routeTo}>
                {isLastItem && <span className="font-medium">{value}</span>}

                {!isLastItem && (
                  <Link to={routeTo} className=" font-medium hover:text-blue-400">
                    {value}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
