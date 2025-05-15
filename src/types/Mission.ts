export type CreateMissionProps = {
  title: string;
  reward: string;
  city: string | null;
  description: string;
  start_date: string;
  end_date: string;
};

export interface MissionBoxProps {
  imageUrl: string;
  title: string;
  start_date: string;
  end_date: string;
  challengeId?: string;
}

export interface Mission {
  images: string[];
  title: string;
  start_date: string;
  end_date: string;
  challengeId?: string;
}

export interface MissionListProps {
  missions: Mission[];
}

export type MissionDetailProps = {
  title: string;
  city: string;
  host: string;
  start_date: string;
  end_date: string;
  reward: string;
  cultural_background: string;
  checklist: string[];
  images: string[];
  mission_status?: string;
};

export type MissionStatusProps = {
  challengeId: string;
  isCompleted: string;
  file?: string;
};

export type RewardProps = {
  reward: string;
};

export type BadgeProps = {
  badges: string[];
};
