import React from 'react'

interface Props {
  states: string[]
  cities: string[]
  selectedState: string
  selectedCity: string
  onChangeState: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onChangeCity: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

import styles from "./styles.module.css";

export const StateCityFilter = ({
  states,
  cities,
  selectedState,
  selectedCity,
  onChangeState,
  onChangeCity,
}: Props) => {
  return (
    <div className={styles.container}>
      <select
        value={selectedState}
        onChange={onChangeState}
        className={styles.select}
      >
        <option value="">Selecione um Estado</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select
        value={selectedCity}
        onChange={onChangeCity}
        disabled={!selectedState}
        className={styles.select}
      >
        <option value="">Selecione uma Cidade</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  )
}
