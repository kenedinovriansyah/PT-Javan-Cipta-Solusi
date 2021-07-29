import React from 'react';
import './home.scss';
import love from '../../media/icons/love.svg';
import minus from '../../media/icons/minus.svg';
import trash from '../../media/icons/trash.svg';
import add from '../../media/icons/add.svg';
import down from '../../media/icons/chevron-arrow-down.svg';
import { Icons } from '../../ref/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store/configureStore';
import _ from 'lodash';
import dataArray from '../../prefix/product.json';
import { ProductType } from '../../store/types/enum';
import { Product } from '../../store/types/interface';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: ApplicationState) => state.product);
  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch({
        type: ProductType.load_product,
        payload: {
          data: dataArray,
        },
      });
    }
  }, []);

  const addList = (args: Product) => {
    dispatch({
      type: ProductType.save_product,
      payload: {
        data: args,
      },
    });
  };
  const destroyList = (id: number) => {
    dispatch({
      type: ProductType.destroy_product,
      payload: {
        id: id,
      },
    });
  };
  const addProduct = (args: Product) => {
    dispatch({
      type: ProductType.add_product,
      payload: {
        data: args,
      },
    });
  };
  const removeProduct = (args: Product) => {
    dispatch({
      type: ProductType.remove_product,
      payload: {
        data: args,
      },
    });
  };
  return (
    <div className="home-grid">
      <div className="home-cols">
        <h5>Cart (2 Items)</h5>
        {_.map(selector.product, (base, index) => (
          <div className="card" key={index}>
            <div className="card-image">
              <img src={base.picture} alt="" />
            </div>
            <div className="card-body">
              <span className="name">{base.name}</span>
              <span className="type">{base.type}</span>
              <span className="color">Color {base.color}</span>
              <span className="size">Size {base.size}</span>
              <div className="group">
                <button onClick={destroyList.bind(base, base.id)}>
                  <Icons src={trash} className="icons" />
                  <span>Remove Item</span>
                </button>
                <button onClick={addList.bind(base, base)}>
                  <Icons
                    src={love}
                    className="icons"
                    id={
                      selector.save.filter((x) => x.id === base.id)[0]
                        ? 'love'
                        : ''
                    }
                  />
                  <span>Move To Wish List</span>
                </button>
              </div>
            </div>
            <div className="card-footer">
              <div className="groups">
                <button onClick={removeProduct.bind(base, base)}>
                  <Icons src={minus} className="icons" />
                </button>
                <button>{base.quantity}</button>
                <button onClick={addProduct.bind(base, base)}>
                  <Icons src={add} className="icons" />
                </button>
              </div>
              <div className="cost">
                <span className="price">${base.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="home-cols">
        <div className="left-box">
          <h5>The Total amount of</h5>
          <div className="left">
            <div className="group">
              <span>Tampory Amount</span>
              <span className="total">${selector.total.sub_total}</span>
            </div>
            <div className="group">
              <span>Shopping</span>
              <span className="total">${selector.total.shop}</span>
            </div>
          </div>
          <div className="left-total">
            <div className="left-content">
              <span>The Total Amount Of</span>
              <span>(Including VAT)</span>
            </div>
            <div className="price">${selector.total.sub_total}</div>
          </div>
          <button className="checkout">
            <span>go to checkout</span>
          </button>
        </div>
        <div className="left-box">
          <span>Add a checkout code (options)</span>
          <Icons src={down} className="icons" />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
