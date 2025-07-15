'use client';

import styles from './style.module.css';
import useHook from './hook';

export default function AddNoteButton() {
  const ctx = useHook();
  return (
    <form className={styles.form} onSubmit={ctx.handleSubmit}>
      <label>
        <input
          type="text"
          value={ctx.content}
          onChange={ctx.onChange}
          placeholder="Write your note here…"
          disabled={ctx.loading}
          aria-invalid={Boolean(ctx.error)}
        />
      </label>

      <button type="submit" disabled={ctx.loading || !ctx.content.trim()}>
        {ctx.loading ? 'Adding…' : 'Add'}
      </button>

      {ctx.error && (
        <p role="alert" className={styles.error}>
          {ctx.error}
        </p>
      )}
    </form>
  );
}
