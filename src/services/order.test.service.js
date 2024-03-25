import { storageService } from "./storage.service"
import { makeId } from "./util.service"
import axios from 'axios';

export const orderService = {
    save,
    remove,
    query,
}

let gDefaultOrders = [
    {
        "_id": "hfhwh4h4jh4",
        "buyer": {
            "email": 'esd@gmail.com',
            "country": 'Israel',
            "lastName": 'Lev',
            "firstName": 'beni',
            "streetName": 'Herzel',
            "houseNumber": '34',
            "city": 'Tel-Aviv',
            "postalCode": '4567',
            "phone": '0527789675'
        },
        "status": "pending",
        "totalPrice": 299,
        "items": [
            {
                "_id": "hgfhdgf44jh4",
                "title": "blabla",
                "price": 78
            },
            {
                "_id": "hg2222jh4",
                "title": "vases",
                "price": 234
            },
        ],
    },
    {
        "_id": "dfdfdfnnh",
        "buyer": {
            "email": 'esd@gmail.com',
            "country": 'Israel',
            "lastName": 'cohen',
            "firstName": 'dan',
            "streetName": 'Herzel',
            "houseNumber": '34',
            "city": 'Tel-Aviv',
            "postalCode": '4567',
            "phone": '0527789675'
        },
        "status": "pending",
        "totalPrice": 206,
        "items": [
            {
                "_id": "hgfhdgf44jh4",
                "title": "petit",
                "price": 100
            },
            {
                "_id": "hg2222jh4",
                "title": "vases",
                "price": 106
            },
        ],
    },
    {
        "_id": "tytytjkkk",
        "buyer": {
            "email": 'esd@gmail.com',
            "country": 'Israel',
            "lastName": 'cohen',
            "firstName": 'Shay',
            "streetName": 'Herzel',
            "houseNumber": '34',
            "city": 'Tel-Aviv',
            "postalCode": '4567',
            "phone": '0527789675'
        },
        "status": "approved",
        "totalPrice": 469,
        "items": [
            {
                "_id": "hgfhdgf44jh4",
                "title": "petit",
                "price": 78
            },
            {
                "_id": "hg2222jh4",
                "title": "vases",
                "price": 78
            },
        ],
    }
]

const STORAGE_KEY = 'orders'
var gOrders = _loadOrders()

function query(filterBy) {
    let ordersToReturn = _loadOrders()

    return Promise.resolve([...ordersToReturn])
}

function remove(id) {
    const idx = gOrders.findIndex(order => order._id === id)
    gOrders.splice(idx, 1)

    storageService.store(STORAGE_KEY, gOrders)
    return Promise.resolve()
}

function save(orderToSave, status, buyerDetails) {
    if (orderToSave._id) {
        const idx = gOrders.findIndex(order => order._id === orderToSave._id)
        orderToSave.status = status;
        gOrders.splice(idx, 1, orderToSave)
    } else {
        orderToSave._id = makeId()
        console.log('order to save', orderToSave, buyerDetails)
        // orderToSave.buyer = buyerDetails
        // orderToSave.status = 'pending'
        // orderToSave.totalPrice = 122
        // orderToSave.items = [{
        //     "_id": "hg2222jh4",
        //     "title": "vases",
        //     "price": 78
        // }]
        gOrders.push(orderToSave)
    }
    storageService.store(STORAGE_KEY, gOrders)
    return Promise.resolve(orderToSave)
}

function _loadOrders() {
    let orders = storageService.load(STORAGE_KEY)
    if (!orders || !orders.length) orders = gDefaultOrders
    storageService.store(STORAGE_KEY, orders)
    return orders
}
