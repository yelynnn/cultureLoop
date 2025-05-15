export type TravelLogProps = {
  title: string;
  date: string;
  description: string;
  challengeId: string;
};

export type TravelLogDetailProps = {
  date: string;
  journal: string;
  city: string;
  imageUrls: string[];
  title: string;
  challenge_title: string;
};

export type JournalProps = {
  date: string;
  title: string;
  imageUrls: string[];
  logId: string;
};

export type JournalListProps = {
  journals: JournalProps[];
};
