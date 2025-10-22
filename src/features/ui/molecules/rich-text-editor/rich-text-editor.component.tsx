'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/features/ui';
import BulletList from '@tiptap/extension-bullet-list';
import CharacterCount from '@tiptap/extension-character-count';
import Color from '@tiptap/extension-color';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  CheckSquare,
  Code,
  Highlighter,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Table as TableIcon,
  Type,
  Underline as UnderlineIcon,
  Undo,
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
  '#374151',
  '#6B7280',
  '#EF4444',
  '#F97316',
  '#F59E0B',
  '#EAB308',
  '#84CC16',
  '#22C55E',
  '#10B981',
  '#14B8A6',
  '#06B6D4',
  '#0EA5E9',
  '#3B82F6',
  '#6366F1',
  '#8B5CF6',
  '#A855F7',
  '#D946EF',
  '#EC4899',
  '#F43F5E',
];

const highlightColors = [
  '#FEF3C7',
  '#DBEAFE',
  '#DCFCE7',
  '#FED7AA',
  '#E9D5FF',
  '#FBCFE8',
];

const fontSizes = [
  { label: 'Small', value: '0.875rem' },
  { label: 'Normal', value: '1rem' },
  { label: 'Large', value: '1.125rem' },
  { label: 'Extra Large', value: '1.25rem' },
];

const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(
  ({ value, onChange, placeholder = 'Start typing...', rows = 8 }, ref) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showHighlightPicker, setShowHighlightPicker] = useState(false);
    const [showAlignmentOptions, setShowAlignmentOptions] = useState(false);
    const [showTableMenu, setShowTableMenu] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [fontSize, setFontSize] = useState('1rem');

    const colorPickerRef = useRef<HTMLDivElement>(null);
    const highlightPickerRef = useRef<HTMLDivElement>(null);
    const alignmentRef = useRef<HTMLDivElement>(null);
    const tableMenuRef = useRef<HTMLDivElement>(null);

    const editor = useEditor({
      immediatelyRender: false,
      extensions: [
        StarterKit.configure({
          bulletList: false,
          orderedList: false,
          heading: false,
        }),
        Heading.configure({
          levels: [1, 2, 3, 4, 5, 6],
        }),
        Underline,
        TextStyle,
        Color,
        Highlight.configure({
          multicolor: true,
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
          alignments: ['left', 'center', 'right', 'justify'],
          defaultAlignment: 'left',
        }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class:
              'text-blue-600 dark:text-blue-400 underline cursor-pointer hover:text-blue-800 dark:hover:text-blue-300',
          },
        }),
        BulletList.configure({
          HTMLAttributes: {
            class: 'list-disc pl-6 space-y-1',
          },
        }),
        OrderedList.configure({
          HTMLAttributes: {
            class: 'list-decimal pl-6 space-y-1',
          },
        }),
        ListItem,
        TaskList.configure({
          HTMLAttributes: {
            class: 'space-y-1',
          },
        }),
        TaskItem.configure({
          nested: true,
          HTMLAttributes: {
            class: 'flex items-start gap-2',
          },
        }),
        Image.configure({
          HTMLAttributes: {
            class: 'max-w-full h-auto rounded-lg',
          },
        }),
        Table.configure({
          resizable: true,
          HTMLAttributes: {
            class: 'border-collapse table-auto w-full my-4',
          },
        }),
        TableRow.configure({
          HTMLAttributes: {
            class: 'border border-gray-300 dark:border-gray-600',
          },
        }),
        TableHeader.configure({
          HTMLAttributes: {
            class:
              'border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 font-bold p-2 text-left',
          },
        }),
        TableCell.configure({
          HTMLAttributes: {
            class: 'border border-gray-300 dark:border-gray-600 p-2',
          },
        }),
        Placeholder.configure({
          placeholder,
        }),
        CharacterCount,
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
            'w-full text-black dark:text-white border-none outline-none p-4 min-h-[12rem] focus:ring-0 prose dark:prose-invert prose-sm max-w-none prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-h5:text-sm prose-h6:text-xs prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-img:rounded-lg',
          style: `min-height: ${rows * 1.5}rem; font-size: ${fontSize}`,
        },
      },
    });

    useEffect(() => {
      if (editor && editor.getHTML() !== value) {
        editor.commands.setContent(value || '<p></p>');
      }
    }, [editor, value]);

    useImperativeHandle(ref, () => ({
      editor,
    }));

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          colorPickerRef.current &&
          !colorPickerRef.current.contains(event.target as Node)
        ) {
          setShowColorPicker(false);
        }
        if (
          highlightPickerRef.current &&
          !highlightPickerRef.current.contains(event.target as Node)
        ) {
          setShowHighlightPicker(false);
        }
        if (
          alignmentRef.current &&
          !alignmentRef.current.contains(event.target as Node)
        ) {
          setShowAlignmentOptions(false);
        }
        if (
          tableMenuRef.current &&
          !tableMenuRef.current.contains(event.target as Node)
        ) {
          setShowTableMenu(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const toggleFormat = (format: string) => {
      if (!editor) return;

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
        case 'code':
          editor.chain().focus().toggleCode().run();
          break;
        case 'bulletList':
          editor.chain().focus().toggleBulletList().run();
          break;
        case 'orderedList':
          editor.chain().focus().toggleOrderedList().run();
          break;
        case 'taskList':
          editor.chain().focus().toggleTaskList().run();
          break;
        case 'link':
          const url = window.prompt('Enter URL:');
          if (url) {
            if (editor.isActive('link')) {
              editor.chain().focus().unsetLink().run();
            }
            editor.chain().focus().setLink({ href: url }).run();
          }
          break;
        case 'blockquote':
          editor.chain().focus().toggleBlockquote().run();
          break;
        case 'horizontalRule':
          editor.chain().focus().setHorizontalRule().run();
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

    const setHighlight = (color: string) => {
      if (!editor) return;
      editor.chain().focus().toggleHighlight({ color }).run();
      setShowHighlightPicker(false);
    };

    const removeHighlight = () => {
      if (!editor) return;
      editor.chain().focus().unsetHighlight().run();
      setShowHighlightPicker(false);
    };

    const handleHeadingChange = (value: string) => {
      if (!editor) return;

      editor.commands.focus();
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
        case 'heading-4':
          editor.chain().focus().setHeading({ level: 4 }).run();
          break;
        case 'heading-5':
          editor.chain().focus().setHeading({ level: 5 }).run();
          break;
        case 'heading-6':
          editor.chain().focus().setHeading({ level: 6 }).run();
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
      if (editor.isActive('heading', { level: 4 })) return 'heading-4';
      if (editor.isActive('heading', { level: 5 })) return 'heading-5';
      if (editor.isActive('heading', { level: 6 })) return 'heading-6';

      return 'paragraph';
    };

    const getHeadingLabel = () => {
      const value = getHeadingValue();
      switch (value) {
        case 'heading-1':
          return 'Heading 1';
        case 'heading-2':
          return 'Heading 2';
        case 'heading-3':
          return 'Heading 3';
        case 'heading-4':
          return 'Heading 4';
        case 'heading-5':
          return 'Heading 5';
        case 'heading-6':
          return 'Heading 6';
        default:
          return 'Normal text';
      }
    };

    const insertTable = (rows: number, cols: number) => {
      if (!editor) return;
      editor
        .chain()
        .focus()
        .insertTable({ rows, cols, withHeaderRow: true })
        .run();
      setShowTableMenu(false);
    };

    const insertImage = () => {
      if (!editor || !imageUrl) return;
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setShowImageDialog(false);
    };

    const handleFontSizeChange = (value: string) => {
      setFontSize(value);
      if (!editor) return;
      const element = editor.view.dom as HTMLElement;
      element.style.fontSize = value;
    };

    const getFontSizeLabel = () => {
      const size = fontSizes.find((s) => s.value === fontSize);
      return size ? size.label : 'Normal';
    };

    if (!editor) {
      return (
        <div className="rounded-md border border-gray-300 bg-white p-4 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
          Loading editor...
        </div>
      );
    }

    return (
      <div className="rounded-lg border border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800">
          {/* Undo/Redo */}
          <button
            type="button"
            className="rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo (Ctrl+Z)"
          >
            <Undo size={18} />
          </button>
          <button
            type="button"
            className="rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo (Ctrl+Y)"
          >
            <Redo size={18} />
          </button>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

          {/* Text Style */}
          <Select value={getHeadingValue()} onValueChange={handleHeadingChange}>
            <SelectTrigger className="w-32 rounded border-0 bg-transparent px-2 py-1 text-sm">
              <SelectValue placeholder={getHeadingLabel()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraph">Normal text</SelectItem>
              <SelectItem value="heading-1">Heading 1</SelectItem>
              <SelectItem value="heading-2">Heading 2</SelectItem>
              <SelectItem value="heading-3">Heading 3</SelectItem>
              <SelectItem value="heading-4">Heading 4</SelectItem>
              <SelectItem value="heading-5">Heading 5</SelectItem>
              <SelectItem value="heading-6">Heading 6</SelectItem>
            </SelectContent>
          </Select>

          {/* Font Size */}
          <Select value={fontSize} onValueChange={handleFontSizeChange}>
            <SelectTrigger className="w-28 rounded border-0 bg-transparent px-2 py-1 text-sm">
              <SelectValue placeholder={getFontSizeLabel()} />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size) => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

          {/* Text Color */}
          <div className="relative" ref={colorPickerRef}>
            <button
              type="button"
              className="flex items-center rounded border border-transparent p-1.5 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setShowColorPicker(!showColorPicker)}
              title="Text Color"
            >
              <Type size={18} />
              <div
                className="absolute bottom-0.5 left-1/2 h-1 w-4 -translate-x-1/2"
                style={{
                  backgroundColor:
                    editor.getAttributes('textStyle').color || '#000000',
                }}
              />
            </button>

            {showColorPicker && (
              <div className="absolute left-0 top-full z-50 mt-1 rounded border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="flex w-48 flex-wrap gap-1">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`size-7 rounded border transition-transform hover:scale-110 ${
                        color === editor.getAttributes('textStyle').color
                          ? 'ring-2 ring-blue-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Highlight Color */}
          <div className="relative" ref={highlightPickerRef}>
            <button
              type="button"
              className={`rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
                editor.isActive('highlight')
                  ? 'bg-gray-200 dark:bg-gray-700'
                  : ''
              }`}
              onClick={() => setShowHighlightPicker(!showHighlightPicker)}
              title="Highlight"
            >
              <Highlighter size={18} />
            </button>

            {showHighlightPicker && (
              <div className="absolute left-0 top-full z-50 mt-1 rounded border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="flex w-40 flex-col gap-2">
                  <div className="flex flex-wrap gap-1">
                    {highlightColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`size-7 rounded border transition-transform hover:scale-110 ${
                          editor.isActive('highlight', { color })
                            ? 'ring-2 ring-blue-500'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setHighlight(color)}
                        title={color}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="border-t border-gray-200 pt-2 text-xs text-gray-600 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={removeHighlight}
                  >
                    Remove Highlight
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

          {/* Text Formatting */}
          <button
            type="button"
            className={`rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
              editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            onClick={() => toggleFormat('bold')}
            title="Bold (Ctrl+B)"
          >
            <Bold size={18} />
          </button>
          <button
            type="button"
            className={`rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
              editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            onClick={() => toggleFormat('italic')}
            title="Italic (Ctrl+I)"
          >
            <Italic size={18} />
          </button>
          <button
            type="button"
            className={`rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
              editor.isActive('underline') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            onClick={() => toggleFormat('underline')}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon size={18} />
          </button>
          <button
            type="button"
            className={`rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
              editor.isActive('strike') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            onClick={() => toggleFormat('strikethrough')}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </button>
          <button
            type="button"
            className={`rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
              editor.isActive('code') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            onClick={() => toggleFormat('code')}
            title="Inline Code"
          >
            <Code size={18} />
          </button>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

          {/* Alignment */}
          <div className="relative" ref={alignmentRef}>
            <button
              type="button"
              className="flex items-center rounded border border-transparent p-1.5 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setShowAlignmentOptions(!showAlignmentOptions)}
              title="Text Alignment"
            >
              {editor.isActive({ textAlign: 'center' }) ? (
                <AlignCenter size={18} />
              ) : editor.isActive({ textAlign: 'right' }) ? (
                <AlignRight size={18} />
              ) : editor.isActive({ textAlign: 'justify' }) ? (
                <AlignJustify size={18} />
              ) : (
                <AlignLeft size={18} />
              )}
            </button>

            {showAlignmentOptions && (
              <div className="absolute left-0 top-full z-50 mt-1 flex flex-col rounded border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                {[
                  {
                    align: 'left',
                    icon: <AlignLeft size={18} />,
                    format: 'align-left',
                    label: 'Left',
                  },
                  {
                    align: 'center',
                    icon: <AlignCenter size={18} />,
                    format: 'align-center',
                    label: 'Center',
                  },
                  {
                    align: 'right',
                    icon: <AlignRight size={18} />,
                    format: 'align-right',
                    label: 'Right',
                  },
                  {
                    align: 'justify',
                    icon: <AlignJustify size={18} />,
                    format: 'align-justify',
                    label: 'Justify',
                  },
                ].map(({ align, icon, format, label }) => (
                  <button
                    key={align}
                    type="button"
                    className={`flex min-w-[120px] items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 ${
                      editor.isActive({ textAlign: align })
                        ? 'bg-gray-200 dark:bg-gray-700'
                        : ''
                    }`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFormat(format);
                      setShowAlignmentOptions(false);
                    }}
                  >
                    {icon}
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

          {/* Lists */}
          <button
            type="button"
            className={`rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
              editor.isActive('orderedList')
                ? 'bg-gray-200 dark:bg-gray-700'
                : ''
            }`}
            onClick={() => toggleFormat('orderedList')}
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </button>
          <button
            type="button"
            className={`rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
              editor.isActive('bulletList')
                ? 'bg-gray-200 dark:bg-gray-700'
                : ''
            }`}
            onClick={() => toggleFormat('bulletList')}
            title="Bullet List"
          >
            <List size={18} />
          </button>
          <button
            type="button"
            className={`rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
              editor.isActive('taskList') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            onClick={() => toggleFormat('taskList')}
            title="Task List"
          >
            <CheckSquare size={18} />
          </button>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

          {/* Insert Elements */}
          <button
            type="button"
            className={`rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
              editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            onClick={() => toggleFormat('link')}
            title="Insert Link"
          >
            <Link2 size={18} />
          </button>
          <button
            type="button"
            className="rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => setShowImageDialog(true)}
            title="Insert Image"
          >
            <ImageIcon size={18} />
          </button>
          <button
            type="button"
            className={`rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
              editor.isActive('blockquote')
                ? 'bg-gray-200 dark:bg-gray-700'
                : ''
            }`}
            onClick={() => toggleFormat('blockquote')}
            title="Quote"
          >
            <Quote size={18} />
          </button>
          <button
            type="button"
            className="rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => toggleFormat('horizontalRule')}
            title="Horizontal Line"
          >
            <Minus size={18} />
          </button>

          {/* Table */}
          <div className="relative" ref={tableMenuRef}>
            <button
              type="button"
              className={`rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
                editor.isActive('table') ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              onClick={() => setShowTableMenu(!showTableMenu)}
              title="Insert Table"
            >
              <TableIcon size={18} />
            </button>

            {showTableMenu && (
              <div className="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Insert Table
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    className="rounded px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => insertTable(3, 3)}
                  >
                    3 × 3
                  </button>
                  <button
                    type="button"
                    className="rounded px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => insertTable(4, 4)}
                  >
                    4 × 4
                  </button>
                  <button
                    type="button"
                    className="rounded px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => insertTable(5, 5)}
                  >
                    5 × 5
                  </button>
                </div>
                {editor.isActive('table') && (
                  <>
                    <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        className="rounded px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={() => {
                          editor.chain().focus().addRowBefore().run();
                          setShowTableMenu(false);
                        }}
                      >
                        Add Row Above
                      </button>
                      <button
                        type="button"
                        className="rounded px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={() => {
                          editor.chain().focus().addRowAfter().run();
                          setShowTableMenu(false);
                        }}
                      >
                        Add Row Below
                      </button>
                      <button
                        type="button"
                        className="rounded px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={() => {
                          editor.chain().focus().addColumnBefore().run();
                          setShowTableMenu(false);
                        }}
                      >
                        Add Column Before
                      </button>
                      <button
                        type="button"
                        className="rounded px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={() => {
                          editor.chain().focus().addColumnAfter().run();
                          setShowTableMenu(false);
                        }}
                      >
                        Add Column After
                      </button>
                      <button
                        type="button"
                        className="rounded px-3 py-1.5 text-left text-sm text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
                        onClick={() => {
                          editor.chain().focus().deleteTable().run();
                          setShowTableMenu(false);
                        }}
                      >
                        Delete Table
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Editor Content */}
        <EditorContent editor={editor} />

        {/* Image Dialog */}
        {showImageDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Insert Image
              </h3>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="mb-4 w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    insertImage();
                  }
                }}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  onClick={() => {
                    setShowImageDialog(false);
                    setImageUrl('');
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={insertImage}
                  disabled={!imageUrl}
                >
                  Insert
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Character Count */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
          <span>
            {editor.storage.characterCount.characters()} characters ·{' '}
            {editor.storage.characterCount.words()} words
          </span>
          {editor.isActive('link') && (
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              onClick={() => editor.chain().focus().unsetLink().run()}
            >
              Remove Link
            </button>
          )}
        </div>
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
