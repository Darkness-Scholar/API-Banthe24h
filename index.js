const axios = require("axios")

async function getToken (userName, password) {
    /** 
     * @function getToken thưc hiện gửi request đăng nhập tới banthe24h
     * @result trả về 1 object chứa token xác thực
    **/
    return await axios.get(`https://banthe24h.vn/v2/PayCard/DangNhap?userName=${userName}&password=${password}`,
        { headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'security': process.env.SECRET_SECURITY || ' '
            }
        })
}

async function buyCard(userName, password, card) {
    /** 
     * @param {string} userName: tên đăng nhập của bạn trên banthe24h
     * @param {string} password: mật khẩu của bạn trên banthe24h
     * @param {string} card: theo cấu trúc '<Tên_nhà_mạng>:<Giá_trị>:<Số_lượng>' ví dụ: 'VTT:10000:1'
     * @var exampleResult mẫu kết quả trả về
    **/
    let exampleResult = {"PinCode":"------","Telco":"VTT","Serial":"------","Amount":10000,"Trace":"990139"}
    let { token } = await getToken(userName, password)
    let headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Token": token
    }
    let res = await axios.post(`https://banthe24h.vn/v2/PayCards/TelcoPay/GetCards?msg=${card}`, {headers})
    console.log(res)
}
