export interface UpdateTaskInput {
  id: string;
  cronTime: string;
  genImages?: boolean;
  genVideos?: boolean;
  origins: string[];
  customPrompt?: string;
  customASpectRatio?: string;
}
