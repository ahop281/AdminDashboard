import React, { useEffect, useMemo, useState } from 'react'
import Table from '../components/table/Table'
import axios from '../api'
import { toast } from 'react-toastify'
import moment from 'moment'

const Orders = () => {
    const [isFetching, setFetching] = useState(true)
    const [data, setData] = useState([])

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Order number',
                accessor: 'orderNumber',
            },
            {
                Header: 'Order date',
                accessor: 'orderDate',
            },
            {
                Header: 'Total amount',
                accessor: 'totalAmount',
            },
        ],
        []
    )

    useEffect(() => {
        axios.get('common/getorders')
            .then(res => {
                setData(res.data.map(item => ({
                    ...item,
                    totalAmount: '$' + item.totalAmount,
                    orderDate: moment(item.orderDate).format('MMMM Do YYYY')
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
                <Table title='Ordes' isFetching={isFetching} data={data} columns={columns} />
            </div>
        </div>
    )
}

export default Orders
