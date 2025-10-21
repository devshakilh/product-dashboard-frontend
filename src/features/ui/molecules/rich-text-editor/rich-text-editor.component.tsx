'use client';

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Select from '@/features/ui/atoms/select.component';
import BulletList from '@tiptap/extension-bullet-list';
import Color from '@tiptap/extension-color';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Underline as UnderlineIcon,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export type RichTextEditorRef = {
  editor: Editor | null;
};

const availableColors = [
  '#000000',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#00FFFF',
  '#FF00FF',
  '#808080',
];

const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(
  ({ value, onChange, placeholder = 'Start typing...', rows = 8 }, ref) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showAlignmentOptions, setShowAlignmentOptions] = useState(false);

    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          // Disable the included extensions that we'll configure separately
          bulletList: false,
          orderedList: false,
          heading: false, // Disable the default heading
        }),
        Heading.configure({
          levels: [1, 2, 3],
        }),
        Underline,
        TextStyle,
        Color,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
          alignments: ['left', 'center', 'right', 'justify'],
          defaultAlignment: 'left',
        }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: 'text-blue-600 underline',
          },
        }),
        // Add the list extensions explicitly
        BulletList.configure({
          HTMLAttributes: {
            class: 'list-disc pl-6',
          },
        }),
        OrderedList.configure({
          HTMLAttributes: {
            class: 'list-decimal pl-6',
          },
        }),
        ListItem,
      ],
      content: value || '<p></p>',
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        if (html !== value) {
          onChange(html);
        }
      },
      editorProps: {
        attributes: {
          class:
            'w-full text-black border-none outline-none p-3 min-h-[12rem] focus:ring-0 prose prose-sm max-w-none prose-headings:font-bold prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700',
          style: `min-height: ${rows * 1.5}rem`,
        },
      },
    });

    // Update content when value prop changes
    useEffect(() => {
      if (editor && editor.getHTML() !== value) {
        editor.commands.setContent(value || '<p></p>');
      }
    }, [editor, value]);

    useImperativeHandle(ref, () => ({
      editor,
    }));

    const toggleFormat = (format: string) => {
      if (!editor) return;

      // Make sure editor has focus before running commands
      editor.commands.focus();

      switch (format) {
        case 'bold':
          editor.chain().focus().toggleBold().run();
          break;
        case 'italic':
          editor.chain().focus().toggleItalic().run();
          break;
        case 'strikethrough':
          editor.chain().focus().toggleStrike().run();
          break;
        case 'underline':
          editor.chain().focus().toggleUnderline().run();
          break;
        case 'bulletList':
          editor.chain().focus().toggleBulletList().run();
          break;
        case 'orderedList':
          editor.chain().focus().toggleOrderedList().run();
          break;
        case 'link':
          const url = window.prompt('URL');
          if (url) {
            // First check if there's already a link at the current selection
            if (editor.isActive('link')) {
              // If there is, remove it
              editor.chain().focus().unsetLink().run();
            }
            // Then set the link
            editor.chain().focus().setLink({ href: url }).run();
          }
          break;
        case 'blockquote':
          editor.chain().focus().toggleBlockquote().run();
          break;
        case 'align-left':
          editor.chain().focus().setTextAlign('left').run();
          break;
        case 'align-center':
          editor.chain().focus().setTextAlign('center').run();
          break;
        case 'align-right':
          editor.chain().focus().setTextAlign('right').run();
          break;
        case 'align-justify':
          editor.chain().focus().setTextAlign('justify').run();
          break;
        default:
          break;
      }
    };

    const setColor = (color: string) => {
      if (!editor) return;
      editor.chain().focus().setColor(color).run();
      setShowColorPicker(false);
    };

    const handleHeadingChange = (value: string) => {
      if (!editor) return;

      // Make sure editor has focus
      editor.commands.focus();

      // First clear any existing heading
      editor.chain().focus().clearNodes().run();

      switch (value) {
        case 'heading-1':
          editor.chain().focus().setHeading({ level: 1 }).run();
          break;
        case 'heading-2':
          editor.chain().focus().setHeading({ level: 2 }).run();
          break;
        case 'heading-3':
          editor.chain().focus().setHeading({ level: 3 }).run();
          break;
        default:
          editor.chain().focus().setParagraph().run();
      }
    };

    const getHeadingValue = () => {
      if (!editor) return 'paragraph';

      if (editor.isActive('heading', { level: 1 })) return 'heading-1';
      if (editor.isActive('heading', { level: 2 })) return 'heading-2';
      if (editor.isActive('heading', { level: 3 })) return 'heading-3';

      return 'paragraph';
    };

    // Add a click outside handler to close the dropdown
    useEffect(() => {
      const handleClickOutside = () => {
        if (showAlignmentOptions) {
          setShowAlignmentOptions(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [showAlignmentOptions]);

    if (!editor) {
      return <div>Loading editor...</div>;
    }

    return (
      <div className="rounded-md border border-gray-100">
        <div className="flex items-center gap-2 border-b border-gray-100 bg-neutral-50 p-1 outline-none">
          <Select
            options={[
              { value: 'paragraph', label: 'Normal text' },
              { value: 'heading-1', label: 'Heading 1' },
              { value: 'heading-2', label: 'Heading 2' },
              { value: 'heading-3', label: 'Heading 3' },
            ]}
            className="rounded border-0 bg-transparent px-2 py-1 text-sm"
            onValueChange={handleHeadingChange}
            value={getHeadingValue()}
          />

          {/* Alignment dropdown with icons */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center rounded border border-transparent px-1 text-sm hover:bg-gray-100"
              onClick={() => setShowAlignmentOptions(!showAlignmentOptions)}
            >
              {editor.isActive({ textAlign: 'center' }) ? (
                <AlignCenter size={16} />
              ) : editor.isActive({ textAlign: 'right' }) ? (
                <AlignRight size={16} />
              ) : editor.isActive({ textAlign: 'justify' }) ? (
                <AlignJustify size={16} />
              ) : (
                <AlignLeft size={16} />
              )}
              <svg
                className="ml-1 size-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>

            {showAlignmentOptions && (
              <div
                className="absolute left-0 top-full z-50 mt-1 flex flex-col rounded border border-gray-200 bg-white shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                {[
                  {
                    align: 'left',
                    icon: <AlignLeft size={16} />,
                    format: 'align-left',
                  },
                  {
                    align: 'center',
                    icon: <AlignCenter size={16} />,
                    format: 'align-center',
                  },
                  {
                    align: 'right',
                    icon: <AlignRight size={16} />,
                    format: 'align-right',
                  },
                  {
                    align: 'justify',
                    icon: <AlignJustify size={16} />,
                    format: 'align-justify',
                  },
                ].map(({ align, icon, format }) => (
                  <button
                    key={align}
                    type="button"
                    className={`flex items-center px-3 py-2 hover:bg-gray-100 ${
                      editor.isActive({ textAlign: align }) ? 'bg-gray-200' : ''
                    }`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFormat(format);
                      setShowAlignmentOptions(false);
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color picker with selected color indicator */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center rounded border border-transparent p-1 text-sm hover:bg-gray-100"
              onClick={() => setShowColorPicker(!showColorPicker)}
              title="Text Color"
            >
              <div
                className="mr-1 size-5 rounded-md border border-gray-300"
                style={{
                  backgroundColor: editor.getAttributes('textStyle').color,
                }}
              />
              <svg
                className="size-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>

            {showColorPicker && (
              <div className="absolute left-0 top-full z-10 mt-1 flex flex-wrap gap-1 rounded border border-gray-200 bg-white p-2 shadow-lg">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`size-5 rounded border ${color === editor.getAttributes('textStyle').color ? 'ring-2 ring-primary-200' : 'border-transparent'}`}
                    style={{ backgroundColor: color, borderRadius: '4px' }}
                    onClick={() => setColor(color)}
                    title={color}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Original formatting buttons */}
          <button
            type="button"
            className={`rounded p-1 hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
            onClick={() => toggleFormat('bold')}
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            className={`rounded p-1 hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
            onClick={() => toggleFormat('italic')}
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <button
            type="button"
            className={`rounded p-1 hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
            onClick={() => toggleFormat('underline')}
            title="Underline"
          >
            <UnderlineIcon size={16} />
          </button>
          <button
            type="button"
            className={`rounded p-1 hover:bg-gray-100 ${editor.isActive('strikethrough') ? 'bg-gray-200' : ''}`}
            onClick={() => toggleFormat('strikethrough')}
            title="Strikethrough"
          >
            <Strikethrough size={16} />
          </button>

          <button
            type="button"
            className={`rounded p-1 hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
            onClick={() => toggleFormat('orderedList')}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </button>
          <button
            type="button"
            className={`rounded p-1 hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
            onClick={() => toggleFormat('bulletList')}
            title="Bullet List"
          >
            <List size={16} />
          </button>

          <button
            type="button"
            className={`rounded p-1 hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
            onClick={() => toggleFormat('link')}
            title="Insert Link"
          >
            <Link2 size={16} />
          </button>
          <button
            type="button"
            className={`rounded p-1 hover:bg-gray-100 ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
            onClick={() => toggleFormat('blockquote')}
            title="Quote"
          >
            <Quote size={16} />
          </button>
        </div>
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
