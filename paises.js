class FiltroPaises {
  constructor() {
    return (async () => {
      this.defaultFormato = (e) => {
        return {
          pais: e.name.common,
          capital: e.capital !== undefined ? e.capital[0] : "Sin Capital",
          continente: e.continents !== undefined ? e.continents[0]: "Dato no registrado",
          area: e.area !== undefined ? e.area : "Dato no registrado",
        };
      };
      this.formato = this.defaultFormato;
      this.filtros = [];
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        this.data = await response.json();
      } catch (ex) {
        console.log(ex.message);
        this.data = [];
      }
      return this;
    })();
  }

  addFiltro(name, fnFiltro) {
    this.filtros.push({ name, fnFiltro });
  }

  getFiltros() {
    return this.filtros;
  }

  setFormato(includePoputlation) {
    this.formato = this.defaultFormato;
    if (includePoputlation)
      this.formato = (e) => {
        return { ...this.defaultFormato(e), poblacion: e.population };
      };
  }

  aplicarFiltroConFormato(filterName) {
    const filtro = this.filtros.find((f) => f.name === filterName);
    if (filtro) return this.data.filter(filtro.fnFiltro).map(this.formato);
    return [];
  }
}
