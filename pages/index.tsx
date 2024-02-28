import Image from "next/image";
import { Inter } from "next/font/google";
import SearchResults from "./components/SearchResults";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`min-h-screen bg-dark`}
    >
      <SearchResults />
    </main>
  );
}
