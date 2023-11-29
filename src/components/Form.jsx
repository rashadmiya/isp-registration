import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { static_address } from '../utils/data';
import '../utils/styles.css'
import toast, { Toaster } from 'react-hot-toast';
import Modal from './Modal';


const Form = () => {
    const [userRegistration, setUserRegistration] = useState({
        username: "",
        user_phone: "",
        user_email: "",
        district: "",
        police_station: "",
        union: "",
        address: ""
    });
    const [district, setDistrict] = useState('--district--');
    const [police_station, setPolice_station] = useState('--police_station--');
    const [union, setUnion] = useState('--union--');
    const [districtData, setDistrictData] = useState([]);
    const [selectedPs, setSelectedPs] = useState([]);
    const [selectedUnion, setSelectedUnion] = useState([]);
    const [modal, setModal] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useRef();

    useEffect(() => {
        setDistrictData(static_address)
    }, [])


    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUserRegistration({ ...userRegistration, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true)
        const formData = { ...userRegistration };
        formData.district = district;
        formData.police_station = police_station;
        formData.union = union;

        emailjs.send('service_0olswbq', 'template_to9ft38', formData, 'MRgVb2dOyAum68TDU')
            .then(() => {
                toast("Your request is submitted successfully", {
                    style: { color: 'indianred' }
                });
                setIsSubmitted(false);
                toggleModal();
                setUserRegistration({
                    username: "",
                    user_phone: "",
                    user_email: "",
                    district: "",
                    police_station: "",
                    union: "",
                    address: ""
                });
                setDistrictData([]);
                setSelectedPs([]);
                setSelectedUnion([]);
            })
            .catch((err) => console.log("error :", err));

        // emailjs.send('service_n9hu026', 'template_5huweii', formData, '64-N8hWoA4VjjIxb4')

    };


    const changeDistrict = (event) => {
        let district = event.target.value;
        setDistrict(district);
        if (district) {
            setSelectedPs(districtData?.find(ctr => ctr.name === district)?.police_stations);
        } else {
            setSelectedPs([]);
            setSelectedUnion([]);
        }
    }

    const changePolice_stations = (event) => {
        let police_station = event.target.value;
        setPolice_station(police_station);
        if (police_station) {
            setSelectedUnion(selectedPs.find(stt => stt.name === police_station)?.union);
        } else {
            setSelectedUnion([]);
        }
    }

    const changeUnion = (event) => {
        let union = event.target.value;
        setUnion(union);
    }

    const toggleModal = () => {
        setModal(!modal);
    };

    const closeModal = () => {
        setModal(false);
        window.location.reload();
    }

    // if (modal) {
    //     document.body.classList.add('active-modal')
    // } else {
    //     document.body.classList.remove('active-modal')
    // }


    return (
        <div className='container'>

            {!isSubmitted ? (<div>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0px' }}>
                    <h5 className='header text-beautify'>
                        ফ্রি সংযোগের জন্য আবেদন করুন
                    </h5>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', }}>

                    <form action="" ref={form} onSubmit={handleSubmit} className='form'>
                        <div className='user-info-block'>
                            <span className='name-field text-beautify'>আপনার নাম </span>
                            <input type="text" name='username' id='username'
                                value={userRegistration.username}
                                onChange={handleInput}
                                className='input-field'
                                placeholder='মাহতাব'
                                required
                            />
                        </div>

                        <div className='user-info-block'>
                            <span className='name-field text-beautify'>ঠিকানা</span>
                            <textarea name='address' id='address' rows="2" cols="50"
                                value={userRegistration.address}
                                onChange={handleInput}
                                className='input-field'
                                placeholder='বিস্তারিত ঠিকানা দিন '
                                required
                            />
                        </div>

                        <div className='user-info-block'>
                            <span className='name-field text-beautify'>মোবাইল</span>
                            <input type="phone" name='user_phone' id='user_phone'
                                value={userRegistration.user_phone}
                                onChange={handleInput}
                                className='input-field'
                                placeholder='01.........70'
                                required
                            />
                        </div>

                        <div className='user-info-block'>
                            <label htmlFor="email" className='name-field text-beautify'>ই-মেইল </label>
                            <input type="text" name='user_email' id='user_email'
                                value={userRegistration.user_email}
                                onChange={handleInput}
                                className='input-field'
                                placeholder='example@gmail.com'
                                required
                            />
                        </div>
                        <br />
                        <div className='select-wrapper'>
                            <select value={district}
                                className='text-beautify decorated'
                                name={district}
                                onChange={changeDistrict}
                                required
                            >
                                <option className='text-beautify' value={""}>--আপনার জেলা নির্বাচন করুন--</option>
                                {districtData.map((ctr) => (
                                    <option className='text-beautify ' value={ctr.name}>{ctr.name}</option>
                                ))}
                            </select>
                            <br />
                        </div>

                        <div >
                            <select value={police_station}
                                className='text-beautify decorated'
                                onChange={changePolice_stations}
                                required
                                name={police_station}
                            >
                                <option className='text-beautify' value={""}>--আপনার উপজেলা নির্বাচন করুন--</option>
                                {
                                    selectedPs.map((ps) => (
                                        <option className='text-beautify' value={ps.name}>{ps.name}</option>
                                    ))
                                }
                            </select>
                            <br />
                        </div>
                        <div>
                            <select
                                className='text-beautify decorated'
                                value={union}
                                onChange={changeUnion}
                                required
                                name={union}
                            >

                                <option className='name-field text-beautify' value={""}>--আপনার ইউনিয়ন নির্বাচন করুন--</option>
                                {
                                    selectedUnion.map((cty) => (
                                        <option className='text-beautify' value={cty}>{cty}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <br />

                        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px', }}>
                            <button disabled={isSubmitted} type='submit' className='text-beautify' style={{ padding: '.5em 3em', borderRadius: '5em' }}>Submit</button>
                        </div>
                        <br />
                    </form>
                </div>

            </div>)
                : (
                    <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <p>Submitting...</p>
                    </div>
                )}
            <Modal username={userRegistration.username} modal={modal} closeModal={closeModal} />
        </div>
    )
}

export default Form;

