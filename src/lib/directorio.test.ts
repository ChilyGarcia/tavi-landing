// Bun expone describe/it/expect como globales en runtime (igual que pricing.test.ts).
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: (actual: unknown) => {
  toBe: (expected: unknown) => void;
  toEqual: (expected: unknown) => void;
  toContain: (expected: string) => void;
  toHaveLength: (n: number) => void;
  toBeNull: () => void;
  not: { toBe: (expected: unknown) => void };
};

import {
  agruparPorCiudad,
  categoriaPorSlug,
  categoriasPresentes,
  paginaIndexable,
  urlMenuPedidos,
  type DirectorioItem,
} from "./directorio";
import { introDirectorio } from "./directorio-seo";

function item(over: Partial<DirectorioItem>): DirectorioItem {
  return {
    slug: "mijaos",
    codigo_publico: "abc123",
    nombre: "Mijaos",
    descripcion: "",
    categoria_negocio: "COMIDAS_RAPIDAS",
    ciudad: "Cúcuta",
    ciudad_slug: "cucuta",
    ruta_publica: "/restaurantes/cucuta/mijaos",
    logo: null,
    total_productos: 10,
    indexable: true,
    actualizado_en: "2026-09-01T00:00:00Z",
    ...over,
  };
}

describe("directorio", () => {
  it("agrupa por ciudad usando el nombre más frecuente", () => {
    const ciudades = agruparPorCiudad([
      item({ slug: "a", ciudad: "Cúcuta" }),
      item({ slug: "b", ciudad: "Cucuta" }),
      item({ slug: "c", ciudad: "Cúcuta" }),
      item({ slug: "d", ciudad: "Pereira", ciudad_slug: "pereira" }),
    ]);
    expect(ciudades.map((c) => c.slug)).toEqual(["cucuta", "pereira"]);
    expect(ciudades[0].nombre).toBe("Cúcuta");
    expect(ciudades[0].restaurantes).toHaveLength(3);
  });

  it("solo indexa páginas con al menos 3 restaurantes indexables", () => {
    const dos = [item({ slug: "a" }), item({ slug: "b" }), item({ slug: "c", indexable: false })];
    expect(paginaIndexable(dos)).toBe(false);
    expect(paginaIndexable([...dos, item({ slug: "d" })])).toBe(true);
  });

  it("resuelve categorías por slug y lista solo las presentes", () => {
    expect(categoriaPorSlug("pizzerias")?.clave).toBe("PIZZERIA");
    expect(categoriaPorSlug("naves")).toBeNull();
    const presentes = categoriasPresentes([
      item({ categoria_negocio: "PIZZERIA" }),
      item({ categoria_negocio: "" }),
    ]);
    expect(presentes.map((c) => c.slug)).toEqual(["pizzerias"]);
  });

  it("usa el subdominio propio para el menú de pedidos cuando existe", () => {
    expect(urlMenuPedidos({ slug: "mijaos", codigo_publico: "ABC123" })).toBe(
      "https://mijaos.taviorders.com/menu/mijaos",
    );
    expect(urlMenuPedidos({ slug: "abc123", codigo_publico: "ABC123" })).toBe(
      "https://app.taviorders.com/menu/ABC123",
    );
  });

  it("genera una introducción distinta según los datos de cada página", () => {
    const cucuta = introDirectorio("Cúcuta", [item({ nombre: "Mijaos" })]);
    const pereira = introDirectorio("Pereira", [
      item({ nombre: "El Parche" }),
      item({ nombre: "La Brasa", categoria_negocio: "ASADERO" }),
    ]);
    expect(cucuta).toContain("Un negocio de comida en Cúcuta");
    expect(pereira).toContain("2 restaurantes en Pereira");
    expect(pereira).toContain("El Parche y La Brasa");
    expect(cucuta).not.toBe(pereira);
  });
});
