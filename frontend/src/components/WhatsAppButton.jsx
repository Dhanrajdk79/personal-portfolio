
function WhatsAppButton() {
  const phoneNumber = "917057965479";

  const message = encodeURIComponent(
    "Hello Dhanraj! I visited your portfolio and would like to connect with you."
  );

  const whatsappLink =
    `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Let's chat with Dhanraj on WhatsApp"
      title="Let's Chat on WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        width="27"
        height="27"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.02 3C8.86 3 3.04 8.82 3.04 15.98c0 2.29.6 4.52 1.74 6.5L3 29l6.68-1.75a12.9 12.9 0 0 0 6.34 1.66h.01c7.16 0 12.98-5.82 12.98-12.98 0-3.47-1.35-6.73-3.81-9.18A12.9 12.9 0 0 0 16.02 3Zm0 23.7h-.01a10.7 10.7 0 0 1-5.45-1.5l-.39-.23-3.96 1.04 1.06-3.86-.25-.4a10.7 10.7 0 0 1-1.65-5.77c0-5.9 4.8-10.7 10.7-10.7 2.86 0 5.55 1.12 7.57 3.14a10.64 10.64 0 0 1 3.13 7.57c0 5.91-4.8 10.71-10.7 10.71Zm5.87-8.02c-.32-.16-1.9-.94-2.2-1.05-.29-.1-.51-.16-.73.16-.22.33-.84 1.05-1.03 1.27-.19.22-.38.25-.7.08-.32-.16-1.36-.5-2.59-1.59-.96-.85-1.61-1.9-1.8-2.22-.19-.33-.02-.5.14-.66.15-.15.33-.38.49-.57.16-.19.22-.32.33-.54.11-.22.05-.41-.03-.57-.08-.16-.73-1.75-1-2.4-.27-.64-.53-.55-.73-.56h-.62c-.22 0-.57.08-.87.41-.3.32-1.14 1.11-1.14 2.7s1.17 3.13 1.33 3.35c.16.22 2.3 3.52 5.57 4.93.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.1 1.9-.78 2.17-1.54.27-.76.27-1.4.19-1.54-.08-.14-.3-.22-.62-.38Z" />
      </svg>

      <span>Let's Chat</span>
    </a>
  );
}

export default WhatsAppButton;
