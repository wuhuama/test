  import Mock from 'mockjs'

  const userRes = {
    refreshCode: {
      "code": 1,
      "data": {
        "authcode": /\d{4}/,
        "date": Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
        'list|3':[{
          'id|+1':1,
          'name': '@FIRST',
        }]
      },
      "msg": "成功"
    }
  }

  Mock.mock(/\/refreshcode/, 'get', userRes.refreshCode)
