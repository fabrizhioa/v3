import NovedadesTrading from "@/components/app/feeds/novedades-trading";
import RecentAlerts from "@/components/app/feeds/recent-alerts";

export default function NovedadesPage() {
  return (
    <>
      <div className="container mx-auto min-h-full flex flex-col lg:flex-row gap-8 ">
        {/* Contenido principal - Novedades */}
        <main className="flex-1 py-4">
          <h1 className="text-3xl font-bold mb-8 text-custom-white">
            Novedades de <span className="text-custom-green">Trading</span>
          </h1>
          <NovedadesTrading />
        </main>

        {/* Sidebar - Alertas recientes */}
        <aside className="w-full lg:w-80 xl:w-96 order-first lg:order-last flex justify-center lg:border-l py-4">
          <div className="lg:sticky top-24 w-full">
            <h2 className="text-2xl font-semibold flex items-center">
              <span className="text-custom-green">Últimas</span> Alertas
            </h2>
            <RecentAlerts />

            {/* Mensaje visible solo en móvil */}
            <div className="block lg:hidden mt-4 p-4 bg-muted rounded-md text-center">
              <p className="text-sm text-muted-foreground">
                Desliza hacia abajo para ver las novedades completas
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
