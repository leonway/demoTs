import { request } from '../utils/request';

//发送验证码
function getVerificationCodeService(params) {

  return request('/self-operated-user-center-server/applet/verification_code', {
    qs: {
      smsType: 'LOGIN_REGISTER',//默认使用登陆注册获取验证码
      ...params
    },
  });
}
//校验验证码
function VerificationCodeService(data) {
  console.log(data);
  return request('/self-operated-user-center-server/applet/verification_code', {
    method: "POST",
    data
  });
}
//获取账号关联信息：关注的展馆、收藏（点赞）的展会
function getUserRelationService(data) {

  return request('/exhibition-center-server/app/exhibition-hall/getAttAndSup', {
    // method:"POST",
    // data
  });
}
//首页关注接口
function changeFollowService(data) {
  return request(
    `/exhibition-center-server/app/exhibition-hall/attention
`,
    {
      method: "PUT",
      data
    },
  );
}

//获取当前最新的版本
function getNextVersionService() {
  return request(`/exhibition-center-server/app/version_control`, {})
}

export {
  changeFollowService,
  getVerificationCodeService,
  VerificationCodeService,
  getUserRelationService,
  getNextVersionService
}
