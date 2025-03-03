import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { ContentCard } from "../components/ContentCard";
import { Sidebar } from "../components/SideBar";
import { ContentModal } from "../components/ContentModal";
import { ShareModal } from "../components/ShareModal";
import { contentAPI } from '../api';
import { Content } from '../types';

interface ContentSubmission {
  title: string;
  content: string;
  type: string;
  dateAdded: string;
}

export function Dashboard() {
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareContentId, setShareContentId] = useState<string | undefined>(undefined);
  const [shareContentTitle, setShareContentTitle] = useState<string | undefined>(undefined);
  
  const [selectedType, setSelectedType] = useState('All Notes');
  const queryClient = useQueryClient();

  // Fetch contents
  const { data: contents = [], isLoading } = useQuery<Content[]>(
    ['contents', selectedType],
    () => contentAPI.getContents(selectedType),
    {
      refetchOnWindowFocus: false,
    }
  );

  // Add content mutation
  const addContentMutation = useMutation(
    (newContent: { title: string; content: string; type: string }) =>
      contentAPI.addContent({
        title: newContent.title,
        link: newContent.content,
        type: newContent.type === 'mixed' ? 'text' : newContent.type,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['contents']);
        setIsContentModalOpen(false);
      },
    }
  );

  // Delete content mutation
  const deleteContentMutation = useMutation(
    (contentId: string) => contentAPI.deleteContent(contentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['contents']);
      },
    }
  );

  // Handler for adding new content
  const handleAddContent = (newContent: ContentSubmission) => {
    addContentMutation.mutate({
      title: newContent.title,
      content: newContent.content,
      type: newContent.type === 'mixed' ? 'text' : newContent.type,
    });
  };

  // Handler for deleting content
  const handleDelete = (contentId: string) => {
    if (contentId) {
      deleteContentMutation.mutate(contentId);
    }
  };

  // Handler for sharing the whole brain
  const handleShareBrain = () => {
    setShareContentId(undefined);
    setShareContentTitle(undefined);
    setIsShareModalOpen(true);
  };

  // Handler for sharing specific content
  const handleShareContent = (contentId: string, contentTitle: string) => {
    setShareContentId(contentId);
    setShareContentTitle(contentTitle);
    setIsShareModalOpen(true);
  };

  // Transform API data to match ContentCard props
  const transformedContents = contents.map((item) => ({
    id: item._id,
    title: item.title,
    content: item.link,
    type: item.type === 'text' ? 'mixed' : item.type,
    dateAdded: new Date(item.createdAt || Date.now()).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  }));

  // Filter contents based on selected type
  const filteredContents = selectedType === 'All Notes' 
    ? transformedContents 
    : transformedContents.filter(content => content.type === selectedType);

  return (
    <div className="flex min-h-screen">
      <Sidebar onItemClick={setSelectedType} activeItem={selectedType} />
      
      {/* Main Content Area */}
      <div className="flex-1 p-4 bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="font-bold text-2xl ml-2 hidden md:block">
            {selectedType === 'All' ? 'All Notes' : `${selectedType}`}
          </div>
          
          <div className="flex justify-end">
            <div className="p-4">
              <Button
                variant="secondary"
                startIcon={<ShareIcon size="md" />}
                size="md"
                className="sm:px-4 sm:py-2 sm:text-xs md:px-6 md:py-3 md:text-sm" 
                label="Share Brain"
                fullWidth
                onClick={handleShareBrain}
              />
            </div>
            <div className="p-4">
              <Button
                variant="default"
                startIcon={<PlusIcon size="md" />}
                size="md"
                className="sm:px-4 sm:py-2 sm:text-xs md:px-6 md:py-3 md:text-sm" 
                label="Add Content"
                fullWidth
                onClick={() => setIsContentModalOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* Content Cards Section */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading contents...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContents.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No content found. Add some content to get started!</p>
              </div>
            ) : (
              filteredContents.map((content, index) => (
                <ContentCard
                  key={content.id || index}
                  title={content.title}
                  content={content.content}
                  type={content.type as "youtube" | "twitter" | "text" | "mixed"}
                  dateAdded={content.dateAdded}
                  onDelete={() => handleDelete(content.id)}
                  onShare={() => handleShareContent(content.id, content.title)}
                />
              ))
            )}
          </div>
        )}
      </div>

      <ContentModal
        isOpen={isContentModalOpen}
        onClose={() => setIsContentModalOpen(false)}
        onSubmit={handleAddContent}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        contentId={shareContentId}
        contentTitle={shareContentTitle}
      />
    </div>
  );
}