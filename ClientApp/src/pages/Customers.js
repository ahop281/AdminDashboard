import React, { useEffect, useMemo, useState } from 'react'
import Table from '../components/table/Table'
import axios from '../api'
import { toast } from 'react-toastify'

const Customers = () => {
    const [isFetching, setFetching] = useState(true)
    const [data, setData] = useState([])

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'First name',
                accessor: 'firstName',
            },
            {
                Header: 'Last name',
                accessor: 'lastName',
            },
            {
                Header: 'City',
                accessor: 'city',
            },
            {
                Header: 'Country',
                accessor: 'country',
            },
            {
                Header: 'Phone number',
                accessor: 'phone',
            },
        ],
        []
    )

    useEffect(() => {
        axios.get('common/getCustomers')
            .then(res => {
                setData(res.data)
                setFetching(false)
            })
            .catch(error => {
                toast.error(error.response.data, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setFetching(false)
            })
    }, [])

    return (
        <div className="row">
            <div className="col-12">
                <Table title='Customers' isFetching={isFetching} data={data} columns={columns} />
            </div>
        </div>
    )
}

export default Customers
