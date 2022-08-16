import React, { useEffect, useState } from "react";
import './UpdateBook.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
    TextField
    , Autocomplete
    , Button
    , Switch
    , FormControlLabel
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Axios from "../../../../../Axios";

const Books = () => {
    const { id_book } = useParams();
    const navigate = useNavigate();
    const initital = {
        isbn: "",
        book_name: "",
        image: "",
        pages: "",
        price: "",
        release_year: "",
        quantity: "",
        book_type_id: '',
        is_new: true,
        publisher_id: ''
    }

    const [book, setBook] = useState(initital);
    const [publisher, setPublisher] = useState([] as any);
    const [bookType, setBookType] = useState([] as any);
    const [searchBrand, setSearchBrand] = useState('');
    const [valueYear, setValueYear] = useState('');
    const [img, setImg] = useState<any | null>('');
    const handleChangeSearchBrand = (e: any) => {
        console.log(e.target.value);
        setSearchBrand(e.target.value);
    }
    const handleImage = (e: any) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImg(reader.result);
                setBook({ ...book, image: e.target.files[0].name })
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    const handleSave = () => {
        // Axios.post("/book/insert-book", {
        //     book
        // }).then((res) => {
        //     navigate(-1);
        // }).catch(eror => {

        // })
    }
    useEffect(() => {
        Axios.get('/book/get-list-publisher')
            .then(res => {
                setPublisher(res.data);
            }).catch(error => {
                console.log(error);
            });

        Axios.get('/book/get-list-book-type')
            .then(res => {
                setBookType(res.data);
            }).catch(error => {
                console.log(error);
            })
    }, []);
    const handleCancel = () => {
        navigate(-1);
    }
    const handleCreate = () => {
        Axios.post("/book/insert-book", {
            isbn: book.isbn,
            book_name: book.book_name,
            image: book.image,
            pages: book.pages,
            price: book.price,
            release_year: book.release_year,
            quantity: book.quantity,
            book_type_id: book.book_type_id,
            is_new: true,
            publisher_id: book.publisher_id
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
                        {id_book ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                    </h4>
                    <hr />
                </div>
                <div className="main">
                    <div className="left">
                        <div className="container-input">
                            <div className="bottom">
                                <TextField
                                    value={book.isbn}
                                    label={'Mã ISBN *'}
                                    name={'isbn'}
                                    onChange={handleChange}
                                    className={'form-control'} />
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom">
                                <TextField
                                    value={book.book_name}
                                    label={'Tên Sách *'}
                                    name={'book_name'}
                                    onChange={handleChange}
                                    className={'form-control'} />
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="top">
                                <label>Mô tả <span>*</span></label>
                            </div>
                            <div className="bottom">
                                <CKEditor key={1}
                                    editor={ClassicEditor}
                                    data=""
                                    onReady={(editor: any) => {
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event: any, editor: any) => {
                                        const data = editor.getData();
                                        console.log({ event, editor, data });
                                    }}
                                    onBlur={(event: any, editor: any) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event: any, editor: any) => {
                                        console.log('Focus.', editor);
                                    }}
                                />
                            </div>
                        </div>
                        {/* <div className="container-input">
                            <div className="bottom">
                                <TextField
                                    label={'Giảm giá *'}
                                    type={'number'}
                                    className={'form-control'} />
                            </div>
                        </div> */}
                        <div className="container-input">
                            <div className="bottom">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['year']}
                                        label={'Năm xuất bản'}
                                        value={book.release_year}
                                        onChange={(newValue: any) => {
                                            setBook({ ...book, release_year: moment(newValue).format('YYYY') });
                                        }}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom">
                                <Autocomplete
                                    disablePortal
                                    id="pushlisher"
                                    value={publisher.find((data: any) => data.publisher_id === book.publisher_id)}
                                    options={publisher}
                                    onChange={(event, value: any) => {
                                        setBook({ ...book, publisher_id: value?.publisher_id });
                                    }}
                                    getOptionLabel={(option) => option.publisher_name}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => <TextField {...params} label="Nhà xuất bản*" />}
                                />
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom">
                                <Autocomplete
                                    disablePortal
                                    id="bookType"
                                    options={bookType}
                                    value={bookType.find((data: any) => data.book_type_id === book.book_type_id)}
                                    onChange={(event, value: any) => {
                                        alert(JSON.stringify(value));
                                        setBook({ ...book, book_type_id: value?.book_type_id });
                                    }}
                                    getOptionLabel={(option) => option.book_type_name}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => <TextField {...params} label="Thể loại*" />}
                                />
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom">
                                <TextField
                                    label={'Số Trang *'}
                                    name={'pages'}
                                    type={'number'}
                                    value={book.pages}
                                    onChange={handleChange}
                                    className={'form-control'} />
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom">
                                <TextField
                                    label={'Số lượng *'}
                                    type={'number'}
                                    name={'quantity'}
                                    value={book.quantity}
                                    onChange={handleChange}
                                    className={'form-control'} />
                            </div>
                        </div>
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
                            <div className="bottom">
                                <TextField
                                    label={'Giá *'}
                                    type={'number'}
                                    value={book.price}
                                    name={'price'}
                                    onChange={handleChange}
                                    className={'form-control'} />
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="imageContainer">
                            <div className="image">
                                {img ?
                                    <img src={img} alt="" /> : <img src={require('../../../../image/frame.png')} alt=''></img>}
                            </div>
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