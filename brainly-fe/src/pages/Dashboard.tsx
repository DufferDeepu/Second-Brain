import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { ContentCard } from "../components/ContentCard";
import { ContentModal } from "../components/ContentModal";
import { Sidebar } from "../components/SideBar";

import { useEffect, useState } from "react";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
        <Sidebar />
       <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
       <ContentModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
      <div className="flex justify-end gap-4">
        <div className="p-4 space-y-4">
          <Button
            variant="default"
            startIcon={<PlusIcon size="md" />}
            size="md"
            label="Add Content"
            onClick={() => {
              setModalOpen(true);
            }}
          />
        </div>
        <div className="p-4 space-y-4">
          <Button
            variant="secondary"
            startIcon={<ShareIcon size="md" />}
            size="md"
            label="Share Brain"
          />
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <ContentCard
          title="hi there"
          content="https://www.youtube.com/watch?v=godVDNVWeso"
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
          title="Go ton gym"
          content=" at 9 breakfast"
          type="mixed"
          dateAdded=""
        />
      </div>
       </div>
    </div>
  );
}
