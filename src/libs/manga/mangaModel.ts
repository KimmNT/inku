import { type } from "arktype";

export const SeoOnPage = type({
  titleHead: "string",
  descriptionHead: "string",
  og_image: "string",
});

export const ChapterItem = type({
  chapter_name: "string",
  chapter_title: "string",
  chapter_api_data: "string",
});

export const Chapters = type({
  server_name: "string",
  server_data: ChapterItem.array(),
});

export const Category = type({
  name: "string",
  id: "string",
  slug: "string",
});

export const ChaptersLatest = type({
  chapter_name: "string",
});

export const DataItem = type({
  _id: "string",
  name: "string",
  slug: "string",
  status: "string",
  thumb_url: "string",
  author: "string[]",
  category: Category.array(),
  chapters: Chapters.array(),
  chaptersLatest: ChaptersLatest.array(),
});

export type DataItem = typeof DataItem.infer;

export const Data = type({
  seoOnPage: SeoOnPage,
  titlePage: "string",
  items: DataItem.array(),
});

export const MangaResponse = type({
  status: "string",
  message: "string",
  data: Data,
});

export type MangaResponse = typeof MangaResponse.infer;

export const ChapterImages = type({
  item_page: "number",
  image_file: "string",
});

export const ChapterItemDetail = type({
  _id: "string",
  chapter_name: "string",
  chapter_title: "string",
  chapter_path: "string",
  chapter_image: ChapterImages.array(),
});

export const ChapterResponse = type({
  domain_cdn: "string",
  item: ChapterItemDetail,
});

export type ChapterResponse = typeof ChapterResponse.infer;
