import React, { Suspense, useState, useMemo } from "react";
import { NoSSR } from "vtex.render-runtime";
import type { IProps, Map } from "./types";
import { Filter } from "./components/Filter";
import { FilterItems } from "./components/FilterItems";
import styles from "./styles.module.css";

const OurStoreMap = React.lazy(() =>
  import("./components/Map").then((module) => ({ default: module.OurStoreMap }))
);

export const OurStores = (props: IProps) => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [center, setCenter] = useState<Map | null>(null);

  const states = useMemo(() => {
    const uniqueStates = new Set(
      props.stores.map((store) => store.state).filter(Boolean) as string[]
    );
    return Array.from(uniqueStates).sort();
  }, [props.stores]);

  const cities = useMemo(() => {
    if (!selectedState) return [];
    const uniqueCities = new Set(
      props.stores
        .filter((store) => store.state === selectedState)
        .map((store) => store.city)
        .filter(Boolean) as string[]
    );
    return Array.from(uniqueCities).sort();
  }, [props.stores, selectedState]);

  const filteredStores = useMemo(() => {
    return props.stores.filter((store) => {
      const matchState = selectedState ? store.state === selectedState : true;
      const matchCity = selectedCity ? store.city === selectedCity : true;
      return matchState && matchCity;
    });
  }, [props.stores, selectedState, selectedCity]);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
    setCenter(null); 
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setCenter(null); 
  };

  return (
    <div className={styles.mainContainer}>
      <h2>{props.title}</h2>
      
      <section className={styles.mapSection}>
        <Filter 
          {...props.filter}
          states={states}
          cities={cities}
          selectedState={selectedState}
          selectedCity={selectedCity}
          onChangeState={handleStateChange}
          onChangeCity={handleCityChange}
        >
          <FilterItems stores={filteredStores} setCenter={setCenter} />
        </Filter>

        <NoSSR>
          <Suspense fallback={<div>Carregando mapa...</div>}>
            <OurStoreMap stores={filteredStores} center={center} />
          </Suspense>
        </NoSSR>
      </section>
    </div>
  );
};

OurStores.schema = {
  title: "Nossas Lojas",
  description: "Componente de Nossas Lojas",
  type: "object",
  properties: {
    title: {
      title: "Título",
      type: "string",
      default: "A Automax está sempre perto de você",
    },
    subTitle: {
      title: "Subtítulo",
      type: "string",
      default: "Confira nossas lojas físicas e venha nos visitar!",
    },
    filter: {
      title: "Filtro",
      type: "object",
      properties: {
        title: {
          title: "Título do Filtro",
          type: "string",
          default: "Localização das lojas:",
        },
      },
    },
    stores: {
      title: "Lojas",
      type: "array",
      items: {
        title: "Loja",
        type: "object",

        properties: {
         __editorItemTitle: {
            title: "Nome da Loja",
            type: "string"
          },
          phone: {
            title: "Link do WhatsApp",
            type: "string",
          },
          addressLabel: {
            title: "Endereço",
            type: "string",
          },
          addressNumber: {
            title: "Número",
            type: "string",
          },
          neighborhood: {
            title: "Bairro",
            type: "string",
          },
          city: {
            title: "Cidade",
            type: "string",
          },
          state: {
            title: "Estado",
            type: "string",
          },
          cep: {
            title: "CEP",
            type: "string",
          },
          timeLabel: {
            title: "Horário",
            type: "string",
          },
          map: {
            title: "Mapa",
            type: "object",
            properties: {
              latitude: {
                title: "Latitude",
                type: "number",
              },
              longitude: {
                title: "Longitude",
                type: "number",
              },
            },
          },
        },
      },
    },
  },
};
