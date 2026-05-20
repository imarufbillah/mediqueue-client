import Image from "next/image";
import Link from "next/link";

/**
 * MediQueue Logo component.
 * @param {"sm" | "md" | "lg" | "xl"} size - Logo size variant
 * @param {boolean} link - Whether to wrap in a Link to home
 * @param {string} className - Additional classes
 */

const SIZES = {
  sm: { icon: 20, text: "text-sm" },
  md: { icon: 28, text: "text-lg" },
  lg: { icon: 36, text: "text-2xl" },
  xl: { icon: 44, text: "text-3xl" },
};

export const Logo = ({ size = "lg", link = true, className = "" }) => {
  const { icon, text } = SIZES[size];

  const content = (
    <span
      className={`flex items-center gap-1.5 ${link ? "transition-opacity duration-200 hover:opacity-80" : ""} ${className}`}
    >
      <Image
        src="/logo.svg"
        alt="MediQueue logo"
        width={icon}
        height={icon}
        className="shrink-0"
      />
      <span className="flex items-center gap-0.5">
        <span className={`${text} font-heading text-foreground`}>Medi</span>
        <span className={`${text} font-sans font-bold text-primary`}>
          Queue
        </span>
      </span>
    </span>
  );

  if (link) {
    return <Link href="/">{content}</Link>;
  }

  return content;
};
