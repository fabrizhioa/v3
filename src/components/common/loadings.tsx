import Image from "next/image";

export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-full flex-col gap-2">
      <Image
        src="/assets/Logo.svg"
        alt="Minds Over Market"
        className="animate-bounce size-16"
        priority={true}
        width={128}
        height={128}
      />
      <span>Cargando ...</span>
    </div>
  );
}
