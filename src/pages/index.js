import { useState } from 'react';
import CountriesTable from '../components/CountriesTable/CountriesTable';
import Layout from '../components/layout'
import SearchInput from '../components/SearchInput/SearchInput';
import styles from '../styles/Home.module.css'
export default function Home({ countries }) {

  const [keyword, setKeyword] = useState('')
  const filteredCountries = [...countries].filter((country) =>
    country.name.toLowerCase().includes(keyword) ||
    country.region.toLowerCase().includes(keyword) ||
    country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  }

  console.log(filteredCountries);
  // console.log(countries);

  return <Layout>
    <div className={styles.inputContainer}>
      <div className={styles.counts}>Found {filteredCountries.length} countries</div>

      <div className={styles.inputs}>
        <SearchInput placeholder="Filter by name, region and subRegion" onChange={onInputChange} />
      </div>
    </div>

    <CountriesTable countries={filteredCountries} />

  </Layout>;
}

export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await res.json();
  return {
    props: {
      countries,
    }
  }
}