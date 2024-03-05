export interface TreeNode {
  // label: string;
   icon?: string;
  // expanded?: boolean;
  // type?: string;
  // isEditing?: boolean;
  // children?: TreeNode[];
  folderId: string;
  folderName: string;
  expanded?: boolean;
  type?: string;
  isEditing?: boolean;
  subfolders?: TreeNode[];
  folderNamePath: string;
}