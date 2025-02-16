import React, { useState } from 'react';
import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { ContentCard } from "../components/ContentCard";
import { Sidebar } from "../components/SideBar";
import { ContentModal } from "../components/ContentModal";

export function Dashboard() {
  type Content = {
    title: string;
    content: string;
    type: "youtube" | "twitter" | "mixed";
    dateAdded: string;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contents, setContents] = useState<Content[]>([
    {
      title: "YouTube Tutorial",
      content: "https://www.youtube.com/watch?v=godVDNVWeso",
      type: "youtube",
      dateAdded: "Mar 15, 2024"
    },
    {
      title: "Interesting Tweet",
      content: "https://x.com/tweet/status/1465053672593784834",
      type: "twitter",
      dateAdded: "Mar 15, 2024"
    },
    {
      title: "Morning Routine",
      content: "Go to gym at 9, breakfast after",
      type: "mixed",
      dateAdded: "Mar 15, 2024"
    }
  ]);

  const handleAddContent = (newContent: Content) => {
    setContents([...contents, newContent]);
  };
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 p-4 bg-gray-100">
        <div className="flex justify-between items-center">
          {/* Hide "All NOTES" on small screens and show on medium and larger screens */}
          <div className="font-bold text-2xl ml-2 hidden md:block">
            All NOTES
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
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* Content Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contents.map((content, index) => (
              <ContentCard
                key={index}
                title={content.title}
                content={content.content}
                type={content.type}
                dateAdded={content.dateAdded}
              />
            ))}
          </div>
      </div>

      <ContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddContent}
      />
    </div>
  );
}
