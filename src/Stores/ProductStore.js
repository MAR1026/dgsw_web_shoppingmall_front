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