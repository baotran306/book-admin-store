import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
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
    return (
        <div>
            <div className='container-delivery'>
                <div className='container-delivery-status'>
                    <div className='tablist'>
                        <Tabs className='tabs-delivery' sx={{ width: '100%' }} value={value} onChange={handleChange} centered>
                            <Tab sx={{ width: '33.33333%' }} label="All" />
                            <Tab sx={{ width: '33.33333%' }} label="Delivering" />
                            <Tab sx={{ width: '33.33333%' }} label="Delivered" />
                        </Tabs>
                    </div>
                    <div className='tab-details'>
                        <TabPanel value={value} index={0}>
                            <DeliverView />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <DeliverView />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <DeliverView />
                        </TabPanel>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Delivery;