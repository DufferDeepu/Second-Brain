import React, { useState, useEffect } from 'react';
import { X, Youtube, Twitter, FileText } from 'lucide-react';
import { Button } from './Button';

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: {
    title: string;
    content: string;
    type: "youtube" | "twitter" | "documents";
    dateAdded: string;
  }) => void;
}

export const ContentModal = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}: ContentModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<"youtube" | "twitter" | "documents">("documents");

  useEffect(() => {
    // Auto-detect content type based on input
    if (content.includes('youtube.com') || content.includes('youtu.be')) {
      setContentType('youtube');
    } else if (content.includes('twitter.com') || content.includes('x.com')) {
      setContentType('twitter');
    } else {
      setContentType('documents');
    }
  }, [content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    onSubmit({
      title,
      content,
      type: contentType,
      dateAdded: today
    });
    
    setTitle('');
    setContent('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add New Content</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5 cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter title"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y min-h-[100px]"
              placeholder="Enter link or text content"
              required
            />
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="font-medium">Detected Type:</span>
            <div className="flex items-center space-x-1">
              {contentType === 'youtube' && (
                <>
                  <Youtube className="h-4 w-4 text-red-600" />
                  <span>YouTube</span>
                </>
              )}
              {contentType === 'twitter' && (
                <>
                  <Twitter className="h-4 w-4 text-blue-400" />
                  <span>Tweets</span>
                </>
              )}
              {contentType === 'documents' && (
                <>
                  <FileText className="h-4 w-4 text-gray-600" />
                  <span>Documents</span>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="secondary"
              size="md"
              label="Cancel"
              onClick={onClose}
            />
            <Button
              variant="default"
              size="md"
              label="Add Content"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
