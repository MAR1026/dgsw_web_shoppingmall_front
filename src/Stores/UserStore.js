import {action, observable} from "mobx";
import axios from 'axios';

class UserStore {
    static __instance = null;

    static getInstance() {
        if (UserStore.__instance === null)
            UserStore.__instance = new UserStore();
        return UserStore.__instance;
    }

    constructor() {
        UserStore.__instance = this;
    }

    @action checkAccount = async (account) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/api/user/find/${account}`,
                method: 'post',
                timeout: 3000,
            });

            if(response.status === 200 && response.deta !== "")
                return true;
            else
                return false;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    @observable loginString = '로그인'
    @observable user = null;
    @action login = async (loginData) => {
        try {
            this.user = null;
            let response = await axios({
                url: 'http://localhost:8080/api/user/login',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                method: 'post',
                timeout: 3000,
                data: JSON.stringify(loginData)
            });

            if(response.status === 200 && response.data !== "") {
                console.log(response);
                this.loginString = '로그아웃';
                this.user = response.data;
                return true;
            } else {
                alert("잘못된 계정입니다. 다시 시도하세요.");
                return false;
            }
        } catch (error) {
            alert("오류로 인한 로그인 실패 : " + error.toString());
            return false;
        }
    }

    @action logout = () => {
        this.user = null;
        return true;
    }

    @action register = async (createData) => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/api/user/create',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                method: 'post',
                timeout: 3000,
                data: JSON.stringify(createData)
            });

            console.log(response);

            if(response.status === 200 && response.data !== "") {
                alert("회원가입에 성공하였습니다!");
                return true;
            } else {
                alert("회원가입에 실패하였습니다. 다시 시도하세요.");
                return false;
            }
        } catch (error) {
            alert("오류로 인한 회원가입 실패 : " + error.toString());
            return false;
        }
    }
}

export default UserStore.getInstance();