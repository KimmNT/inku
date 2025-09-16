import Saved from "@/views/Saved/Saved";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/saved/")({
  component: Saved,
});
