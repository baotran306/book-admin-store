import React, { useState, useRef } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material'
import { Table } from "react-bootstrap";
import { Button } from '@mui/material'
import './ReportRevenue.css'
import { Search } from "@mui/icons-material";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import moment from "moment";
import Axios from "../../../Axios";
const ReportRevenue = () => {
    const [valueFromDate, setValueFromDate] = useState('');
    const [valueToDate, setValueToDate] = useState('');
    const [printer, setPrinter] = useState('');
    const [showReport, setShowReport] = useState(false);
    const [reportRevenueValue, setReportRevenueValue] = useState([]);
    const [sumRevenue, setSumRevenue] = useState(0);
    const handleChangeFromDate = (value: any) => {
        setValueFromDate(value);
    };
    const handleChangeToDate = (value: any) => {
        setValueToDate(value);
    }
    const valid = () => {
        let flag = true;
        if (valueFromDate === '' || valueToDate === '') {
            flag = false;
        } else if (moment(valueFromDate).isAfter(valueToDate)) {
            flag = false;
        }
        return flag;
    }
    const handleClick = () => {
        if (valid()) {
            setShowReport(true);
            getReportFromApi()
        }
        else {
            alert('Bạn nhập ngày thống kê chưa phù hợp');
        }
    }
    const pdfExportComponent = useRef<PDFExport>(null);
    const generatePdf = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();

        }
    }
    const getReportFromApi = () => {
        console.log(moment(valueFromDate).format('YYYY-MM-DD'));
        Axios.post(`admin/statistic-sales-by-month`, {
            from_date: moment(valueFromDate).format('YYYY-MM-DD'),
            to_date: moment(valueToDate).format('YYYY-MM-DD')
        })
            .then(res => {
                console.log(res.data);
                setReportRevenueValue(res.data.info.stats)
                setSumRevenue(res.data.info.sum_all)
                let infoUser = JSON.parse(sessionStorage.getItem("accessToken")!);
                setPrinter(infoUser.last_name + " " + infoUser.first_name);
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="fieldRevenueContainer">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={valueFromDate}
                            onChange={handleChangeFromDate}
                            label='Ngày bắt đầu'
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params: any) => <TextField {...params} />} />
                        <DatePicker
                            value={valueToDate}
                            onChange={handleChangeToDate}
                            label='Ngày kết thúc'
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params: any) => <TextField {...params} />} />
                        <Button variant="outlined" onClick={handleClick}><Search /></Button>
                    </LocalizationProvider>
                </div>
            </div>
            {showReport ? <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <PDFExport
                        ref={pdfExportComponent}
                        paperSize="auto"
                        margin={50}
                        fileName={`Thong_ke_doanh_thu_${new Date().getFullYear()}`}
                        author="KendoReact Team"
                    >
                        <div className="reportRevenueContainer" id='revenue'>
                            <div className="reportRevenueTitle">
                                <div><span style={{ textAlign: 'center' }}>Doanh thu từ ngày {moment(valueFromDate).format('DD/MM/YYYY')} đến ngày {moment(valueToDate).format('DD/MM/YYYY')}</span></div>
                            </div>
                            <Table className='table table-bordered' style={{ width: '800px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>Tháng</th>
                                        <th style={{ textAlign: 'right' }}> Doanh thu tháng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportRevenueValue.map((data: any, index: number) =>
                                        <tr key={index}>
                                            <td style={{ textAlign: 'center' }}>{data.year_month}</td>
                                            <td style={{ textAlign: 'right' }}>{Intl.NumberFormat().format(data.total_revenue)}</td>
                                        </tr>)}
                                    <tr>
                                        <td style={{ textAlign: 'center' }}>Tổng doanh thu</td>
                                        <td style={{ textAlign: 'right' }}>{Intl.NumberFormat().format(sumRevenue)}</td>

                                    </tr>
                                </tbody>
                            </Table>
                            <div className="reportRevenueFooter">
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span>Ngày: {moment(new Date()).format('DD/MM/YYYY')}</span>
                                    <span>Nhân viên lập biểu</span>
                                    <span style={{ marginTop: '60px', textAlign: 'center' }}>{printer}</span>
                                </div>
                            </div>
                        </div>

                    </PDFExport></div>
                <div className='btn-container'>
                    <Button variant='outlined' onClick={generatePdf}>Xuất file</Button>
                </div>
            </div> : <></>
            }

        </div >
    )
}
export default ReportRevenue;