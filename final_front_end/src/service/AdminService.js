import axios from 'axios';

const BASE_URL = "http://localhost:8080/ebanking";

class AdminService {
  //fetch all todos fro a specific user from backend
  getAllActiveCustomers() {
    this.setupRequestInterceptor((sessionStorage.getItem("jwt_token"))) ;
    console.log('api call : getAllActiveCustomers');
    return axios.get(`http://localhost:8080/ebanking/admin/customerlist`);
  }
  //fetch a todo by userName n id
  getAllCustomerRequest() {
    this.setupRequestInterceptor((sessionStorage.getItem("jwt_token"))) ;
    console.log('api call : getAllCustomerRequest');
    return axios.get(BASE_URL+`/admin/pendingcustomerlist`);
  }
  //delete a todo by username n id
  deleteCustomer(custId) {
    this.setupRequestInterceptor((sessionStorage.getItem("jwt_token"))) ;
    console.log('api call : deleteCustomer');
    return axios.delete(BASE_URL+`/admin/deletecustomer/${custId}`);
  }
  //update existing todo by username n id
  approveCustomer(accId) {
    this.setupRequestInterceptor((sessionStorage.getItem("jwt_token"))) ;
    console.log('api call : approveCustomer');
    return axios.put(
      BASE_URL+`/admin/approveuserrequest/${accId}` 
    );
  }
  rejectCustomer(accId) {
    this.setupRequestInterceptor((sessionStorage.getItem("jwt_token"))) ;
    console.log('api call : rejectCustomer');
    return axios.delete(BASE_URL+`/admin/rejectuserrequest/${accId}`);
  }
  //create a new  todo for a particular user
  fetchAllTransactions() {
   this.setupRequestInterceptor((sessionStorage.getItem("jwt_token"))) ;

   console.log(sessionStorage.getItem("jwt_token"));
  // this.setupRequestInterceptor("Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXJlc2hAZ21haWwuY29tIiwiaWF0IjoxNjYzNTE1MTA4LCJleHAiOjE2NjM2MDE1MDh9.8qfuA63r3ZYlj7xSo_Oxs4k_woL66RX3O_fs-WxY3bDnV7EVgCTOJZuI__gWKODEnEpoUJrd3ewHJHGzVA1sbg");
    console.log('api call : fetchAllTransactions');
    return axios.get(`http://localhost:8080/ebanking/admin/listoftransactions`);
  }

  fetchAllComplaints() {
    this.setupRequestInterceptor((sessionStorage.getItem("jwt_token"))) ;
    console.log('api call : fetchAllComplaints');
    return axios.get(`http://localhost:8080/ebanking/admin/complaintlist`);
  }

  fetchAllDebitCardRequest() {
    this.setupRequestInterceptor((sessionStorage.getItem("jwt_token"))) ;
    console.log('api call : fetchAllDebitCardRequest');
    return axios.get(BASE_URL+`/admin/debitcardrequest`);
  }

  approveCardRequest(accId) {
    this.setupRequestInterceptor((sessionStorage.getItem("jwt_token"))) ;
    console.log('api call : approveCardRequest');
    return axios.put(
      BASE_URL+`/admin/approvecardrequest/${accId}`);
  }

  deleteCardRequest(accId) {
    this.setupRequestInterceptor((sessionStorage.getItem("jwt_token"))) ;
    console.log('api call : deleteCardRequest');
    return axios.delete(
      BASE_URL+`/admin/rejectcardrequest/${accId}`);
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
export default new AdminService();
