'use client';

import { useRef, useState } from 'react';

type Props = {
  label: string;
  required?: boolean;
  multiple?: boolean;
  accept?: string;
  hint?: string;
  files: File[];
  onChange: (files: File[]) => void;
};

const MAX_FILE_BYTES = 20 * 1024 * 1024; // 20 MB per file (matches storage policy)

export default function FileUploadField({
  label, required, multiple, accept, hint, files, onChange
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handlePick(picked: FileList | null) {
    if (!picked) return;
    const list = Array.from(picked);
    const oversize = list.find((f) => f.size > MAX_FILE_BYTES);
    if (oversize) {
      setError(`"${oversize.name}" is over 20MB. Please compress or split.`);
      return;
    }
    setError(null);
    onChange(multiple ? [...files, ...list] : [list[0]]);
  }

  function remove(idx: number) {
    onChange(files.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <label
        className={`file-upload ${files.length ? 'has-file' : ''}`}
        onClick={() => inputRef.current?.click()}
      >
        <span className="label">
          {label} {required && <span className="req">*</span>}
        </span>
        <span className="name">
          {files.length === 0
            ? 'Click to upload or drag a file here'
            : multiple
              ? `${files.length} file${files.length > 1 ? 's' : ''} selected`
              : files[0].name}
        </span>
        {hint && <span className="hint">{hint}</span>}
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={(e) => handlePick(e.target.files)}
        />
      </label>
      {error && <div className="error" style={{ marginTop: 6 }}>{error}</div>}
      {files.length > 0 && (
        <div className="file-list">
          {files.map((f, i) => (
            <div key={i} className="file-list-item">
              <span>
                {f.name}{' '}
                <span style={{ opacity: 0.5 }}>· {(f.size / 1024 / 1024).toFixed(1)} MB</span>
              </span>
              <button type="button" onClick={() => remove(i)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
