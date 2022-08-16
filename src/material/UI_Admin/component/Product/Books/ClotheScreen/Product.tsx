import { Search } from "@mui/icons-material";
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
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Product.css';

const Product = () => {
    const initial = [{
        id: 1, image: require('../../../../image/frame.png'), name: 'T-shirt blue strong', description: 'Size:XXL, Color: Blue, Material: cord-ton, gender: male', price: 10000, quantity_stock: 10, status: true, is_new: true
    }, {
        id: 2, image: require('../../../../image/frame.png'), name: 'T-shirt blue strong T-shirt blue strong T-shirt blue strong T-shirt blue strong', description: 'Size:XXL, Color: Blue, Material: cord-ton, gender: male', price: 10000, quantity_stock: 10, status: false, is_new: false
    }, {
        id: 3, image: require('../../../../image/frame.png'), name: 'T-shirt blue strong', description: 'Size:XXL, Color: Blue, Material: cord-ton, gender: male', price: 10000, quantity_stock: 10, status: true, is_new: false
    }, {
        id: 4, image: require('../../../../image/frame.png'), name: 'T-shirt blue strong', description: 'Size:XXL, Color: Blue, Material: cord-ton, gender: male', price: 10000, quantity_stock: 10, status: true, is_new: true
    },
    {
        id: 5, image: require('../../../../image/frame.png'), name: 'T-shirt blue strong', description: 'Size:XXL, Color: Blue, Material: cord-ton, gender: male', price: 10000, quantity_stock: 10, status: true, is_new: true
    },
    {
        id: 6, image: require('../../../../image/frame.png'), name: 'T-shirt blue strong', description: 'Size:XXL, Color: Blue, Material: cord-ton, gender: male', price: 10000, quantity_stock: 10, status: true, is_new: true
    },
    {
        id: 7, image: require('../../../../image/frame.png'), name: 'T-shirt blue strong', description: 'Size:XXL, Color: Blue, Material: cord-ton, gender: male', price: 10000, quantity_stock: 10, status: true, is_new: true
    },
    {
        id: 8, image: require('../../../../image/frame.png'), name: 'T-shirt blue strong', description: 'Size:XXL, Color: Blue, Material: cord-ton, gender: male', price: 10000, quantity_stock: 10, status: true, is_new: true
    },
    {
        id: 9, image: require('../../../../image/frame.png'), name: 'T-shirt blue strong', description: 'Size:XXL, Color: Blue, Material: cord-ton, gender: male', price: 10000, quantity_stock: 10, status: true, is_new: true
    },
    {
        id: 10, image: require('../../../../image/frame.png'), name: 'T-shirt blue strong', description: 'Size:XXL, Color: Blue, Material: cord-ton, gender: male', price: 10000, quantity_stock: 10, status: true, is_new: true
    },
    {
        id: 11, image: require('../../../../image/frame.png'), name: 'T-shirt blue strong', description: 'Size:XXL, Color: Blue, Material: cord-ton, gender: male', price: 10000, quantity_stock: 10, status: true, is_new: true
    }
    ];
    const [product, setProduct] = useState(initial);
    const [selectNew, setSelectNew] = useState('');
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeSelect = (event: any) => {
        setSelectNew(event.target.value);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleClickUpdate = (data: any) => {
        navigate(`book/${data.id}`);
    }
    const handleClickNewProduct = () => {
        navigate(`book`)
    }
    return (
        <div className="container" >
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table aria-label="simple-label">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="screen-search-product">
                                        <TextField label='Tìm kiếm' sx={{ width: '300px' }} />
                                        <FormControl sx={{ width: '200px' }}>
                                            <InputLabel id='select-new'>Select new</InputLabel>
                                            <Select
                                                labelId="select-new"
                                                defaultValue={selectNew}
                                                onChange={handleChangeSelect}
                                                label={'Select new'}>
                                                <MenuItem value={0}>Old</MenuItem>
                                                <MenuItem value={1}>New</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Button variant="outlined"><Search /></Button>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" sx={{ width: '150px' }} onClick={handleClickNewProduct}>Tạo mới</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ width: '5%', textAlign: 'center' }}>STT</TableCell>
                                <TableCell sx={{ width: '30%', textAlign: 'center' }}>Sách</TableCell>
                                <TableCell sx={{ width: '25%', textAlign: 'center' }}>Mô tả</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Tồn kho</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Giá</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Mới</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Hoạt động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((data, index: number) => (
                                    <TableRow key={data.id}>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {page * rowsPerPage + index + 1}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle', display: 'flex', gap: '5px' }}>
                                            <div>
                                                <img style={{ width: '80px', height: '100px' }} src={data.image} alt='' />
                                            </div>
                                            <div style={{ width: '100%', display: 'table' }}>
                                                <span style={{ height: 'auto', display: 'table-cell', verticalAlign: 'middle' }}>
                                                    {data.name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle' }}>
                                            {data.description}
                                        </TableCell>
                                        <TableCell sx={{
                                            verticalAlign: 'middle', textAlign: 'center',
                                        }}>
                                            {data.quantity_stock}
                                        </TableCell>
                                        <TableCell sx={{
                                            verticalAlign: 'middle', textAlign: 'center', '::after': {
                                                content: `'đ'`
                                            }
                                        }}>
                                            {Intl.NumberFormat().format(data.price)}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {data.is_new === true ? 'Yes' : 'No'}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle' }}>
                                            <div style={{ height: '100px', display: 'table' }}>
                                                <div style={{ display: 'table-cell', verticalAlign: 'middle', paddingRight: '5px' }}>
                                                    <Button sx={{ width: '110px' }} variant="outlined" onClick={() => handleClickUpdate(data)}>Cập Nhật</Button>
                                                </div>
                                                <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                                                    {data.status ? <Button sx={{ width: '100px' }} variant="outlined">Tắt</Button> : <Button sx={{ width: '100px' }} variant="outlined">Mở</Button>}
                                                </div>
                                            </div>
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
                    labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) { return `${from}–${to} trong ${count !== -1 ? count : `more than ${to}`}`; }}
                    labelRowsPerPage={'Trang: '}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div >
    )
}
export default Product;