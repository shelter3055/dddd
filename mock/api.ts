//! 此文件就是mock数据文件
export default {
  'POST /api/checkAuth': (req,res) => {
    res.json({
      data: {
        status: 0,
        msg: '验证成功',
        root: 'admin'
      },
    })
  },
  'POST /api/register': (req,res) => {
    console.log('req',req.body)
    res.json({
      // data: {
      //   status: 0,
      //   msg: '注册失败，请校验您的用户名是否重复'
      // }
      data: {
        status: 1,
        msg: '注册成功'
      }
    })
  },
  'POST /api/login': (req,res) => {
    res.json({
      data: {
        status: 1,
        msg: '登录成功',
        username: 'yanyabing',
        root: 'admin',
        avatar: 'https://elm.cangdu.org/img/1751ab656fe79237.jpg',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inl5YiIsInBhc3N3b3JkIjoieXliMTIzIiwiY3RpbWUiOjE1ODIyODk0MjU2NTQsImlhdCI6MTU4MjI4OTQyNX0.-2pV6kR39zsWyPoViM9vhZxxOGNs-uzKj5GFL6JYkWA'
      }
    })
  },
  'GET /api/checkToken': (req,res) => {
    res.json({
      data: {
        status: 1,
        msg: '验证通过'
      }
    })
  }
}