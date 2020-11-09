import { Link } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Layout from "../../components/layout";
import styles from './country.module.css'

const getCountry = async (id) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
    const country = await res.json();

    return country;
}

const Country = ({ country }) => {
    console.log(country);
    const [borders, setBorders] = useState([]);

    const getBorders = async () => {
        const borders = await Promise.all(country.borders.map(border => getCountry(border)));
        setBorders(borders)
    }

    useEffect(
        () => {
            getBorders();
        // console.log(getBorders())
    }, [])



    return <Layout title={country.name}>
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.overview_panel}>
                    <img src={country.flag} alt={country.name} />

                    {/* Country Names */}
                    <div className={styles.country_names}>
                        <h1 className={styles.country_name}>{country.name}</h1>
                        <p className={styles.country_subregion}>{country.subregion}</p>
                    </div>

                    {/* Country Overview */}
                    <div className={styles.country_overview}>
                        <div>
                            <div className={styles.stat_value}>{country.population}</div>
                            <div className={styles.stat_label}>Population</div>
                        </div>

                        <div>
                            <div className={styles.stat_value}>{country.area}</div>
                            <div className={styles.stat_label}>Area (km)</div>
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.right}>

                <div className={styles.details_panel}>
                    <h4 className={styles.details_heading}>Details</h4>

                    {/* detail row */}
                    <div className={styles.details_row}>
                        <div className={styles.details_label}>Capital</div>
                        <div className={styles.details_value}>{country.capital}</div>
                    </div>
                    {/* detail row */}
                    <div className={styles.details_row}>
                        <div className={styles.details_label}>Subregion</div>
                        <div className={styles.details_value}>{country.subregion}</div>
                    </div>
                    {/* detail row */}
                    <div className={styles.details_row}>
                        <div className={styles.details_label}>Languages</div>
                        <div className={styles.details_value}>{country.languages.map(({ name }) => name).join(',')}</div>
                    </div>

                    {/* detail row */}
                    <div className={styles.details_row}>
                        <div className={styles.details_label}>Native Language</div>
                        <div className={styles.details_value}>{country.nativeName}</div>
                    </div>
                    {/* detail row */}
                    <div className={styles.details_row}>
                        <div className={styles.details_label}>Currencies</div>
                        <div className={styles.details_value}>{country.currencies.map(({ name }) => name).join(',')}</div>
                    </div>
                    {/* detail row */}
                    <div className={styles.details_row}>
                        <div className={styles.details_label}>Gini</div>
                        <div className={styles.details_value}>{country.gini || 0}%</div>
                    </div>

                    <div className={styles.borderWrapper}>
                        <h4 className={styles.borders_heading}>Neighbouring Countries</h4>
                        <div className={styles.borders_row} >
                            {borders.map(({ flag, name, alpha3Code }) =>
                            <Link href={`./${alpha3Code}`}>
                                <div className={styles.border_box} key={name}>
                                    <><img src={flag} /></>
                                    <div className={styles.border_name}>{name}</div>
                                </div>
                            </Link>
                            )}
                        </div>
                    </div>


                </div>


            </div>

        </div>
    </Layout>
}

export default Country;

export const getServerSideProps = async ({ params }) => {

    const country = await getCountry(params.id);
    return {
        props: {
            country,
        },
    };
};