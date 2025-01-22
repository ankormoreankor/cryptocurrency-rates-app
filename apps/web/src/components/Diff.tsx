import clsx from 'clsx';
import { formatNumber } from '../../../../shared/utils/format';

export const Diff = ({ diff }: { diff: number }) => (
  <span className={clsx('text-nowrap', diff > 0 && ' text-green-600', diff < 0 && ' text-red-600')}>
    {diff > 0 ? '▲' : diff < 0 ? '▼' : ''} {formatNumber(diff)}
  </span>
);
