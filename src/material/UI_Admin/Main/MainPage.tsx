import React, { useEffect, useState } from "react";
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
import Product from "../component/Product/Books/BookScreen/Product";
import Category from "../component/Product/Books/CategoryScreen/Category";
import CategoryDetail from "../component/Product/Books/AddCategory/UpdateCategory";
export const grantPermission = (requestedRoles: any) => {
    const permittedRoles = JSON.parse(localStorage.getItem('accessToken')!).role_id;
    // in case of multiple roles, if one of the permittedRoles is present in requestedRoles, return true;
    return requestedRoles === permittedRoles;
};
const UnlockAccess = (props: any) => {
    const permission = grantPermission(props.request); // request = ['ROLE_ADMIN'] / ['ROLE_USER'] / ['ROLE_MANAGER']
    return (
        <>
            {permission && props.children}
        </>
    );
};

const Main = () => {
    const [role, setRole] = useState(0);
    useEffect(() => {
        console.log(role);
    }, [role]);
    return (
        <Routes>
            <Route path="login" element={<Login setRole={setRole} />} />
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="product" element={<Product />} />
                <Route path="product/book" element={<Book />} />
                <Route path="category" element={<Category />} />
                <Route path="category/update" element={<CategoryDetail />} />
                <Route path="product/book/:id_book" element={<Book />} />
                <Route path="category/update/:id_book_type" element={<CategoryDetail />} />
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