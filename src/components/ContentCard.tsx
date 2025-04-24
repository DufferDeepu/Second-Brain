import { Share2, Trash2, Youtube, Twitter, FileText, Layout } from 'lucide-react';

type ContentType = "twitter" | "youtube" | "text" | "mixed";

interface ContentCardProps {
  title: string;
  content: string;
  type: ContentType;
  dateAdded: string;
  onShare?: () => void;
  onDelete?: () => void;
}

// Icon mapping
const ContentTypeIcon = ({ type }: { type: ContentType }) => {
  switch (type) {
    case 'youtube':
      return <Youtube className="h-5 w-5 text-gray-600" />;
    case 'twitter':
      return <Twitter className="h-5 w-5 text-gray-600" />;
    case 'mixed':
      return <Layout className="h-5 w-5 text-gray-600" />;
    default:
      return <FileText className="h-5 w-5 text-gray-600" />;
  }
};

// Content Card Component
export const ContentCard = ({
  title,
  content,
  type,
  dateAdded,
  onShare,
  onDelete,
}: ContentCardProps) => {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col w-full min-h-[200px]">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex items-center space-x-2 max-w-[70%]">
          <ContentTypeIcon type={type} />
          <h2 className="font-medium text-gray-800 truncate">{title}</h2>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={onShare}
            className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            aria-label="Share"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="w-full my-2">
        {type === "youtube" && (
          <div className="w-full">
            <iframe
              className="w-full aspect-video rounded-md"
              src={content.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        {type === "twitter" && (
          <div className="w-full overflow-hidden">
            <div className="w-full flex justify-center">
              <blockquote 
                className="twitter-tweet" 
                style={{ 
                  margin: 0,
                  maxWidth: "100%"
                }}
                data-width="100%"
                data-cards="hidden"
                data-conversation="none"
              >
                <a href={content.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          </div>
        )}
        {(type === "text" || type === "mixed") && (
          <div className="w-full max-h-[300px] overflow-y-auto px-1">
            <p className="text-gray-700 whitespace-pre-wrap break-words">{content}</p>
          </div>
        )}
      </div>
      
      <div className="mt-auto pt-4 text-sm text-gray-500">
        Added on {dateAdded}
      </div>
    </div>
  );
};