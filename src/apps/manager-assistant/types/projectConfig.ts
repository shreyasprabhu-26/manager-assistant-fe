export type MethodologyType = "waterfall" | "agile";
export type IssueType = "story" | "task";

export interface ProjectConfigData {
  methodology?: MethodologyType;
  issue_type?: IssueType;
  subtask_list?: string[];
}
