import FastApiComponent from "@/components/FastApiComponent";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen w-4/5 flex-col m-auto">
      <Navbar />
      <div className="flex flex-col justify-center border h-40 w-full pl-4">
        <p>
          Lorem ipsum dolor sit aet consectetur adipisicing elit. Adipisci
          maiores placeat mollitia atque laborum unde quis aliquam deleniti
          explicabo a sunt, accusamus quasi iusto sint enim vitae aperiam, earum
          quae?
        </p>
        <FastApiComponent />
      </div>
    </main>
  );
}
