const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors") // Cross-Origin Resource Sharing(CORS): 서로 다른 출처(origin) 간에 웹 자원을 공유하는 방식을 제어하는 메커니즘

const app = express()
app.use(bodyParser.json())
app.use(cors())
let data_set = [
    { id: "aaa-s", pwd: "aaa", name: "홍길동-s", addr: "산골짜기" },
    { id: "bbb-s", pwd: "bbb", name: "김개똥-s", addr: "개똥별" },
    { id: "ccc-s", pwd: "ccc", name: "고길동-s", addr: "마포구" },
    { id: "ddd-s", pwd: "ddd", name: "이말년-s", addr: "동작구" },
]

app.get("/mem", (req, res) => {
    console.log("서버 실행 mem 통신 성공")

    // // 지연 구현
    // const end = Date.now() + 3000;
    // for (; Date.now() < end;) {

    // }
    res.json(data_set);
})

app.post("/login", (req, res) => {
    // console.log("req.body: ", req.body)
    const member = data_set.filter(d => d.id === req.body.id)[0]

    if (member) {
        if(member.pwd === req.body.pwd)
            res.json({ success: 0, message: "로그인 성공" })
        }
    res.json({ success: 1, message: "로그인 실패" })
})

app.post("/register", (req, res) => {
    const member = data_set.filter(d => d.id === req.body.id)[0]
    if (member) {
        res.json({ success: 1, message: "존재하는 회원" })
    }else{
        data_set = data_set.concat(req.body)
        res.json({ success: 0, message: "회원가입 성공" })
    }
})

app.get("/mem/:id", (req, res) => {
    res.json(data_set.filter((mem) => mem.id === req.params.id)[0]);
})

app.get("/mem/delete/:id", (req, res) => {
    data_set = data_set.filter((mem) => mem.id !== req.params.id)
    res.json({ success: true, message: "삭제 완료" })
})

app.post("/mem/add", (req, res) => {
    const user = req.body
    data_set = data_set.concat(user)
    res.json({ success: true, message: "추가 완료", data: user })
})

app.post("/mem/modify", (req, res) => {
    const user = req.body
    data_set = data_set.map(mem => mem.id === user.id ? user : mem)
    res.json({ success: true, message: "수정 완료", data: user })
})

app.listen(4000, () => console.log("4000 back 구동")) //서버를 포트번호 4000번으로 구동할 것임
//node app 으로 실행할 수 있음 