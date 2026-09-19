import { QRCodeSVG } from 'qrcode.react';

interface QrCodeProps {
  /** The URL encoded into the code. */
  readonly value: string;
  /** Accessible name, read out in place of the image. */
  readonly title: string;
}

/**
 * The single place that knows which QR library we use. Colours come from the
 * surrounding CSS `color`, so the code inherits whatever surface it sits on.
 */
export function QrCode({ value, title }: QrCodeProps) {
  return (
    <QRCodeSVG
      value={value}
      title={title}
      size={256}
      level="M"
      marginSize={0}
      bgColor="transparent"
      fgColor="currentColor"
      style={{ display: 'block', inlineSize: '100%', blockSize: 'auto' }}
    />
  );
}
