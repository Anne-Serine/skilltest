import CustomerList from "./components/CustomerList";
import Search from "./components/Search";
import "./styles/index.css";

function App() {
  return (
    <>
      <header className="bg-app-header p-3">
        <h1 className="container xl:px-3 text-white">Kunder</h1>
      </header>
      <main className="container gap-5 px-3 grid grid-cols-1 md:grid-cols-5 ">
        <section className="md:sticky md:top-2 py-5 md:col-span-2 md:self-start">
          <h2 className="pb-3 font-medium">Legg til ny kunde</h2>
          <p className="pb-5">
            Søk etter firmanavn eller organisasjonsnummer, og legg til firmaet i
            kundelisten din for enkel tilgang.
          </p>
          <Search />
        </section>
        <section className="bg-app-secondary min-h-[100vh] p-5 md:col-span-3">
          <h2 className="pb-3 font-medium">Min kundeliste</h2>
          <p className="pb-5">
            Her finner du en oversikt over dine lagrede kunder. Du kan legge til
            notater, slette kunder eller få mer informasjon om en kunde ved å
            bruke knappene.
          </p>
          <CustomerList />
        </section>
      </main>
    </>
  );
}

export default App;
