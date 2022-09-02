import React, { useEffect, useState } from "react";
import './UpdateCategory.css'
import {
    TextField
    , Autocomplete
    , Button
    , Switch
    , FormControlLabel
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Axios from "../../../../../Axios";

const CategoryDetail = () => {
    const { id_book_type } = useParams();
    const navigate = useNavigate();
    const initital = {
        book_type_id: "",
        book_type_name: "",
    }

    const [book, setBook] = useState(initital);
    const [loading, setLoading] = useState(false);
    const handleSave = () => {
        Axios.post("/book/update-book-type", {
            book_type_id: book.book_type_id,
            book_type_name: book.book_type_name
        }).then((res) => {
            navigate(-1);
        }).catch(eror => {

        })
    }
    useEffect(() => {
        if (id_book_type) {
            Axios.get(`/book/get-list-book-type-by-id/${id_book_type}`)
                .then(res => {
                    console.log(res.data[0]);
                    setBook(res.data[0]);
                    setLoading(true);
                }).catch(error => {

                })
        } else {
            setLoading(true);
        }
    }, [])
    const handleCancel = () => {
        navigate(-1);
    }
    const handleCreate = () => {
        Axios.post("/book/insert-book-type", {
            book_type_id: book.book_type_id,
            book_type_name: book.book_type_name
        }).then((res) => {
            navigate(-1);
        }).catch(eror => {

        })
    }
    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setBook({ ...book, [name]: value });
    }
    return (
        <div className="container">
            <div className="updateClothesContainer">
                <div className="header">
                    <h4>
                        {id_book_type ? 'Cập nhật thể loại' : 'Thêm thể loại'}
                    </h4>
                    <hr />
                </div>
                <div className="main">
                    <div className="left">
                        <div className="container-input">
                            <div className="bottom">
                                <TextField
                                    value={book.book_type_id}
                                    label={'Mã thể loại *'}
                                    name={'book_type_id'}
                                    disabled={id_book_type ? true : false}
                                    onChange={handleChange}
                                    className={'form-control'} />
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom">
                                <TextField
                                    value={book.book_type_name}
                                    label={'Tên thể loại *'}
                                    name={'book_type_name'}
                                    onChange={handleChange}
                                    className={'form-control'} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btnContainer">
                    <Button sx={{ width: '150px', marginRight: '5px' }} variant="outlined" onClick={handleCancel}>Hủy</Button>
                    {id_book_type ? <Button sx={{ width: '150px' }} variant="outlined" onClick={handleSave}>Lưu</Button>
                        : <Button sx={{ width: '150px' }} variant="outlined" onClick={handleCreate}>Tạo mới</Button>}
                </div>
            </div>
        </div>
    )
}

export default CategoryDetail;