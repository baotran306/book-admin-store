import { Label, Search } from "@mui/icons-material";
import './DeliveryView.css'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    TablePagination,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const DeliverView = () => {
    const initial = [{
        id: 1, product_name: 'T-shirt blue strong', date: '12/08/2022', address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    }, {
        id: 2, product_name: 'T-shirt blue strong', date: '12/08/2022', address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    }, {
        id: 3, product_name: 'T-shirt blue strong', date: '12/08/2022', address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    }, {
        id: 4, product_name: 'T-shirt blue strong', date: '12/08/2022', address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    },
    {
        id: 5, product_name: 'T-shirt blue strong', date: '12/08/2022', address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    },
    {
        id: 6, product_name: 'T-shirt blue strong', date: '12/08/2022', address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    },
    {
        id: 7, product_name: 'T-shirt blue strong', date: '12/08/2022', address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    },
    {
        id: 8, product_name: 'T-shirt blue strong', date: '12/08/2022', address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    },
    {
        id: 9, product_name: 'T-shirt blue strong', date: '12/08/2022', address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    },
    {
        id: 10, product_name: 'T-shirt blue strong', date: '12/08/2022', address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    },
    {
        id: 11, product_name: 'T-shirt blue strong', date: '12/08/2022', address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    }
    ];
    const [product, setProduct] = useState(initial);
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleClickConfirm = (data: any) => {

    }
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <div style={{ width: '160vh', display: 'flex', justifyContent: 'center' }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600, width: '100%' }}>
                    <Table aria-label="simple-label">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="screen-search-product">
                                        <TextField label='search' sx={{ width: '300px' }} />
                                        <Button variant="outlined"><Search /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ width: '5%', textAlign: 'center' }}>Bill number</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Date</TableCell>
                                <TableCell sx={{ width: '20%', textAlign: 'center' }}>Name customer</TableCell>
                                <TableCell sx={{ width: '30%', textAlign: 'center' }}>Address</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Phone number</TableCell>
                                <TableCell sx={{ width: '15%', textAlign: 'center' }}>Action</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((data, index: number) => (
                                    <TableRow key={data.id}>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {data.id}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {data.date}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {data.full_name}
                                        </TableCell>
                                        <TableCell sx={{
                                            verticalAlign: 'middle', textAlign: 'center',
                                        }}>
                                            {data.address}
                                        </TableCell>
                                        <TableCell sx={{
                                            verticalAlign: 'middle', textAlign: 'center'
                                        }}>
                                            {data.phone_number}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle', display: 'flex', justifyContent: 'center' }}>
                                            <Button sx={{ width: 'auto' }} variant="outlined" onClick={() => handleClickConfirm(data)}>Delivered</Button>
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle' }}>
                                            <Link className="more-detail" to={`order/order-detail/${data.id}`}>More....</Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    sx={{
                        div: {
                            '.css-pdct74-MuiTablePagination-selectLabel, .css-levciy-MuiTablePagination-displayedRows': {
                                marginTop: '15px',
                            }
                        }
                    }}
                    count={product.length}
                    rowsPerPage={rowsPerPage}
                    labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) { return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`; }}
                    labelRowsPerPage={'Page: '}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div >
    )
}
export default DeliverView;