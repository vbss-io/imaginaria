export interface CreateTaskInput {
  cronTime: string;
  genImages?: boolean;
  genVideos?: boolean;
  origins: string[];
  customPrompt?: string;
  customASpectRatio?: string;
}
