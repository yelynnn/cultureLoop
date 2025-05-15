import React from "react";
import JournalBox from "./JournalBox";
import { JournalListProps } from "@/types/TravelLog";
import defaultImg from "/defaultImg.jpeg";
import { Skeleton } from "@/components/ui/skeleton";

const JournalList: React.FC<JournalListProps> = ({ journals = [] }) => {
  return (
    <div className="grid grid-cols-2 gap-4 pb-4">
      {journals.length > 0
        ? journals.map((journal, idx) => (
            <JournalBox
              key={idx}
              imageUrls={
                journal.imageUrls && journal.imageUrls.length > 0
                  ? journal.imageUrls
                  : [defaultImg]
              }
              title={journal.title || `journal ${idx + 1}`}
              date={journal.date || "2024.06.01"}
              logId={journal.logId}
            />
          ))
        : Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="flex flex-col space-y-3">
              <Skeleton className="w-full h-40 rounded-xl" />
            </div>
          ))}
    </div>
  );
};

export default JournalList;
