import { useEffect, useState, useTransition } from 'react'
import { usePagination, useTable } from 'react-table'
import Box from '../box/Box'
import './table.scss'
import Btn from '../btn/Btn'
import Spinner from '../spinner/Spinner'

const Table = ({ title, isFetching, data, columns }) => {
    const [isLoading, startTransition] = useTransition()
    const [filteredData, setFilterData] = useState([])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data: filteredData,
            initialState: { pageIndex: 0 },
        },
        usePagination
    )

    useEffect(() => {
        setFilterData(data)
    }, [data])

    const handleSearch = (e) => {
        startTransition(() => {
            const val = e.target.value
            setFilterData(data.filter(item => val === '' || (val !== '' && `${item.id}`.includes(val))))
        })
    }

    return (
        <Box>
            <div className='table'>
                <div className="table__header mb">
                    <span className='title'>{title}</span>
                    <div className='table__header__right'>
                        <div className="search-wrapper">
                            <input onChange={handleSearch} type="text" placeholder="Search by id" />
                            <div className="search"></div>
                        </div>
                        <select
                            className='select-item'
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                        >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='table-container'>
                    {
                        (isLoading || isFetching) && <div className='table-loading'><Spinner scale={0.8} color={'purple'} /></div>
                    }
                    <table style={{ opacity: (isLoading | isFetching) ? '0.5' : '1' }} {...getTableProps()}>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>
                <div className="table__pagination">
                    <div>
                        <Btn onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            <i className='bx bx-first-page'></i>
                        </Btn>
                        <Btn onClick={() => previousPage()} disabled={!canPreviousPage}>
                            <i className='bx bxs-chevron-left' ></i>
                        </Btn>
                        <Btn onClick={() => nextPage()} disabled={!canNextPage}>
                            <i className='bx bxs-chevron-right'></i>
                        </Btn>
                        <Btn onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            <i className='bx bx-last-page' ></i>
                        </Btn>
                    </div>
                    <div className='table__pagination__right'>
                        <label className='page-input'>
                            <span>Go to</span>
                            <input
                                type="number"
                                min={1}
                                max={data.length + 1}
                                defaultValue={pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    startTransition(() => {
                                        gotoPage(page)
                                    })
                                }}
                                style={{ width: '100px' }}
                            />
                        </label>
                        <span className='page-index'>
                            {pageOptions.length > 0 ? pageIndex + 1 : 0} / {pageOptions.length}
                        </span>
                    </div>

                </div>
            </div>
        </Box>
    )
}

export default Table