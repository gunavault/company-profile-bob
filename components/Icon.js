export default function Icon({ name, className = '', size, title }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      <use href={`/icons.svg#${name}`} />
    </svg>
  );
}
