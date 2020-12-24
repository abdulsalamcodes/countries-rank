import React from 'react'
import styles from './CountriesTable.module.css'
import { Link } from '@material-ui/core';

function CountryRow(props) {
    return <Link href={`/country/${props.alpha3Code}`} key={props.name}>
        <div className={styles.row} data-aos="fade-up"
            data-aos-anchor-placement="top-bottom" data-aos-delay="300">
            <div className={styles.flag}><img src={props.flag} alt={props.name} /></div>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.population}>{props.population}</div>
            <div className={styles.area}>{props.area || 0} </div>
            <div className={styles.gini}>{props.gini || 0}%</div>
        </div>
    </Link>
}

export default CountryRow
