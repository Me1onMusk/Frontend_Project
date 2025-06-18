import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { TagFilterItem } from '../../../types/notion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// 태그목록 인터페이스 //
interface TagSectionProps {
  tags: TagFilterItem[];
  selectedTag: string;
}

// 태그 부분 //
export default function TagSection({ tags, selectedTag }: TagSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>태그 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {tags.map((tag) => (
            <Link href={`?tag=${tag.name}`} key={tag.name}>
              <div
                className={cn(
                  'hover:bg-muted-foreground/10 text-muted-foreground flex items-center justify-between rounded-md p-1.5 text-sm transition-colors',
                  selectedTag === tag.name && 'bg-muted-foreground/10 text-foreground font-medium'
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
