import React from "react";

interface I {
  link: string;
  children: React.ReactNode;
}
export default function NewTabLink({ children, link }: I) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
