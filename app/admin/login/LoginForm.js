'use client';

import { useActionState } from 'react';
import Icon from '@/components/Icon';
import { login } from '../actions';

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="a-login-form">
      {state?.error ? <div className="a-flash a-flash-err"><Icon name="x" /> {state.error}</div> : null}
      <label className="a-sub">
        Username
        <span className="a-input-ic"><Icon name="user" /><input className="a-input" name="username" autoComplete="username" required autoFocus defaultValue={state?.username} /></span>
      </label>
      <label className="a-sub">
        Password
        <span className="a-input-ic"><Icon name="lock" /><input className="a-input" name="password" type="password" autoComplete="current-password" required /></span>
      </label>
      <button type="submit" className="a-btn a-btn-primary a-btn-block" disabled={pending}>
        {pending ? 'Memeriksa…' : 'Masuk'} <Icon name="arrow-right" />
      </button>
    </form>
  );
}
