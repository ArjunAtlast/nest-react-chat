import React from 'react';
import { List, Row, Typography, Badge } from 'antd';
import { GiftOutlined } from '@ant-design/icons';
import { cyan } from '@ant-design/colors';

import styles from './product.module.css';

export interface IProductListItem {
  id: string;
  title: string;
}

export interface ProductListItemProps {
  item: IProductListItem;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export interface ProductListProps {
  data: IProductListItem[];
  onItemClick?: (item: IProductListItem) => void;
}

export const ProductListItem = ({ item, onClick }: ProductListItemProps) => {
  return (
    <List.Item className={styles["product-list-item"]} onClick={onClick}>
      <List.Item.Meta
        avatar={<GiftOutlined />}
        title={`${item.title}`}
      />
    </List.Item>
  );
}

export const ProductListHeader = () => {
  return (
    <Row align="middle" justify="space-between">
      <Typography.Title style={{ margin: 0 }} level={5}>
        Products
      </Typography.Title>
    </Row>
  );
};

export const ProductList = ({ data, onItemClick }: ProductListProps) => {
  return (
    <List
      header={<ProductListHeader />}
      style={{ background: 'white' }}
      dataSource={data}
      bordered
      size="large"
      renderItem={(item) => (
        <ProductListItem item={item} onClick={() => onItemClick && onItemClick(item)} />
      )}
    ></List>
  );
};

export default ProductList;
