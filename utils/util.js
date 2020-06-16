//后台接口域名
const adminUrl = "https://www.camrun.today/wx";
//用户openid
const openid = "";
//用户后台redis键名
const redis = "";
//用户请求类型
const type = 1;

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  adminUrl: adminUrl,
  openid: openid,
  redis: redis,
  type: type
}
