import { Box, Tab, Tabs, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Axios from '../../../Axios';
import '../order/Order.css';
import DeliverView from './DeliveryViewTable';
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

const Delivery = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        sessionStorage.setItem('valueTabOrder', newValue.toString());
    };
    return (<>
        {JSON.parse(sessionStorage.getItem("accessToken")!).role_id === 3 ?
            <div>
                <div className='container-delivery'>
                    <div className='container-delivery-status'>
                        <div className='tablist'>
                            <Tabs className='tabs-delivery' sx={{ width: '100%' }} value={value} onChange={handleChange} centered>
                                <Tab sx={{ width: '33.33333%' }} label="Tất cả" />
                                <Tab sx={{ width: '33.33333%' }} label="Đang giao" />
                                <Tab sx={{ width: '33.33333%' }} label="Đã giao" />
                            </Tabs>
                        </div>
                        <div className='tab-details'>
                            <TabPanel value={value} index={0}>
                                <DeliverView status={0} />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <DeliverView status={2} />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <DeliverView status={3} />
                            </TabPanel>
                        </div>
                    </div>
                </div>
            </div> : <Navigate to={"/"} />}</>
    )
}
export default Delivery;