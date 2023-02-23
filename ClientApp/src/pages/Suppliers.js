import React, { useEffect, useMemo, useState } from 'react'
import Table from '../components/table/Table'
import axios from '../api'
import { toast } from 'react-toastify'

const Products = () => {
    const [isFetching, setFetching] = useState(true)
    const [data, setData] = useState([])

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Company name',
                accessor: 'companyName',
            },
            {
                Header: 'Contact name',
                accessor: 'contactName',
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
            {
                Header: 'Fax',
                accessor: 'fax',
            }
        ],
        []
    )

    useEffect(() => {
        axios.get('common/getSuppliers')
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
                <Table title='Suppliers' isFetching={isFetching} data={data} columns={columns} />
            </div>
        </div>
    )
}

export default Products
