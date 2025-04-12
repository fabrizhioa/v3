import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={"/assets/Logo.svg"} alt="Logo" width={100} height={100} />
      <span className="text-muted-foreground">
        No hay elementos para mostrar
      </span>
    </div>
  );
}
