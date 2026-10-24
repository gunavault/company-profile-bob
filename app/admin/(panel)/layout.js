import Sidebar from '@/components/admin/Sidebar';
import { requireAdmin } from '@/lib/auth';
import { one } from '@/lib/db';
import { logout } from '../actions';

export default async function PanelLayout({ children }) {
  const user = await requireAdmin();
  const unread = await one('SELECT COUNT(*) AS n FROM messages WHERE is_read = 0');
  return (
    <div className="a-shell">
      <Sidebar username={user.username} unread={Number(unread?.n) || 0} logoutAction={logout} />
      <div className="a-main">{children}</div>
    </div>
  );
}
