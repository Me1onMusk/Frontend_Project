// 태그 인터페이스 //
export interface NotionTag {
  id: string;
  name: string;
  count: number;
}

// 포스트 인터페이스 //
export interface NotionPost {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  tags?: NotionTag[];
  author?: string;
  date?: string;
}
