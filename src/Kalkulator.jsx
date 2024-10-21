import { createSignal } from "solid-js";
export default function Kalkulator(props) {

const [originalnaCijena, setOriginalnaCijena] = createSignal(0);
const [popust, setPopust] = createSignal(0);
const [konacnaCijena, setKonacnaCijena] = createSignal(0);
const [error, setError] = createSignal("");

const izracunajCijenu = (event) => {
    event.preventDefault();
    const cijena = +originalnaCijena();
    const popustPostotak =+popust();

    if (cijena < 0 || popustPostotak <0) {
        setError("Cijena i popust moraju biti pozitivni brojevi!");
        return;
    }

    if (popustPostotak > 100 ){
        setError("Popust ne moze biti veci od 100%!");
        return;
    }
    setError("");

    const novaCijena = cijena - (cijena * popustPostotak / 100);
    setKonacnaCijena(novaCijena.toFixed(2));
}
    


    return (
        <div>
        <form onSubmit={izracunajCijenu}>
            <input type="number" placeholder="Originalna cijena" onInput={(event) => setOriginalnaCijena(event.target.value)} required />
            <input type="number" placeholder="Popust (%)" onInput={(event) => setPopust(event.target.value)} required />
            {error() && <div class="error">{error()}</div>}
            <input type="submit" value="Potvrdi" />
        </form>


        <div>Konacna cijena je: {konacnaCijena()} Eur</div>
        </div>

    )
}