export interface TreeNode {
  label: string;
  icon?: string;
  expanded?: boolean;
  type?: string;
  isEditing?: boolean;
  children?: TreeNode[];
}