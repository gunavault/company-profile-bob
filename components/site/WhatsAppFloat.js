import Icon from '@/components/Icon';

export default function WhatsAppFloat({ href }) {
  return (
    <a className="wa-float" href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat via WhatsApp">
      <span className="wa-float-label">Chat WhatsApp</span>
      <span className="wa-float-btn">
        <Icon name="whatsapp" />
      </span>
    </a>
  );
}
