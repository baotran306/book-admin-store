import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { Select, FormControl, InputLabel, MenuItem, Button, Tooltip } from '@mui/material';
import { Close, Done } from '@mui/icons-material';
import Axios from "../../../Axios";
import './TableOrder.css';
import moment from 'moment';

interface Column {
    id: 'cart_id' | 'date' | 'customer_name' | 'shipper' | 'action' | 'more';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'cart_id', label: 'Mã\u00a0đơn\u00a0hàng', minWidth: 100 },
    { id: 'date', label: 'Ngày\u00a0đặt\u00a0hàng', minWidth: 150 },
    { id: 'customer_name', label: 'Tên\u00a0người\u00a0đặt', minWidth: 150 },
    {
        id: 'shipper',
        label: 'Người giao hàng',
        minWidth: 230,
        align: 'center',
    },
    {
        id: 'action',
        label: 'Hoạt động',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'more',
        label: '',
        minWidth: 100,
        align: 'center',
    },
];

interface Data {
    customer_name: string; // tu tu, ghi 2 kieu ung thu qua :v
    cart_id: string;
    shipper: string;
    date: string;
}
interface Shipper {
    value: string, // id_staff
    full_name: string,
    number_delivery: number
}
export default function TableOrder(props: any) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [listOrderCustomer, setListOrderCustomer] = React.useState<Partial<Data>[]>([]);
    const [listShipper, setListShipper] = React.useState<Partial<Shipper>[]>([]);
    const [loadData, setLoadData] = React.useState(false);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getApiByState = (status_id: any) => {
        console.log(status_id);
        Axios.get(`/staff/get-customer-order-by-status/${status_id}`) // lay don hang theo state
            .then(res => {
                let billTemp = res.data;
                setListOrderCustomer(billTemp.map((data: any) => {
                    return {
                        customer_name: data.receiver_info.last_name_customer + " " + data.receiver_info.first_name_customer,
                        cart_id: data.receiver_info.cart_id,
                        shipper: data.receiver_info.staff_id_delivery ? data.receiver_info.staff_id_delivery : 0, // ok, thees load duoc chua// ,đc r á thuwrt đi,
                        date: moment(data.receiver_info.order_cart_time).format('hh:mm:ss, DD/MM/YYYY')
                    }
                }))
            }).catch(error => {
                console.log(error);
            })
    }
    const getApiShipper = () => {
        Axios.get(`staff/get-list-count-delivery-staff`)
            .then(res => {
                let shipperTemp = res.data;
                console.log(shipperTemp);
                setListShipper(shipperTemp.map((data: any) => {
                    return {
                        value: data.customer_id, // id_staff value cua m la cai nay phai ko the um
                        full_name: data.last_name + " " + data.first_name,
                        number_delivery: data.number_delivery
                    }
                }));
            })
    }
    const handlAccept = (data: any) => {
        Axios.post(`/staff/update-cart`, { // này ko có reject :v, ý là có shipper r thì ko cho bấm 2 cái nutsok á
            cart_id: data.cart_id,
            status_id: 2,
            staff_id_confirm: 'STAFF_1', // dang nhap vao sẽ có, u, chua dang nhap nen set cung tam
            staff_id_delivery: data.shipper, // ko :v y
        })
            .then(res => {
                setLoadData(!loadData);
            })
            .catch((error) => console.log(error))
    }
    const handlReject = (data: any) => {

    }
    React.useEffect(() => {
        getApiShipper();
    }, [])

    React.useEffect(() => {
        getApiByState(props.status_id);
    }, [props.status_id, loadData]);
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 485 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (

                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, textAlign: 'center' }}
                                >
                                    {props.status_id !== 1 && column.id === 'action' || props.status_id !== 0 && column.id === 'action' ? null : column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listOrderCustomer
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.cart_id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align} style={{ textAlign: 'center' }}>
                                                    {column.id === 'shipper' ?
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">Người giao</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={value}
                                                                disabled={props.status_id === 1 ? false : value === 0 ? false : true}
                                                                label="Người giao"
                                                                onChange={(e) => {
                                                                    setListOrderCustomer(listOrderCustomer.map((data: any) => {
                                                                        if (data.cart_id === row.cart_id) {
                                                                            data.shipper = e.target.value;
                                                                        }
                                                                        return data;
                                                                    }));
                                                                }}
                                                            >
                                                                <MenuItem value={0}>chưa có</MenuItem>
                                                                {listShipper.map(data => <MenuItem value={data.value}>{data.full_name + " | " + data.number_delivery}</MenuItem>)}
                                                            </Select>
                                                        </FormControl>
                                                        : (column.id === 'action' && props.status_id === 1)
                                                            || (column.id === 'action' && row.shipper === 0 && props.status_id === 0)

                                                            ?
                                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                                                                <Tooltip title={'Xác nhận'} arrow>
                                                                    <Button variant="outlined" onClick={() => handlAccept(row)}><Done /></Button>
                                                                </Tooltip>
                                                                <Tooltip title={'Từ chối'} arrow>
                                                                    <Button variant="outlined" onClick={() => handlReject(row)}><Close /></Button>
                                                                </Tooltip>
                                                            </div> : column.id === 'more' ?
                                                                <div className='view-detail'>
                                                                    <Tooltip title={'Xem chi tiết...'} arrow>
                                                                        <Link to={`order-detail/${row.cart_id}`}>Xem chi tiết ...</Link>
                                                                    </Tooltip>
                                                                </div>
                                                                : value
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
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
                labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) { return `${from}–${to} trong ${count !== -1 ? count : `more than ${to}`}`; }}
                labelRowsPerPage={'Trang: '}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
