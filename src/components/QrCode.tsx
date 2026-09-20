import { QRCodeSVG } from 'qrcode.react';

interface QrCodeProps {
  /** What the code carries: a URL, or the text of a vCard. */
  readonly value: string;
  /** Accessible name, read out in place of the image. */
  readonly title: string;
  /**
   * Error correction, and so how much of the code is spent on redundancy
   * rather than payload. `M` recovers around 15% and suits a short URL; `L`
   * recovers 7% and keeps a long payload's modules big enough to scan.
   */
  readonly level?: 'L' | 'M' | 'Q' | 'H';
}

/**
 * The single place that knows which QR library we use. Colours come from the
 * surrounding CSS `color`, so the code inherits whatever surface it sits on.
 */
export function QrCode({ value, title, level = 'M' }: QrCodeProps) {
  return (
    <QRCodeSVG
      value={value}
      title={title}
      size={256}
      level={level}
      marginSize={0}
      bgColor="transparent"
      fgColor="currentColor"
      style={{ display: 'block', inlineSize: '100%', blockSize: 'auto' }}
    />
  );
}
