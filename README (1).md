
# API Documentation
API documentation for store location, and fruits, vegetables that contain description, nutrition, and benefits.


## API Example

#### Get All Store
show all store

```http
/stores
```

#### Response

    {
       "message": "Berhasil mendapatkan 46 toko"
    }

#### Get Store By Name
Get data stores by name,
change (nama toko) to name of store.

```http
/stores/(nama toko)
```
#### Response

 
    {
       "message": "Berhasil mendapatkan 1 toko"
    }

#### Get Nearby Store

Get nearest store location base on user location in radius 3km.

```http
/stores/location?latitude=(value)&longitude=(value)
```

| Parameter     |  Value  |
| :--------     | :-------|
| `latitude`    | `value` |
| `longitude`   | `value` |

#### Response

    {
       "message": "Berhasil mendapatkan toko dalam radius 3 km"
    }

#### Get All Fruits And Vegetables
show all fruits and vegetables.

```http
/fruitsandvegetables/
```

#### Response

    {
       "message": "Berhasil mendapatkan 78 Buah dan Sayur"
    }

#### Get Fruits And Vegetable By Name
Get fruits and vegetables data by name,
change (nama toko) to name of store.

```http
/fruitsandvegetables/(output model)
```
#### Response

 
    {
       "message": "Berhasil mendapatkan data"
    }


## Authors

- [Ja'far Shodiq](https://github.com/potaHere)
- [Galuh Reviko Satya Kirana](https://github.com/GaluhReviko)

