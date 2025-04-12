"use client";
import { ArrowRight, LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";

export const NavLink = ({
  children,
  Icon,
  href,
  end,
  className,
}: {
  children: React.ReactNode;
  href: string;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  end?: boolean;
  className?: string;
}) => {
  const path = usePathname();
  const isActive = end ? path === href : path.startsWith(href);

  return (
    <Link
      href={href}
      className={`border rounded-lg py-1.5 px-2 ${
        isActive ? "bg- text-card-foreground" : "text-white"
      } ${className}`}
    >
      <div className="flex items-center gap-2 justify-between">
        {Icon && (
          <Icon
            strokeWidth={1.5}
            size={16}
            className={
              isActive
                ? "fill-primary text-transparent size-5"
                : "fill-transparent text-white size-5"
            }
          />
        )}
        {children}
        <ArrowRight className="w-4 h-4 size-4" />
      </div>
    </Link>
  );
};

export const MultiNavLink = ({
  data,
  mainPath,
  title,
  Icon,
}: {
  title: string;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  data: {
    href: string;
    Icon?: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    text: string;
    end?: boolean;
  }[];
  mainPath?: string;
}) => {
  const path = usePathname();
  const [showList, setShowList] = useState<boolean>(false);

  const isMainPath = mainPath ? path.startsWith(mainPath) : false;

  return (
    <div
      className={`border rounded-sm py-1.5 px-2 gap-4 flex flex-col transition-all ${
        isMainPath ? "border-primary" : "text-white"
      }`}
    >
      <button
        type="button"
        className="flex items-center w-full justify-between"
        onClick={() => setShowList(!showList)}
      >
        {Icon && (
          <Icon
            strokeWidth={1.5}
            size={16}
            className={
              isMainPath
                ? "fill-primary text-transparent"
                : "fill-transparent text-primary-foreground"
            }
          />
        )}
        {title}{" "}
        <ArrowRight
          className={`size-4 transition-all ${
            showList ? "rotate-90" : "rotate-0"
          }`}
        />
      </button>
      {showList && (
        <div className="flex flex-col gap-2">
          {data.map((item, key) => {
            const isActive = item.end
              ? path === item.href
              : path.includes(item.href);
            return (
              <Link
                href={item.href}
                className={`rounded-sm p-1 ${
                  isActive ? "bg-secondary" : "text-white"
                }`}
                key={key}
              >
                <div className="flex items-center gap-2 justify-between">
                  {item.Icon && (
                    <item.Icon
                      strokeWidth={1.5}
                      size={16}
                      className={
                        isActive
                          ? "text-primary fill-primary"
                          : "fill-transparent text-white"
                      }
                    />
                  )}
                  {item.text}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
