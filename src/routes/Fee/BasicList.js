import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {
  Form,
  List,
  Card,
  Input,
  Button,
  Avatar,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BasicList.less';

const { TextArea } = Input;
const FormItem = Form.Item;
const { Search } = Input;
const ListContent = (data) => {
  return (
    <div className={styles.listContent}>
      <div className={styles.listContentItem}>
        <span>消费</span>
        <p>{data.data.total}</p>
      </div>
      <div className={styles.listContentItem}>
        <span>创建者ID</span>
        <p>{data.data.u_id}</p>
      </div>
      <div className={styles.listContentItem}>
        <span>更新时间</span>
        <p>{moment(data.data.date_at).format('YYYY-MM-DD HH:mm')}</p>
      </div>
    </div>
  )
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};

@connect(({ feeList, loading }) => ({
  feeList,
  loading: loading.models.feeList,
}))
@Form.create()
export default class BasicList extends PureComponent {
  componentDidMount() {
    this.feeList();
  }

  // 显示添加费用
  showAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'feeList/showAdd',
    });
  }

  // 取消添加费用
  hideAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'feeList/hideAdd',
    });
  }

  // 取消编辑费用
  editFeeNull = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'feeList/editFeeNull',
    });
  }

  // 保存费用
  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'feeList/saveFee',
          payload: values,
        });
        this.feeList();
      }
    });
  };


  // 编辑费用
  handleSubmitEdit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'feeList/updateFee',
          payload: values,
        });
        this.feeList();
      }
    });
  };

  // 删除费用
  deleteFee = (item) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'feeList/deleteFee',
      payload: item.id,
    });
    this.feeList();
  }

  // 更新费用
  editFee = (item) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'feeList/editFee',
      payload: item,
    });

  }

  // 获取费用列表
  feeList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'feeList/fetch',
      payload: {
        count: 10,
      },
    });
  }

  // 渲染编辑表单
  renderEditFeeForm = () => {
    const {
      submitting,
      form ,
      feeList: {editFee},
    } = this.props;
    const { getFieldDecorator } = form;


    if(editFee){
      return (
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmitEdit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="费用ID">
              {getFieldDecorator('id', {
                initialValue: editFee.id,
              })(<Input placeholder="费用起个名字" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="标题">
              {getFieldDecorator('title', {
                initialValue: editFee.title,
                rules: [
                  {
                    required: true,
                    message: '标题',
                  },
                ],
              })(<Input placeholder="费用起个名字" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="费用">
              {getFieldDecorator('total', {
                initialValue: editFee.total,
                rules: [
                  {
                    required: true,
                    message: '请输入费用',
                  },
                ],
              })(
                <Input placeholder="请输入费用" />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="费用描述">
              {getFieldDecorator('des', {
                initialValue: editFee.des,
                rules: [
                  {
                    required: true,
                    message: '请输入费用描述',
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入费用描述"
                  rows={4}
                />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="用户ID">
              {getFieldDecorator('userId', {
                initialValue: editFee.userId,
                rules: [
                  {
                    required: true,
                    message: '请输入用户ID',
                  },
                ],
              })(
                <Input placeholder="请输入用户ID" />
              )}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                更新
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button onClick={this.editFeeNull}>
                取消
              </Button>
            </FormItem>
          </Form>
        </Card>
      )
    } else {
      return (<div />)
    }
  }

  // 渲染添加表单
  renderFeeForm = () => {
    const {
      submitting,
      form ,
      feeList: {showAdd},
    } = this.props;
    const { getFieldDecorator } = form;

    if(showAdd){
      return (
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="标题">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '标题',
                  },
                ],
              })(<Input placeholder="费用起个名字" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="费用">
              {getFieldDecorator('total', {
                rules: [
                  {
                    required: true,
                    message: '请输入费用',
                  },
                ],
              })(
                <Input placeholder="请输入费用" />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="费用描述">
              {getFieldDecorator('des', {
                rules: [
                  {
                    required: true,
                    message: '请输入费用描述',
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入费用描述"
                  rows={4}
                />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="用户ID">
              {getFieldDecorator('userId', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户ID',
                  },
                ],
              })(
                <Input placeholder="请输入用户ID" />
              )}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                添加
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button onClick={this.hideAdd}>
                取消
              </Button>
            </FormItem>
          </Form>
        </Card>
      )
    } else {
      return (<div />)
    }
  }

  render() {
    const {
      feeList: { feeList },
      loading,
    } = this.props;

    const extraContent = (
      <div className={styles.extraContent}>
        <Search className={styles.extraContentSearch} placeholder="请输入费用标题/描述" onSearch={() => ({})} />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 10,
      total: 50,
    };

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          {this.renderFeeForm()}
          {this.renderEditFeeForm()}
          <Card
            className={styles.listCard}
            bordered={false}
            title="费用列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button type="dashed" onClick={this.showAdd} style={{ width: '100%', marginBottom: 8 }} icon="plus">
              添加
            </Button>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={feeList}
              renderItem={item => (
                <List.Item actions={[<a onClick={()=>{this.editFee(item)}}>编辑</a>, <a onClick={()=>{this.deleteFee(item)}}>删除</a>]}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.des}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
