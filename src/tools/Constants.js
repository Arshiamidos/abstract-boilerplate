module.exports = {

    // ROUTES:
    //BASE_URL: "http://127.0.0.1:1414",
    BASE_URL: "http://192.168.0.54/RepoApi2",
    get SERVER_SOCKET () { return this.BASE_URL},
    
    LOGIN_PATH: "/api/Account/login",
    REAL_PERSONS_PATH: "/api/person",
    
    ORG_PERSONS_PATH: "/api/Organization",
    COMMODITY_PATH: "/api/Commodity",
    EQUIPMENT_PATH:"/api/Equipment",
    // MESSAGES:
    ERROR_MESSAGE: 'عملیات نا موفق بود.',
    SUCCESS_MESSAGE: 'عملیات موفقیت آمیز بود.',
    CONFLICT_MESSAGE: 'این مشخصات قبلا ثبت شده است.',



    TYPES:{
        REAL_PERSONS:"REAL_PERSONS",
        ORG_PERSONS:"ORG_PERSONS",
        COMMODITY:"COMMODITY",
        EQUIPMENT:"EQUIPMENT",
    },
    // PARAMS:
    COOKIE_EXPIRES: 14 // IN DAYS
};
