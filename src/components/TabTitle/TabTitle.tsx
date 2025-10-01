import { useEffect } from "react";

type TabTitleProps = {
  title: string;
};

export default function TabTitle({ title }: TabTitleProps) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | inku`;

    // restore on unmount
    return () => {
      document.title = prevTitle;
    };
  }, [title]);

  return null; // doesn't render anything
}
