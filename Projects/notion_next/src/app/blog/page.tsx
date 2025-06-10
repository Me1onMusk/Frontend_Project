import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// 블로그 페이지 //
export default function Blog() {
    return (
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* 섹션 제목 */}
            <h2 className="text-3xl font-bold tracking-tight">블로그 목록</h2>

            {/* 블로그 카드 그리드 */}
            <div className="space-y-4">
                블로그 페이지
            </div>
          </div>
        </div>
    )
}