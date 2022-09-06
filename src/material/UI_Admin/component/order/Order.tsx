import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Tab, Tabs, Typography } from "@mui/material";
import './Order.css';
import Axios from '../../../Axios';
import TableOrder from './TableOrder';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function Order() {
    const [value, setValue] = useState(sessionStorage.getItem('valueTabOrder') ? parseInt(sessionStorage.getItem('valueTabOrder')!) : 0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        sessionStorage.setItem('valueTabOrder', newValue.toString());
    };

    return (
        <div className='container-delivery'>
            <div className='container-delivery-status'>
                <div className='tablist'>
                    <Tabs className='tabs-delivery' sx={{ width: '100%' }} value={value} onChange={handleChange} centered>
                        {/* <Tab sx={{ width: '20%' }} label="Tất cả đơn" /> */}
                        <Tab sx={{ width: '20%' }} label="Đơn hàng chờ xác nhân" />
                        <Tab sx={{ width: '20%' }} label="Đơn hàng đang giao" />
                        <Tab sx={{ width: '20%' }} label="Đơn hàng thành công" />
                        <Tab sx={{ width: '20%' }} label="Đơn hàng bị hủy" />
                    </Tabs>
                </div>
                <div className='tab-details'>
                    {/* <TabPanel value={value} index={0}>
                        <TableOrder status_id={0} />
                    </TabPanel> */}
                    <TabPanel value={value} index={0}>
                        <TableOrder status_id={1} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TableOrder status_id={2} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <TableOrder status_id={3} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <TableOrder status_id={4} />
                    </TabPanel>
                </div>
            </div>
        </div>
    );
}
