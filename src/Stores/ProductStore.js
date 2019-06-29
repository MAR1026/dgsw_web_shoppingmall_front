import {action, observable} from "mobx";
import axios from 'axios';

class ProductStore {
    static __instance = null;
    static getInstance() {
        if(ProductStore.__instance === null)
            ProductStore.__instance = new ProductStore();
        return ProductStore.__instance;
    }

    constructor() {
        ProductStore.__instance = this;
    }

    @observable myOrderItems = new Array();
    @action getMyOrder = async (account) => {
        try {
            this.myOrderItems = new Array();
            let response = await axios({
                                           url: `http://localhost:8080/api/order/find/${account}`,
                                           headers: {
                                               'Content-Type': 'application/json; charset=UTF-8'
                                           },
                                           method: 'get',
                                           timeout: 3000,
                                       });

            if(response.status === 200 && response.data !== '') {
                console.log(response.data);
/* id: 3
 orderId: 4
 productId: 1
 quantity: 3*/
                response.data.map(order => {
                    order.orderList.map(item => {
                        const product = this.items.find(x => x.id === item.productId);
                        product.amount = item.quantity;
                        this.myOrderItems.push(product);
                    })
                });
                console.log('orders:' + this.myOrderItems);
                return true;
            }
            return false;
        } catch (error) {
            alert(error);
        }
    }

    @observable orderItems = new Array();
    @action addOrder = (amount) => {
        const addItem = this.orderItems.find(x => x.id === this.item.id);
        if(!addItem) {
            this.item.amount = amount;
            this.orderItems.push(this.item);
            return;
        } else {
            addItem.amount = Number(addItem.amount) + Number(amount);
        }
    }

    @action order = async (account) => {
        try {
            let totalPrice = 0;
            await this.orderItems.map(item => {
                totalPrice += item.price * item.amount;
            });

            let orderData = new Object();
            orderData.userAccount = account;
            orderData.totalPrice = totalPrice;

            let itemsInfo = new Array();
            this.orderItems.map(item => {
                let itemInfo = new Object();
                itemInfo.quantity = item.amount;
                itemInfo.productId = item.id;
                itemsInfo.push(itemInfo);
            });

            orderData.orderList = itemsInfo;
            let response = await axios({
                                           url: `http://localhost:8080/api/order/create`,
                                           headers: {
                                               'Content-Type': 'application/json; charset=UTF-8'
                                           },
                                           method: 'post',
                                           timeout: 3000,
                                           data : orderData
                                       });

            console.log(response);
            if(response.status === 200 && response.data !== '') {
                return true;
            }
            return false;

        } catch (e) {
            alert(e.toString());
        }
    }

    @action createComment = async (id, content, user) => {
        try {
            const commentData = new Object();
            commentData.productId = id;
            commentData.content = content;
            commentData.userAccount = user.account;

            let response = await axios({
               url: `http://localhost:8080/api/comment/create`,
               headers: {
                   'Content-Type': 'application/json; charset=UTF-8'
               },
               method: 'post',
               timeout: 3000,
               data : commentData
           });

            console.log(response);
            if(response.status === 200 && response.data !== '') {
                return true;
            }
            return false;
        } catch (e) {
            alert(e.toString());
        }

    }

    @observable item = null;
    @action fetchItem = async (productId) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/api/product/find/${productId}`,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                method: 'get',
                timeout: 3000
            });

            console.log(response);
            if(response.status === 200 && response.data !== '') {
                this.item = response.data;
            }
        } catch (error) {
            alert(error.toString());
        }
    }

    @observable items = null;
    @action fetchItems = async () => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/api/product/findAll',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                method: 'get',
                timeout: 3000
            });

            console.log(response);
            if(response.status === 200 && response.data !== '') {
                this.items = response.data;
            }
        } catch (error) {
            alert(error.toString());
        }
    }
}


export default ProductStore.getInstance();