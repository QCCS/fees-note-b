import { message } from 'antd';
import { addFee,deleteFee,updateFee,getFeeList,searchFeeList } from '../services/api';

export default {
  namespace: 'feeList',

  state: {
    feeList: [],
    showAdd: false,
    editFee: null,
  },

  effects: {
    editFeeNull(_, { put }) {
      put({
        type: 'editFeeNull',
      });
    },
    editFee({ payload }, { put }) {
      put({
        type: 'editFee',
        payload,
      });
    },
    hideAdd(_, { put }) {
      put({
        type: 'hideAdd',
      });
    },
    showAdd(_, { put }) {
      put({
        type: 'showAdd',
      });
    },
    *saveFee({ payload }, { call, put }) {
      yield call(addFee, payload);
      yield put({
        type: 'hideAdd',
      });
      message.success('保存成功');
    },
    *deleteFee({ payload }, { call }) {
      yield call(deleteFee, payload);
      message.success('删除成功');
    },
    *updateFee({ payload }, { call, put }) {
      yield call(updateFee, payload);
      yield put({
        type: 'editFeeNull',
      });
      message.success('更新成功');
    },
    *searchFeeList({ payload }, { call }) {
      yield call(searchFeeList, payload);
      message.success('搜索成功');
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(getFeeList, payload);
      yield put({
        type: 'queryList',
        payload: response.data,
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(getFeeList, payload);
      yield put({
        type: 'appendList',
        payload: response.data,
      });
    },
  },

  reducers: {
    editFeeNull(state) {
      return {
        ...state,
        editFee: null,
      };
    },
    editFee(state,action) {
      return {
        ...state,
        editFee: action.payload,
      };
    },
    showAdd(state) {
      return {
        ...state,
        showAdd: true,
      };
    },
    hideAdd(state) {
      return {
        ...state,
        showAdd: false,
      };
    },
    queryList(state, action) {
      return {
        ...state,
        feeList: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        feeList: state.feeList.concat(action.payload),
      };
    },
  },
};
