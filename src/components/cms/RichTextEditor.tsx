import React, { useRef, useEffect, useState } from 'react';
import { Bold, Heading2, Heading3, List, ListOrdered, Link as LinkIcon, Unlink, RotateCcw, Type } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Wpisz treść...',
  minHeight = '180px',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const isInternalUpdate = useRef(false);

  // Sync incoming value with innerHTML only when not typed internally
  useEffect(() => {
    if (editorRef.current && !isInternalUpdate.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    isInternalUpdate.current = false;
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      isInternalUpdate.current = true;
      const html = editorRef.current.innerHTML;
      onChange(html);
    }
  };

  const executeCommand = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      editorRef.current.focus();
      handleInput();
    }
  };

  const handleAddLink = () => {
    const url = prompt('Wprowadź adres URL linku (np. https://example.com):');
    if (url) {
      const validUrl = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') ? url : `https://${url}`;
      executeCommand('createLink', validUrl);
    }
  };

  const handleFormatBlock = (tag: string) => {
    executeCommand('formatBlock', tag);
  };

  return (
    <div className={`w-full rounded-xl border transition-all duration-200 bg-white overflow-hidden ${
      isFocused ? 'border-red-600 ring-2 ring-red-600/15 shadow-sm' : 'border-slate-300 hover:border-slate-400'
    }`}>
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-1 p-1.5 bg-slate-50 border-b border-slate-200 select-none">
        <button
          type="button"
          onClick={() => handleFormatBlock('p')}
          title="Zwykły akapit"
          className="p-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded transition-colors flex items-center gap-1"
        >
          <Type className="w-3.5 h-3.5" />
          <span>Akapit</span>
        </button>

        <button
          type="button"
          onClick={() => handleFormatBlock('h2')}
          title="Nagłówek sekcji (H2)"
          className="p-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded transition-colors flex items-center gap-1"
        >
          <Heading2 className="w-3.5 h-3.5" />
          <span>H2</span>
        </button>

        <button
          type="button"
          onClick={() => handleFormatBlock('h3')}
          title="Podnagłówek (H3)"
          className="p-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded transition-colors flex items-center gap-1"
        >
          <Heading3 className="w-3.5 h-3.5" />
          <span>H3</span>
        </button>

        <div className="w-px h-5 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => executeCommand('bold')}
          title="Pogrubienie"
          className="p-1.5 text-slate-700 hover:bg-slate-200 rounded transition-colors"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          title="Lista punktowana"
          className="p-1.5 text-slate-700 hover:bg-slate-200 rounded transition-colors"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('insertOrderedList')}
          title="Lista numerowana"
          className="p-1.5 text-slate-700 hover:bg-slate-200 rounded transition-colors"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={handleAddLink}
          title="Dodaj link"
          className="p-1.5 text-slate-700 hover:bg-slate-200 rounded transition-colors"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('unlink')}
          title="Usuń link"
          className="p-1.5 text-slate-700 hover:bg-slate-200 rounded transition-colors"
        >
          <Unlink className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('removeFormat')}
          title="Wyczyść formatowanie"
          className="p-1.5 text-slate-500 hover:bg-slate-200 rounded transition-colors ml-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* EDITABLE CANVAS */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ minHeight }}
        className="p-3.5 sm:p-4 text-sm sm:text-base text-slate-900 focus:outline-hidden prose prose-slate max-w-none [&>p]:mb-3 [&>h2]:text-lg [&>h2]:font-bold [&>h2]:mt-4 [&>h2]:mb-2 [&>h3]:text-base [&>h3]:font-bold [&>h3]:mt-3 [&>h3]:mb-1 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-3 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-3 [&>ul>li]:mb-1 [&>ol>li]:mb-1 [&>a]:text-red-600 [&>a]:underline"
        data-placeholder={placeholder}
      />
    </div>
  );
};
