import React, { useEffect, useRef } from 'react';

import './TextArea.scss';

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<Props> = ({ label, value, name, onChange }) => {
  const textareaRef: React.RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(null);

  function handleInput(event: React.FormEvent<HTMLTextAreaElement>): void {
    const target: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  }

  useEffect(() => {
    const textarea: HTMLTextAreaElement | null = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 10}px`;
    }
  }, [value]);

  return (
    <div className='text-area'>
      <div className='text-area__label'>{label}:</div>
      <textarea
        ref={textareaRef}
        value={value}
        name={name}
        className='text-area__field'
        onChange={onChange}
        onInput={handleInput}
      />
    </div>
  );
};

export default TextArea;
