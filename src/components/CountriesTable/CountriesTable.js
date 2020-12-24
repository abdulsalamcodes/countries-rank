
import { useState } from 'react'
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons';
import styles from './CountriesTable.module.css'
import CountryRow from './CountryRow';


const orderBy = (countries, value, order) => {
    if (order === "asc") {
        return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1);
    }

    if (order === "desc") {
        return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1);
    }

    return [...countries];
}

const SortArrow = ({ order }) => {
    if (!order) {
        return <></>;
    }
    if (order === 'asc') {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowUpRounded color="inherit" />
            </div>
        )
    } else if (order === "desc") {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowDownRounded color="inherit" />
            </div>
        )
    }
}


const CountriesTable = ({ countries }) => {
    const [order, setOrder] = useState();
    const [value, setValue] = useState();
    const orderedCountries = orderBy(countries, value, order);
    const switchOrder = () => {
        if (!order) {
            return setOrder('asc');
        }

        if (order === "asc") {
            setOrder('desc');
        } else if (order == 'desc') {
            setOrder('asc')
        } else {
            setOrder(null);
        }
    }

    const switchValueAndOrder = (value) => {
        switchOrder();
        setValue(value)
    }

    return <div>
        <header className={styles.heading}>
            <div className={styles.heading_flag}></div>
            <button className={styles.heading_name} onClick={() => switchValueAndOrder('name')}>
                <div>Name</div>
                {value === "name" && <SortArrow order={order} />}

            </button>

            <button className={styles.heading_population} onClick={() => switchValueAndOrder('population')}>
                <div>population</div>
                {value === "population" && <SortArrow order={order} />}
            </button>

            <button className={styles.heading_area} onClick={() => switchValueAndOrder('area')}>
                <div>Area (km<sup style={{ fontSize: ".5rem" }}>2</sup>)</div>
                {value === "area" && <SortArrow order={order} />}
            </button>

            <button className={styles.heading_gini} onClick={() => switchValueAndOrder('gini')}>
                <div>Gini</div>
                {value === "gini" && <SortArrow order={order} />}
            </button>
        </header>


        {orderedCountries.map((country) => <CountryRow
            name={country.name}
            gini={country.gini}
            population={country.population}
            area={country.area}
            alpha3Code={country.alpha3Code}
            flag={country.flag}
        />)}
    </div>
}

export default CountriesTable