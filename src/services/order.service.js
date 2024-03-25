import { httpService } from './http.service'
import { userService } from './user.service'
import { storageService } from "./storage.service"
import { makeId } from './util.service'

const ORDER_URL = 'order/'
export const orderService = {
    save,
    query,
    getById,
    remove,
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


async function query() {
    //   return httpService.get(ORDER_URL)

    let ordersToReturn = _loadOrders()
    return Promise.resolve([...ordersToReturn])
}

async function getById(orderId) {
    // return httpService.get(ORDER_URL + orderId)
    var order = await storageService.get(STORAGE_KEY, orderId)
    return order
}

async function remove(orderId) {
    // await httpService.delete(ORDER_URL + orderId)

    const idx = gOrders.findIndex(order => order._id === orderId)
    gOrders.splice(idx, 1)

    storageService.store(STORAGE_KEY, gOrders)
    return Promise.resolve()
}

async function save(orderToSave, status) {
    if (orderToSave._id) {
        const idx = gOrders.findIndex(order => order._id === orderToSave._id)
        orderToSave.status = status;
        gOrders.splice(idx, 1, orderToSave)
        // savedOrder = await httpService.put(ORDER_URL + order._id, order)
    } else {
        console.log(orderToSave, status);
        // orderToSave._id = makeId()
        // orderToSave.status = 'pending'
        // orderToSave.items = []
        // orderToSave.totalPrice = 0
        // orderToSave.buyer = orderToSave
        // gOrders.push(orderToSave)
        // await storageService.post(STORAGE_KEY, orderToSave)

        // savedOrder = await httpService.post(ORDER_URL, order)
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
