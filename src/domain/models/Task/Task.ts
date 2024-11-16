export interface Task {
  id: string;
  status: string;
  cronTime: string;
  customPrompt: string;
  customAspectRatio: string;
  genImages: boolean;
  genVideos: boolean;
  origins: string[];
  batches: string[];
}
