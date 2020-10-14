/* eslint-disable no-sequences */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import {
  Col, Container, Row,
  Form, FormGroup, Label, Input, Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { Link } from 'react-router-dom';

// Import Action
import profileAction from '../redux/actions/profile';
import shippingAddressAction from '../redux/actions/shippingAddress';
import userAction from '../redux/actions/auth';

// Import images
import clipboard from '../assets/images/clipboard.svg';
import map from '../assets/images/map.svg';
import user from '../assets/images/user.svg';
import edit from '../assets/images/edit.svg';
import defaultAvatar from '../assets/images/default-avatar.jpg';

// Import component
import Navber from '../component/NavBar';

const Profile = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token');
  const history = useHistory()

  const profile = useSelector((state) => state.profile);
  const { dataProfile } = profile

  useEffect(async ()=>{
    await dispatch(profileAction.getProfile(token))
  },[])
  
  useEffect(()=>{
    if (profile.fetchCount === 1){
      dispatch(profileAction.getProfile(token))
      const {
        name, email, phone, gender, dateOfBirth, image
      } = profile.dataProfile
      setName(name)
      setEmail(email)
      setPhone(phone)
      setGender(gender)
      setDateOfBirth(dateOfBirth)
      setImage(image)
    }
  })
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [gender, setGender] = useState()
  const [dateOfBirth, setDateOfBirth] = useState()
  const [image, setImage] = useState()

  const dataUpdateProfile = {
    name: name,
    email: email,
    phone_number: phone,
    gender: gender,
    date_of_birth: dateOfBirth,
  }
  const updateDataProfile = () => {
    for (const [key, value] of Object.entries(dataUpdateProfile)) {
      if (value === null) {
        delete dataUpdateProfile[key]
      }
    }
    if (dataUpdateProfile.email === dataProfile.email) {
      delete dataUpdateProfile.email
    }
    dispatch(profileAction.updateProfile(token, dataUpdateProfile))
  }

  const closeMsgUpdate = async () => {
    dispatch(profileAction.clearMessageStatus());
    if (profile.isUpdate) {
      await dispatch(profileAction.getProfile(token))
    }
  };

  const uploadFile = async (e) => {
    const form = new FormData()
    form.append('picture', e.target.files[0])
    await dispatch(profileAction.updateProfile(token, form))
  }

  const shippingAddress = useSelector((state) => state.shippingAddress);
  useEffect(() => {
    dispatch(shippingAddressAction.getShippingAddress(token))
  }, [dispatch, token])
  const [addressAs, setAddressAs] = useState('')
  const [recipientsName, setRecipientsName] = useState('')
  const [recipientsPhone, setRecipientsPhone] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [isPrimary, setIsPrimary] = useState(false)

  const dataAddress = {
    address_as: addressAs,
    recipients_name: recipientsName,
    recipients_phone: recipientsPhone,
    address,
    city,
    postal_code: postalCode,
    isPrimary,
  }
  const createShippingAddress = () => {
    dispatch(shippingAddressAction.postShippingAddress(token, dataAddress))
  }
  const closeMsg = () => {
    dispatch(shippingAddressAction.clearMessageStatus());
    if (shippingAddress.isSuccessPost) {
      dispatch(shippingAddressAction.getShippingAddress(token))
    }
  };

  const [modalNewAddress, setModalNewAddress] = useState(false);
  const toggleNewAddress = () => setModalNewAddress(!modalNewAddress);

  const [profileTab, setProfileTab] = useState(true);
  const profileIsActived = () => (
    setProfileTab(true),
    setShippingAddressTab(false)
  );

  const [shippingAddressTab, setShippingAddressTab] = useState(false);
  const shippingAddressIsActived = () => (
    setProfileTab(false),
    setShippingAddressTab(true)
  );

  const logout = () => {
    localStorage.setItem('token', '')
    dispatch(userAction.logout())
    history.push('/login')
  }

  return (
    <>
      <div className="bg-profile vh-100">
        <Navber />
        <Container>
          <Row>
            <div className="w-25 h-100 bg-white">
              <div className="d-flex align-items-center mb-5">
                <div className="icon-profile-60 mr-3 rounded-circle mr-3">
                  <img className="icon-profile-60 rounded-circle" src={image? image : defaultAvatar} alt="profile" />
                </div>
                <div>
                  <div className="mb-2">
                    <span className="font-weight-bold">{dataProfile.name}</span>
                  </div>
                  <div className="d-flex">
                    <div className="mr-2">
                      <img src={edit} alt="edit" />
                    </div>
                    <div>
                      <span className="text-muted">Ubah profile</span>
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/profile/my-profile" className="d-flex align-items-center mb-3 text-reset text-decoration-none" onClick={profileIsActived}>
                <div className="icons-profile mr-3 bg-color d-flex align-items-center justify-content-center rounded-circle">
                  <img src={user} alt="myAccount" />
                </div>
                <div>
                  <span>My account</span>
                </div>
              </Link>

              <Link to="/profile/shipping-address" className="d-flex align-items-center mb-3 text-reset text-decoration-none" onClick={shippingAddressIsActived}>
                <div className="icons-profile mr-3 bg-info d-flex align-items-center justify-content-center rounded-circle">
                  <img src={map} alt="shippingAddress" />
                </div>
                <div>
                  <span>Shipping address</span>
                </div>
              </Link>

              <Link to="/profile/my-order" className="d-flex align-items-center mb-3 text-reset text-decoration-none">
                <div className="icons-profile mr-3 bg-success d-flex align-items-center justify-content-center rounded-circle">
                  <img src={clipboard} alt="myOrder" />
                </div>
                <div>
                  <span>My order</span>
                </div>
              </Link>

              <Link onClick={logout} className="d-flex align-items-center mb-3 text-reset text-decoration-none">
                <div className="icons-profile mr-3 bg-danger d-flex align-items-center justify-content-center rounded-circle">
                </div>
                <div>
                  <span>Logout</span>
                </div>
              </Link>

            </div>

            <div className="w-75 h-100 px-4">
              {profileTab && (
              <div className="border p-3 bg-white">
                <div>
                  <h3 className="font-weight-bold">My Profile</h3>
                  <span className="text-muted">Manage your profile information</span>
                </div>
                <hr />
                <Row className="px-3">
                  <Col sm={8} className="w-75">
                    <Form>
                      <FormGroup row className="align-items-center">
                        <Col>
                          <div className="text-right">
                            <Label for="name" className="m-0">Name</Label>
                          </div>
                        </Col>
                        <Col sm={9}>
                          <Input onChange={e=>setName(e.target.value)} type="text" name="name" id="name" className="w-75" value={name} />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="align-items-center">
                        <Col>
                          <div className="text-right">
                            <Label for="email" className="m-0">Email</Label>
                          </div>
                        </Col>
                        <Col sm={9}>
                          <Input onChange={e=>setEmail(e.target.value)} type="email" name="email" id="email" className="w-75" value={email} />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="align-items-center">
                        <Col>
                          <div className="text-right">
                            <Label for="phoneNumber" className="m-0">Phone Number</Label>
                          </div>
                        </Col>
                        <Col sm={9}>
                          <Input onChange={e=>setPhone(e.target.value)} type="text" name="phoneNumber" id="phoneNumber" className="w-75" value={phone} />
                        </Col>
                      </FormGroup>

                      <FormGroup tag="fieldset" row className="align-items-center">
                        <Col>
                          <div className="text-right">
                            <Label className="m-0">Gender</Label>
                          </div>
                        </Col>
                        <Col sm={9}>
                          <FormGroup check>
                            {['Male', 'Female'].map(item => {
                              return (
                                <Label className="w-25">
                                  <Input onChange={e=>setGender(e.target.value)} type="radio" name="gender" value={item} checked={item===gender} />
                                  <span>{item}</span>
                                </Label>
                              )
                            })}
                          </FormGroup>
                        </Col>
                      </FormGroup>

                      <FormGroup row className="align-items-center">
                        <Col>
                          <div className="text-right">
                            <Label for="dateOfBirth" className="m-0">Date of birth</Label>
                          </div>
                        </Col>
                        <Col sm={9}>
                          <Input onChange={e=>setDateOfBirth(e.target.value)} type="text" name="dateOfBirth" id="dateOfBirth" className="w-75" placeholder="yyyy/mm/dd" value={dateOfBirth} />
                        </Col>
                      </FormGroup>

                      <FormGroup check row>
                        <Col sm={{ size: 10, offset: 3 }}>
                          <Button onClick={updateDataProfile} color="primary " className="submit-profile-btn rounded-pill bg-color">Save</Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                  <Col sm={4}>
                    <div className="d-flex flex-column align-items-center">
                      <img className="icon-profile-110 rounded-circle mb-3" src={image? image: defaultAvatar} alt="profile-img" />
                      <Label className="btn btn-outline-primary upload-img-btn rounded-pill text-center">
                        <Input onChange={uploadFile} type="file" accept=".jpg, .jpeg, .png" name="file" style={{ display: 'none' }} />
                        <span>Select image</span>
                      </Label>
                    </div>
                  </Col>
                </Row>
              </div>
              )}

              {shippingAddressTab && (
              <div className="border p-3 bg-white">
                <div>
                  <h3 className="font-weight-bold">Choose another address</h3>
                  <span className="text-muted">Manage your shipping address</span>
                </div>
                <hr />
                <Row className="px-5">
                  <Button onClick={toggleNewAddress} color="outline-secondary" className="add-address txt-sm shadow rounded mb-4 p-4" block>Add new address</Button>
                  {shippingAddress.dataShippingAddress && shippingAddress.dataShippingAddress.map(e => {
                    return (
                      <div className={e.isPrimary === 1? "d-flex flex-column justify-content-between text-left shadow rounded border border-danger w-100 mb-4 p-4" : "d-flex flex-column justify-content-between text-left shadow rounded border w-100 mb-4 p-4"}>
                        <div className="font-weight-bold">
                          <span>{e.recipients_name}</span>
                        </div>
                        <div>
                          <address className="text-left">
                            {e.address}, {e.city}, {e.postal_code}
                          </address>
                        </div>
                        <Button color="outline-secondary" className="address-btn rounded-pill text-sm p-0">Change address</Button>
                      </div>
                    )
                  })}
                </Row>
              </div>
              )}

            </div>
          </Row>

          <div>
            <Modal isOpen={modalNewAddress} fade={false} toggle={toggleNewAddress} size="lg" centered>
              <ModalHeader toggle={toggleNewAddress}>Add new address</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="addressAs" className="text-muted txt-sm">Save address as (ex : home address, office address)</Label>
                    <Input type="text" name="addressAs" id="addressAs" placeholder="Home" className="txt-sm" value={addressAs} onChange={e=>setAddressAs(e.target.value)} />
                  </FormGroup>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="recipientsName" className="text-muted txt-sm">Recipients&apos;s name</Label>
                        <Input type="text" name="recipientsName" id="recipientsName" className="txt-sm" value={recipientsName} onChange={e=>setRecipientsName(e.target.value)} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="recipientsPhone" className="text-muted txt-sm">Recipients&apos;s telephone number</Label>
                        <Input type="text" name="recipientsPhone" id="recipientsPhone" className="txt-sm" value={recipientsPhone} onChange={e=>setRecipientsPhone(e.target.value)} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="address" className="text-muted txt-sm">Address</Label>
                        <Input type="text" name="address" id="address" className="txt-sm" value={address} onChange={e=>setAddress(e.target.value)} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="postalCode" className="text-muted txt-sm">Postal code</Label>
                        <Input type="text" name="postalCode" id="postalCode" className="txt-sm" value={postalCode} onChange={e=>setPostalCode(e.target.value)} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="city" className="text-muted txt-sm">City</Label>
                        <Input type="text" name="city" id="city" className="txt-sm" value={city} onChange={e=>setCity(e.target.value)} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup check>
                    <Input type="checkbox" name="primaryAddress" id="primaryAddress" value={isPrimary} onChange={e=>setIsPrimary(e.target.checked)} />
                    <Label for="primaryAddress" className="text-muted txt-sm" check>Make it the primary address</Label>
                  </FormGroup>
                </Form>
                <Modal isOpen={shippingAddress.isSuccessPost || shippingAddress.isErrorPost}>
                  <ModalBody>{shippingAddress.alertMsgPost}</ModalBody>
                  <ModalFooter>
                    <Button onClick={closeMsg}>OK</Button>
                  </ModalFooter>
                </Modal>
              </ModalBody>
              <ModalFooter>
                <Button color="outline-primary" onClick={toggleNewAddress} className="add-address-btn rounded-pill txt-sm">Cancel</Button>
                {' '}
                <Button type="submit" color="primary" onClick={createShippingAddress} className="add-address-btn bg-color rounded-pill txt-sm">Save</Button>
              </ModalFooter>
            </Modal>
          </div>
          <Modal isOpen={profile.isUpdate || profile.isErrorUpdate}>
            <ModalBody>{profile.updateMsg}</ModalBody>
            <ModalFooter>
              <Button onClick={closeMsgUpdate}>OK</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default Profile;
