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
export const ContentCard: React.FC<ContentCardProps> = ({
    title,
    content,
    type,
    dateAdded,
    onShare,
    onDelete
}) => {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col justify-between items-center min-w-[300px] max-h-[400px]">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex items-center space-x-2">
          <ContentTypeIcon type={type} />
          <h2 className="font-medium text-gray-800">{title}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onShare}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 mt-4 overflow-y-auto flex justify-center items-center">
        {type === "youtube" && (
          <iframe
            className="w-full aspect-video rounded-md"
            src={content.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={content.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
        {(type === "text" || type === "mixed") && (
          <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Added on {dateAdded}
      </div>
    </div>
  );
};
