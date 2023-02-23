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
                Header: 'Product name',
                accessor: 'productName',
            },
            {
                Header: 'Unit price',
                accessor: 'unitPrice',
            },
            {
                Header: 'Package',
                accessor: 'package',
            },
            {
                Header: 'Supplier id',
                accessor: 'supplierId',
            },
            {
                Header: 'Discontinued',
                accessor: 'isDiscontinued',
            },
        ],
        []
    )

    useEffect(() => {
        axios.get('common/getProducts')
            .then(res => {
                setData(res.data.map(item => ({
                    ...item,
                    isDiscontinued: item.isDiscontinued ? 'True' : 'False'
                })))
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
                <Table title='Products' isFetching={isFetching} data={data} columns={columns} />
            </div>
        </div>
    )
}

export default Products
