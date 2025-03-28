import {
  FacebookIcon,
  InstagramIcon,
  MessageCircleMoreIcon,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";
import NavLink from "./LandingNavLink";

export default function LandingFooter() {
  return (
    <footer className="p-4 bg-darkslate border-t-1 border-primary">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="mx-auto md:mx-0">
          <nav className="p-2 flex flex-wrap gap-2 items-center justify-center">
            <NavLink
              title="Inicio"
              className="font-light text-lg border-b-2 pb-0.5 px-1 text-white hover:text-secondary"
              activeClassName="border-secondary"
              inactiveClassName="border-transparent"
              link="/"
            />
            <NavLink
              title="Tienda"
              className="font-light text-lg border-b-2 pb-0.5 px-1 text-white hover:text-secondary"
              activeClassName="border-secondary"
              inactiveClassName="border-transparent"
              link="/store"
            />
            <Link
              href="/app"
              className="font-light text-lg text-white border-b-2 border-transparent px-1 pb-0.5 hover:text-secondary"
            >
              Ingresar
            </Link>
            <Link
              href="/app/register"
              className="font-light text-lg text-white border-b-2 border-transparent px-1 pb-0.5 hover:text-secondary"
            >
              Registrate
            </Link>
          </nav>
          <div className="flex justify-center items-center gap-2">
            <a
              href="https://wa.me/message/ODAGLOEQCCJXF1"
              target="_blank"
              className="border-primary border-2 text-white flex items-center p-2 rounded justify-center gap-3 text-xl w-max mx-auto hover:bg-primary hover:border-white transition-all"
            >
              <MessageCircleMoreIcon strokeWidth={1.5} size={20} />
            </a>
            <a
              href="https://www.facebook.com/mindsovermarket/"
              target="_blank"
              className="border-secondary border-2 text-white flex items-center p-2 rounded justify-center gap-3 text-xl w-max mx-auto hover:bg-secondary transition-all hover:border-white"
            >
              <FacebookIcon strokeWidth={1.5} size={20} />
            </a>
            <a
              href="https://www.instagram.com/mindsovermarket/"
              target="_blank"
              className="border-purple-500 border-2 text-white flex items-center p-2 rounded justify-center gap-3 text-xl w-max mx-auto hover:bg-purple-500 hover:border-white transition-all"
            >
              <InstagramIcon strokeWidth={1.5} size={20} />
            </a>
            <a
              href="https://www.youtube.com/c/MindsOverMarket"
              target="_blank"
              className="border-2 border-red transition-all text-white flex items-center p-2 rounded justify-center gap-3 text-xl w-max mx-auto hover:bg-red hover:border-white"
            >
              <YoutubeIcon strokeWidth={1.5} size={20} />
            </a>
          </div>
        </div>
        <img
          alt="minds over market"
          src="/assets/logo-slogan.svg"
          className="max-w-72 w-full mx-auto md:mx-0"
        />
      </div>
    </footer>
  );
}
