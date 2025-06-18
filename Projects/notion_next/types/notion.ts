// 태그 부분 //
export interface NotionTag {
  id: string;
  name: string;
  count: number;
}

// 포스트 부분 //
export interface NotionPost {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  tags?: NotionTag[];
  author?: string;
  date?: string;
}
