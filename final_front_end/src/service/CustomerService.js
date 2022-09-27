import axios from 'axios';

const BASE_URL = "http://localhost:8080/ebanking";

class CustomerService {
  //fetch all todos fro a specific user from backend
  createAccount(accountData) {
    //make api call for auth
    console.log('Account Creation');
    return axios.post(BASE_URL+'/auth/createaccount', {
        fname: accountData.fname,
        lname: accountData.lname,
        email: accountData.email,
        password: accountData.password,
        dob: accountData.dob,
        gender: accountData.gender,
        mobileNo: accountData.mobileNo,
        address: accountData.address,
        panNo: accountData.panNo,
        aadharNo: accountData.aadharNo,
        balance: accountData.balance,
        accType : accountData.accType
    });
    }

    createAnotherAccount(accountData) {
      //make api call for auth
      console.log('Account Creation');
      return axios.post(BASE_URL+'/auth/createaccount', {
        
          email: accountData.email,
          balance: accountData.balance,
          accType : accountData.accType
      });
      }
    
    //will be completed soon
    uploadImage(custId) {
        //make api call for auth
        console.log('upload image');
        return axios.post(BASE_URL+`auth/${custId}/images`, {
          
        });
    }

    changePassword(custId, changePasswordData) {
        //make api call for auth
        console.log( "confrim pssword data ",changePasswordData.confirmnewpassword);
        this.setupRequestInterceptor((sessionStorage.getItem("jwt_token"))) ;
        console.log('change password');
        return axios.post(BASE_URL+`/customer/passwordchange/${custId}`, {
            newPassword: changePasswordData.newPassword,
            confirmPassword: changePasswordData.confirmnewpassword,
            oldPassword: changePasswordData.oldPassword
        });
    }

    
    moneyTranfer(moneyTranferData) {
        this.setupRequestInterceptor((sessionStorage.getItem("jwt_token"))) ;
        //make api call for auth
        console.log('money tranfer',moneyTranferData);
        return axios.post(BASE_URL+`/customer/moneytransfer`, {
            senderAccountNo: moneyTranferData.senderAccountNo,
            reciverAccountNo: moneyTranferData.receiverAccountNo,
            amount: moneyTranferData.amount
        });
    }


  getAllTransactions(accNo) {
    this.setupRequestInterceptor((sessionStorage.getItem("jwt_token"))) ;
    console.log('api call : get all customers transactions');
    return axios.get(BASE_URL+`/customer/transactions/${accNo}`);
    }
    
  accountBalance(accNo) {
        this.setupRequestInterceptor((sessionStorage.getItem("jwt_token"))) ;
        console.log('api call : get account balance');
        return axios.get(BASE_URL+`/customer/getbalance/${accNo}`);
    }
    
  registerComplaint(accNo,complaintData) {
        this.setupRequestInterceptor((sessionStorage.getItem("jwt_token"))) ;
        //make api call for auth
        console.log('register complaint');
        return axios.post(`http://localhost:8080/ebanking/customer/registercomplaint/${accNo}`, {
            description:complaintData.complaint
        });
    }

  getAllComplaints(accNo) {
        this.setupRequestInterceptor((sessionStorage.getItem("jwt_token"))) ;
        console.log('api call : getAllActiveCustomers');
        return axios.get(BASE_URL+`/customer/getcomplaints/${accNo}`);
    }
    
  requestDebitCard(accNo) {
        this.setupRequestInterceptor((sessionStorage.getItem("jwt_token"))) ;
            console.log('api call : approveCustomer');
            return axios.put(`http://localhost:8080/ebanking/customer/requestcard/${accNo}`);
          }

          isUserLoggedIn() {
            console.log('chk user');
            return sessionStorage.getItem('user_email') === null ? false : true;
          }
        
          setupRequestInterceptor(jwt) {
            axios.interceptors.request.use((config) => {
              if (this.isUserLoggedIn()) {   
                config.headers.authorization = jwt;
                console.log("intersepting the request")
              } 
              return config;
            });
          }
        }

  

export default new CustomerService();
