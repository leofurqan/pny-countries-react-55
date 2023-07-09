import React, { useEffect, useState } from 'react'
import CountryItem from './CountryItem'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Countries() {
    const [countries, setCountries] = useState([])

    const fetchCountiresData = async () => {
        const c = await fetch("https://restcountries.com/v3.1/all")
        setCountries(await c.json())
    }

    useEffect(() => {
        fetchCountiresData()
    }, [])

    return (
        <>
            <h1 className='text-center mt-5'>Countries Data</h1>
            <Row>
                {countries.map(country => (
                    <Col>
                        <CountryItem name={country.name.common} image={country.flags.svg} description={country.population}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}
