// /* eslint-disable @next/next/no-img-element */
// "use client";
// // import { resources } from "@prisma/client";
// import { StarIcon } from "lucide-react";
// import Link from "next/link";
// // import { useEffect, useRef, useState } from "react";

// export default function ElementosConFiltros({
//   recursos,
// }: {
//   recursos: resources[];
// }) {
//   const [filtredRecursos, setFiltredRecursos] = useState<resources[]>(recursos);
//   const filterOrderRef = useRef<HTMLSelectElement>(null);
//   const filterTypeRef = useRef<HTMLSelectElement>(null);
//   const filterTextRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     const filtredRecursos = recursos.sort((a, b) => {
//       const date1 = new Date(a.create_date);
//       const date2 = new Date(b.create_date);

//       return Number(date1) - Number(date2);
//     });

//     setFiltredRecursos(filtredRecursos);
//   }, [recursos]);

//   function Filtrar() {
//     let recursosFiltrados = recursos;

//     if (filterOrderRef.current?.value === "viejo") {
//       recursosFiltrados = recursosFiltrados
//         ? recursosFiltrados.sort((a, b) => {
//             const date1 = new Date(a.create_date);
//             const date2 = new Date(b.create_date);
//             return Number(date2) - Number(date1);
//           })
//         : recursosFiltrados;
//     } else {
//       recursosFiltrados = recursosFiltrados
//         ? recursosFiltrados.sort((a, b) => {
//             const date1 = new Date(a.create_date);
//             const date2 = new Date(b.create_date);
//             return Number(date1) - Number(date2);
//           })
//         : recursosFiltrados;
//     }

//     if (filterTypeRef.current?.value !== "todos") {
//       recursosFiltrados = recursosFiltrados
//         ? recursosFiltrados.filter((x) => {
//             return x.resource_type === filterTypeRef.current?.value;
//           })
//         : recursosFiltrados;
//     }

//     if (filterTextRef.current?.value !== "") {
//       recursosFiltrados = recursosFiltrados
//         ? recursosFiltrados.filter(
//             (x) =>
//               x.title
//                 .toLowerCase()
//                 .includes(
//                   filterTextRef.current?.value.toLowerCase() as string
//                 ) || x.id === Number(filterTextRef.current?.value)
//           )
//         : recursosFiltrados;
//     }

//     console.log(recursosFiltrados);

//     setFiltredRecursos(recursosFiltrados);
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-[max-content,auto] gap-4 auto-rows-auto">
//       <div className="rounded h-max text-white flex flex-col gap-2 justify-center md:sticky top-0">
//         <h3 className="text-xl font-bold text-center bg-slate rounded p-2">
//           Filtros
//         </h3>
//         <div className="grid grid-cols-2 md:grid-cols-1 auto-rows-max gap-2">
//           <label
//             htmlFor="filterSelect"
//             className="flex flex-col gap-1 text-white text-xs bg-darkslate p-2 rounded"
//           >
//             Orden:
//             <br />
//             <select
//               name="filterSelect"
//               id="filterSelect"
//               className="w-full p-2 rounded text-xs md:text-sm text-white bg-lightslate resize-none"
//               ref={filterOrderRef}
//               onChange={Filtrar}
//             >
//               <option value="nuevo">Mas nuevos</option>
//               <option value="viejo">Mas viejos</option>
//             </select>
//           </label>
//           <label
//             htmlFor="filterSelectType"
//             className="flex flex-col gap-1 text-white bg-darkslate p-2 rounded text-xs"
//           >
//             Tipo: <br />{" "}
//             <select
//               name="filterSelectType"
//               id="filterSelectType"
//               className="w-full p-2 rounded text-xs md:text-sm text-white bg-lightslate resize-none"
//               ref={filterTypeRef}
//               onChange={Filtrar}
//             >
//               <option value="todos">Todos</option>
//               <option value="curso">Curso</option>
//               <option value="alerta">Alerta</option>
//               <option value="webinar">Webinar</option>
//               <option value="paquete">Paquete</option>
//             </select>
//           </label>
//           <label
//             htmlFor="filterText"
//             className="flex flex-col gap-1 text-white text-xs bg-darkslate p-2 rounded"
//           >
//             Nombre / Id <br />
//             <input
//               type="text"
//               name="filterText"
//               id="filterText"
//               className="w-full p-2 rounded text-xs md:text-sm text-white bg-lightslate resize-none"
//               ref={filterTextRef}
//               onChange={Filtrar}
//             />
//           </label>
//         </div>
//       </div>

//       {filtredRecursos.length !== null ? (
//         <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,17.5rem),1fr))] auto-rows-auto gap-4 h-max rounded">
//           {filtredRecursos.length > 0 ? (
//             filtredRecursos.map((x, key) => (
//               <Link
//                 key={key + x.resource_type}
//                 href={`/store/${x.resource_type}/${x.id}`}
//                 className="h-full"
//               >
//                 <div className="grid grid-rows-[max-content,auto] h-full">
//                   <img
//                     src={
//                       x.image_url.includes("http")
//                         ? x.image_url
//                         : `/resources${x.image_url}`
//                     }
//                     alt="Recurso"
//                     className="aspect-video rounded-t"
//                   />
//                   <div className="bg-darkslate shadow text-white rounded-b flex justify-between p-2 flex-col">
//                     <h4
//                       className={`font-semibold ${
//                         x.resource_type === "suscripcion"
//                           ? "text-yellow"
//                           : "text-white"
//                       }`}
//                     >
//                       {x.title}
//                     </h4>

//                     <div className="flex justify-between items-center">
//                       {x.sell_cost !== 0 ? (
//                         <p className="font-semibold text-primary">
//                           <span>{x.sell_cost}$</span>
//                         </p>
//                       ) : (
//                         <div />
//                       )}

//                       <p className="font-medium flex gap-1 items-center justify-end text-sm">
//                         {x.likes}
//                         <StarIcon className="size-4" />
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <div className="flex items-center justify-center p-4 rounded bg-slate text-white">
//               <h2 className="text-xl">No hay recursos</h2>
//             </div>
//           )}
//         </div>
//       ) : (
//         <>
//           <div className="bg-darkslate animate-pulse shadow rounded">
//             <div className="aspect-video" />
//             <div className="flex items-center justify-between p-2">
//               <div className="h-4 w-full" />
//               <div className="h-4 w-full" />
//             </div>
//           </div>
//           <div className="bg-darkslate animate-pulse shadow rounded">
//             <div className="aspect-video" />
//             <div className="flex items-center justify-between p-2">
//               <div className="h-4 w-full" />
//               <div className="h-4 w-full" />
//             </div>
//           </div>
//           <div className="bg-darkslate animate-pulse shadow rounded">
//             <div className="aspect-video" />
//             <div className="flex items-center justify-between p-2">
//               <div className="h-4 w-full" />
//               <div className="h-4 w-full" />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
