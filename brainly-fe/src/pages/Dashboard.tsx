import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { ContentCard } from "../components/ContentCard";
import { Sidebar } from "../components/SideBar";

export function Dashboard() {
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
                className="sm:px-4 sm:py-2 sm:text-xs md:px-6 md:py-3 md:text-sm"                label="Share Brain"
              />
            </div>
            <div className="p-4">
              <Button
                variant="default"
                startIcon={<PlusIcon size="md" />}
                size="md"
                className="sm:px-4 sm:py-2 sm:text-xs md:px-6 md:py-3 md:text-sm"                label="Add Content"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <ContentCard
            title="hi there"
            content=""
            type="youtube"
            dateAdded=""
          />
          <ContentCard
            title="hi there"
            content="https://x.com/tweet/status/1465053672593784834?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1465053672593784834%7Ctwgr%5Ec7475872bfcc63b65f97aa2db858a04ae5e5df5f%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Furl%3Dhttps%3A%2F%2Ftwitter.com%2Ftweet%2Fstatus%2F1465053672593784834"
            type="twitter"
            dateAdded=""
          />
          <ContentCard
            title="Go to gym"
            content=" at 9 breakfast"
            type="mixed"
            dateAdded=""
          />
        </div>
      </div>
    </div>
  );
}


