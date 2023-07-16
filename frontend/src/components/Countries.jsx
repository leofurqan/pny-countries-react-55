import React, { useEffect, useState } from 'react'
import CountryItem from './CountryItem'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

export default function Countries() {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchCountiresData = () => {
        setLoading(true)
        fetch("https://restcountries.com/v3.1/all").then(async (res) => {
            const c = await res.json()
            setCountries(c)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }

    const searchCountriesData = async (event) => {
        setLoading(true)
        fetch("https://restcountries.com/v3.1/name/" + event.target.value).then(async (res) => {
            const c = await res.json()
            setCountries(c)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
        // fetch("https://restcountries.com/v3.1/name/" + search).then(async (res) => {
        //     const c = await res.json()
        //     setCountries(c)
        // }).catch((error) => {
        //     console.log(error)
        // })
    }

    const handleKeyUp = (event) => {
        if (event.target.value === '') {
            fetchCountiresData()
        } else {
            searchCountriesData(event)
        }
    }

    useEffect(() => {
        fetchCountiresData()
    }, [])

    return (
        <>
            <h1 className='text-center mt-5'>Countries Data</h1>

            <Row>
                <Col>
                    <input type='text' className='form-control' onKeyUp={handleKeyUp} onChange={handleSearch} placeholder='Search by Name' value={search} />
                </Col>

                <Col></Col>
                <Col></Col>
            </Row>

            {loading &&
                <Row className='justify-content-center'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            }

            <Row>
                {countries.length > 0 && countries.map(country => (
                    <Col>
                        <CountryItem name={country.name.common} image={country.flags.svg} description={country.population} />
                    </Col>
                ))}
            </Row>
        </>
    )
}
