import React from 'react'
import { useTable, usePagination, useSortBy, useGlobalFilter,useFilters} from 'react-table';

import { COLUMNS } from './columns';
import { useMemo } from 'react';
import MOCK_DATA1 from './MOCK_DATA1.json';
import './table.css';
import { GlobalFilter } from './GlobalFilter';



export const PaginationTable = () => {

    const columns = useMemo(()=> COLUMNS,[])
    const data = useMemo(()=>MOCK_DATA1,[])

    const tableInstance = useTable({
        columns,
        data
    },useFilters,
      useGlobalFilter ,useSortBy, usePagination
    )
    const { getTableProps, getTableBodyProps,headerGroups,page,rows,prepareRow,nextPage,previousPage,canNextPage,canPreviousPage,pageOptions,state,setGlobalFilter} = tableInstance

    const {pageIndex,globalFilter} = state
  

  return (<>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
    <table {...getTableProps()}>
        <thead>
            {
                headerGroups.map((headerGroup)=>(
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map(( column )=>(
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                <div>{column.canFilter?column.render('Filter'): null}</div>
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? ' ⬇️':' ⬆️') :''}
                                </span>
                                </th>
                            ))
                        }
                
                     </tr>
                ))
            }
            
        </thead>
        <tbody {...getTableBodyProps()}>
            {
                page.map(row =>{
                    prepareRow(row)
                    return(
                        <tr {...row.getRowProps()}>
                        {
                            row.cells.map((cell)=>{
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                         
                            })
                        }
                        </tr>
                           
                    )
                })
            }
            
        </tbody>
    </table>
    <div>
            <span>
                Page{''}
                <strong>
                    {pageIndex+1} of {pageOptions.length}
                </strong>{''}
            </span>
        <button onClick={()=> previousPage()} disabled={!canPreviousPage}>Previous</button>
        <button onClick={()=> nextPage()} disabled={!canNextPage}>Next</button>
    </div>


    </>
  )
}
