const cds = require('@sap/cds');
const LG_SERVICE = 'Service: ';
const axios = require('axios');
const {Claim} = cds.entities('my.scrap2earn');



module.exports = async (srv) => {
srv.on('userValid', async (req) => {
    //var axios = require("axios");
    let response = "";

    let access_token = await axios.request({
        url: "/oauth/token",
        method: "post",
        baseURL: "https://api.cr00bkvahx-accenture1-d1-public.model-t.cc.commerce.ondemand.com/authorizationserver",
        data: "grant_type=client_credentials",
        auth: {
            username: "scrap_user",
            password: "secret"
        }

    }).then(function (res) {
        console.log(res);
        return res;
    });
    //let access_token = getAccessToken();
    //console.log(access_token);
    await axios.request({
        'method': 'GET',
        "url": `https://api.cr00bkvahx-accenture1-d1-public.model-t.cc.commerce.ondemand.com/occ/v2/electronics/users/${req.data.UserId}?fields=DEFAULT`,
        'headers': {
            'Authorization': 'Bearer ' + access_token.data.access_token,
        }

    }).then(function (res) {
        console.log(res.data.uid);
        response = res.data.uid;
        return response;
    }).catch(function (error) {
        //console.log(error);
        response = "User Not Available";
        return response;
    });

    return response;
})

srv.on('couponCall', async (req, res) => {
    const tx = cds.transaction(req);
    //let UserId = req.data.UserId;
    let Article = await tx.run(SELECT.from(Claim).where({ Product_Name: req.data.Product_Name }))
    try {

        return Article[0].Voucher_Value;

    } catch (error) {
        return error.message;
    }

})

srv.on('submitCall', async (req, res) => {
    //var axios = require("axios");
    const tx = cds.transaction(req);
    let Voucher = await tx.run(SELECT.from(Claim).where({ Product_Name: req.data.Product_Name }))
    let response = "";
    let access_token = await axios.request({
        url: "/oauth/token",
        method: "post",
        baseURL: "https://api.cr00bkvahx-accenture1-d1-public.model-t.cc.commerce.ondemand.com/authorizationserver",
        data: "grant_type=client_credentials",
        auth: {
            username: "scrap_user",
            password: "secret"
        }
    }).then(function (res) {
        console.log(res);
        return res;
    });        
    await axios.request({
        'method': 'POST',
        "url": `https://api.cr00bkvahx-accenture1-d1-public.model-t.cc.commerce.ondemand.com/occ/v2/electronics/users/${req.data.UserId}/customercoupons/${Voucher[0].Coupon}/claim?fields=DEFAULT`,
        'headers': {
            'Authorization': 'Bearer ' + access_token.data.access_token,
        }
    }).then(function (res) {
        console.log(res);
        response = res.data.coupon.couponId + "coupon is added";
        return response;
    }).catch(function (error) {            
        response = error.response.data.errors[0].message;
        return response;
    });

    return response;
})

};
