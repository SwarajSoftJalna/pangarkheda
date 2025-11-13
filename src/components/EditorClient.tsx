'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import of TinyMCE Editor with no SSR
const Editor = dynamic(
  () => import('@tinymce/tinymce-react').then((mod) => mod.Editor),
  { ssr: false }
);

interface EditorClientProps {
  value: string;
  onEditorChange: (content: string) => void;
  placeholder?: string;
  height?: number;
}

export default function EditorClient({ 
  value, 
  onEditorChange, 
  placeholder = 'Start typing...',
  height = 400 
}: EditorClientProps) {
  const editorRef = useRef<any>(null);

  const handleEditorChange = (content: string) => {
    onEditorChange(content);
  };

  return (
    <div className="w-full">
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
        onInit={(evt, editor) => editorRef.current = editor}
        value={value}
        onEditorChange={handleEditorChange}
        init={{
          height: height,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; line-height: 1.6; }',
          placeholder: placeholder,
          branding: false,
          promotion: false,
          resize: false,
          statusbar: false,
          content_css: false,
          skin: 'oxide',
          theme: 'silver',
          setup: (editor) => {
            editor.on('init', () => {
              // Custom initialization if needed
            });
          }
        }}
      />
    </div>
  );
}
