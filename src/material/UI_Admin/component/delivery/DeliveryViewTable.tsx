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
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import Axios from "../../../Axios";
const DeliverView = (props: any) => {

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [listOrderCustomer, setListOrderCustomer] = useState([]);
    useEffect(() => {
        if (loading) {
            getApiByState();
        }
    }, [loading]);
    const getApiByState = () => {
        let info: any = JSON.parse(sessionStorage.getItem("accessToken")!);

        Axios.get(`/staff/get-list-order-delivery/${info.staff_id}`) // lay don hang theo state
            .then(res => {
                let billTemp = res.data;
                setListOrderCustomer(billTemp.map((data: any) => {
                    return {
                        cart_id: data.receiver_info.cart_id,
                        date: moment(data.receiver_info.order_cart_time).format('hh:mm:ss, DD/MM/YYYY'),
                        customer_name: data.receiver_info.last_name + " " + data.receiver_info.first_name,
                        address: data.receiver_info.address,
                        phone_number: data.receiver_info.phone_number,
                        status_id: data.receiver_info.status_id
                    }
                }))
                setLoading(false);
            }).catch(error => {
                console.log(error);
            })
    }
    const handleClickConfirm = (data: any) => {
        Axios.get(`/staff/update-delivery_success/${data.cart_id}`)
            .then(res => {
                setLoading(true);
            }).catch(error => {
                console.log(error);
            })
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
                                <TableCell colSpan={7}>
                                    <div className="screen-search-product">
                                        <TextField label='Tìm kiếm' sx={{ width: '300px' }} />
                                        <Button variant="outlined"><Search /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Mã đơn hàng</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Ngày đặt</TableCell>
                                <TableCell sx={{ width: '15%', textAlign: 'center' }}>Tên khách hàng</TableCell>
                                <TableCell sx={{ width: '40%', textAlign: 'center' }}>Địa chỉ</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Số điện thoại</TableCell>
                                <TableCell sx={{ width: '15%', textAlign: 'center' }}>Hành động</TableCell>
                                {/* <TableCell sx={{ width: '10%', textAlign: 'center' }}></TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listOrderCustomer
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((data: any, index: number) => (
                                    data.status_id === props.status || props.status === 0 ?
                                        <TableRow key={index}>
                                            <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                                {data.cart_id}
                                            </TableCell>
                                            <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                                {data.date}
                                            </TableCell>
                                            <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                                {data.customer_name}
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
                                            <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                                {data.status_id !== 3 ? <Button sx={{ width: 'auto' }} variant="outlined" onClick={() => handleClickConfirm(data)}>Hoàn tất</Button> : <></>}
                                            </TableCell>
                                            {/* <TableCell sx={{ verticalAlign: 'middle' }}>
                                                <Link className="more-detail" to={`order/order-detail/${data.cart_id}`}>Chi tiết....</Link>
                                            </TableCell> */}
                                        </TableRow> : <></>
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
                    count={listOrderCustomer.length}
                    rowsPerPage={rowsPerPage}
                    labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) { return `${from}–${to} trong ${count !== -1 ? count : `nhiều hơn ${to}`}`; }}
                    labelRowsPerPage={'Trang: '}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div >
    )
}
export default DeliverView;