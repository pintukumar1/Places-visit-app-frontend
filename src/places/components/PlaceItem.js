import React, { useContext, useState } from 'react'
import Map from '../../shared/components/UIElements/Map'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import Modal from '../../shared/components/UIElements/Modal'
import classes from './PlaceItem.module.css'
import { AuthContext } from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'


const PlaceItem = props => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [showMap, setShowMap] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const auth = useContext(AuthContext)

    const openMapHandler = () => setShowMap(true)

    const closeMapHandler = () => setShowMap(false)

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    }
    
    const cancelDeleteHandler = () => {
        setShowConfirmModal(false)
    }

    const confirmDeleteHandler = async() => {
        setShowConfirmModal(false)
        try {
            await sendRequest(process.env.REACT_APP_BACKEND_URL + `/places/${props.id}`, 
            "DELETE",
             null,
              {
                  Authorization: "Bearer " + auth.token
            }
            )
            props.onDelete(props.id);
            // navigate(`/${auth.userId}/places`)
        }
        catch(err) {}
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass={classes["place-item__modal-content"]}
                footerClass={classes["place-item__modal-actions"]}
                footer = {
                    <Button onClick={closeMapHandler}>
                        CLOSE
                    </Button>} >
                <div className={classes["map-container"]}>
                    <Map center={props.coordinates} zoom={16}/>
                </div>
            </Modal>
            <Modal show={showConfirmModal} onCancel={cancelDeleteHandler} header="are you sure?" footerClass="place-item__modal-actions" footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                    <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                </React.Fragment>
            }>
                <p>
                    Do you want to proceed and delete this place? Please note that it 
                    can't be undone thereafter.
                </p>
            </Modal>
            <li className={classes['place-item']}>
                {isLoading && <LoadingSpinner asOverlay/> }
                <Card className={classes['place-item__content']}>
                    <div className={classes['place-item__image']}>
                        <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}` } alt={props.title} />
                    </div>
                    <div className={classes['place-item__info']}>
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className={classes['place-item__actions']}>
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        {auth.userId === props.creatorId && <Button to={`/places/${props.id}`}>EDIT</Button> }
                        {auth.userId === props.creatorId && <Button danger onClick={showDeleteWarningHandler}>DELETE</Button> }
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
}

export default PlaceItem