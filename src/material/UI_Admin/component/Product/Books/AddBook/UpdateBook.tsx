import React, { useEffect, useState } from "react";
import './UpdateBook.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
    TextField
    , Autocomplete
    , Button
    , Switch
    , FormControlLabel,
    FormControl,
    FormHelperText
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate, useParams } from "react-router-dom";
import moment, { invalid } from "moment";
import Axios from "../../../../../Axios";

const Books = () => {
    const { id_book } = useParams();
    const navigate = useNavigate();
    const initital = {
        isbn: "",
        book_name: "",
        image: "",
        pages: 0,
        price: 0,
        release_year: "",
        quantity_in_stock: 0,
        book_type_id: '',
        is_new: true,
        publisher_id: ''
    }

    const initialMessageError = {
        isbn: "",
        book_name: "",
        image: "",
        pages: "",
        price: "",
        release_year: "",
        quantity_in_stock: "",
        book_type_id: "",
        publisher_id: ""
    }
    const initialError = {
        isbn: false,
        book_name: false,
        image: false,
        pages: false,
        price: false,
        release_year: false,
        quantity_in_stock: false,
        book_type_id: false,
        publisher_id: false
    }
    const [error, setError] = useState(initialError);
    const [messageError, setMessageError] = useState(initialMessageError);

    const [book, setBook] = useState(initital);
    const [loading, setLoading] = useState(false);
    const [publisher, setPublisher] = useState([] as any);
    const [bookType, setBookType] = useState([] as any);
    const [searchBrand, setSearchBrand] = useState('');
    const [valueYear, setValueYear] = useState('');
    const [img, setImg] = useState<any | null>('');

    const handleImage = (e: any) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImg(reader.result);
                console.log(reader.result);
                setBook({ ...book, image: Date.now() + e.target.files[0].name })
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    const handleSave = () => {
        if (!valid()) {
            Axios.post("/book/update-book", {
                isbn: book.isbn,
                book_name: book.book_name,
                image: book.image,
                pages: book.pages,
                price: book.price,
                release_year: book.release_year,
                quantity: book.quantity_in_stock,
                book_type_id: book.book_type_id,
                is_new: book.is_new,
                publisher_id: book.publisher_id
            }).then((res) => {
                console.log('aa');
                console.log(img);
                Axios.post("/download-image", {
                    image: book.image,
                    file: img
                }).then((res) => {
                    // navigate(-1);
                    // alert(1);
                }).catch(eror => {
                    // alert(2);
                })
                navigate(-1);
            }).catch(eror => {

            })
        }
    }
    useEffect(() => {
        if (loading) {
            Axios.get('/book/get-list-publisher')
                .then(res => {
                    setPublisher(res.data);
                    console.log(res.data);
                }).catch(error => {
                    console.log(error);
                });

            Axios.get('/book/get-list-book-type')
                .then(res => {
                    setBookType(res.data);
                }).catch(error => {
                    console.log(error);
                })
            setLoading(false);
        }
    }, [loading]);
    useEffect(() => {
        if (id_book) {
            Axios.get(`/book/get-list-book-by-id/${id_book}`)
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
        if (!valid()) {
            Axios.post("/book/insert-book", {
                isbn: book.isbn,
                book_name: book.book_name,
                image: book.image,
                pages: book.pages,
                price: book.price,
                release_year: book.release_year,
                quantity: book.quantity_in_stock,
                book_type_id: book.book_type_id,
                is_new: true,
                publisher_id: book.publisher_id
            }).then((res) => {
                console.log(img);
                Axios.post("/download-image", {
                    image: book.image,
                    file: img
                }).then((res) => {
                    // navigate(-1);
                    // alert(1);
                }).catch(eror => {
                    // alert(2);
                })
                navigate(-1);
            }).catch(eror => {

            })
        }
    }
    const valid = () => {
        let flag = false;
        let errorMessage = initialMessageError;
        let error = initialError;
        if (book.book_name === null || book.book_name === undefined || book.book_name === '') {
            errorMessage.book_name = 'Tên không được trống';
            error.book_name = true;
            flag = true;
        } else {
            errorMessage.book_name = '';
            error.book_name = false;
        }

        if (book.isbn === null || book.isbn === undefined || book.isbn === '') {
            errorMessage.isbn = 'Mã đầu sách không được trống';
            error.isbn = true;
            flag = true;
        } else {
            errorMessage.isbn = '';
            error.isbn = false;
        }

        if (book.book_type_id === undefined || book.book_type_id === null || book.book_type_id === '') {
            errorMessage.book_type_id = 'Chưa chọn thể loại';
            error.book_type_id = true;
            flag = true;
        } else {
            errorMessage.book_type_id = '';
            error.book_type_id = false;
        }

        if (book.publisher_id === undefined || book.publisher_id === '' || book.publisher_id === null) {
            errorMessage.publisher_id = 'Chưa chọn nhà sản xuất';
            error.publisher_id = true;
            flag = true;
        } else {
            errorMessage.publisher_id = '';
            error.publisher_id = false;
        }

        if (book.quantity_in_stock === undefined || book.quantity_in_stock === null) {
            errorMessage.quantity_in_stock = 'Chưa nhập tồn kho';
            error.quantity_in_stock = true;
            flag = true;
        } else if (book.quantity_in_stock < 0) {
            errorMessage.quantity_in_stock = 'Số lượng không được âm';
            error.quantity_in_stock = true;
            flag = true;
        } else {
            errorMessage.quantity_in_stock = '';
            error.quantity_in_stock = false;
        }

        if (book.release_year === undefined || book.release_year === null || book.release_year === '' || book.release_year === 'Inva') {
            errorMessage.release_year = 'Chưa nhập năm xuất bản';
            error.release_year = true;
            flag = true;
        } else {
            errorMessage.release_year = '';
            error.release_year = false;
        }

        if (book.price === undefined || book.price === 0 || book.price === null) {
            errorMessage.price = 'Chưa nhập giá bán';
            error.price = true;
            flag = true;
        } else if (book.price < 0) {
            errorMessage.price = 'Giá bán không được âm';
            error.price = true;
            flag = true;
        } else {
            errorMessage.price = '';
            error.price = false;
        }

        if (book.image === undefined || book.image === null || book.image === '') {
            errorMessage.image = 'Chưa chọn hình ảnh';
            error.image = true;
            flag = true;
        } else {
            errorMessage.image = '';
            error.image = false;
        }

        if (book.pages === undefined || book.pages === 0 || book.pages === null) {
            errorMessage.pages = 'Chưa nhập số trang';
            error.pages = true;
            flag = true;
        } else if (book.pages <= 0) {
            errorMessage.pages = 'Số trang phải dương';
            error.pages = true;
            flag = true;
        } else {
            errorMessage.pages = '';
            error.pages = false;
        }
        setMessageError(errorMessage);
        setError(error);
        return flag;
    }
    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setBook({ ...book, [name]: value });
    }
    const handleFilterPublisher = () => {
        for (var data in publisher) {
            if (publisher[data].publisher_id === book.publisher_id) {
                return publisher[data];
            }
        }
        return null;
    }
    const handleFilterBookType = () => {
        for (var data in bookType) {
            if (bookType[data].book_type_id === book.book_type_id) {
                return bookType[data];
            }
        }
        return null;
    }
    return (
        <div className="container">
            <div className="updateClothesContainer">
                <div className="header">
                    <h4>
                        {id_book ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                    </h4>
                    <hr />
                </div>
                <div className="main">
                    <div className="left">
                        <div className="container-input">
                            <TextField
                                value={book.isbn}
                                label={'Mã ISBN *'}
                                name={'isbn'}
                                disabled={id_book ? true : false}
                                onChange={handleChange}
                                error={error.isbn}
                                className={'form-control'} />
                            {
                                error.isbn && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.isbn}</FormHelperText>
                                </FormControl>
                            }
                        </div>
                        <div className="container-input">
                            <TextField
                                value={book.book_name}
                                label={'Tên Sách *'}
                                name={'book_name'}
                                onChange={handleChange}
                                error={error.book_name}
                                className={'form-control'} />
                            {
                                error.book_name && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.book_name}</FormHelperText>
                                </FormControl>
                            }
                        </div>
                        <div className="container-input">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['year']}
                                    label={'Năm xuất bản'}
                                    value={book.release_year}
                                    onChange={(newValue: any) => {
                                        setBook({ ...book, release_year: moment(newValue).format('YYYY') });
                                    }}
                                    renderInput={(params) => <TextField error={error.release_year} {...params} helperText={null} />}
                                />
                            </LocalizationProvider>
                            {
                                error.release_year && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.release_year}</FormHelperText>
                                </FormControl>
                            }
                        </div>
                        <div className="container-input">
                            <Autocomplete
                                disablePortal
                                id="pushlisher"
                                value={handleFilterPublisher()}
                                options={publisher}
                                onChange={(event, value: any) => {
                                    setBook({ ...book, publisher_id: value?.publisher_id });
                                }}
                                getOptionLabel={(option) => option.publisher_name}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField error={error.publisher_id} {...params} label="Nhà xuất bản*" />}
                            />
                            {
                                error.publisher_id && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.publisher_id}</FormHelperText>
                                </FormControl>
                            }
                        </div>
                        <div className="container-input">
                            <Autocomplete
                                disablePortal
                                id="bookType"
                                options={bookType}
                                value={handleFilterBookType()}
                                onChange={(event, value: any) => {
                                    // alert(JSON.stringify(value));
                                    setBook({ ...book, book_type_id: value?.book_type_id });
                                }}
                                getOptionLabel={(option) => option.book_type_name}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField error={error.book_type_id} {...params} label="Thể loại*" />}
                            />
                            {
                                error.book_type_id && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.book_type_id}</FormHelperText>
                                </FormControl>
                            }
                        </div>
                        <div className="container-input">
                            <TextField
                                label={'Số Trang *'}
                                name={'pages'}
                                type={'number'}
                                value={book.pages}
                                onChange={handleChange}
                                error={error.pages}
                                className={'form-control'} />
                            {
                                error.pages && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.pages}</FormHelperText>
                                </FormControl>
                            }
                        </div>
                        {!id_book ? <div className="container-input">
                            <TextField
                                label={'Số lượng *'}
                                type={'number'}
                                name={'quantity_in_stock'}
                                value={book.quantity_in_stock}
                                onChange={handleChange}
                                error={error.quantity_in_stock}
                                className={'form-control'} />
                            {
                                error.quantity_in_stock && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.quantity_in_stock}</FormHelperText>
                                </FormControl>
                            }
                        </div> : <></>}

                        {id_book ? <div className="container-input">
                            <div className="bottom">
                                <FormControlLabel
                                    label={'Mới'}
                                    control={<Switch defaultChecked value={book.is_new}
                                        name={'is_new'}
                                        onChange={(e) => setBook({ ...book, is_new: e.target.checked })}
                                    />} />
                            </div>
                        </div> : <></>}

                        <div className="container-input">
                            <TextField
                                label={'Giá *'}
                                type={'number'}
                                value={book.price}
                                name={'price'}
                                onChange={handleChange}
                                error={error.price}
                                className={'form-control'} />
                            {
                                error.price && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.price}</FormHelperText>
                                </FormControl>
                            }
                        </div>
                    </div>
                    <div className="right">
                        <div className="imageContainer">
                            <div className="image">
                                {img ? <img style={{ borderColor: `${error.image && 'red'}` }} src={img} alt='' /> : id_book ? <img src={`http://127.0.0.1:5000/get-image/${book.image}`} alt="" />
                                    : <img style={{ borderColor: `${error.image && 'red'}` }} src={require('../../../../image/frame.png')} alt='' />}
                            </div>
                            {
                                error.image && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.image}</FormHelperText>
                                </FormControl>
                            }
                        </div>
                        <div className="btnContainer">
                            <Button variant="outlined" component="label">
                                Chọn ảnh
                                <input
                                    style={{ display: 'none' }}
                                    onChange={handleImage}
                                    accept="image/*"
                                    multiple type="file" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="btnContainer">
                    <Button sx={{ width: '150px', marginRight: '5px' }} variant="outlined" onClick={handleCancel}>Hủy</Button>
                    {id_book ? <Button sx={{ width: '150px' }} variant="outlined" onClick={handleSave}>Lưu</Button>
                        : <Button sx={{ width: '150px' }} variant="outlined" onClick={handleCreate}>Tạo mới</Button>}
                </div>
            </div>
        </div>
    )
}

export default Books;