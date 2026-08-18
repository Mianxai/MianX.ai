"use client";

import { useReveal } from "./useReveal";

export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${visible ? "active" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
