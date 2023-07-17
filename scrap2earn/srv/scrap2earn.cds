using my.scrap2earn as my from '../db/data-model';

service scrap2earn {
    @readonly entity Cliam as projection on my.Claim;
    action userValid(UserId : String) returns String;
    action couponCall(Product_Name : String) returns String;
    action submitCall(Product_Name : String , UserId : String) returns String;
}