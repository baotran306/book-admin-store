import { Cancel, Close, Done, RestartAlt, Search } from "@mui/icons-material";
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
import id from "date-fns/esm/locale/id/index.js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../../../Axios";
import './Product.css';

const Product = () => {
    const [product, setProduct] = useState([] as any);
    const [selectNew, setSelectNew] = useState(-1);
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [keyWord, setKeyWord] = useState('');

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
        navigate(`book/${data.isbn}`);
    }
    const handleClickNewProduct = () => {
        navigate(`book`)
    }
    useEffect(() => {
        if (loading) {
            loadData();
        }
    }, [loading]);
    const loadData = () => {
        Axios.get(`/book/get-list-book`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            }).catch((error) => {
                console.log(error);

            })
    }
    const handleReload = () => {
        setLoading(true);
        setSelectNew(-1);
        setKeyWord('');
    }
    const handleSearch = () => {
        if (selectNew !== -1) {
            searchIsNew()
        } else if (keyWord !== '') {
            search();
        } else if (keyWord === '' && selectNew === -1) {
            setLoading(true);
        }
    }
    const search = () => {
        Axios.post(`/book/get-list-book-by-name`, {
            bookName: keyWord
        }).then(res => {
            setProduct(res.data);
        }).catch((error) => {

        })
    }
    const searchIsNew = () => {
        Axios.post(`/book/get-list-book-by-name-and-is-new`, {
            bookName: keyWord,
            is_new: selectNew
        }).then(res => {
            setProduct(res.data);
        }).catch((error) => {

        })
    }
    const handleChangeKeyWord = (event: any) => {
        setKeyWord(event.target.value)
    }
    return (
        <div className="container" >
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 800 }}>
                    <Table aria-label="simple-label">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <div className="screen-search-product">
                                        <TextField label='Lọc danh mục' name="keyword"
                                            value={keyWord}
                                            onChange={handleChangeKeyWord}
                                            sx={{ width: '300px' }} />
                                        <FormControl sx={{ width: '200px' }}>
                                            <InputLabel id='select-new'>Lọc danh mục</InputLabel>
                                            <Select
                                                labelId="select-new"
                                                value={selectNew}
                                                onChange={handleChangeSelect}

                                                label={'Lọc danh mục'}>
                                                <MenuItem value={-1}>None</MenuItem>
                                                <MenuItem value={0}>Cũ</MenuItem>
                                                <MenuItem value={1}>Mới</MenuItem>
                                            </Select>

                                        </FormControl>
                                        <Button variant="outlined" onClick={handleSearch}><Search /></Button>
                                        <Button variant="outlined" onClick={handleReload}><RestartAlt /></Button>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" sx={{ width: '150px' }} onClick={handleClickNewProduct}>Tạo mới</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ width: '5%', textAlign: 'center' }}>STT</TableCell>
                                <TableCell sx={{ width: '55%', textAlign: 'center' }}>Sách</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Tồn kho</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Giá</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Mới</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Hoạt động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((data: any, index: number) => (
                                    <TableRow key={data.id}>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {page * rowsPerPage + index + 1}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle', display: 'flex', gap: '5px' }}>
                                            <div>
                                                <img style={{ width: '80px', height: '100px' }} src={`http://127.0.0.1:5000/get-image/${data.image}`} alt='' />
                                            </div>
                                            <div style={{ width: '100%', display: 'table' }}>
                                                <span style={{ height: 'auto', display: 'table-cell', verticalAlign: 'middle' }}>
                                                    {data.book_name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell sx={{
                                            verticalAlign: 'middle', textAlign: 'center',
                                        }}>
                                            {data.quantity_in_stock}
                                        </TableCell>
                                        <TableCell sx={{
                                            verticalAlign: 'middle', textAlign: 'center', '::after': {
                                                content: `'đ'`
                                            }
                                        }}>
                                            {Intl.NumberFormat().format(data.price)}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {data.is_new === true ? <Done sx={{ color: 'green' }} /> : <Close sx={{ color: 'red' }} />}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle' }}>
                                            <div style={{ height: '100px', display: 'table' }}>
                                                <div style={{ display: 'table-cell', verticalAlign: 'middle', paddingRight: '5px' }}>
                                                    <Button sx={{ width: '110px' }} variant="outlined" onClick={() => handleClickUpdate(data)}>Cập Nhật</Button>
                                                </div>
                                                {/* <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                                                    {data.status ? <Button sx={{ width: '100px' }} variant="outlined">Tắt</Button> : <Button sx={{ width: '100px' }} variant="outlined">Mở</Button>}
                                                </div> */}
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