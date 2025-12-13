import type { PropsWithChildren } from 'react'
import React from 'react'

import styles from './styles.module.css'
import type { Filter } from '../../types'

import { StateCityFilter } from '../StateCityFilter'

interface Props extends Filter {
  states: string[]
  cities: string[]
  selectedState: string
  selectedCity: string
  onChangeState: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onChangeCity: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export function Filter({ 
  title, 
  children,
  states,
  cities,
  selectedState,
  selectedCity,
  onChangeState,
  onChangeCity
}: PropsWithChildren<Props>) {
    return (
        <section aria-labelledby="filtro de lojas" className={styles.container}>
            <div>
                <h2 style={{padding: "0 2rem"}}>
                    {title}
                </h2>
            </div>
            <StateCityFilter
                states={states}
                cities={cities}
                selectedState={selectedState}
                selectedCity={selectedCity}
                onChangeState={onChangeState}
                onChangeCity={onChangeCity}
            />
            <div >{children}</div>
        </section>
    )
}

