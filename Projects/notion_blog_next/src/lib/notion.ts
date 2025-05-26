import { Client } from '@notionhq/client';
import type { Post, TagFilterItem } from '../../types/blog';
import type {
  PageObjectResponse,
  PersonUserObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

// Token을 이용해 클라이언트 가져오기 //
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// 상세 페이지 구현 //
export const getPostBySlug = async (slug: string): Promise<{ markdown: string; post: Post }> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        {
          property: 'Slug',
          rich_text: {
            equals: slug,
          },
        },
        {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
      ],
    },
  });

  return {
    markdown: '',
    post: getPageMetaData(response.results[0] as PageObjectResponse),
  };
};

function getPageMetaData(page: PageObjectResponse): Post {
  const { properties } = page;

  const getCoverImage = (cover: PageObjectResponse['cover']) => {
    if (!cover) return '';

    switch (cover.type) {
      case 'external':
        return cover.external.url;
      case 'file':
        return cover.file.url;
      default:
        return '';
    }
  };

  return {
    id: page.id,
    title: properties.Title.type === 'title' ? (properties.Title.title[0]?.plain_text ?? '') : '',
    description:
      properties.Description.type === 'rich_text'
        ? (properties.Description.rich_text[0]?.plain_text ?? '')
        : '',
    coverImage: getCoverImage(page.cover),
    tags:
      properties.Tags.type === 'multi_select'
        ? properties.Tags.multi_select.map((tag) => tag.name)
        : [],
    author:
      properties.Author.type === 'people'
        ? ((properties.Author.people[0] as PersonUserObjectResponse)?.name ?? '')
        : '',
    date: properties.Date.type === 'date' ? (properties.Date.date?.start ?? '') : '',
    modifiedDate: page.last_edited_time,
    slug:
      properties.Slug.type === 'rich_text'
        ? (properties.Slug.rich_text[0]?.plain_text ?? page.id)
        : page.id,
  };
}

// 포스트 가져오기 //
export const getPublishedPosts = async (tag?: string): Promise<Post[]> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
        ...(tag && tag !== 'all'
          ? [
              {
                property: 'Tags',
                multi_select: {
                  contains: tag,
                },
              },
            ]
          : []),
      ],
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  return response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map(getPageMetaData);
};

// 태그 목록 가져오기 //
export const getTagList = async (): Promise<TagFilterItem[]> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'Status',
      select: {
        equals: 'Published',
      },
    },
  });

  const tagCounts = new Map<string, number>();

  response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .forEach((page) => {
      const tags =
        page.properties.Tags.type === 'multi_select'
          ? page.properties.Tags.multi_select.map((tag) => tag.name)
          : [];

      tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });

  // 전체 태그 추가
  const totalPosts = response.results.length;
  const tagList = Array.from(tagCounts.entries()).map(([name, count]) => ({
    id: name,
    name,
    count,
  }));

  return [{ id: 'all', name: '전체', count: totalPosts }, ...tagList];
};
