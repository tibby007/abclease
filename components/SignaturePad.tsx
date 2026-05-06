'use client';

import { useEffect, useRef, useState } from 'react';
import SignaturePadLib from 'signature_pad';

type Props = {
  onChange: (dataUrl: string | null) => void;
};

export default function SignaturePad({ onChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const padRef = useRef<SignaturePadLib | null>(null);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      if (!canvas) return;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext('2d')?.scale(ratio, ratio);
      padRef.current?.clear();
      setHasSignature(false);
      onChange(null);
    }

    const pad = new SignaturePadLib(canvas, {
      penColor: '#141414',
      backgroundColor: 'rgba(0,0,0,0)'
    });
    padRef.current = pad;

    pad.addEventListener('endStroke', () => {
      const empty = pad.isEmpty();
      setHasSignature(!empty);
      onChange(empty ? null : pad.toDataURL('image/png'));
    });

    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      pad.off();
    };
  }, [onChange]);

  function clear() {
    padRef.current?.clear();
    setHasSignature(false);
    onChange(null);
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        className={`signature-canvas ${hasSignature ? 'has-signature' : ''}`}
      />
      <div className="signature-actions">
        <button type="button" className="signature-clear" onClick={clear}>
          Clear signature
        </button>
      </div>
    </div>
  );
}
