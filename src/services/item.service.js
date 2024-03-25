import { asyncStorageService } from './async-storage.service.js'
import { storageService } from './storage.service.js'
import { httpService } from './http.service.js'
import vases from '../assets/imgs/vases.jpg';
import Boutique from '../assets/imgs/Boutique.jpg';
import TraditionalFires from '../assets/imgs/TraditionalFires.jpg';
import Housewares from '../assets/imgs/Housewares.jpg';

export const itemService = {
    getItems,
    getItemById,
    removeItem,
    saveItem,
    getEmptyItem,
    getCategories
}

const STORAGE_KEY = 'item'
const gDefaultItems = [
    {
        "_id": "1213",
        "inStock": "true",
        "category": "Boutique",
        "price": 80,
        "numOfItemsInStock": 1,
        "inSale": true,
        "salePrice": 50,
        "title": "Highline",
        "description": "20/9.5 cm We all love those M bowls that meet us everyday and we can\’t get enough of them. So meet the Highline M! she is your new crush and will join you at the table evet single day.",
        "mediaUrl": { url: "http://unsplash.it/470/330", type: "image" }
    },
    {
        "_id": "67675",
        "inStock": "true",
        "category": "Boutique",
        "price": 43,
        "numOfItemsInStock": 5,
        "inSale": false,
        "salePrice": 0,
        "title": "Familya bowl",
        "description": "24/7.5 cm Amazing size and shape salad bowl .Great for fruit and warm dishes as well. great for a loving gift",
        "mediaUrl": { url: "http://unsplash.it/470/331", type: "image" }
    },
    {
        "_id": "8654433",
        "inStock": "true",
        "category": "Boutique",
        "price": 210,
        "numOfItemsInStock": 0,
        "inSale": false,
        "salePrice": 0,
        "title": "Boss",
        "description": "28/15 cm Confident,beautiful and independent. This is what you see when you meet this timeless beauty. It can be used for anything that comes to your mind and what ever you decide to put in it will look amazing.",
        "mediaUrl": { url: "http://unsplash.it/470/332", type: "image" }
    },
    {
        "_id": "343435tg",
        "inStock": "true",
        "category": "Boutique",
        "price": 234,
        "numOfItemsInStock": 0,
        "inSale": false,
        "salePrice": 0,
        "title": "Familya bowl",
        "description": "24/7.5 cm Amazing size and shape salad bowl .Great for fruit and warm dishes as well. great for a loving gift",
        "mediaUrl": { url: "http://unsplash.it/470/333", type: "image" }
    },
    {
        "_id": "3434",
        "inStock": "false",
        "category": "Traditional fires",
        "price": 87,
        "numOfItemsInStock": 4,
        "inSale": true,
        "salePrice": 70,
        "title": "Flora round",
        "description": "31/5 cm.   Perfect shape and size piece. Flat enough to serve anything from potatoes, vegetables, meat or fruit. Deep enough to bake a beautiful pie or serve a fresh salad.",
        "mediaUrl": { url: "http://unsplash.it/470/334", type: "image" }
    },
    {
        "_id": "5555",
        "inStock": "true",
        "category": "Housewares",
        "price": 100,
        "numOfItemsInStock": 2,
        "inSale": false,
        "salePrice": 0,
        "title": "L striped cylinder",
        "description": "33.5/7 cm.   For all the cylinder lovers, this one is our new favorite! A large stripy cylinder piece so wonderful for fruits or a large salad but also perfect for a cooked oven to table dish or baked sweets for a festive gathering.  ",
        "mediaUrl": { url: "http://unsplash.it/470/335", type: "image" }
    },
    {
        "_id": "7878",
        "inStock": "false",
        "category": "vases",
        "price": 69,
        "numOfItemsInStock": 0,
        "inSale": true,
        "salePrice": 50,
        "title": "Six petite",
        "description": "10/4 cm each A set of 6 petit bowls for dips, butter, jam, olives and anything else you might need a tiny bowl for.  ",
        "mediaUrl": { url: "http://unsplash.it/470/347", type: "image" }
    },
]

var gItems = _loadItems()

async function getItems(filterBy) {
    return httpService.get(STORAGE_KEY, filterBy)
    // const values = Object.values(filterBy)
    // const str = values.join('')
    // let itemsToReturn = gItems

    // if (str === 'ALL') {
    //     itemsToReturn = gItems
    // }
    // else
    //     if (str) {
    //         itemsToReturn = gItems.filter(item => str.includes(item.price))
    //     }
    // return Promise.resolve([...itemsToReturn])
}

function getItemById(itemId) {
    return httpService.get(`item/${itemId}`)
    // return asyncStorageService.get(STORAGE_KEY, itemId)

    // return new Promise((resolve, reject) => {
    //   const item = gItems.find((item) => item._id === id)
    //   item ? resolve(item) : reject(`Item id ${id} not found!`)
    // })
}

async function saveItem(item) {
    var saveditem

    if (item._id) {
        // saveditem = await asyncStorageService.put(STORAGE_KEY, item)
        saveditem = await httpService.put(`item/${item._id}`, item)

    } else {
        // saveditem = await asyncStorageService.post(STORAGE_KEY, item)
        saveditem = await httpService.post('item', item)
    }
    return saveditem

    // return item._id ? _updateItem(item) : _addItem(item)
}

async function removeItem(itemId) {
    return httpService.delete(`item/${itemId}`)

    // await asyncStorageService.remove(STORAGE_KEY, itemId)
    // const idx = gItems.findIndex(item => item._id === itemId)
    // gItems.splice(idx, 1)
    // console.log(gItems)

    // storageService.store(STORAGE_KEY, gItems)
    // return Promise.resolve()
}

function sort(arr) {
    return arr.sort((a, b) => {
        if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
            return -1
        }
        if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) {
            return 1
        }

        return 0
    })
}

function getEmptyItem() {
    return {
        "inStock": true,
        "category": "",
        "price": 100,
        "numOfItemsInStock": 1,
        "inSale": false,
        "salePrice": 50,
        "title": "",
        "description": "",
        "mediaUrl": { url: "", type: "" }
    }
}

function getCategories() {
    return [
        {
            "categoryName": 'Boutique',
            "categoryImg": Boutique
        },
        {
            "categoryName": 'Housewares',
            "categoryImg": Housewares
        },
        {
            "categoryName": 'vases',
            "categoryImg": vases
        },
        {
            "categoryName": 'Traditional fires',
            "categoryImg": TraditionalFires
        },
    ]
}

function _loadItems() {
    let items = storageService.load(STORAGE_KEY)
    if (!items || !items.length) items = gDefaultItems
    storageService.store(STORAGE_KEY, items)
    return items
}

// function filter(term) {
//   term = term.toLocaleLowerCase()
//   return gItems.filter((item) => {
//     return (
//       item.title.toLocaleLowerCase().includes(term) ||
//       item.categories.toLocaleLowerCase().includes(term) ||
//       item.mediaurl.toLocaleLowerCase().includes(term)
//     )
//   })
// }

function _makeId(length = 10) {
    var title = ''
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        title += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return title
}
