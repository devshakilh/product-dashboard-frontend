'use client';

import { FC, useEffect, useState } from 'react';
import { Button } from '@/features/ui/atoms';
import TextArea from '@/features/ui/atoms/text-area.component';
import Modal from '@/features/ui/molecules/modal.component';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId?: string;
  title?: string;
  timeStart?: string;
  timeEnd?: string;
  description?: string;
  currentColor?: string;
  onSave?: (eventId: string, note: string, color: string) => void;
}

const EventDetailModal: FC<EventDetailModalProps> = ({
  isOpen,
  onClose,
  eventId = '',
  title = '',
  timeStart = '',
  timeEnd = '',
  description = '',
  currentColor = '#f59e0b', // Default amber color
  onSave,
}) => {
  const [note, setNote] = useState('');
  const [selectedColor, setSelectedColor] = useState(currentColor);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);

  // Available colors for selection - solid/deep colors
  const colors = [
    { value: '#9ca3af', label: 'Gray' }, // Gray
    { value: '#b45309', label: 'Brown' }, // Brown
    { value: '#06b6d4', label: 'Cyan' }, // Cyan
    { value: '#10b981', label: 'Emerald' }, // Emerald
    { value: '#ef4444', label: 'Red' }, // Red
    { value: '#a855f7', label: 'Purple' }, // Purple
    { value: '#3b82f6', label: 'Blue' }, // Blue
    { value: '#f59e0b', label: 'Amber' }, // Amber
  ];

  // Update state when props change
  useEffect(() => {
    setNote(description || '');
    setSelectedColor(currentColor || '#f59e0b');
    setColorDropdownOpen(false);
  }, [description, currentColor, isOpen]);

  const handleSave = () => {
    if (onSave && eventId) {
      onSave(eventId, note, selectedColor);
    }
    onClose();
  };

  const toggleColorDropdown = () => {
    setColorDropdownOpen(!colorDropdownOpen);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div>
        <div className="flex justify-end text-right">
          <div>
            <label className="mb-1 text-sm font-medium text-gray-700">
              Choose Color
            </label>
            <div className="relative mt-1">
              <button
                type="button"
                onClick={toggleColorDropdown}
                className="flex items-center rounded-full border border-gray-300 p-1 shadow-sm hover:bg-gray-50"
              >
                <div
                  className="size-8 rounded-full"
                  style={{ backgroundColor: selectedColor }}
                ></div>
                <div className="mx-1">
                  {colorDropdownOpen ? (
                    <ChevronUp className="size-5" />
                  ) : (
                    <ChevronDown className="size-5" />
                  )}
                </div>
              </button>

              {/* Color dropdown */}
              {colorDropdownOpen && (
                <div className="absolute right-0 z-10 mt-1 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                  <div className="flex flex-row items-center gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => {
                          setSelectedColor(color.value);
                          setColorDropdownOpen(false);
                        }}
                        className={`size-8 rounded-full transition-all ${
                          selectedColor === color.value
                            ? 'ring-2 ring-gray-600 ring-offset-2'
                            : ''
                        }`}
                        style={{ backgroundColor: color.value }}
                        aria-label={`Select ${color.label} color`}
                      ></button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <h2 className="mb-2 text-lg font-medium text-gray-800">{title}</h2>

        {/* Time info */}
        {(timeStart || timeEnd) && (
          <div className="mb-4 flex items-center text-sm text-gray-600">
            <Clock className="mr-2 size-4" />
            <span>
              {timeStart} - {timeEnd}
            </span>
          </div>
        )}

        <div className="my-4 border-b border-gray-200"></div>

        {/* Note Text Area */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Write Note
          </label>
          <TextArea
            placeholder="Write note here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-24 w-full"
            length={300}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EventDetailModal;
