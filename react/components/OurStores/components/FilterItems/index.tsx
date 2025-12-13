import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";
import type { IProps, Store, Map } from "../../types";

export function FilterItems({ stores = [], setCenter }: Pick<IProps, "stores"> & { setCenter: (map: Map) => void }) {
  return <FilterItemsList stores={stores} setCenter={setCenter} />;
}

function FilterItemsList({ stores = [], setCenter }: Pick<IProps, "stores"> & { setCenter: (map: Map) => void }) {
  return (
    <div className={classNames("flex flex-column", styles.stores)}>
      {stores?.map((store) => (
        <FilterItem key={store.__editorItemTitle} {...store} setCenter={setCenter} />
      ))}
    </div>
  );
}

export function FilterItem(p: Readonly<Store> & { setCenter: (map: Map) => void }) {
  const setCurrentMap = () => {
    if (p.map) {
      p.setCenter(p.map)
    }
  };

  return (
    <article
      aria-labelledby={p.__editorItemTitle}
      className={classNames("relative pointer", styles.store)}
      onClick={() => p.map && setCurrentMap()}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          p.map && setCurrentMap();
        }
      }}
    >
      <h3>{p.__editorItemTitle}</h3>
      <div className={classNames("flex flex-column", styles.items)}>
        <ItemLocation
          addressLabel={p.addressLabel}
          addressNumber={p.addressNumber}
          neighborhood={p.neighborhood}
          city={p.city}
          state={p.state}
          cep={p.cep}
          map={p.map}
          onViewMap={setCurrentMap}
        />
        <ItemTime timeLabel={p.timeLabel} />
      </div>
    </article>
  );
}

function ItemLocation({
  addressLabel,
  addressNumber,
  neighborhood,
  city,
  state,
  cep,
  map,
  onViewMap
}: Pick<
  Store,
  | "addressLabel"
  | "addressNumber"
  | "neighborhood"
  | "city"
  | "state"
  | "cep"
  | "map"
> & { onViewMap: () => void }) {
  if (!addressLabel) return null;

  return (
    <div className={classNames("flex items-center", styles.item)}>
      <address className="w-100 fs-normal">
        <p>
          {addressLabel}, {addressNumber}, {neighborhood}, {city}, {state},
          {cep}
        </p>
        {map && (
          <>
            <button 
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onViewMap();
              }}
            >
              Ver no mapa
            </button>
          </>
        )}
      </address>
    </div>
  );
}

function ItemTime({ timeLabel }: Pick<Store, "timeLabel">) {
  if (!timeLabel) return null;

  return (
    <time dateTime="timeLabel">
      <p>{timeLabel}</p>
    </time>
  );
}


