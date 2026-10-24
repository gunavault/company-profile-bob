import Icon from '@/components/Icon';
import Flash from '@/components/admin/Flash';
import { ConfirmButton } from '@/components/admin/Fields';
import { all } from '@/lib/db';
import { formatDate, waLink } from '@/lib/utils';
import { deleteMessage, toggleMessage } from '../../actions';

export default async function MessagesAdmin({ searchParams }) {
  const sp = await searchParams;
  const rows = await all('SELECT * FROM messages ORDER BY created_at DESC LIMIT 200');
  return (
    <>
      <header className="a-head"><div><h1>Pesan Masuk</h1><p>Pesan dari formulir halaman Kontak.</p></div></header>
      <Flash sp={sp} />
      {rows.length ? (
        rows.map((m) => (
          <article key={m.id} className={`a-card a-msg${m.is_read ? '' : ' unread'}`}>
            <header>
              <div>
                <strong>{m.name}</strong>
                {m.subject ? <span className="a-msg-subj">{m.subject}</span> : null}
              </div>
              <small>{formatDate(m.created_at)}</small>
            </header>
            <p>{m.message}</p>
            <div className="a-msg-foot">
              <div className="a-msg-contact">
                {m.phone ? <a href={waLink(m.phone)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" /> {m.phone}</a> : null}
                {m.email ? <a href={`mailto:${m.email}`}><Icon name="mail" /> {m.email}</a> : null}
              </div>
              <div className="a-inline">
                <form action={toggleMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <button type="submit" className="a-btn a-btn-ghost"><Icon name={m.is_read ? 'mail' : 'check'} /> {m.is_read ? 'Tandai belum dibaca' : 'Tandai dibaca'}</button>
                </form>
                <form action={deleteMessage}><input type="hidden" name="id" value={m.id} /><ConfirmButton>Hapus</ConfirmButton></form>
              </div>
            </div>
          </article>
        ))
      ) : (
        <div className="a-card a-empty"><Icon name="inbox" /> Belum ada pesan masuk.</div>
      )}
    </>
  );
}
