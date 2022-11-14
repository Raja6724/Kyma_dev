using my.Company as Cor from '../db/data-model';

service CatalogService {
    @readonly entity Employees as projection on Cor.Employees;

    function functionCall(param : String(10)) returns String;

    action   actionCall(param : array of data)   returns String;

    type data{

        ID : Integer;

        Name:String;

        Age:Integer;

    }   
}