import searchParamString from "@/utils/schema/searchParamString";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { type } from "arktype";

const DEFAULT_VALUES = {
  manga_name: "",
};

const indexSearchSchema = type({
  manga_name: searchParamString.default(DEFAULT_VALUES.manga_name),
});

export const Route = createFileRoute("/manga_search/")({
  validateSearch: indexSearchSchema,
  search: {
    middlewares: [stripSearchParams(DEFAULT_VALUES)],
  },
});
