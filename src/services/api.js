import {stringify} from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

// 添加费用
export async function addFee(params) {
  // const params = {
  //   "title": "费用1",
  //   "des": "费用1描述",
  //   "total": 11,
  //   "userId": "1535024514393",
  // };
  console.log(params)
  return request('http://localhost:5000/fee', {
    method: 'POST',
    body: params,
  });

}
// 删除费用
export async function deleteFee(id) {
  return request(`http://localhost:5000/fee/${id}` , {
    method: 'DELETE',
  });
}

// 更新费用
export async function updateFee(params) {
  // const params = {
  //   "title": "费用1",
  //   "des": "费用1描述",
  //   "total": 11,
  //   "id":11,
  //   "userId": "1535024514393",
  // };
  return request('http://localhost:5000/fee', {
    method: 'PUT',
    body: params,
  });
}

// 查找费用
export async function findFee(id) {
  return request(`http://localhost:5000/fee/${id}` , {
    method: 'GET',
  });
}
// 获取费用列表
export async function getFeeList() {
  return request(`http://localhost:5000/feeList` , {
    method: 'GET',
  });
}
// 搜索费用列表
export async function searchFeeList(params) {
  // const params = {
  //   "title": "费用1",
  //   "des": "费用1描述",
  // };
  return request(`http://localhost:5000/fee?title=${params.title}&${params.des}` , {
    method: 'GET',
  });
}









