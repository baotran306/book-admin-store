import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Error from "../component/Error/Error";
import Home from "../component/Home/Home";
import Layout from "../component/layout/Layout";
import Order from "../component/order/Order";
import OrderDetail from "../component/order/OrderDetail";
import Book from "../component/Product/Books/AddBook/UpdateBook";
import ReportRevenue from "../component/report/ReportRevenue";
import ReportReceipt from "../component/report/ReportReceipt";
import Delivery from "../component/delivery/Delivery";
import Login from "../component/login/Login";
import Product from "../component/Product/Books/ClotheScreen/Product";

const Main = () => {
    const admin = true;
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="product" element={<Product />} />
                <Route path="product/book" element={<Book />} />
                <Route path="product/book/:id_book" element={<Book />} />
                <Route path="order" element={<Order />} />
                <Route path="order/order-detail/:cart_id" element={<OrderDetail />} />
                <Route path="report" element={<ReportRevenue />} />
                <Route path="invoice/:cart_id" element={<ReportReceipt />} />
                <Route path="/delivery" element={<Delivery />} />
            </Route>
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}
export default Main;