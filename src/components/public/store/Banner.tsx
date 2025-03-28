"use client";
import { banner } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Banner({ banners }: { banners: banner[] }) {
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    function loopBanner() {
      if (banners === null || activeBanner + 1 > banners.length - 1)
        setActiveBanner(0);
      else setActiveBanner(activeBanner + 1);
    }

    const timer = setInterval(loopBanner, 5000);
    return () => clearInterval(timer);
  }, [banners, activeBanner]);

  function changeBanner(id: number) {
    setActiveBanner(id);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-banner relative flex items-center bg-full w-full">
        {banners !== null ? (
          banners?.length > 0 ? (
            banners?.map((y, idex) => (
              <a
                href={(y.redirect_url as string) ?? undefined}
                key={`banner-${idex}`}
                className={`transition-all duration-500 top-0 absolute h-full ${
                  activeBanner === idex ? "w-full left-0" : "w-0 right-0"
                }`}
              >
                <img
                  src={
                    y.image_url.includes("http")
                      ? y.image_url
                      : "/resources/" + y.image_url
                  }
                  width={1600}
                  height={200}
                  alt={y.title}
                  className={`transtion-all duration-500 h-full rounded-lg ${
                    activeBanner === idex ? "w-full" : "w-0"
                  }`}
                />
              </a>
            ))
          ) : (
            <div className="bg-darkslate animate-pulse h-full w-full rounded-lg" />
          )
        ) : (
          <div className="bg-darkslate flex items-center justify-center h-full w-full rounded-lg">
            <h3 className="text-lg text-white font-semibold">No hay banners</h3>
          </div>
        )}
      </div>

      {banners !== null && banners?.length > 0 && (
        <div className="flex items-center justify-center gap-4 w-full">
          {banners?.map((_, key) => {
            return (
              <button
                type="button"
                className={`rounded-full p-1 transition-all duration-500 ${
                  activeBanner === key ? "bg-primary px-2" : "bg-secondary"
                }`}
                onClick={() => changeBanner(key)}
                key={`banner-${key}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
