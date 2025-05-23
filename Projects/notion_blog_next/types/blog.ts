// 태그 인터페이스 //
export interface TagFilterItem {
  id: string;
  name: string;
  count: number;
}

// 포스트 인터페이스 //
export interface Post {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  tags?: string[];
  author?: string;
  date?: string;
  modifiedDate?: string;
  slug: string;
}
