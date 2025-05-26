import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { TagFilterItem } from '../../../types/blog';
import { cn } from '@/lib/utils';

// 태그 인터페이스 //
interface TagSectionProps {
  tags: TagFilterItem[];
  selectedTag?: string;
}

// 태그 부분 함수 //
export default function TagSection({ tags, selectedTag }: TagSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>태그 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {tags.map((tag) => (
            <Link href={tag.id === 'all' ? '/' : `?tag=${tag.name}`} key={tag.name}>
              <div
                className={cn(
                  'flex items-center justify-between rounded-md p-1.5 text-sm transition-colors',
                  selectedTag === tag.name || (tag.id === 'all' && !selectedTag)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted-foreground/10 text-muted-foreground'
                )}
              >
                <span>{tag.name}</span>
                <span>{tag.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
