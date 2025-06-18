import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

// 날짜 포맷 //
export function formatDate(date: string | Date | undefined) {
  if (!date) return '';
  return format(new Date(date), 'PPP', { locale: ko });
}
