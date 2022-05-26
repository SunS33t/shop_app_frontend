import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly APIUrl = 'https://localhost:44380/api';

  constructor(private http: HttpClient) {}

  //MANUFACTURER
  getManufacrerList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/manufacturers');
  }

  getManufacrer(id: number | string): Observable<any> {
    return this.http.get<any>(this.APIUrl + `/manufacturers/${id}`);
  }

  addManufacturer(data: any) {
    return this.http.post(this.APIUrl + '/manufacturers', data);
  }

  updateManufacturer(id: string, data: any) {
    return this.http.put(this.APIUrl + `/manufacturers/${id}`, data);
  }

  deleteManufacturer(id: number | string) {
    return this.http.delete(this.APIUrl + `/manufacturers/${id}`);
  }
  //END MANUFACTURER
  //COLOR
  getColorList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/colors');
  }

  addColor(data: any) {
    return this.http.post(this.APIUrl + '/colors', data);
  }

  updateColor(id: string, data: any) {
    return this.http.put(this.APIUrl + `/colors/${id}`, data);
  }

  deleteColor(id: number | string) {
    return this.http.delete(this.APIUrl + `/colors/${id}`);
  }
  //END COLOR
  //PRODUCT COLORS 
  addProductColor(data: any){
    return this.http.post(this.APIUrl + '/colorlists', data);
  }

  updateProductColors(id: string, data:any){
    return this.http.put(this.APIUrl + `/colorlists/${id}`,data);
  }

  deleteAllColors(id:string){
    return this.http.delete(this.APIUrl + `/colorlists/${id}`);
  } 
  //END PRODUCT COLORS
  //PRODUCT
  getProductList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/products');
  }

  getProduct(id: number | string): Observable<any> {
    return this.http.get<any>(this.APIUrl + `/products/${id}`);
  }

  addProduct(data: any) {
    return this.http.post(this.APIUrl + '/products', data);
  }

  updateProduct(id: string, data: any) {
    return this.http.put(this.APIUrl + `/products/${id}`, data);
  }

  deleteProduct(id: number | string) {
    return this.http.delete(this.APIUrl + `/products/${id}`);
  }
  //END PRODUCT
  //CUSTOMER
  getCustomerList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/customers');
  }

  getCustomer(id: number | string): Observable<any> {
    return this.http.get<any>(this.APIUrl + `/customers/${id}`);
  }

  addCustomer(data: any) {
    return this.http.post(this.APIUrl + '/customers', data);
  }

  updateCustomer(id: string, data: any) {
    return this.http.put(this.APIUrl + `/customers/${id}`, data);
  }

  deleteCustomer(id: number | string) {
    return this.http.delete(this.APIUrl + `/customers/${id}`);
  }
  //END CUSTOMER
  //Add to cart
  addCustomerCarts(
    userId: number | string,
    productId: number | string,
    count: number
  ) {
    var data = {
      userId: userId,
      productId: productId,
      count: count,
    };
    return this.http.post(this.APIUrl + '/customercarts', data);
  }

  addCountToCart(userId: string, productId: string, count: number) {
    var data = {
      userId: userId,
      productId: productId,
      count: count,
    };
    return this.http.put(this.APIUrl + `/customercarts/${userId}`, data);
  }

  deleteCountFromCart(userId: string, productId: string, count: number) {
    var data = {
      userId: userId,
      productId: productId,
      count: count,
    };
    return this.http.put(this.APIUrl + `/customercarts/${userId}`, data);
  }

  deleteProductFromCart(userId: string, productId: string) {
    return this.http.delete(
      this.APIUrl +
        `/customercarts?u_id=${userId}&p_id=${productId}`
    );
  }
  //end add to cart

  //COMMENTS
  getCommentList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/comments');
  }

  getCommentListForProduct(id: string): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + `/comments/prod=${id}`);
  }

  addComent(data: any) {
    return this.http.post(this.APIUrl + '/comments', data);
  }

  deleteComent(id: string) {
    return this.http.delete(this.APIUrl + `/comments/${id}`);
  }
  //END COMMENTS

  //ADRESS
  getAdressList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/adresses');
  }

  getAdress(id: number | string): Observable<any> {
    return this.http.get<any>(this.APIUrl + `/adresses/${id}`);
  }

  addAdress(data: any) {
    return this.http.post(this.APIUrl + '/adresses', data);
  }

  updateAdress(id: string, data: any) {
    return this.http.put(this.APIUrl + `/adresses/${id}`, data);
  }

  deleteAdress(id: number | string) {
    return this.http.delete(this.APIUrl + `/adresses/${id}`);
  }
  //END ADRESS

  //SHOPS
  getShopList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/shops');
  }

  getShop(id: number | string): Observable<any> {
    return this.http.get<any>(this.APIUrl + `/shops/${id}`);
  }

  addShop(data: any) {
    return this.http.post(this.APIUrl + '/shops', data);
  }

  updateShop(id: string, data: any) {
    return this.http.put(this.APIUrl + `/shops/${id}`, data);
  }

  deleteShop(id: number | string) {
    return this.http.delete(this.APIUrl + `/shops/${id}`);
  }
  //END SHOPS

  //SHOP PRODUCTS
  addProductToShop(data: any){
    return this.http.post(this.APIUrl + '/productlists',data);
  }
  //END SHOP PRODUCTS

  //CARD 
  getCard(id: number):Observable<any>{
    return this.http.get(this.APIUrl + `/bankaccounts/${id}`);
  }
  
  updateCard(id:number, data:any){
    return this.http.put(this.APIUrl+ `/bankaccounts/${id}`,data);
  }
  //END CARD

  //ORDER
  addOrder(data: any) {
    return this.http.post(this.APIUrl + '/orders', data);
  }
  getOrderList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/orders');
  }

  getOrder(id: number | string): Observable<any> {
    return this.http.get<any>(this.APIUrl + `/orders/${id}`);
  }

  updateOrder(id: string, data: any) {
    return this.http.put(this.APIUrl + `/orders/${id}`, data);
  }

  deleteOrder(id: number | string) {
    return this.http.delete(this.APIUrl + `/orders/${id}`);
  }
  //END ORDER

  //ORDERLIST
  getOrderProductList(id:string):Observable<any[]>{
    return this.http.get<any>(this.APIUrl + `/orderlists/${id}`);
  }
  //END ORDER LIST
}
