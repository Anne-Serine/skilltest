import Search from "./components/Search";
import "./styles/index.css";

function App() {
  return (
    <div>
      <div className="bg-app-header p-3">
        <h1 className="container px-3 text-white">Kunderegister</h1>
      </div>
      <div className="container gap-5 px-3 grid grid-cols-1 md:grid-cols-5 ">
        <section className="py-5 md:col-span-2">
          <h2 className="pb-3">Legg til ny kunde</h2>
          <p className="pb-5 max-w-[30rem]">
            Søk etter firmanavn eller organisasjonsnummer, og legg til firmaet i
            kundelisten din for enkel tilgang.
          </p>
          <Search />
        </section>
        <aside className="bg-app-secondary h-[100vh] p-5 md:col-span-3">
          <h2 className="pb-3">Min kundeliste</h2>
          <p className="pb-3 max-w-[30rem]">Her finner du en oversikt over dine lagrede kunder. Du kan legge til notater, slette kunder eller få mer informasjon om en kunde ved å bruke knappene til høyre.</p>
        </aside>
      </div>
    </div>
  );
}

export default App;
