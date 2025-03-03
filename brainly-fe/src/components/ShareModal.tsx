// ShareModal.tsx
import React, { useState, useEffect } from 'react';
import { X, Link, Copy, Check } from 'lucide-react';
import { Button } from './Button';
import { useMutation } from 'react-query';
import { sharingAPI } from '../api';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId?: string;
  contentTitle?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ 
  isOpen, 
  onClose, 
  contentId, 
  contentTitle 
}) => {
  const [copied, setCopied] = useState(false);
  const [shareLink, setShareLink] = useState('');
  
  // Determine if we're sharing a specific content or the whole brain
  const isContentShare = Boolean(contentId);
  const title = isContentShare 
    ? `Share "${contentTitle || 'Content'}"` 
    : "Share Your Brain";
  
  const description = isContentShare
    ? "Generate a shareable link to give others access to this content."
    : "Generate a shareable link to give others access to your entire brain.";

  const shareMutation = useMutation(
    (share: boolean) => {
      return isContentShare 
        ? sharingAPI.shareContent(contentId as string)
        : sharingAPI.shareBrain(share);
    },
    {
      onSuccess: (data) => {
        if (data.hash) {
          const fullShareLink = `${window.location.origin}/brain/share/${data.hash}`;
          setShareLink(fullShareLink);
        }
      },
    }
  );

  // Reset state when modal opens or content changes
  useEffect(() => {
    if (isOpen) {
      setCopied(false);
      setShareLink('');
    }
  }, [isOpen, contentId]);

  const handleGenerateLink = () => {
    shareMutation.mutate(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDisableSharing = () => {
    // Only for brain sharing, not individual content
    if (!isContentShare) {
      shareMutation.mutate(false);
      setShareLink('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5 cursor-pointer" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="text-sm text-gray-600">
            {description} This link can be disabled at any time.
          </div>

          {!shareLink ? (
            <Button
              variant="default"
              size="md"
              label={shareMutation.isLoading ? "Generating..." : "Generate Share Link"}
              onClick={handleGenerateLink}
              disabled={shareMutation.isLoading}
              fullWidth
            />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center p-2 bg-gray-50 rounded-lg border border-gray-200">
                <Link className="h-5 w-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="bg-transparent flex-1 outline-none text-sm text-gray-800"
                />
                <button
                  onClick={handleCopyLink}
                  className="p-1 rounded-md hover:bg-gray-200 transition-colors"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              </div>
              
              <div className="flex justify-between">
                {!isContentShare && (
                  <Button
                    variant="secondary"
                    size="md"
                    label="Disable Sharing"
                    onClick={handleDisableSharing}
                  />
                )}
                <Button
                  variant="secondary"
                  size="md"
                  label="Close"
                  onClick={onClose}
                  fullWidth={isContentShare}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};